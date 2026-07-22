# SYSTEM_ARCHITECTURE.md

# Atrixia System Architecture v1.0

**Project:** Atrixia

**Version:** 1.0

**Status:** Approved for Development

**Purpose:** This document defines the complete technical architecture of Atrixia. It is the authoritative reference for all engineering decisions and implementation. Every module, service, API, and component must conform to this architecture.

---

# 1. Architecture Principles

Atrixia is designed around five core engineering principles.

## AI First

AI is the primary product capability. Every major user interaction should either leverage AI reasoning directly or support AI-driven decision making.

---

## Modular

Every major subsystem should be independently replaceable without affecting the rest of the application.

Examples:

* Switching Gemini to OpenAI
* Adding another marketplace
* Adding another authentication provider

should require minimal code changes.

---

## Provider Agnostic

The application should never directly depend on one AI provider or one marketplace.

Instead, all integrations must go through adapters/interfaces.

---

## Scalable

Although the MVP is built for a hackathon, the architecture should support future production scaling without major restructuring.

---

## Type Safe

All frontend and backend code must use strict TypeScript.

No usage of `any`.

Shared types should be reused across client and server.

---

# 2. High-Level Architecture

```
┌──────────────────────────────┐
│          User                │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Next.js Frontend       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        API Layer             │
└──────────────┬───────────────┘
               │
       ┌───────┴─────────┐
       ▼                 ▼
AI Provider        Marketplace Layer
       │                 │
       └───────┬─────────┘
               ▼
     Recommendation Engine
               │
               ▼
          Supabase DB
```

---

# 3. Technology Stack

## Frontend

* Next.js 15 (App Router)
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion

---

## Backend

* Next.js Route Handlers
* TypeScript

---

## Database

Supabase PostgreSQL

---

## Authentication

Supabase Auth

Supported providers

* Email
* Google

Architecture should allow future providers.

---

## Storage

Supabase Storage

Stores:

* Uploaded images
* User avatars

---

## AI Runtime

Primary

Gemini 2.5 Flash / Pro & local Gemma 2/4 (via Vercel AI SDK Google/Vertex Provider)

Architecture prepared for

* GPT
* Claude
* DeepSeek
* Qwen

---

## Deployment

Frontend

Vercel

Backend

Next.js API Routes

Database

Supabase

---

# 4. System Modules

The system consists of independent modules.

---

## Authentication Module

Responsibilities

* Client-side signup/login using `@supabase/ssr` and PKCE flow.
* Next.js Middleware-based session validation & route protection.
* Profile & Preferences Synchronization via triggers.

Owns

Users

Sessions

Profiles

Preferences

---

## Search Module

Responsibilities

Natural language search.

Converts user intent into structured search requests.

Example

Input

"I need a laptop for programming under $900."

Output

```
Category:
Laptop

Budget:
900

Purpose:
Programming

Priority:
Battery
```

---

## Image Analysis Module

Responsibilities

Accept uploaded image.

Identify

* Product
* Brand
* Category
* Similar Items

Returns structured product metadata.

---

## Marketplace Module

Responsibilities

Query marketplace providers.

Normalize product information.

Deduplicate similar products.

Return standardized listings.

### Scraper Architecture & Rate Limiting
- **Resiliency Adapter Pattern:** Employs a proxy-backed aggregator with configurable retry backoffs.
- **Fallback mock client:** Actively checks network responses; if rate-limited or blocked, gracefully switches to realistic mock JSON datasets.

---

## Recommendation Module

Core intelligence of the application.

Responsibilities

Receive normalized listings.

Analyze

Price

Ratings

Shipping

Seller

Review quality

Generate

Recommendation

Alternatives

Trade-offs

Confidence

---

## History Module

Stores

Searches

Recommendations

User interactions

Allows replaying previous recommendation sessions.

---

## Preferences Module

Stores user preferences.

Examples

Budget

Favorite Stores

Preferred Brands

Fast Shipping

Lowest Price

Highest Quality

These preferences influence recommendation generation.

---

# 5. Frontend Architecture & React Server Components (RSC)

Next.js 15 App Router structure with explicit separation between Server (RSC) and Client Components (CC):

```
app/
├── layout.tsx (RSC: Theme wrapper, Supabase Auth session provider)
├── page.tsx (RSC: Static premium landing page layout)
├── (auth)/
│   ├── login/page.tsx (CC: Supabase login form)
│   └── register/page.tsx (CC: Onboarding setup wizard)
└── (dashboard)/
    ├── layout.tsx (RSC: Sidebar navigation panel, user profile prefetch)
    ├── home/page.tsx (CC: Conversational AI input dialog, upload zone)
    ├── search/page.tsx (RSC: Direct stream receiver using React Suspense)
    ├── history/page.tsx (RSC: Fetching search timeline from DB)
    └── saved/page.tsx (RSC: Fetching saved reports from DB)
```

---

# 6. React Server Components vs Client Component Boundaries

### React Server Components (RSC)
* **Default execution:** All pages and layouts are Server Components by default to optimize loading performance.
* **Responsibilities:**
  - Securely query Supabase database.
  - Prefetch user preferences, saved items, and historical recommendations directly on the server without API route roundtrips.
  - Render static layouts and skeleton placeholders.

### Client Components (CC)
* **Explicit Opt-in:** Declared using `'use client'` at the top of the file.
* **Responsibilities:**
  - State management for active conversational AI threads.
  - Drag-and-drop file upload handlers (`react-dropzone`).
  - Interactive UI controls (Shadcn/ui dialogs, select inputs, profile forms).
  - Micro-animations and page transitions (`framer-motion`).

### Progressive Streaming & Suspense Boundaries
* The slow marketplace search and review parsing are isolated behind React `<Suspense>` boundaries.
* The main `/search` layout renders immediately with skeleton loading UI. The backend uses Server-Sent Events (SSE) to progressively stream AI reasoning steps and normalize products into the Client Component state without locking up the page render.

---

# 7. Backend Architecture

API Layer

↓

Business Logic

↓

AI Layer

↓

Marketplace Layer

↓

Database Layer

---

## API Responsibilities

Authentication

Validation

Authorization

Error Handling

Logging

Response Formatting

---

## Business Logic

No UI logic.

No database queries.

Only application rules.

---

## Database Layer

Only responsible for

CRUD

Transactions

Queries

Indexes

Policies

---

# 8. AI Provider Layer

The application should never directly call an AI provider.

Instead

```
AIProvider

↓

GeminiAdapter

Future

GPTAdapter

ClaudeAdapter

DeepSeekAdapter
```

Every provider must expose

```
analyzeImage()

chat()

recommend()

summarizeReviews()

generateConfidence()
```

This allows providers to be swapped without changing business logic.

---

# 9. Marketplace Layer

Every marketplace follows the same interface.

```
MarketplaceProvider

↓

Amazon

eBay

Jumia

AliExpress

Future Providers
```

Each provider returns

```
MarketplaceResult

{

title

image

price

currency

rating

seller

shipping

marketplace

url

}
```

The recommendation engine never knows which marketplace produced the data.

---

# 10. Recommendation Engine

This is the heart of Atrixia.

Pipeline

```
User Request

↓

Intent Detection

↓

Preference Extraction

↓

Marketplace Search

↓

Product Normalization

↓

Similarity Matching

↓

Review Summarization

↓

Seller Evaluation

↓

Trade-off Analysis

↓

Recommendation

↓

Confidence Score

↓

Decision Report
```

---

# 11. Product Normalization

Marketplace data differs.

Normalize into one model.

Example

Amazon

"Ships Tomorrow"

Jumia

"Delivery 2 Days"

AliExpress

"Estimated 5 Days"

↓

Normalized

```
ShippingDays = 2
```

Same for

Ratings

Currencies

Conditions

Stock

Seller Names

---

# 12. Decision Engine

Every recommendation evaluates

Price

Shipping

Ratings

Authenticity

Seller Trust

Review Sentiment

Return Policy (if available)

Overall Value

Never rank by price alone.

---

# 13. Confidence Engine

Every recommendation returns

```
Confidence

0–100%
```

Calculated using

Data Completeness

Review Quality

Listing Similarity

Seller Trust

Image Match

Information Consistency

---

# 14. Review Intelligence

The AI should summarize customer feedback.

Instead of

4.7★

Generate

Pros

Cons

Common Complaints

Who Should Buy

Who Should Avoid

---

# 15. Explainability Layer

Every recommendation must answer

Why?

Trade-offs?

Alternatives?

Confidence?

No recommendation should ever be unexplained.

---

# 16. Database Architecture

Primary entities

Users

Profiles

Preferences

Searches

Products

MarketplaceListings

Recommendations

SavedItems

Conversations

Messages

History

Relationships should use UUID primary keys.

Soft deletes where appropriate.

Indexes on frequently queried fields.

---

# 17. Authentication Flow

```
User

↓

Supabase Auth

↓

Session

↓

Middleware

↓

Protected Route

↓

Application
```

Unauthorized users cannot access protected routes.

---

# 18. Search Flow

```
User

↓

Search Input

↓

Validation

↓

Intent Extraction

↓

Marketplace Queries

↓

Normalization

↓

Recommendation

↓

Decision Report

↓

History Saved
```

---

# 19. Image Search Flow

```
Upload Image

↓

Validation

↓

Storage

↓

Vision Analysis

↓

Product Identification

↓

Marketplace Search

↓

Recommendation

↓

Decision Report
```

---

# 20. Error Handling & Graceful Degradation

The application enforces strict layer-specific boundaries for handling faults:

* **Next.js Global Error Boundary:** Any unexpected rendering crash triggers a fallback UI wrapper showing: *"Something went wrong. The application remains active; please retry your last search."*
* **Structured API Errors:** Every endpoint returns standard error response schemas (`success: false, error: { code, message, details }`).
* **Marketplace Failure Abstraction:** If a specific marketplace provider is blocked or times out:
  - The system isolates that provider and logs a Warning.
  - The search results are marked with a partial failure indicator, allowing the recommendation engine to run on the remaining active marketplace datasets without crashing.
* **Database Rollback Integrity:** All multi-row modifications (e.g. saving recommendations along with listings) run inside explicit PostgreSQL transactional blocks.

---

# 21. Observability & Structured Logging

We use a structured logging utility (`pino` or Vercel Axiom). Log payloads must be JSON-serialized and exclude sensitive tokens (Supabase JWTs, passwords, user emails):

* **Search Metrics:** Log query execution latency, cache hits/misses, and AI reasoning tokens.
* **Provider Fault Tracking:** Log specific rate-limiting error codes (e.g., HTTP 429) returned by Gemini or Scrapers.
* **Security Logs:** Log any failed JWT validations or RLS policy violations.
* **Log Level Mapping:**
  - `INFO`: Cache state changes, recommendation completion.
  - `WARN`: Scraper timeouts, slow API responses ($>3$ seconds).
  - `ERROR`: DB connection drops, AI token depletion, uncaught exceptions.

---

# 22. Security

Environment variables only.

Input validation.

Output sanitization.

Supabase RLS.

Authentication middleware.

HTTPS only.

Rate limiting.

No client-side secrets.

---

# 23. Performance

Parallel marketplace requests.

Lazy loading.

Image optimization.

Server Components where appropriate.

Streaming AI responses where supported.

Aggressive caching for static resources.

Debounced search input.

---

# 24. Scalability

The architecture must support future additions without restructuring.

Future additions

Additional AI providers

Additional marketplaces

Affiliate systems

Browser extension

Mobile application

Price alerts

Wishlist

Voice shopping

---

# 25. Deployment Architecture

```
User

↓

Vercel Edge

↓

Next.js

↓

Supabase

↓

Gemini API

↓

Marketplace Services
```

---

# 26. Folder Structure

```
app/
│
├── (auth)/
├── (dashboard)/
├── api/
├── search/
├── history/
├── profile/
├── settings/
│
components/
│
├── ui/
├── layout/
├── search/
├── recommendation/
├── marketplace/
├── profile/
├── history/
│
features/
│
├── auth/
├── search/
├── recommendations/
├── marketplace/
├── history/
├── preferences/
│
services/
│
├── ai/
├── marketplace/
├── auth/
├── storage/
│
lib/
│
├── supabase/
├── validation/
├── utils/
│
hooks/
│
types/
│
config/
│
styles/
│
public/
│
docs/
```

---

# 27. Architectural Constraints

* No component may directly communicate with the database.
* No UI component may contain business logic.
* All AI interactions must go through the AI Provider Layer.
* All marketplace interactions must go through the Marketplace Layer.
* Business logic must remain independent of UI.
* Shared types must be reused between frontend and backend.
* API routes must remain thin and delegate logic to services.
* Every external dependency must be abstracted behind an interface.
* The Recommendation Engine is the only module authorized to produce final purchasing recommendations.

---

# Final Architecture Statement

Atrixia is designed as an AI-first, modular, provider-agnostic platform where intelligence—not marketplace integration—is the core product. Every architectural decision prioritizes maintainability, extensibility, explainability, and user trust. The system separates presentation, business logic, AI reasoning, marketplace integration, and persistence into distinct layers, ensuring that future growth, provider changes, and new features can be introduced with minimal impact on the overall application architecture.
