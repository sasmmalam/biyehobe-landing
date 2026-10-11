import { resubscribeByToken, unsubscribeByToken } from "@/lib/waitlist";

// /api/waitlist/unsubscribe?t=TOKEN
//
// POST is two things:
//  - the one-click unsubscribe mail apps call from the List-Unsubscribe
//    header (RFC 8058; body "List-Unsubscribe=One-Click"), and
//  - the Re-subscribe button on /waitlist/unsubscribe (form field
//    action=resubscribe), which is answered with a redirect back to the page.
// Neither says whether the token belongs to anyone.

export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store" };

export async function POST(request: Request) {
  const url = new URL(request.url);
  let token = url.searchParams.get("t") ?? "";
  let action = "";
  try {
    const form = await request.formData();
    action = String(form.get("action") ?? "");
    token ||= String(form.get("t") ?? "");
  } catch {
    // No form body: a bare POST is still a one-click unsubscribe.
  }

  if (action === "resubscribe") {
    const result = await resubscribeByToken(token);
    const to = new URL("/waitlist/unsubscribe", url);
    to.searchParams.set("resubscribed", result === "ok" ? "1" : "0");
    return Response.redirect(to, 303);
  }

  const result = await unsubscribeByToken(token);
  return new Response(null, { status: result === "ok" ? 200 : 503, headers: NO_STORE });
}

/** Someone opened the header URL in a browser: show them the page. */
export function GET(request: Request) {
  const url = new URL(request.url);
  const to = new URL("/waitlist/unsubscribe", url);
  const token = url.searchParams.get("t");
  if (token) to.searchParams.set("t", token);
  return Response.redirect(to, 303);
}
