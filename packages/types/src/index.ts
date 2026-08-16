// ─────────────────────────────────────────────────────────────
// @toy-exchange/types — Shared TypeScript types across all apps
// ─────────────────────────────────────────────────────────────

export type Priority = "P0" | "P1" | "P2";

export type TicketStatus =
  | "backlog"
  | "todo"
  | "in_progress"
  | "qa_testing"
  | "done";

export type AssigneePersona =
  | "AI_BusinessOwner_Mayur"
  | "AI_ProductOwner_Mayur"
  | "AI_TechArchitect_Mayur"
  | "AI_UIUXDesigner_Mayur"
  | "AI_Developer_Mayur"
  | "AI_QATester_Mayur"
  | "AI_MarketingLead_Mayur"
  | "AI_OpsSRE_Mayur"
  | "AI_LegalCompliance_Mayur";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  assignee: AssigneePersona;
  priority: Priority;
  points: number;
  status: TicketStatus;
  agentPickup: boolean;
  activatedAt: string | null;
  agentCompletedAt?: string | null;
  agentNotes?: string;
  updatedAt?: string;
  createdAt?: string;
}

// Toy exchange domain types
export interface Toy {
  id: string;
  ownerId: string;
  title: string;
  category: string;
  condition: "new" | "like_new" | "good" | "fair";
  imageUrls: string[];
  description: string;
  estimatedValue: number;
  createdAt: string;
}

export interface Trade {
  id: string;
  proposedBy: string;
  offeredToyIds: string[];
  requestedToyIds: string[];
  status: "pending" | "accepted" | "rejected" | "cancelled";
  message?: string;
  createdAt: string;
}

export interface User {
  id: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  location?: string;
  createdAt: string;
}
