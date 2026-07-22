# ATRIXIA PRODUCT BLUEPRINT v1.0

### Internal Product Requirements Document (PRD) & Technical Design Document (TDD)

**Project Name:** Atrixia

**Version:** 1.0

**Status:** Pre-Development

**Category:** Apps for Your Life

**Hackathon:** Gemma 4 Hackathon

---

# Confidential

This document serves as the internal source of truth for Atrixia. Every product, engineering, design, and AI decision must align with the specifications defined here.

---

# Executive Summary

## Vision

Create the world's most intelligent AI Shopping Agent that helps people make confident purchasing decisions instead of wasting hours comparing products across multiple marketplaces.

Rather than acting as another search engine, Atrixia acts as an intelligent shopping companion that researches products, evaluates trade-offs, understands user preferences, and recommends the best purchasing decision.

---

## Mission

Empower every online shopper to make smarter buying decisions through AI-powered reasoning, transparency, and personalized recommendations.

---

## Elevator Pitch

Atrixia is an AI Shopping Agent that researches products across multiple online marketplaces, analyzes reviews, evaluates pricing, shipping, authenticity, and seller trust, then explains which option is the best for you and why.

Instead of comparing hundreds of listings manually, users receive one intelligent recommendation backed by transparent reasoning.

---

# Problem Statement

Online shopping has become increasingly fragmented.

Consumers often spend significant time switching between marketplaces such as Amazon, eBay, Jumia, Alibaba, AliExpress, Walmart, Etsy, and Temu trying to answer questions like:

* Which listing is actually authentic?
* Which seller is trustworthy?
* Is the cheapest option worth buying?
* Is paying more actually better?
* Which option offers the best value?

Current comparison tools primarily sort products by price.

They rarely explain why one listing is better than another.

As a result, shoppers make decisions based on incomplete information.

---

# Our Solution

Atrixia transforms online shopping from searching into decision making.

Instead of presenting users with dozens of similar products, Atrixia researches the available options and generates a personalized recommendation based on:

* User preferences
* Product quality
* Review sentiment
* Seller reliability
* Shipping speed
* Price
* Return policy
* Overall value

Every recommendation includes an explanation that users can understand and trust.

---

# Product Positioning

Atrixia is **not**:

* A marketplace
* A shopping website
* A search engine
* A price comparison website

Atrixia **is**:

An AI Shopping Decision Agent.

---

# Core Value Proposition

Instead of asking:

> "Where is this cheapest?"

Users ask:

> "What should I buy?"

---

# Target Audience

Primary Users

* Online shoppers
* Students
* Professionals
* Families
* Budget-conscious buyers
* Tech enthusiasts

Secondary Users

* Small businesses
* Frequent online shoppers
* Gift shoppers
* Interior designers
* Travelers

---

# User Personas

## Persona 1

University Student

Needs affordable products.

Has limited budget.

Wants best value.

---

## Persona 2

Busy Professional

Values time over price.

Prefers trusted sellers.

Needs fast shipping.

---

## Persona 3

Tech Enthusiast

Researches products extensively.

Reads reviews.

Compares specifications.

---

# User Stories

As a user,

I want to upload an image of a product

So that Atrixia can identify it.

---

As a user,

I want Atrixia to compare listings

So I don't have to visit multiple stores.

---

As a user,

I want AI to explain why one product is better

So I can trust my purchase.

---

As a user,

I want recommendations based on my preferences

So I spend less time researching.

---

# Product Philosophy

Search engines return results.

Atrixia returns decisions.

---

# Product Principles

1. AI First

Every major feature should leverage AI reasoning.

---

2. Explain Everything

Every recommendation must include an explanation.

---

3. Save Time

Reduce shopping research from hours to minutes.

---

4. Trust Before Price

Never recommend a product solely because it is the cheapest.

---

5. Confidence Over Quantity

Five high-quality recommendations are better than five hundred listings.

---

# MVP Scope

The MVP includes only features that directly contribute to the core AI shopping experience.

---

## Authentication & Onboarding

* **Secure PKCE Authentication:** Email/Password & Google OAuth handled client-side using Supabase.
* **Onboarding Personalization Wizard:**
  - Multi-step configuration upon first sign-in.
  - Form fields: Preferred Currency (USD, EUR, GBP, NGN), Default Budget Range per category, Prioritization weights (slider scale for Price, Quality, Shipping Speed, and Seller Trust), and Favorite Marketplaces.
  - Preference persistence to the `preferences` table.

---

## Home

* Search Bar
* Upload Image
* Recent Searches
* Suggested Searches

---

## AI Chat

Conversational shopping assistant.

Examples:

"I need headphones under $100."

"Find me the best gaming mouse."

"I'm looking for a backpack for university."

---

## Image Search

Users upload:

* Screenshot
* Camera Photo
* Product Image

AI identifies:

* Product
* Brand
* Category
* Similar Items

---

## Marketplace Results

Display listings from multiple marketplaces.

Each listing includes:

* Image
* Price
* Rating
* Seller
* Shipping
* Store

---

## AI Recommendation

This is the core feature.

Atrixia generates:

Recommended Product

Reasoning

Trade-offs

Alternative Choice

Confidence Score

---

## Decision Report

Every recommendation includes:

Overall Score

Best Value

Best Budget

Best Premium

Fastest Shipping

Highest Trust

AI Explanation

---

## Buy Button

Redirect user to original marketplace.

No checkout.

No payment handling.

---

# Features Excluded From MVP

* Universal checkout
* Logistics
* Payment gateway
* Order tracking
* Affiliate program
* Price history
* Browser extension
* Wishlist
* Social shopping

These remain future roadmap items.

---

# AI Responsibilities

The AI is responsible for:

Understanding search intent

Identifying uploaded products

Understanding user preferences

Comparing listings

Summarizing reviews

Detecting trade-offs

Ranking products

Explaining recommendations

Answering follow-up questions

---

# AI Reasoning Pipeline & Exception Workflows

```
      User Input (Text/Image)
                 │
                 ▼
          Intent Detection ───────► [Edge: Contradictory Input/Preferences?] ──► Clarify
                 │
                 ▼
         Marketplace Search ──────► [Edge: Zero Results?] ────────────────────► Mock/Fallback API
                 │
                 ▼
      Data Collection & Cache
                 │
                 ▼
       Product Normalization
                 │
                 ▼
         Review Analysis
                 │
                 ▼
         Seller Analysis
                 │
                 ▼
       Trade-off Evaluation
                 │
                 ▼
      Recommendation Generation
                 │
                 ▼
           Decision Report
```

### 1. Handling Conflicting User Preferences
When user inputs contradict their saved preferences (e.g., asking for a "highly durable leather bag" with a budget override of "$10" while prioritizing premium quality):
- **Detection:** The AI compares active query parameters against user preference states.
- **Resolution:** Rather than failing or returning poor-quality results, the AI halts the pipeline to present a clarifying conversational choice: *"I see you are looking for high durability, but the $10 budget limit restricts options to synthetic materials. Would you like to view the highest-rated option at $35, or find synthetic bags under $10?"*

### 2. Handling Uncertainty & Ambiguous Queries
- **Threshold:** If the search intent confidence score drops below 70% (e.g., "something cool for my study room"), the system triggers a clarification prompt sequence to narrow the scope.
- **Interactive Prompts:** Dynamic option buttons are returned (e.g., "Lighting", "Desk Organization", "Wall Decor") to keep the interface highly conversational and low-friction.

### 3. Handling Zero Marketplace Results
- **Fallback Adapter Strategy:** If external scraping returns empty lists due to strict queries or service outages:
  1. The system drops secondary query terms (e.g. searching for "original blue leather case model X" falls back to "leather case model X").
  2. If still empty, it serves related categories while clearly displaying a warning banner: *"We couldn't find matching live listings for your exact query. Here are similar items or popular alternatives."*

---

# AI Principles & Guarantees

* **No Unexplained Recommendations:** The AI must generate a structured JSON object detailing specific pros, cons, and confidence scores based on scraped review tokens.
* **Trade-off Highlight Constraint:** The AI must explicitly contrast the recommended option with the lowest-priced and fastest-shipping alternatives.
* **Acknowledge Uncertainty:** If the confidence score is below 60%, the report must contain a prominent warning explaining the missing metrics (e.g., "Insufficient seller ratings" or "Lack of verified reviews").

---

# Confidence Score

Each recommendation includes:

AI Confidence

0–100%

Factors:

Data completeness

Review quality

Seller reputation

Price consistency

Product similarity

---

# Explainability

Every recommendation should answer:

Why was this selected?

What are the trade-offs?

What alternatives exist?

Who is this best for?

---

# Design Philosophy

Minimal.

Elegant.

Modern.

Premium.

The interface should feel closer to ChatGPT than Amazon.

---

# Brand Personality

Helpful

Honest

Confident

Transparent

Professional

Calm

---

# Color Palette

Primary

Deep Black

Pure White

Neutral Gray

Accent

Electric Blue

Emerald Green

---

# Typography

Modern Sans Serif

Clean hierarchy

Large headings

Comfortable spacing

---

# Navigation

Home

Search

AI Chat

History

Profile

---

# Pages

Landing

Authentication

Home

Search Results

AI Decision Report

History

Settings

Profile

---

# Homepage

Hero Search

Upload Image

Suggested Prompts

Recent Searches

---

# Search Experience

Search feels conversational.

Instead of returning products immediately,

Atrixia asks intelligent follow-up questions when necessary.

Example

"I need a laptop."

↓

Budget?

↓

Programming or Gaming?

↓

Preferred screen size?

↓

Battery or Performance?

↓

Recommendation

---

# Search Results

Each product card includes:

Image

Title

Marketplace

Price

Shipping

Seller

Rating

Trust Score

Buy Button

---

# Decision Report

The most important screen.

Contains:

AI Recommendation

Confidence Score

Pros

Cons

Trade-offs

Alternative Products

Review Summary

Reasoning

---

# Tech Stack

Frontend

Next.js

React

TypeScript

Tailwind CSS

shadcn/ui

Backend

Next.js Route Handlers

Database

Supabase PostgreSQL

Authentication

Supabase Auth

Storage

Supabase Storage

Hosting

Vercel

AI Runtime

Gemini 2.5 Flash/Pro (Google AI Studio) & Gemma 2/4 (via Ollama or Groq/Vertex AI)

Architecture designed to support future OpenAI integration with minimal changes.

---

# System Architecture

Client

↓

API

↓

AI Provider Layer

↓

Marketplace Search Layer

↓

Recommendation Engine

↓

Supabase

---

# Database

Users

Searches

Preferences

Conversations

Products

Recommendations

History

---

# API Endpoints

POST /api/search

POST /api/chat

POST /api/image-search

GET /api/history

POST /api/preferences

GET /api/recommendation

---

# Engineering Principles

Reusable components.

Strong typing.

Modular architecture.

Provider abstraction.

Server-side security.

Fast performance.

---

# Folder Structure

app/

components/

features/

lib/

services/

hooks/

types/

utils/

public/

docs/

---

# Performance Goals

Search Response

<5 seconds

Page Load

<2 seconds

Mobile First

Fully Responsive

Accessibility

WCAG AA where practical

---

# Development Roadmap

## Phase 1

Foundation

Authentication

Layout

Navigation

Design System

---

## Phase 2

AI Chat

Search

Image Upload

Marketplace Layer

---

## Phase 3

Recommendation Engine

Decision Report

History

Preferences

---

## Phase 4

Polish

Animations

Error Handling

Responsive Fixes

Loading States

Empty States

---

## Phase 5

Submission

README

Demo Video

Architecture Diagram

Screenshots

Devpost Submission

---

# Success Metrics

Primary

Users reach a confident buying decision in less than five minutes.

Secondary

Reduced research time.

Clear AI explanations.

Positive demo experience.

---

# Future Roadmap

Price Alerts

Affiliate Revenue

Browser Extension

Shopping Lists

Group Shopping

AI Gift Finder

Room Recreation from Images

Outfit Builder

Cross-border Shopping

Import Tax Estimator

Voice Shopping Agent

Multi-language Support

Personal Shopping Memory

---

# Risks

Marketplace API limitations

Incomplete product data

Rate limits

AI hallucinations

Image ambiguity

---

# Mitigation

Use provider abstraction.

Validate product information before recommendation.

Clearly communicate confidence scores.

Gracefully handle unavailable data.

---

# Why AI Is Essential

Without AI, Atrixia becomes another comparison website.

AI is required to:

Understand user intent.

Interpret uploaded images.

Ask clarifying questions.

Analyze reviews.

Evaluate trade-offs.

Generate personalized recommendations.

Explain decisions.

Build trust.

The intelligence of the recommendation—not the product listing—is Atrixia's core innovation.

---

# Competitive Positioning

Traditional marketplaces help users **find products**.

Atrixia helps users **make decisions**.

### AI Chat & Reasoning Thread Integration
To support natural conversational follow-up questions, the AI session is designed as a structured thread. Every new search query initializes a `conversation_id`. Follow-up clarification questions, user inputs, and progressive search results are tracked via the `messages` table, linking each recommendation back to the exact dialog exchange.

### Marketplace Scraper Resiliency & Fallback
To guarantee demo stability, the marketplace querying layer utilizes a proxy-backed `MarketplaceAdapter` with an automatic fallback to a local mock database. If live scraping encounters rate limiting or CAPTCHAs, the UI transparently reports the state and presents high-fidelity simulated listings to ensure uninterrupted product demos.

That distinction defines every product, design, and engineering decision.

---

# Demo Flow (3 Minutes)

1. Introduce the problem of fragmented online shopping.
2. Show searching with natural language.
3. Demonstrate image upload and product recognition.
4. Show Atrixia asking clarifying questions.
5. Display normalized marketplace results.
6. Reveal the AI Decision Report with confidence score, reasoning, and trade-offs.
7. Open a product on the original marketplace.
8. Close with the vision of AI-powered purchasing decisions.

---

# Decision Log

### Decision #001

**Use an AI Shopping Agent instead of a price comparison engine.**

Reason:
Reasoning and personalized recommendations provide stronger differentiation than basic price comparison.

---

### Decision #002

**Redirect purchases to the original marketplace instead of implementing universal checkout.**

Reason:
Keeps the MVP focused, avoids marketplace integration complexity, and allows development time to be invested in AI capabilities.

---

### Decision #003

**Prioritize explanation over recommendation.**

Reason:
Users are more likely to trust AI when they understand why a decision was made.

---

### Decision #004

**Design around an AI provider abstraction.**

Reason:
Allows the application to switch between providers (e.g., Gemini during the hackathon and OpenAI in the future) without major architectural changes.

---

# Final Statement

Atrixia is not trying to replace online marketplaces.

It is building the intelligence layer that has always been missing from online shopping.

The future of shopping is not searching through hundreds of products.

The future of shopping is asking one question, receiving one well-reasoned answer, understanding why it was recommended, and buying with confidence.
