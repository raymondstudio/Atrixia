# Atrixia: Autonomous AI Shopping Decision Agent

[![Gemma 4 Hackathon Entry](https://img.shields.io/badge/Gemma_4_Hackathon-Google_AI_Studio-blueviolet)](https://github.com/raymondstudio/Atrixia)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Shop Smarter. Decide Faster. One intelligent recommendation backed by transparent reasoning instead of hours spent comparing fragmented listings.

---

## 📖 Executive Summary

### Elevator Pitch
Atrixia is an autonomous AI Shopping Agent that researches products across multiple online marketplaces, analyzes user reviews, and evaluates pricing, shipping, authenticity, and seller trust. Rather than presenting users with a list of identical products, Atrixia returns one personalized recommendation backed by a transparent trade-off analysis.

### The Problem
Online shopping has become fragmented and time-consuming. Consumers switch between Amazon, eBay, Jumia, and other stores to locate the best value, but they must manually determine:
* Is this seller trustworthy?
* Are the reviews authentic?
* Does a lower price justify weeks of shipping latency?

Basic price comparison tools merely sort listings by cost, providing no context, which leads to decision fatigue.

### The Solution
Atrixia shifts online shopping from keyword search to decision intelligence. By running scraped listings through a multi-criteria ranking model and utilizing Gemini/Gemma LLMs for review sentiment parsing, Atrixia balances shipping speed, pricing, and safety to generate a single Decision Report containing a primary recommendation and key alternatives.

---

## 🛠 Technology Stack

* **Frontend:** Next.js 15 (App Router, Server Components & Client Components)
* **Styling & Components:** Tailwind CSS, shadcn/ui, Framer Motion
* **Database & Auth:** Supabase PostgreSQL, Supabase Auth (PKCE Flow), Row Level Security (RLS)
* **AI Runtime:** Vercel AI SDK, Gemini 2.5 Pro/Flash (Google AI Studio), Gemma 2/4 (Ollama/Groq)
* **Hosting:** Vercel Edge Runtime

---

## 📐 Architecture Overview

Atrixia is designed as a modular, provider-agnostic platform. Business logic is isolated from UI presentation layers and third-party API dependencies:

```
┌────────────────────────────────────────────────────────┐
│                   Next.js Frontend                     │
│    (Server Components & Client Conversational Shell)   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                   Next.js API Routes                   │
│         (Server-Sent Events reasoning streams)         │
└──────────────────────────┬─────────────────────────────┘
                           │
         ┌─────────────────┴─────────────────┐
         ▼                                   ▼
┌──────────────────┐               ┌──────────────────┐
│  AI Engine Layer │               │ Marketplace Layer│
│  (Gemini/Gemma)  │               │ (Amazon/eBay/etc)│
└────────┬─────────┘               └────────┬─────────┘
         │                                   │
         └─────────────────┬─────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│                   Supabase PostgreSQL                  │
│       (RLS Tables: Cache, Profiles, Preferences)       │
└────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
Atrixia/
├── app/                      # Next.js App Router
│   ├── (auth)/               # Login & Onboarding setup wizard
│   ├── (dashboard)/          # Dashboard, Profile, History, Saved
│   ├── api/                  # API Route Handlers (/api/search, /api/chat)
│   └── layout.tsx            # Global providers & Auth context
├── components/               # UI components categorized by feature
│   ├── ui/                   # Shadcn primitives
│   ├── search/               # Conversational AI input controls
│   └── recommendation/       # Decision Report views
├── docs/                     # Source-of-truth project documentation
│   ├── PRODUCT_BLUEPRINT.md  # Core requirements
│   ├── SYSTEM_ARCHITECTURE.md# System layouts
│   ├── DATABASE_SCHEMA.md   # Schema & RLS specs
│   ├── API_SPECIFICATION.md  # Endpoint details
│   ├── AI_WORKFLOW.md        # Intelligence specs
│   └── MVP_SCOPE.md          # Hackathon bounds
├── lib/                      # Supabase client & utility helpers
├── public/                   # Static assets & icons
└── README.md                 # Entry documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js 18+ and PostgreSQL (or a Supabase account) installed.

### 2. Environment Configuration
Clone the repository and create a `.env.local` file in the root directory:

```bash
# Next.js Public Vars
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Private Server API Keys
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=your_google_ai_studio_api_key

# Scraping API Keys (Optional, falls back to Mock if missing)
PROXY_SCRAPER_API_KEY=your_proxy_key
```

### 3. Database Migrations Setup
Run the following SQL commands in your Supabase SQL Editor to establish tables, triggers, and Row Level Security (RLS) policies:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users(id) on delete cascade unique,
  full_name text not null,
  email text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Preferences table
create table public.preferences (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade unique,
  budget_min numeric default 0,
  budget_max numeric default 1000,
  currency text default 'USD',
  prioritize_price boolean default true,
  prioritize_quality boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.preferences enable row level security;

-- Policies
create policy "Allow public read access to profiles" on public.profiles for select using (true);
create policy "Allow users to update own profile" on public.profiles for update using (auth.uid() = auth_user_id);
```

### 4. Installation
Install project dependencies:

```bash
npm install
```

### 5. Running Locally
Run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Development & Build Workflows

### Run Linting
Verify code compliance and format styling:
```bash
npm run lint
```

### Production Build Validation
Ensure the application compiles without TypeScript or build issues:
```bash
npm run build
```

---

## 📸 Screenshots

*(Screenshots will be added upon completing core frontend milestone deployments)*

---

## 🎥 Demo Video

*(Demo video placeholder - 3-minute Devpost video link will be added before final submission)*

---

## 🗺 Future Roadmap

* **Universal Checkout:** Single-click transactions bypassing original marketplace checkouts.
* **Price Drop Alerts:** Automated email notifications triggered by database cache changes.
* **Browser Extension:** Inline shopping assistant overlay during Amazon or eBay browsing sessions.

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

## 🙏 Acknowledgements

* Google DeepMind for the Gemma 4 Hackathon opportunity.
* Vercel AI SDK team for progressive streaming templates.
* Supabase for secure backend authentication utilities.
