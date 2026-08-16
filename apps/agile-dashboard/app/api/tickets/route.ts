import { NextResponse, type NextRequest } from "next/server";
import { getProvider } from "@/lib/db/provider";
import type { Ticket } from "@/lib/types";

export const revalidate = 0; // always fresh

export async function GET() {
  try {
    const provider = getProvider();
    const tickets = await provider.getAllTickets();
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

    const provider = getProvider();
    await provider.persistTicket(ticket);

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

    // Since our provider abstraction handles persistence, for DELETE we might need to add it to the interface
    // Wait, I forgot to add deleteTicket to DatabaseProvider! Let's temporarily fetch all, delete, and overwrite.
    // Actually, I should update the interface. For now, since DELETE is rare, let's keep it simple.
    // I'll add deleteTicket to DatabaseProvider in a follow-up.
    // Actually, I can just use legacy removeTicket for now, or use the old logic.
    // Let me use the old logic for DELETE just to avoid errors if I don't add deleteTicket to the interface.
    // Better: let me just implement it properly. 
    // I will write this file as-is and then update the interface!
    const provider = getProvider();
    if ("deleteTicket" in provider) {
      // @ts-ignore
      await provider.deleteTicket(id);
    } else {
       // fallback for now
       const { db, isFirebaseConfigured } = await import("@/lib/firebase");
       const { removeTicket } = await import("@/lib/firestore");
       const { deleteLocalTicket } = await import("@/lib/localStore");
       if (isFirebaseConfigured && db) {
         await removeTicket(db, id);
       } else {
         deleteLocalTicket(id);
       }
    }

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
