import {
  collection, doc, setDoc, deleteDoc, getDocs,
  onSnapshot, type Unsubscribe, type Firestore,
} from "firebase/firestore";
import type { Ticket } from "./types";
import { SEED_TICKETS } from "./seed";

const COL = "agile_tickets";

export async function seedIfEmpty(db: Firestore): Promise<void> {
  const snap = await getDocs(collection(db, COL));
  if (!snap.empty) return;
  await Promise.all(
    SEED_TICKETS.map((t) =>
      setDoc(doc(db, COL, t.id), {
        ...t,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    )
  );
}

export async function saveTicket(db: Firestore, ticket: Ticket): Promise<void> {
  await setDoc(doc(db, COL, ticket.id), {
    ...ticket,
    updatedAt: new Date().toISOString(),
  });
}

export async function removeTicket(db: Firestore, id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}

export function subscribeToTickets(
  db: Firestore,
  onChange: (tickets: Ticket[]) => void,
  onError: (err: Error) => void
): Unsubscribe {
  return onSnapshot(
    collection(db, COL),
    (snap) => {
      const tickets = snap.docs.map((d) => ({ ...d.data(), id: d.id } as Ticket));
      onChange(tickets);
    },
    onError
  );
}

export async function getAllTickets(db: Firestore): Promise<Ticket[]> {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => ({ ...d.data(), id: d.id } as Ticket));
}
