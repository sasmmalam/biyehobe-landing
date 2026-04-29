import { createClient, SupabaseClient } from "@supabase/supabase-js";

type Database = {
  public: {
    Tables: {
      waitlist: {
        Row: { id: string; email: string; created_at: string };
        Insert: { email: string; created_at?: string };
        Update: Partial<{ email: string; created_at: string }>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

/*
  Run once in Supabase SQL editor:

  CREATE TABLE waitlist (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text UNIQUE NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  );
  ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Anyone can join waitlist" ON waitlist FOR INSERT WITH CHECK (true);
*/

let _supabase: SupabaseClient<Database> | null = null;

export function getSupabase(): SupabaseClient<Database> {
  if (!_supabase) {
    _supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _supabase;
}

