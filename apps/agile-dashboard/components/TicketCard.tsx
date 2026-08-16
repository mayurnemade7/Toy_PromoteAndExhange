"use client";
import type { Ticket } from "@/lib/types";
import { ASSIGNEE_LABELS } from "@/lib/types";
import styles from "./TicketCard.module.css";

interface Props {
  ticket: Ticket;
  onDetail: (id: string) => void;
  onAdvance: (id: string) => void;
  onToggleAgent: (id: string) => void;
}

const PRIORITY_CLS: Record<string, string> = { P0: styles.p0, P1: styles.p1, P2: styles.p2 };

export default function TicketCard({ ticket, onDetail, onAdvance, onToggleAgent }: Props) {
  const assigneeShort = ASSIGNEE_LABELS[ticket.assignee]?.replace(/^.+?\s/, "") ?? ticket.assignee;

  return (
    <article className={`${styles.card} ${ticket.agentPickup ? styles.agentOn : ""}`}>
      <div className={styles.header}>
        <span className={styles.id}>{ticket.id}</span>
        <span className={`${styles.priority} ${PRIORITY_CLS[ticket.priority]}`}>{ticket.priority}</span>
      </div>

      <h3 className={styles.title}>{ticket.title}</h3>

      {ticket.description && (
        <p className={styles.descPreview}>{ticket.description}</p>
      )}

      <div className={styles.footer}>
        <span className={styles.assignee}>👤 {assigneeShort}</span>
        <span className={styles.points}>{ticket.points} pts</span>
      </div>

      <div className={styles.actions}>
        <button className={styles.btn} onClick={() => onDetail(ticket.id)} aria-label="Open story detail">
          ✏️ Detail
        </button>
        <button className={`${styles.btn} ${styles.advance}`} onClick={() => onAdvance(ticket.id)} aria-label="Advance status">
          → Next
        </button>
        <button
          className={`${styles.btn} ${styles.agent} ${ticket.agentPickup ? styles.agentActive : ""}`}
          onClick={() => onToggleAgent(ticket.id)}
          aria-label={ticket.agentPickup ? "Deactivate agent" : "Activate for agent"}
        >
          {ticket.agentPickup ? "🤖 Active ✓" : "🤖 Activate"}
        </button>
      </div>
    </article>
  );
}
