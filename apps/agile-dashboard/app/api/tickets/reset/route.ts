import { NextResponse } from "next/server";
import { getProvider } from "@/lib/db/provider";

export const revalidate = 0;

export async function POST() {
  try {
    const provider = getProvider();
    await provider.resetTickets();
    const tickets = await provider.getAllTickets();
    
    return NextResponse.json(
      { ok: true, message: "Dashboard reset to scratch!", count: tickets.length, tickets },
      { headers: { "Cache-Control": "no-store", "Content-Type": "application/json" } }
    );
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
