-- ====================================================================
-- ATRIXIA POSTGRESQL DATABASE SCHEMA (v1.0)
-- Matches DATABASE_SCHEMA.md authoritative specs
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Preferences Table
CREATE TABLE IF NOT EXISTS public.preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    budget_min NUMERIC DEFAULT 0,
    budget_max NUMERIC DEFAULT 1000,
    currency TEXT DEFAULT 'USD',
    favorite_categories TEXT[] DEFAULT '{}',
    preferred_marketplaces TEXT[] DEFAULT '{}',
    preferred_brands TEXT[] DEFAULT '{}',
    prioritize_price BOOLEAN DEFAULT true,
    prioritize_quality BOOLEAN DEFAULT false,
    prioritize_shipping BOOLEAN DEFAULT false,
    prioritize_seller BOOLEAN DEFAULT false,
    prioritize_reviews BOOLEAN DEFAULT true,
    dark_mode BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Conversations Table
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Search Sessions Table
CREATE TABLE IF NOT EXISTS public.search_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,
    message_id UUID REFERENCES public.messages(id) ON DELETE SET NULL,
    query TEXT NOT NULL,
    search_type TEXT NOT NULL DEFAULT 'text' CHECK (search_type IN ('text', 'image')),
    image_url TEXT,
    status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Products Table (Normalized Catalog)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_name TEXT NOT NULL,
    normalized_name TEXT NOT NULL,
    brand TEXT,
    category TEXT,
    image_url TEXT,
    description TEXT,
    specifications JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Recommendations Table
CREATE TABLE IF NOT EXISTS public.recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    search_session_id UUID NOT NULL REFERENCES public.search_sessions(id) ON DELETE CASCADE,
    recommended_product_id UUID REFERENCES public.products(id) ON DELETE RESTRICT,
    confidence_score NUMERIC CHECK (confidence_score >= 0 AND confidence_score <= 100),
    recommendation_reason TEXT,
    tradeoffs TEXT,
    alternatives JSONB DEFAULT '[]'::jsonb,
    ai_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. Marketplace Results Table
CREATE TABLE IF NOT EXISTS public.marketplace_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    recommendation_id UUID REFERENCES public.recommendations(id) ON DELETE CASCADE,
    marketplace TEXT NOT NULL,
    listing_url TEXT NOT NULL,
    title TEXT NOT NULL,
    seller_name TEXT,
    seller_rating NUMERIC,
    price NUMERIC NOT NULL,
    currency TEXT DEFAULT 'USD',
    shipping_price NUMERIC DEFAULT 0,
    shipping_days INTEGER,
    product_rating NUMERIC,
    review_count INTEGER DEFAULT 0,
    availability BOOLEAN DEFAULT true,
    condition TEXT DEFAULT 'new',
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. Marketplace Cache Table
CREATE TABLE IF NOT EXISTS public.marketplace_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_hash TEXT NOT NULL UNIQUE,
    raw_results JSONB NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 11. Review Analysis Table
CREATE TABLE IF NOT EXISTS public.review_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    marketplace_result_id UUID NOT NULL REFERENCES public.marketplace_results(id) ON DELETE CASCADE,
    summary TEXT,
    positives TEXT[] DEFAULT '{}',
    negatives TEXT[] DEFAULT '{}',
    sentiment_score NUMERIC,
    authenticity_score NUMERIC,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. Seller Analysis Table
CREATE TABLE IF NOT EXISTS public.seller_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    marketplace_result_id UUID NOT NULL REFERENCES public.marketplace_results(id) ON DELETE CASCADE,
    trust_score NUMERIC,
    risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high')),
    reasoning TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 13. Saved Items Table
CREATE TABLE IF NOT EXISTS public.saved_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    recommendation_id UUID NOT NULL REFERENCES public.recommendations(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(profile_id, recommendation_id)
);

-- 14. Search History Table
CREATE TABLE IF NOT EXISTS public.search_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    search_session_id UUID NOT NULL REFERENCES public.search_sessions(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 15. Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ====================================================================
-- INDEXES
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_auth_user ON public.profiles(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_search_sessions_profile ON public.search_sessions(profile_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_profile ON public.conversations(profile_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id, created_at);
CREATE INDEX IF NOT EXISTS idx_recommendations_session ON public.recommendations(search_session_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_results_product ON public.marketplace_results(product_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_cache_hash ON public.marketplace_cache(query_hash);

-- ====================================================================
-- TRIGGERS FOR UPDATED_AT
-- ====================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_preferences_updated_at BEFORE UPDATE ON public.preferences FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_conversations_updated_at BEFORE UPDATE ON public.conversations FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ====================================================================
-- AUTOMATIC PROFILE & PREFERENCE CREATION TRIGGER ON AUTH SIGNUP
-- ====================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    new_profile_id UUID;
BEGIN
    INSERT INTO public.profiles (auth_user_id, full_name, email, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
        NEW.email,
        NEW.raw_user_meta_data->>'avatar_url'
    )
    RETURNING id INTO new_profile_id;

    INSERT INTO public.preferences (profile_id)
    VALUES (new_profile_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = auth_user_id);

-- Preferences Policies
CREATE POLICY "Users access own preferences" ON public.preferences FOR ALL TO authenticated
    USING (profile_id IN (SELECT id FROM public.profiles WHERE auth_user_id = auth.uid()))
    WITH CHECK (profile_id IN (SELECT id FROM public.profiles WHERE auth_user_id = auth.uid()));

-- Conversations Policies
CREATE POLICY "Users access own conversations" ON public.conversations FOR ALL TO authenticated
    USING (profile_id IN (SELECT id FROM public.profiles WHERE auth_user_id = auth.uid()))
    WITH CHECK (profile_id IN (SELECT id FROM public.profiles WHERE auth_user_id = auth.uid()));

-- Messages Policies
CREATE POLICY "Users access messages in own conversations" ON public.messages FOR ALL TO authenticated
    USING (conversation_id IN (SELECT c.id FROM public.conversations c JOIN public.profiles p ON c.profile_id = p.id WHERE p.auth_user_id = auth.uid()));

-- Search Sessions Policies
CREATE POLICY "Users access own search sessions" ON public.search_sessions FOR ALL TO authenticated
    USING (profile_id IN (SELECT id FROM public.profiles WHERE auth_user_id = auth.uid()));

-- Saved Items Policies
CREATE POLICY "Users access own saved items" ON public.saved_items FOR ALL TO authenticated
    USING (profile_id IN (SELECT id FROM public.profiles WHERE auth_user_id = auth.uid()));

-- Search History Policies
CREATE POLICY "Users access own search history" ON public.search_history FOR ALL TO authenticated
    USING (profile_id IN (SELECT id FROM public.profiles WHERE auth_user_id = auth.uid()));

-- Notifications Policies
CREATE POLICY "Users access own notifications" ON public.notifications FOR ALL TO authenticated
    USING (profile_id IN (SELECT id FROM public.profiles WHERE auth_user_id = auth.uid()));
