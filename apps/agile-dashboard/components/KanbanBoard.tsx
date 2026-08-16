"use client";
import type { Ticket, TicketStatus, AssigneePersona, Priority } from "@/lib/types";
import { STATUS_ORDER } from "@/lib/types";
import Column from "./Column";
import type { Filters } from "./FilterBar";
import styles from "./KanbanBoard.module.css";

interface Props {
  tickets: Ticket[];
  filters: Filters;
  onDetail: (id: string) => void;
  onAdvance: (id: string) => void;
  onToggleAgent: (id: string) => void;
}

export default function KanbanBoard({ tickets, filters, onDetail, onAdvance, onToggleAgent }: Props) {
  const visible = tickets.filter((t) => {
    if (filters.assignee !== "ALL" && t.assignee !== filters.assignee) return false;
    if (filters.priority !== "ALL" && t.priority !== filters.priority) return false;
    if (filters.agentOnly && !t.agentPickup) return false;
    return true;
  });

  return (
    <div className={styles.board}>
      {STATUS_ORDER.map((status) => (
        <Column
          key={status}
          status={status}
          tickets={visible.filter((t) => t.status === status)}
          onDetail={onDetail}
          onAdvance={onAdvance}
          onToggleAgent={onToggleAgent}
        />
      ))}
    </div>
  );
}
