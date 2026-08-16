import { NextResponse } from "next/server";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { resetFirestoreTickets } from "@/lib/firestore";
import { resetLocalTickets } from "@/lib/localStore";

export const revalidate = 0;

export async function POST() {
  try {
    let tickets;
    if (isFirebaseConfigured && db) {
      tickets = await resetFirestoreTickets(db);
    } else {
      tickets = resetLocalTickets();
    }
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
