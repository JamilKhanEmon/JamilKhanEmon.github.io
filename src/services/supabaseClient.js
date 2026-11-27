import {createClient} from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.REACT_APP_SUPABASE_URL || "";
const SUPABASE_ANON_KEY =
  process.env.REACT_APP_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

/**
 * Fetches live portfolio JSON from Supabase `portfolio_data` table (id = 'main').
 * Returns null if Supabase is not configured or no row exists yet.
 */
export async function fetchPortfolioData() {
  if (!supabase) return null;
  const {data, error} = await supabase
    .from("portfolio_data")
    .select("data")
    .eq("id", "main")
    .maybeSingle();

  if (error) {
    console.warn("Supabase fetchPortfolioData warning:", error.message);
    return null;
  }
  return data && data.data ? data.data : null;
}

/**
 * Upserts the portfolio JSON into Supabase `portfolio_data` table (authenticated admin only).
 */
export async function savePortfolioData(payload) {
  if (!supabase) {
    throw new Error("Supabase is not configured. See SUPABASE_SETUP.md.");
  }
  const {error} = await supabase.from("portfolio_data").upsert({
    id: "main",
    data: payload,
    updated_at: new Date().toISOString()
  });

  if (error) {
    throw error;
  }
}

/**
 * Uploads an image file to the public `portfolio-assets` bucket and returns its public URL.
 */
export async function uploadPortfolioAsset(file, folder = "uploads") {
  if (!supabase) {
    throw new Error("Supabase is not configured. See SUPABASE_SETUP.md.");
  }
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = `${folder}/${Date.now()}_${safeName}`;

  const {error: uploadError} = await supabase.storage
    .from("portfolio-assets")
    .upload(filePath, file, {upsert: true});

  if (uploadError) {
    throw uploadError;
  }

  const {data} = supabase.storage
    .from("portfolio-assets")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
