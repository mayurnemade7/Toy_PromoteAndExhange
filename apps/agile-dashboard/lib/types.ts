// Local type definitions — mirrors @toy-exchange/types
// Using local copy to keep the Next.js app self-contained during bootstrap.
// Replace with: import type { Ticket, ... } from "@toy-exchange/types"

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

export const ASSIGNEE_LABELS: Record<AssigneePersona, string> = {
  AI_BusinessOwner_Mayur:   "💼 BusinessOwner",
  AI_ProductOwner_Mayur:    "📝 ProductOwner",
  AI_TechArchitect_Mayur:   "🏗️ TechArchitect",
  AI_UIUXDesigner_Mayur:    "🎨 UIUXDesigner",
  AI_Developer_Mayur:       "💻 Developer",
  AI_QATester_Mayur:        "🧪 QATester",
  AI_MarketingLead_Mayur:   "📣 MarketingLead",
  AI_OpsSRE_Mayur:          "🛠️ OpsSRE",
  AI_LegalCompliance_Mayur: "⚖️ LegalCompliance",
};

export const STATUS_LABELS: Record<TicketStatus, string> = {
  backlog:     "📋 Backlog",
  todo:        "🎯 Ready for Dev",
  in_progress: "⚡ In Progress",
  qa_testing:  "🧪 QA & Audit",
  done:        "✅ Done",
};

export const STATUS_ORDER: TicketStatus[] = [
  "backlog", "todo", "in_progress", "qa_testing", "done"
];

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
