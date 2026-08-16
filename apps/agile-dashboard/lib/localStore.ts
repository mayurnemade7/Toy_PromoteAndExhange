import fs from "fs";
import path from "path";
import type { Ticket } from "./types";
import { SEED_TICKETS } from "./seed";
import type { DatabaseProvider } from "./db/interface";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "tickets.json");

let memoryTickets: Ticket[] | null = null;

function ensureDataFile(): Ticket[] {
  if (memoryTickets) return memoryTickets;

  try {
    if (fs.existsSync(FILE_PATH)) {
      const content = fs.readFileSync(FILE_PATH, "utf-8");
      memoryTickets = JSON.parse(content);
      return memoryTickets!;
    }
  } catch (err) {
    console.warn("Failed to read local tickets file:", err);
  }

  memoryTickets = [];
  persistToFile(memoryTickets);
  return memoryTickets;
}

function persistToFile(tickets: Ticket[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(FILE_PATH, JSON.stringify(tickets, null, 2), "utf-8");
  } catch (err) {
    console.warn("Failed to persist local tickets to disk:", err);
  }
}

export const LocalProvider: DatabaseProvider = {
  getAllTickets(): Ticket[] {
    return ensureDataFile();
  },

  resetTickets(): void {
    memoryTickets = [];
    persistToFile(memoryTickets);
  },

  persistTicket(ticket: Ticket): void {
    const tickets = ensureDataFile();
    const idx = tickets.findIndex((t) => t.id === ticket.id);
    if (idx >= 0) {
      tickets[idx] = ticket;
    } else {
      tickets.push(ticket);
    }
    memoryTickets = tickets;
    persistToFile(tickets);
  }
};

// Legacy exports to ensure backwards compatibility temporarily during refactor
export const getLocalTickets = () => LocalProvider.getAllTickets();
export const saveLocalTicket = (ticket: Ticket) => { LocalProvider.persistTicket(ticket); return ticket; };
export const deleteLocalTicket = (id: string): boolean => {
  const tickets = ensureDataFile();
  const next = tickets.filter((t) => t.id !== id);
  const deleted = next.length < tickets.length;
  memoryTickets = next;
  persistToFile(next);
  return deleted;
};
export const resetLocalTickets = () => { LocalProvider.resetTickets(); return memoryTickets; };
