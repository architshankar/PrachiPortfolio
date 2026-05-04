
import { supabase } from "./supabase";

export const adminAuth = {
  async login(email: string, password: string): Promise<{ error: string | null }> {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { error: error.message };
    }
    return { error: null };
  },
  async checkSession(): Promise<boolean> {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  },
  async logout() {
    await supabase.auth.signOut();
  },
};
