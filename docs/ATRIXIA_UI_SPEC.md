# ATRIXIA UI/UX SPECIFICATION v1.0

**Project:** Atrixia

**Version:** 1.0

**Document Type:** UI/UX Specification

**Status:** Approved for Development

---

# Design Tokens

## Color Palette (Premium Dark Mode)
* **Background:** `hsl(240, 10%, 3.9%)` (Deep midnight black)
* **Card/Surface:** `hsl(240, 10%, 6%)` with `backdrop-filter: blur(12px)` and solid border `rgba(255,255,255,0.08)`
* **Primary Accent:** `hsl(263.4, 70%, 50.4%)` (Vibrant electric violet)
* **Secondary Glow:** `hsl(190, 95%, 45%)` (Cyan)
* **Text High-contrast:** `hsl(0, 0%, 98%)`
* **Text Muted:** `hsl(240, 5%, 64.9%)`

## Typography
* **Sans-serif:** `Outfit`, `Inter` (dynamic, premium geometry)
* **Monospace:** `JetBrains Mono` (for code snippets, confidence scores, and raw metrics)

---

# Design Philosophy

Atrixia should not feel like a shopping website.

It should feel like an intelligent AI workspace.

Users should immediately feel that they're talking to an expert that understands shopping—not browsing through another marketplace.

Every screen should communicate:

* Simplicity
* Intelligence
* Trust
* Speed
* Premium Quality

---

# Design Principles

## 1. AI First

The AI is always the primary interface.

Products are secondary.

---

## 2. Minimal Interface

Avoid clutter.

Every element should have a purpose.

---

## 3. Premium Feel

Use generous whitespace.

Smooth animations.

Large typography.

Rounded components.

Soft shadows.

Glass effects only where appropriate.

---

## 4. Explain Before Selling

Every recommendation explains itself.

No black-box decisions.

---

## 5. Mobile First

Every screen must feel native on mobile before desktop adaptations.

---

# User Journey

Landing

↓

Authentication

↓

Home

↓

Search / Upload Image

↓

AI Clarification

↓

Marketplace Research

↓

Decision Report

↓

Marketplace Redirect

↓

History

---

# Navigation Structure

Desktop

Sidebar

* Home
* Search
* History
* Saved
* Profile
* Settings

Top Bar

* Search
* Notifications
* Profile

---

Mobile

Bottom Navigation

* Home
* Search
* Saved
* History
* Profile

Floating AI Search Button

---

# Landing Page

## Hero Section

Large headline

> Shop Smarter. Decide Faster.

Subheading

Atrixia researches products across multiple marketplaces and recommends the best option with transparent AI reasoning.

Primary CTA

Start Shopping

Secondary CTA

Watch Demo

Hero Illustration

AI analyzing products across marketplaces.

---

## Features Section

Three feature cards.

### AI Decision Engine

Not just search.

AI explains every recommendation.

---

### Image Search

Upload a photo.

Find matching products instantly.

---

### Buy with Confidence

See prices, reviews, shipping, trust scores, and AI reasoning in one place.

---

## How It Works

Step 1

Search or upload a product.

↓

Step 2

AI researches the market.

↓

Step 3

Receive a personalized recommendation.

---

## Footer

Company

Privacy

Terms

GitHub

Contact

---

# Authentication

## Login

Email

Password

Remember Me

Login Button

Continue with Google

Forgot Password

Sign Up Link

---

## Sign Up

Full Name

Email

Password

Confirm Password

Continue with Google

Create Account

---

# Home Screen

The Home Screen is intentionally clean.

---

## Greeting

Good Morning, Raymond

Ready to find your next purchase?

---

## AI Search Box

Large centered input.

Placeholder

"What are you looking for today?"

Microphone icon

Upload Image icon

Search Button

---

## Suggested Prompts

Find me the best laptop under $800

Compare gaming chairs

Find this product cheaper

Recommend a phone for photography

---

## Recent Searches

Horizontal scroll cards.

---

## Trending Categories

Electronics

Fashion

Home

Gaming

Office

Beauty

---

# AI Search Experience

The experience is conversational.

Not a traditional search page.

---

## User Message

Displayed as chat bubble.

---

## AI Thinking

Animated progressive indicator showing multi-step reasoning:
1. `[Pulse]` *Deconstructing search parameters and intent...*
2. `[Check]` *Initiating API and scraper queries across eBay, Walmart, and Amazon...*
3. `[Check]` *Deduplicating candidate marketplace listings...*
4. `[Pulse]` *Extracting user reviews for sentiment and reliability...*
5. `[Check]` *Compiling recommendation decision report...*

---

## Clarification Questions

Examples

What's your budget?

Preferred color?

Any preferred brands?

Fast shipping or lowest price?

New or refurbished?

---

# Search Results

Split into sections.

---

## AI Recommendation Card

Large highlighted card.

Contains

Recommended Product

Confidence Score

Reason

Best For

Trade-offs

Buy Button

---

## Marketplace Comparison

Grid of marketplace cards.

Each card contains

Product Image

Marketplace Logo

Title

Price

Shipping

Seller Rating

Trust Score

Buy Button

---

## Filters

Price

Rating

Shipping

Marketplace

Condition

Brand

Delivery Time

---

## Sorting

Best Match

Lowest Price

Highest Rated

Fastest Shipping

AI Recommended

---

# Decision Report

This is the hero screen.

---

## Header

AI Recommendation

Confidence Score

Overall Score

---

## Summary

One paragraph explaining the recommendation.

---

## Pros

Bullet list.

---

## Cons

Bullet list.

---

## Trade-Off Analysis

Explain why competing listings were not selected.

---

## Review Summary

AI-generated summary of customer feedback.

---

## Best Alternatives

Three alternative recommendations.

Each includes

Reason

Marketplace

Price

---

## CTA

Buy from Marketplace

---

# Image Search

Upload Area

Drag & Drop

Camera

Gallery

Paste Image

---

After upload

Preview Image

Remove Button

Analyze Button

---

Analysis Animation

Identifying product...

Searching marketplaces...

Matching similar products...

---

# Saved Items

Grid layout.

Each card

Image

Title

Recommendation Score

Saved Date

Open Report

---

# History

Timeline layout.

Shows

Search

Date

Recommendation

Marketplace

Open Again

---

# Profile

Avatar

Name

Email

Shopping Preferences

---

## Shopping Preferences

Budget Range

Favorite Categories

Preferred Stores

Preferred Brands

Fast Shipping Priority

Lowest Price Priority

Quality Priority

---

# Settings

Appearance

Notifications

Privacy

Language

AI Preferences

Logout

---

# Empty States

Home

"No searches yet."

History

"No previous recommendations."

Saved

"You haven't saved anything."

Search

"Start by asking Atrixia a question."

---

# Loading States

Skeleton Cards

Animated Search

Marketplace Loading

Image Placeholder

AI Thinking Animation

---

# Error States

Network Error

Marketplace Unavailable

Image Not Recognized

No Results

AI Timeout

Each error includes

Friendly explanation

Retry Button

---

# Notification System

Recommendation Ready

Saved Successfully

Search Failed

Preference Updated

---

# Responsive Behavior

## Mobile

Single column

Bottom navigation

Floating search

Large touch targets

---

## Tablet

Two-column layout

Collapsible sidebar

---

## Desktop

Three-column layout

Sidebar

Main AI Conversation

Recommendation Panel

---

# Component Library

Buttons

Primary

Secondary

Ghost

Icon

Danger

---

Inputs

Search

Text

Password

Dropdown

Checkbox

Slider

---

Cards

Marketplace Card

Recommendation Card

History Card

Saved Card

Feature Card

---

Badges

AI Recommended

Best Value

Fast Shipping

Trusted Seller

Budget Pick

Premium Choice

---

Dialogs

Confirmation

Delete

Preference Update

Image Preview

---

Tooltips

Marketplace explanation

Confidence explanation

Trust score explanation

---

# Icons

Home

Search

Upload

Camera

History

Bookmark

Profile

Settings

Arrow

AI Spark

Shopping Bag

Star

Shield

Lightning

---

# Motion Design

Hover Lift

Button Scale

Fade In

Slide Up

Card Expansion

Page Transition

Skeleton Fade

Smooth Scrolling

AI Thinking Animation

Typing Animation

Image Upload Animation

Marketplace Loading Animation

---

# Typography Specs

* **Hero Headers:** `Outfit`, 40px/2.5rem, Line-height: 1.2, Tracking: `-0.02em`, Weight: 700.
* **Section Titles:** `Outfit`, 24px/1.5rem, Line-height: 1.3, Weight: 600.
* **Card Titles:** `Inter`, 16px/1rem, Line-height: 1.4, Weight: 600.
* **Body Text:** `Inter`, 14px/0.875rem, Line-height: 1.6, Weight: 400.
* **Metrics/Codes:** `JetBrains Mono`, 12px/0.75rem, Weight: 500.

---

# Spacing & Layout

* **Base Unit:** 8px system. Use standard tailwind spacers: `p-2` (8px), `p-4` (16px), `p-6` (24px), `p-8` (32px).
* **Container Bounds:** Desktop width capped at `max-w-7xl` (1280px) with `px-6` (24px) gutters.
* **Card Grid:** Responsive grid using auto-fit: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.

---

# Color Palette Mappings

* **Surface Base:** `background` base class using `bg-[#09090b]` (deep slate black).
* **Elevated Surfaces:** Glassmorphic navigation elements use `bg-[#0f0f12]/80` with `backdrop-blur-md` and `border-[rgba(255,255,255,0.08)]`.
* **System Accents:**
  - **Success / Best Value:** `hsl(142.1, 70.6%, 45.3%)` (emerald green)
  - **Warning / Trade-offs:** `hsl(47.9, 95.8%, 53.1%)` (amber yellow)
  - **Error / Low Confidence:** `hsl(0, 84.2%, 60.2%)` (soft red)
  - **Premium Accents:** `hsl(263.4, 70%, 50.4%)` (electric violet)

---

# Accessibility & Keyboard Support

* **Keyboard Navigation Tabindex:** All custom marketplace cards and product recommendations must have `tabindex="0"`.
* **Focus States:** Interacting with keyboard must trigger a high-contrast focus ring: `focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]`.
* **Contrast Compliance:** Muted texts (`text-zinc-400`) must exceed WCAG 2.1 AA contrast ratio (> 4.5:1) against the dark surface background.
* **ARIA Roles:**
  - Custom tabs must use `role="tablist"`, `role="tab"`, and `aria-selected="true/false"`.
  - Image upload dropzone must have `aria-label="Upload product screenshot or photo"`.
  - Loading skeleton panels must define `aria-busy="true"`.

---

# Microinteractions

Button hover animations

Bookmark animation

Image upload success animation

Recommendation reveal animation

Marketplace card hover

Confidence score animation

Progress indicator during AI reasoning

---

# Demo Experience

The demo should tell a story.

User uploads a product image.

↓

Atrixia identifies the product.

↓

AI asks one or two intelligent follow-up questions.

↓

Marketplace research begins.

↓

AI visibly analyzes reviews, pricing, shipping, and seller quality.

↓

The Decision Report appears with a clear recommendation, confidence score, trade-offs, and alternatives.

↓

User clicks **Buy on Marketplace**.

The experience should feel less like searching and more like receiving expert advice from an intelligent shopping consultant.
