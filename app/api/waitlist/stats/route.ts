import { getFoundingStats } from "@/lib/waitlist";

// GET /api/waitlist/stats — Founding Members spots left. Since S68 the site
// no longer shows the counter; the endpoint is kept for internal use. Counts of confirmed rows only: never an email, a code or
// a row. Worked out per request (not at build time) and cached at the edge
// for 60 seconds, so the counter costs at most one set of counts a minute.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const stats = await getFoundingStats();
  if (!stats) {
    return Response.json({ error: "unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  return Response.json(stats, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
