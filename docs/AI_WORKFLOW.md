# AI WORKFLOW SPECIFICATION v1.0

This document defines the intelligence architecture, decision-making pipelines, and reasoning engine specifications for the Atrixia AI Shopping Decision Agent.

---

## 1. Vision & Core Agent Philosophy

Traditional search engines and comparison sites return lists of products based on query keywords, leaving the user with the burden of analyzing:
* "Is this listing authentic or a counterfeit?"
* "Are the reviews trustworthy, or are they skewed?"
* "Does a slightly cheaper price justify two weeks of shipping latency?"

Atrixia is built as an **Autonomous AI Shopping Decision Agent**. It treats shopping not as a database lookup problem, but as a multi-criteria decision-making (MCDM) challenge. The AI's role is to act as an objective, expert consultant that:
1. **Understands Intent & Context:** Synthesizes natural language inputs and image details with the user's active preference profile.
2. **Performs Information Synthesis:** Gathers, normalizes, and filters candidate listings across fragmented marketplaces.
3. **Reasons Over Trade-Offs:** Balances quality, shipping, seller reputation, and pricing metrics to formulate a defensible recommendation.
4. **Maintains Trust:** Explicitly highlights pros, cons, and trade-offs rather than forcing a black-box suggestion.

---

## 2. High-Level AI Reasoning Workflow

The agentic pipeline is organized as a sequential reasoning loop with execution gates:

```
        [User Search / Image Upload]
                    │
                    ▼
          [Intent Identification]
                    │
                    ▼
          [Context & Memory Lookup]
                    │
                    ▼
           [Tool Selection Gate]
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
 [Image Analysis]      [Marketplace Query]
        │                       │
        └───────────┬───────────┘
                    ▼
         [Product Normalization]
                    │
                    ▼
          [Review Sentiment Engine]
                    │
                    ▼
        [Decision & Trade-off Engine]
                    │
       ┌────────────┴────────────┐
       ▼                         ▼
[Score < 60%]             [Score >= 60%]
       │                         │
       ▼                         ▼
[Clarification Request]   [Report Generation]
       │                         │
       ▼                         ▼
[User Input Loop]        [Persistence & Stream]
```

---

## 3. Intent Detection Matrix

The router parses queries into one of the following structured intents:

| Intent | Purpose | Input Example | Required Tools | Output Target |
| --- | --- | --- | --- | --- |
| **Product Search** | Identify items matching descriptive specs. | "Ergonomic chair with lumbar support" | `MarketplaceAdapter` | Candidate list |
| **Image Search** | Identify products using visual assets. | Uploaded image binary | `ImageAnalysis`, `MarketplaceAdapter` | Candidate list |
| **Comparison** | Compare specific user-nominated models. | "Compare iPad Air vs iPad Pro 2026" | `MarketplaceAdapter`, `AICompare` | Side-by-side spec report |
| **Budget Optimization** | Find best value matching hard spending limits. | "Best smartphone under $250" | `MarketplaceAdapter`, `PreferenceRetrieval` | Decision Report |
| **Quality Optimization** | Locate premium listings regardless of cost. | "Highest rated mechanical keyboard" | `MarketplaceAdapter`, `ReviewSummarizer` | Decision Report |
| **Alternative Products** | Find alternatives for out-of-stock items. | "Alternatives to Herman Miller Aeron" | `MarketplaceAdapter` | Alternative recommendation |
| **Clarifying Response** | Refine parameters during conversational loops. | "Actually, I need it delivered by tomorrow" | `HistoryRetrieval`, `MarketplaceAdapter` | Streamed SSE update |

---

## 4. Conversation Memory & Threading

Atrixia tracks conversations as stateful threads to support long-running, iterative shopping decision flows:

* **Session & Thread Mapping:**
  - A `conversation_id` is generated for every new search journey.
  - Individual queries and AI reasoning chunks are stored in the `messages` table with roles: `user`, `assistant`, `system`.
  - All recommendations refer back to a specific `message_id` to preserve lineage.
* **Context Window Retention:** The AI retrieves the last 10 messages from the thread to maintain short-term query context, avoiding repetition when the user inputs follow-ups (e.g. *"Show me the second option in blue"*).
* **Preference Inheritance:** User preferences (default currency, shipping priorities, favorite stores) are injected as system prompts to bias the search parameters unless explicitly overridden by the active user query.

---

## 5. Tool Selection Engine

The AI decides when and how to call system functions. It operates as an agent routing commands to the following interfaces:

```json
{
  "tools": [
    {
      "name": "query_marketplaces",
      "description": "Scrapes or queries live listings from Amazon, eBay, and Jumia.",
      "parameters": {
        "query": "string",
        "category": "string",
        "budget_max": "number"
      }
    },
    {
      "name": "analyze_image_product",
      "description": "Extracts product specs, brand names, and categories from an image upload.",
      "parameters": {
        "storage_url": "string"
      }
    },
    {
      "name": "lookup_cache",
      "description": "Checks database for cached results of identical terms.",
      "parameters": {
        "query_hash": "string"
      }
    }
  ]
}
```

---

## 6. Marketplace Intelligence

To prevent duplicate listings and handle API delays, candidate listings run through an aggregation pipeline:

1. **Product Deduplication:**
   - Listings are grouped using a similarity threshold ($>85\%$ name match after removing terms like "New", "Boxed", "Shipping").
   - Identical items across stores are nested under a single normalized product card showing price differentials.
2. **Partial Failures & Latency Mitigation:**
   - If a marketplace scraper times out ($>4$ seconds), the pipeline halts that store query and logs a warning.
   - The engine continues reasoning on the returned listings, adding a banner: *"Jumia results could not be searched. Displaying listings from Amazon and eBay."*

---

## 7. Image Intelligence Pipeline

When an image is uploaded:

```
[Uploaded Image] ──► [Scale & Compress] ──► [Gemma Vision API] ──► [Extract Entity: Brand, Spec] ──► [Trigger Query]
```

* **Object Detection:** Identifies the primary product bounding box.
* **Feature Extraction:** Extracts dominant colors, brand tags, and model inscriptions.
* **Fallback Behavior:** If the image is blurred or cannot be resolved with $>50\%$ confidence, the system returns a prompt asking for details: *"We couldn't identify the product from this image. Could you tell us the name or brand?"*

---

## 8. Recommendation Engine Ranking Factors

The core scoring engine ranks candidate listings using a weighted multi-criteria calculation:

$$\text{Final Score} = (w_p \times S_p) + (w_r \times S_r) + (w_s \times S_s) + (w_t \times S_t)$$

### Criteria Breakdown
* **Price Score ($S_p$):** Relates item price to the median category price. Lower price yields higher score.
* **Review Sentiment Score ($S_r$):** Derived from NLP tokenization of user reviews. Detects positive/negative ratios.
* **Shipping Score ($S_s$):** Scored on days to deliver (e.g., 1 day = 100%, 7 days = 30%, $>14$ days = 0%).
* **Seller Trust Score ($S_t$):** Derived from seller ratings (e.g., $98\%$ positive = 98 points).

### Weight Tuning Mappings ($w$)
Weights dynamically adjust based on user preferences:
* Default: Price 30%, Reviews 30%, Shipping 20%, Seller Trust 20%.
* User Prioritizes Price: Price weight increases to 60%; others drop to 13.3% each.

---

## 9. Trade-Off Balancing Model

When competing options excel in conflicting parameters, the AI balances them using explicit trade-off rules:

* **Cheaper vs. Highly Rated:** If Product A is $20\%$ cheaper but has a $3.8/5$ rating, and Product B is more expensive but rated $4.8/5$ with positive durability sentiment:
  - *AI Rule:* Recommend Product B as the primary choice for durability. List Product A as the "Budget Pick," highlighting the trade-off.
* **Fast Shipping vs. Low Price:** If Product C is $\$50$ with next-day shipping and Product D is $\$40$ with 14-day shipping:
  - *AI Rule:* If user preferences prioritize shipping speed, select Product C. Else, default to Product D and flag Product C as "Fastest Delivery Alternative."

---

## 10. Clarification Engine Rules

The AI suspends recommendations and triggers a clarification modal in these instances:

1. **Ambiguous Budget Bounds:** The user asks for "a laptop," but no default category budget exists in preferences.
2. **Conflicting Priorities:** The query demands "premium gaming keyboard under $15$." The AI flags the conflict: *"Mechanical gaming keyboards usually start at $30$. Would you like me to look for membrane keyboards under $15$, or mechanical options starting at $30$?"*
3. **Missing Image Attributes:** An uploaded photo shows a generic cable but doesn't specify connector types.

---

## 11. Confidence Scoring System

Each recommendation has a confidence metric ($0\%\text{ to }100\%$):

* **Increases Confidence ($+$):**
  - Live seller trust score $>95\%$ ($+15\%$)
  - Verified review count $>500$ ($+15\%$)
  - Verified product category match ($+20\%$)
  - Cached price matches actual checkout value ($+10\%$)
* **Lowers Confidence ($-$):**
  - Fewer than 5 customer reviews ($-25\%$)
  - New seller account with zero ratings history ($-20\%$)
  - Conflicting specifications between marketplaces ($-15\%$)

---

## 12. Decision Report Schema

A decision report must be structured in the following priority order:

1. **Executive Summary:** A 2-sentence rationale for the top selection.
2. **Top Recommendation Card:** High-contrast layout showing price, confidence score, and storefront link.
3. **Semantic Trade-off Section:** Side-by-side comparison explaining why this choice beats alternatives.
4. **Alternatives:**
   - *Budget Pick:* Lowest priced functional equivalent.
   - *Speed Pick:* Fastest delivery variant.
5. **Pros & Cons:** Bullet lists generated from verified customer feedback.

---

## 13. Structured AI JSON Output Schema

Every internal reasoning step and final decision payload must conform to this schema:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "intent": {
      "type": "string",
      "enum": ["search", "chat", "image", "comparison", "clarify"]
    },
    "confidence_score": {
      "type": "integer",
      "minimum": 0,
      "maximum": 100
    },
    "clarification_required": {
      "type": "boolean"
    },
    "clarification_prompt": {
      "type": "string"
    },
    "clarification_options": {
      "type": "array",
      "items": { "type": "string" }
    },
    "recommendation": {
      "type": "object",
      "properties": {
        "product_name": { "type": "string" },
        "overall_score": { "type": "integer" },
        "summary": { "type": "string" },
        "pros": { "type": "array", "items": { "type": "string" } },
        "cons": { "type": "array", "items": { "type": "string" } },
        "tradeoffs": { "type": "string" }
      },
      "required": ["product_name", "overall_score", "summary"]
    },
    "alternatives": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": { "type": "string", "enum": ["budget", "speed", "quality"] },
          "product_name": { "type": "string" },
          "price": { "type": "number" },
          "reasoning": { "type": "string" }
        },
        "required": ["type", "product_name", "price", "reasoning"]
      }
    }
  },
  "required": ["intent", "confidence_score", "clarification_required"]
}
```

---

## 14. Error Recovery & Auto-Retries

To guarantee robust uptime during judges' evaluations, the AI engine uses state recovery strategies:

* **Scraper Blocking Recovery:** If scraping hits a CAPTCHA (HTTP 403) or rate limit (HTTP 429), it automatically routes queries through the `MarketplaceMockAdapter` and appends a warning banner to the response.
* **LLM JSON Schema Validation Failures:** If the model returns text that violates the JSON Schema:
  - The API intercepts the response.
  - It triggers a secondary parsing prompt using the invalid payload as input: *"Convert this text into valid JSON matching this schema: [Schema]"*.
  - If it fails twice, the system falls back to a safe pre-formatted error response instead of crashing the UI.

---

## 15. Future Tool-Calling Extensibility

The system isolates tool definitions from the core reasoning loop. If a developer adds a new tool (e.g. `check_price_drop_alerts`):
1. They define the new capability in the tool declaration array.
2. The AI uses the standard parameters structure to select the tool.
3. The response is mapped back to the engine input layer, leaving the core reasoning and ranking math unchanged.
