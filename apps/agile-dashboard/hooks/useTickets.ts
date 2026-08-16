"use client";
import { useEffect, useState, useCallback } from "react";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { subscribeToTickets, saveTicket, removeTicket, seedIfEmpty } from "@/lib/firestore";
import { SEED_TICKETS } from "@/lib/seed";
import type { Ticket, TicketStatus, AssigneePersona, Priority } from "@/lib/types";
import { STATUS_ORDER } from "@/lib/types";

export type SyncState = "connecting" | "live" | "local" | "error";

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [syncState, setSyncState] = useState<SyncState>("connecting");

  // ── Initialize ─────────────────────────────────────────────
  useEffect(() => {
    if (isFirebaseConfigured && db) {
      setSyncState("connecting");
      seedIfEmpty(db).catch(console.error);
      const unsub = subscribeToTickets(
        db,
        (t) => { setTickets(t); setSyncState("live"); },
        (err) => { console.error(err); setSyncState("error"); }
      );
      return unsub;
    } else {
      setSyncState("local");
      const fetchLocalTickets = async () => {
        try {
          const res = await fetch("/api/tickets", { cache: "no-store" });
          if (res.ok) {
            const data = await res.json();
            if (data.tickets) {
              setTickets(data.tickets);
            }
          }
        } catch (err) {
          console.warn("Failed to fetch tickets from /api/tickets, using seed fallback:", err);
          setTickets(SEED_TICKETS);
        }
      };

      fetchLocalTickets();
      const interval = setInterval(fetchLocalTickets, 2500);
      return () => clearInterval(interval);
    }
  }, []);

  // ── Actions ────────────────────────────────────────────────
  const persist = useCallback(async (ticket: Ticket) => {
    setTickets((prev) => {
      const idx = prev.findIndex((t) => t.id === ticket.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = ticket; return next; }
      return [...prev, ticket];
    });

    if (isFirebaseConfigured && db) {
      await saveTicket(db, ticket);
    } else {
      try {
        await fetch("/api/tickets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ticket }),
        });
      } catch (err) {
        console.error("Failed to persist ticket via /api/tickets:", err);
      }
    }
  }, []);

  const deleteTicket = useCallback(async (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
    if (isFirebaseConfigured && db) {
      await removeTicket(db, id);
    } else {
      try {
        await fetch(`/api/tickets?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      } catch (err) {
        console.error("Failed to delete ticket via /api/tickets:", err);
      }
    }
  }, []);

  const advanceStatus = useCallback(async (id: string) => {
    const ticket = tickets.find((t) => t.id === id);
    if (!ticket) return;
    const nextIdx = (STATUS_ORDER.indexOf(ticket.status) + 1) % STATUS_ORDER.length;
    await persist({ ...ticket, status: STATUS_ORDER[nextIdx] });
  }, [tickets, persist]);

  const toggleAgentPickup = useCallback(async (id: string) => {
    const ticket = tickets.find((t) => t.id === id);
    if (!ticket) return;
    const agentPickup = !ticket.agentPickup;
    await persist({
      ...ticket,
      agentPickup,
      activatedAt: agentPickup ? new Date().toISOString() : null,
    });
  }, [tickets, persist]);

  const createTicket = useCallback(async (data: Omit<Ticket, "id" | "agentPickup" | "activatedAt" | "createdAt">) => {
    const ticket: Ticket = {
      ...data,
      id: `STORY-${Date.now().toString(36).toUpperCase()}`,
      agentPickup: false,
      activatedAt: null,
      createdAt: new Date().toISOString(),
    };
    await persist(ticket);
    return ticket;
  }, [persist]);

  const resetBoard = useCallback(async () => {
    try {
      const res = await fetch("/api/tickets/reset", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        if (data.tickets) {
          setTickets(data.tickets);
        }
      }
    } catch (err) {
      console.error("Failed to reset board via /api/tickets/reset:", err);
    }
  }, []);

  const activeStories = tickets.filter((t) => t.agentPickup);

  return {
    tickets, syncState, activeStories,
    persist, deleteTicket, advanceStatus, toggleAgentPickup, createTicket, resetBoard,
  };
}

