"use client";
import type { Ticket } from "@/lib/types";
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
    // 1. Keyword search (Title, ID, Description)
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      const matchId = t.id.toLowerCase().includes(q);
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchDesc = (t.description || "").toLowerCase().includes(q);
      if (!matchId && !matchTitle && !matchDesc) return false;
    }

    // 2. Persona filter
    if (filters.assignee !== "ALL" && t.assignee !== filters.assignee) return false;

    // 3. Priority filter
    if (filters.priority !== "ALL" && t.priority !== filters.priority) return false;

    // 4. Agent only filter
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
