import { NextResponse, type NextRequest } from "next/server";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { getAllTickets, saveTicket, removeTicket } from "@/lib/firestore";
import { getLocalTickets, saveLocalTicket, deleteLocalTicket } from "@/lib/localStore";
import type { Ticket } from "@/lib/types";

export const revalidate = 0; // always fresh

export async function GET() {
  try {
    let tickets: Ticket[];
    if (isFirebaseConfigured && db) {
      tickets = await getAllTickets(db);
    } else {
      tickets = getLocalTickets();
    }
    return NextResponse.json(
      { ok: true, count: tickets.length, tickets },
      { headers: { "Cache-Control": "no-store", "Content-Type": "application/json" } }
    );
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ticket: Ticket = body.ticket ?? body;
    if (!ticket || !ticket.id || !ticket.title) {
      return NextResponse.json({ ok: false, error: "Invalid ticket object" }, { status: 400 });
    }

    if (isFirebaseConfigured && db) {
      await saveTicket(db, ticket);
    } else {
      saveLocalTicket(ticket);
    }

    return NextResponse.json({ ok: true, ticket });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing ticket id" }, { status: 400 });
    }

    if (isFirebaseConfigured && db) {
      await removeTicket(db, id);
    } else {
      deleteLocalTicket(id);
    }

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
