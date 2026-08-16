import type { Ticket } from "@/lib/types";

export interface DatabaseProvider {
  /** Retrieves all tickets from the data store */
  getAllTickets(): Promise<Ticket[]> | Ticket[];

  /** Completely resets the board by deleting all tickets */
  resetTickets(): Promise<void> | void;

  /** Updates an existing ticket or creates a new one (upsert) */
  persistTicket(ticket: Ticket): Promise<void> | void;
}
