# API_SPECIFICATION.md

# Atrixia API Specification v1.0

**Project:** Atrixia

**Version:** 1.0

**API Style:** RESTful JSON API

**Authentication:** Supabase JWT

**Status:** Approved for Development

---

# Overview

The Atrixia API provides all backend functionality required for the AI-powered shopping assistant. It is responsible for:

* Authentication
* AI search
* Image analysis
* Marketplace aggregation
* Recommendation generation
* Conversation management
* User preferences
* Search history
* Saved recommendations

The API follows REST principles, returns JSON exclusively, and uses standard HTTP status codes.

---

# General Standards

## Base URL

```
/api
```

---

## Content Type

All requests and responses:

```
application/json
```

Image uploads:

```
multipart/form-data
```

---

## Authentication

Protected endpoints require a valid Supabase JWT.

Header:

```
Authorization: Bearer <access_token>
```

---

## Standard Success Response

```json
{
  "success": true,
  "data": {}
}
```

---

## Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request.",
    "details": {}
  }
}
```

---

# Error Codes

| Code                  | Meaning                    |
| --------------------- | -------------------------- |
| UNAUTHORIZED          | Authentication required    |
| FORBIDDEN             | Access denied              |
| VALIDATION_ERROR      | Invalid input              |
| NOT_FOUND             | Resource not found         |
| RATE_LIMITED          | Too many requests          |
| MARKETPLACE_ERROR     | Marketplace unavailable    |
| AI_PROVIDER_ERROR     | AI request failed          |
| IMAGE_ANALYSIS_FAILED | Unable to identify product |
| INTERNAL_ERROR        | Unexpected server error    |

---

# Authentication API

---

## POST /api/auth/signup [DEPRECATED]

*Note: Managed client-side via Supabase Auth Client SDK using PKCE. Middleware handles route-level protection.*

### Request

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "********"
}
```

### Success

201 Created

```json
{
  "success": true,
  "user": {}
}
```

---

## POST /api/auth/login [DEPRECATED]

*Note: Managed client-side via Supabase Auth Client SDK using PKCE. Middleware handles route-level protection.*

### Request

```json
{
  "email": "john@example.com",
  "password": "********"
}
```

### Success

200 OK

Returns

* access token
* refresh token
* profile

---

## POST /api/auth/logout

Authentication Required

Yes

Invalidates current session.

---

## GET /api/auth/me

Returns authenticated user.

Authentication Required

Yes

---

# User API

---

## GET /api/profile

Returns profile information.

Authentication Required

Yes

---

## PUT /api/profile

Updates profile.

### Editable Fields

* Full Name
* Avatar
* Preferred Currency

---

# Preferences API

---

## GET /api/preferences

Returns shopping preferences.

Authentication Required

Yes

---

## PUT /api/preferences

Updates shopping preferences.

Example

```json
{
  "budgetMin": 50,
  "budgetMax": 300,
  "preferredBrands": [
    "Sony",
    "Samsung"
  ],
  "preferredMarketplaces": [
    "Amazon",
    "Jumia"
  ],
  "prioritizePrice": true,
  "prioritizeShipping": false,
  "prioritizeQuality": true
}
```

---

# Search API

---

## POST /api/search

Queries marketplaces and returns progressive search and reasoning details via Server-Sent Events (SSE) streaming.

### SSE Event Payload Sequences
```
event: thinking
data: { "step": "querying", "message": "Initiating search across Amazon, eBay..." }

event: results
data: { "products": [ { "id": "...", "title": "...", "price": 49.99 } ] }

event: reasoning
data: { "step": "done", "recommendation": "..." }
```

Authentication Required

Yes

---

### Request

```json
{
  "query": "Best wireless headphones under $150"
}
```

---

### Pipeline

1. Validate request
2. Detect intent
3. Extract preferences
4. Query marketplaces
5. Normalize listings
6. Generate recommendation
7. Save history
8. Return decision report

---

### Response

```json
{
  "success": true,
  "searchId": "...",
  "recommendationId": "...",
  "results": []
}
```

---

# Image Search API

---

## POST /api/image-search

Accepts image upload.

Authentication Required

Yes

Content Type

```
multipart/form-data
```

---

### Request

Field

```
image
```

---

### Pipeline

Upload

↓

Validation

↓

Image Storage

↓

Vision AI

↓

Product Identification

↓

Marketplace Search

↓

Recommendation

---

### Response

```json
{
  "success": true,
  "product": {},
  "recommendation": {}
}
```

---

# AI Chat API

---

## POST /api/chat

Conversational shopping assistant supporting progressive answer typing and reasoning details via Server-Sent Events (SSE) streaming.

Authentication Required

Yes

---

### Request

```json
{
  "conversationId": "3c5b8bdf-3ab5-46fd-b6be-d88cc2e16d41",
  "message": "I'm looking for a backpack for university."
}
```

---

### SSE Response Payload Streams
Returns a continuous chunked stream:
- **Reasoning phase:**
  `event: thinking`
  `data: { "message": "Evaluating lightweight materials and load distribution..." }`
- **Text content generation:**
  `event: reply`
  `data: { "delta": "Here " }`
  `event: reply`
  `data: { "delta": "are the best options..." }`
- **Clarification choices (if needed):**
  `event: clarification`
  `data: { "options": ["Under $50", "$50 to $100", "Over $100"] }`
- **Stream closure:**
  `event: end`
  `data: { "conversationId": "3c5b8bdf-3ab5-46fd-b6be-d88cc2e16d41" }`

---

# Recommendation API

---

## GET /api/recommendation/{id}

Returns complete recommendation.

Authentication Required

Yes

---

### Response

```json
{
  "success": true,
  "recommendation": {
    "confidenceScore": 94,
    "summary": "...",
    "pros": [],
    "cons": [],
    "tradeoffs": [],
    "alternatives": [],
    "marketplaceResults": []
  }
}
```

---

# Marketplace API

---

## GET /api/marketplaces

Returns supported marketplaces.

Authentication Required

No

---

### Response

```json
[
  "Amazon",
  "Jumia",
  "eBay",
  "AliExpress"
]
```

---

# History API

---

## GET /api/history

Returns search history.

Authentication Required

Yes

Supports pagination.

Query Parameters

```
page

limit

sort
```

---

### Response

```json
{
  "items": [],
  "total": 45
}
```

---

# Saved Items API

---

## GET /api/saved

Returns bookmarked recommendations.

Authentication Required

Yes

---

## POST /api/saved

Save recommendation.

### Request

```json
{
  "recommendationId": "..."
}
```

---

## DELETE /api/saved/{id}

Removes bookmark.

---

# Conversation API

---

## GET /api/conversations

Returns conversations.

---

## GET /api/conversations/{id}

Returns messages.

---

## DELETE /api/conversations/{id}

Deletes conversation.

---

# Upload API

---

## POST /api/upload

Uploads user image.

Returns

Storage URL

Public URL

Metadata

---

# AI Provider API

This endpoint is internal.

Not exposed publicly.

Responsibilities

Intent Detection

Vision Analysis

Recommendation Generation

Review Summarization

Confidence Calculation

Trade-off Analysis

---

# Marketplace Adapter API

Internal.

Responsibilities

Marketplace Search

Normalization

Deduplication

Currency Standardization

Shipping Standardization

---

# Recommendation Engine API

Internal.

Responsibilities

Product Ranking

Trade-off Analysis

Recommendation Generation

Alternative Selection

Confidence Score

---

# Health Check

---

## GET /api/health

Returns

```json
{
  "status": "healthy",
  "database": "connected",
  "ai": "available"
}
```

No authentication required.

Used for monitoring and deployment verification.

---

# Request Validation

All incoming requests must be validated before processing.

Validation Rules

* Required fields enforced
* String length limits
* Image type validation
* Maximum upload size
* Numeric range validation
* UUID validation
* Enum validation

Validation failures return:

```
400 Bad Request
```

---

# Pagination

Endpoints returning collections support:

```
page

limit

cursor
```

Default page size:

```
20
```

Maximum:

```
100
```

---

# Filtering

Supported where applicable.

Examples

```
marketplace

brand

priceMin

priceMax

rating

shippingDays
```

---

# Sorting

Supported values

```
price

rating

shipping

confidence

createdAt
```

Ascending or descending.

---

# Rate Limiting & Quota Headers

All requests return standard rate limit headers to let clients track active quotas:
* `X-RateLimit-Limit`: Maximum requests allowed in the active window.
* `X-RateLimit-Remaining`: Requests remaining before hitting rate limit threshold.
* `X-RateLimit-Reset`: Unix timestamp indicating when the current window resets.

### Quota Thresholds
* **General Authenticated Requests:** 500 requests per rolling 60-minute window.
* **General Unauthenticated Requests:** 60 requests per rolling 60-minute window.
* **AI Search & Conversational Chat (`/api/search`, `/api/chat`):** 100 requests per hour.
* **Image Uploads (`/api/image-search`, `/api/upload`):** 30 uploads per hour.

When a quota is exhausted, the API returns a `429 Too Many Requests` status code with the standard error response block: `{ "success": false, "error": { "code": "RATE_LIMITED", "message": "Too many requests. Please try again later." } }`.

---

# Caching Strategy & TTL Constraints

To balance performance with fresh pricing, we apply strict caching boundaries:

1. **Marketplace Raw Results Cache (`marketplace_cache` table):**
   - **Strategy:** Cache raw JSON payloads indexed by hash of normalized query terms.
   - **TTL:** 15 minutes. Any subsequent duplicate search within 15 minutes hits the DB cache instead of initiating scraping.
2. **Static Configuration (`/api/marketplaces`):**
   - **Strategy:** Vercel edge caching with stale-while-revalidate.
   - **TTL:** 24 hours (`Cache-Control: public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600`).
3. **No-Cache Directives:**
   - User profile endpoints, active chat threads, dynamic recommendations, and saved bookmark requests must specify `Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate`.

Conversations

Authentication

---

# Logging

Log

Authentication events

Search requests

AI requests

Marketplace requests

Errors

Latency

Performance metrics

Never log

Passwords

JWTs

Secrets

Payment information

---

# Security Requirements

* HTTPS only
* JWT authentication
* Row Level Security enforced
* Input sanitization
* Output escaping where required
* Rate limiting
* File type validation
* File size validation
* SQL injection protection
* XSS protection
* CSRF protection where applicable
* Secure HTTP headers

---

# API Versioning

Current version

```
v1
```

Future versions should be introduced using URL versioning:

```
/api/v2/...
```

Breaking changes must never be introduced to an existing version.

---

# HTTP Status Codes

| Status | Meaning                |
| ------ | ---------------------- |
| 200    | Success                |
| 201    | Resource Created       |
| 204    | No Content             |
| 400    | Validation Error       |
| 401    | Unauthorized           |
| 403    | Forbidden              |
| 404    | Not Found              |
| 409    | Conflict               |
| 413    | Payload Too Large      |
| 415    | Unsupported Media Type |
| 422    | Unprocessable Entity   |
| 429    | Rate Limited           |
| 500    | Internal Server Error  |
| 502    | Upstream Service Error |
| 503    | Service Unavailable    |

---

# API Design Principles

* Every endpoint has a single responsibility.
* All business logic resides in the service layer, not route handlers.
* All responses follow a consistent JSON structure.
* Authentication is required for all user-specific resources.
* External AI providers and marketplace integrations are abstracted behind internal service interfaces.
* APIs are stateless, idempotent where appropriate, and designed for future extensibility.
* All endpoints must provide meaningful error messages and predictable response formats.
* Every request and response should be fully type-safe and documented through shared TypeScript interfaces.
