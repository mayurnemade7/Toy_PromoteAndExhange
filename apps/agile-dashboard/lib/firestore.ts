import {
  collection, doc, setDoc, deleteDoc, getDocs,
  onSnapshot, type Unsubscribe, type Firestore,
} from "firebase/firestore";
import type { Ticket } from "./types";
import { SEED_TICKETS } from "./seed";
import type { DatabaseProvider } from "./db/interface";
import { db } from "./firebase";

const COL = "agile_tickets";

export async function seedIfEmpty(dbInstance: Firestore): Promise<void> {
  const snap = await getDocs(collection(dbInstance, COL));
  if (!snap.empty) return;
  await Promise.all(
    SEED_TICKETS.map((t) =>
      setDoc(doc(dbInstance, COL, t.id), {
        ...t,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    )
  );
}

export function subscribeToTickets(
  dbInstance: Firestore,
  onChange: (tickets: Ticket[]) => void,
  onError: (err: Error) => void
): Unsubscribe {
  return onSnapshot(
    collection(dbInstance, COL),
    (snap) => {
      const tickets = snap.docs.map((d) => ({ ...d.data(), id: d.id } as Ticket));
      onChange(tickets);
    },
    onError
  );
}

export const FirestoreProvider: DatabaseProvider = {
  async getAllTickets(): Promise<Ticket[]> {
    if (!db) return [];
    const snap = await getDocs(collection(db, COL));
    return snap.docs.map((d) => ({ ...d.data(), id: d.id } as Ticket));
  },

  async resetTickets(): Promise<void> {
    if (!db) return;
    const snap = await getDocs(collection(db, COL));
    await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
  },

  async persistTicket(ticket: Ticket): Promise<void> {
    if (!db) return;
    await setDoc(doc(db, COL, ticket.id), {
      ...ticket,
      updatedAt: new Date().toISOString(),
    });
  }
};

// Legacy exports to ensure backwards compatibility temporarily during refactor
export const saveTicket = async (db: Firestore, ticket: Ticket) => FirestoreProvider.persistTicket(ticket);
export const removeTicket = async (db: Firestore, id: string) => { if(db) await deleteDoc(doc(db, COL, id)); };
export const getAllTickets = async (db: Firestore) => FirestoreProvider.getAllTickets();
export const resetFirestoreTickets = async (db: Firestore) => FirestoreProvider.resetTickets();
