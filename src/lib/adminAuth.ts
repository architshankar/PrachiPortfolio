// NOTE: This is a client-only password gate. It is NOT real security —
// the password lives in the bundle and anyone with browser dev tools can read it.
// Since we're using localStorage-only mode, this is the best we can do client-side.
// To get real protection, enable Lovable Cloud and store the password as a secret.

const PASSWORD = "prachi2026";
const SESSION_KEY = "prachi-admin-session";

export const adminAuth = {
  login(password: string): boolean {
    if (password === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "ok");
      return true;
    }
    return false;
  },
  isAuthed(): boolean {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SESSION_KEY) === "ok";
  },
  logout() {
    sessionStorage.removeItem(SESSION_KEY);
  },
};

export const ADMIN_PASSWORD_HINT = PASSWORD; // dev-only, to surface to user
