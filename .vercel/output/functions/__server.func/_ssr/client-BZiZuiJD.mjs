import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-BZiZuiJD.js
function createSupabaseClient() {
	return createClient("https://ahokvmdoeqlgofcqveng.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFob2t2bWRvZXFsZ29mY3F2ZW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMDQxMzksImV4cCI6MjA5Njc4MDEzOX0.UkrHxMQeW8PldUaXSYfGfZBnTNocu8CMCNcbCqyaY6I", { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
