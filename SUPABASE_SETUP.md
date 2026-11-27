# Supabase Dynamic Admin Panel Setup (Option 1)

Your portfolio has a protected **Admin Dashboard** at `#/admin` (`https://jamilkhanemon.github.io/#/admin`).
Until Supabase is connected, the site automatically uses `src/portfolio.js` as its fallback.

## 1. Create a Free Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Open **SQL Editor** and run this SQL once:

```sql
-- 1. Portfolio JSON store (single row id = 'main')
create table if not exists public.portfolio_data (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

alter table public.portfolio_data enable row level security;

-- Public visitors can read portfolio data
create policy "Public read portfolio_data"
  on public.portfolio_data for select
  using (true);

-- Only signed-in admin user can insert/update
create policy "Admin write portfolio_data"
  on public.portfolio_data for all
  to authenticated
  using (true)
  with check (true);

-- 2. Public storage bucket for uploaded project/publication images
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

create policy "Public read portfolio-assets"
  on storage.objects for select
  using (bucket_id = 'portfolio-assets');

create policy "Admin upload portfolio-assets"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio-assets');
```

## 2. Create Your Admin Login (Email + Password)
1. In Supabase Dashboard, go to **Authentication → Users → Add user → Create new user**.
2. Enter your email (`jamilkhanemon@gmail.com`) and a strong password, and check **Auto Confirm User**.

## 3. Connect Your Keys
Add these two variables to your `.env` file locally (and to GitHub Repository **Settings → Secrets and variables → Actions** if using GitHub Actions):

```env
REACT_APP_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
REACT_APP_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Then rebuild/deploy (`npm run build` / `npm run deploy`), open `https://jamilkhanemon.github.io/#/admin`, and log in with your email & password!
