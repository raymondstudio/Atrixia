# MVP SCOPE & HACKATHON BOUNDARIES v1.0

This document defines the release boundaries, demo scenarios, exclusions, and delivery checklists for the Atrixia Gemma 4 Hackathon submission.

---

## 1. Feature Classification Matrix

To prevent feature creep, all capabilities are partitioned into three execution tiers:

### Tier 1: Minimum Viable Product (Must-Have for Submission)

#### A. Natural Language Intent Parsing & Conversational Chat
* **Description:** Parses natural language search criteria (e.g. "ergonomic chair under $100") and executes clarifying follow-ups.
* **User Value:** Minimizes search friction by capturing requirements conversationally.
* **Technical Complexity:** Medium (requires structured JSON schema parsing from Gemini API).
* **Dependencies:** Supabase Auth, Gemini API wrapper.
* **Acceptance Criteria:**
  - AI successfully detects search parameters (budget, category, purpose).
  - Suspends results to request inputs if mandatory parameters are missing.

#### B. Marketplace Scraper Adapter & Deduplication Engine
* **Description:** Queries eBay, Amazon, and Jumia, normalizes raw details into a single model, and groups identical items.
* **User Value:** Saves hours of manual site switching and price checking.
* **Technical Complexity:** High (scraping limits, token parsing, name-matching heuristics).
* **Dependencies:** Proxy scraping middleware, `marketplace_cache` database table.
* **Acceptance Criteria:**
  - Standardizes raw data (shipping days, ratings, condition) to uniform formats.
  - Groups identical items from different stores under one product card with 0 duplicate listings.

#### C. AI Multi-Criteria Recommendation & Decision Report
* **Description:** Calculates recommendation scores using weighted math and builds pros, cons, and trade-offs list.
* **User Value:** Delivers a clear, objective purchasing decision with full explainability.
* **Technical Complexity:** High (requires multi-step review sentiment parsing and trade-off evaluation).
* **Dependencies:** Marketplace Scraper Adapter, Gemini sentiment extraction model.
* **Acceptance Criteria:**
  - Generates confidence score (0-100%) and highlights pros/cons from verified customer reviews.
  - Explicitly details trade-offs against cheaper and faster shipping alternatives.

---

### Tier 2: Stretch Goals (Implement Only If Tier 1 Is Fully Complete)

#### A. Multimodal Image Product Search
* **Description:** Allows users to upload screenshots or photos to match and search equivalent marketplace listings.
* **User Value:** Enables search when product names or brands are unknown.
* **Technical Complexity:** Medium (utilizes Gemma Vision model API).
* **Dependencies:** Supabase Storage, Gemma Vision model endpoint.
* **Acceptance Criteria:**
  - Successfully identifies visual objects, brand names, and categories from uploaded PNG/JPG.
  - Automatically queries the marketplace adapter using the identified attributes.

#### B. Dynamic Profile Onboarding Wizard
* **Description:** A step-by-step user onboarding flow capturing defaults (currency, default category budgets, priority weights).
* **User Value:** Auto-personalizes future recommendations from the first login.
* **Technical Complexity:** Low.
* **Dependencies:** Supabase Auth, React Hook Form.
* **Acceptance Criteria:**
  - Wizard appears upon first login. Saved preferences correctly persist to the `preferences` table.

---

### Tier 3: Future Vision (Explicitly Excluded From Hackathon Build)

* **Universal Checkout & Unified Payment Gateways:** Bypasses security/checkout complexity by redirecting directly to original store product pages.
* **Price Drop Alerts & Email Alerts Daemon:** Future background scheduler checking prices against database caches.
* **Browser Extension Sync:** Chrome extension overlaying recommendations during Amazon browsing.
* **Universal Wishlists & Shared Collaborator Lists:** Shared boards for collaborative shopping.

---

## 2. Core Demo Scenario (3-Minute Judge Flow)

The hackathon demo video and judging path must show this exact flow:

```
[0:00 - 0:30] -> Frame the problem of fragmented marketplace shopping.
[0:30 - 1:00] -> Input query "best office desk under $150". Show conversational AI clarification interface.
[1:00 - 1:30] -> Upload a product image. AI identifies it and triggers marketplace search.
[1:30 - 2:30] -> Display normalized listings side-by-side. Open the AI Decision Report showing trade-offs.
[2:30 - 3:00] -> Click "Buy on Marketplace" to redirect to the checkout page. Conclude with the vision of decision intelligence.
```

---

## 3. Risks & Mitigations

| Risk | Impact | Mitigation Strategy |
| --- | --- | --- |
| **Marketplace Scraper Outage / IP Blocks** | **Critical** (crashes demo during judging) | Implement a proxy aggregator and configure an automatic fallback to `MarketplaceMockAdapter` data if scraping fails. |
| **Gemini API Key Depletion / Rate Limits** | **High** (breaks AI chat) | Implement a 15-minute raw database cache (`marketplace_cache`) to prevent redundant external API requests. |
| **LLM Output Formatting Drift** | **High** (crashes frontend JSON parse) | Use strict JSON Schemas with the Vercel AI SDK. Program secondary retry-validation prompts to auto-correct raw strings. |

---

## 4. Final Release Checklist

1. **Uptime & Fallbacks:** Verify that `MarketplaceMockAdapter` triggers correctly if live scraper queries time out.
2. **Security Compliance:** Confirm Row Level Security (RLS) is active on all user-owned tables in Supabase.
3. **Build Integrity:** Validate that `npm run build` succeeds with zero TypeScript errors or ESLint warnings.
4. **Judging Assets:** Ensure the repository includes a comprehensive `README.md`, an architecture diagram, and the 3-minute YouTube demo link.
