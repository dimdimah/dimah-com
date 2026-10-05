-- ============================================================
-- SCHEMA DATABASE CMS PORTOFOLIO DIMAH-COM (SUPABASE POSTGRESQL)
-- ============================================================

-- 1. Table Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    description TEXT,
    cv_url TEXT DEFAULT '/admin.pdf',
    links JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Table Educations
CREATE TABLE IF NOT EXISTS public.educations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution TEXT NOT NULL,
    duration TEXT NOT NULL,
    description TEXT,
    url TEXT DEFAULT '/',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Table Skills
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,
    skills TEXT[] DEFAULT '{}',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Table Experiences
CREATE TABLE IF NOT EXISTS public.experiences (
    id TEXT PRIMARY KEY, -- Slug ID, misal: 'ufuk-hijau', 'arriyadh'
    institution TEXT NOT NULL,
    position TEXT NOT NULL,
    duration TEXT NOT NULL,
    type TEXT DEFAULT 'Work',
    tags TEXT[] DEFAULT '{}',
    responsibilities TEXT[] DEFAULT '{}',
    tools TEXT[] DEFAULT '{}',
    achievements TEXT[] DEFAULT '{}',
    url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Table Projects
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY, -- Slug ID, misal: 'sitrack', 'sisurat'
    title TEXT NOT NULL,
    role_tag TEXT,
    description TEXT,
    image TEXT,
    metrics TEXT,
    tags TEXT[] DEFAULT '{}',
    links JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Table Blog Posts
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    cover_image TEXT,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Table Inbox Messages (Contact Form)
CREATE TABLE IF NOT EXISTS public.inbox_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inbox_messages ENABLE ROW LEVEL SECURITY;

-- Public READ policies
CREATE POLICY "Allow public read for profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read for educations" ON public.educations FOR SELECT USING (true);
CREATE POLICY "Allow public read for skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public read for experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read for projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read for published posts" ON public.posts FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');

-- Public INSERT policy for contact messages
CREATE POLICY "Allow public insert for inbox_messages" ON public.inbox_messages FOR INSERT WITH CHECK (true);

-- Authenticated (Admin) FULL ACCESS policies
CREATE POLICY "Admin full access profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access educations" ON public.educations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access experiences" ON public.experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access posts" ON public.posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access inbox_messages" ON public.inbox_messages FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKETS SETUP (Public Media & Docs)
-- ============================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-docs', 'portfolio-docs', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Portfolio Media" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-media');
CREATE POLICY "Admin Upload Portfolio Media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');
CREATE POLICY "Admin Update/Delete Portfolio Media" ON storage.objects FOR ALL USING (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');

CREATE POLICY "Public Read Portfolio Docs" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-docs');
CREATE POLICY "Admin Upload Portfolio Docs" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-docs' AND auth.role() = 'authenticated');
CREATE POLICY "Admin Update/Delete Portfolio Docs" ON storage.objects FOR ALL USING (bucket_id = 'portfolio-docs' AND auth.role() = 'authenticated');
