// GET /api/active-stories
// ─────────────────────────────────────────────────────────────
// REST endpoint for AI agents to poll for active stories.
// Returns all tickets where agentPickup === true.
//
// Agent usage:
//   curl https://your-app.web.app/api/active-stories
//   Filter by assignee: ?assignee=AI_Developer_Mayur

import { NextResponse, type NextRequest } from "next/server";
import { getProvider } from "@/lib/db/provider";

export const revalidate = 0; // always fresh

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const assigneeFilter = searchParams.get("assignee");

  try {
    const provider = getProvider();
    const tickets = await provider.getAllTickets();

    let active = tickets.filter((t) => t.agentPickup);
    if (assigneeFilter) {
      active = active.filter((t) => t.assignee === assigneeFilter);
    }

    return NextResponse.json(
      {
        ok: true,
        count: active.length,
        fetchedAt: new Date().toISOString(),
        stories: active.map((t) => ({
          id: t.id,
          title: t.title,
          description: t.description,
          assignee: t.assignee,
          priority: t.priority,
          points: t.points,
          status: t.status,
          activatedAt: t.activatedAt,
          agentNotes: t.agentNotes ?? null,
        })),
      },
      {
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
