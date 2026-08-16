"use client";
import type { Ticket, TicketStatus } from "@/lib/types";
import { STATUS_LABELS } from "@/lib/types";
import TicketCard from "./TicketCard";
import styles from "./Column.module.css";

interface Props {
  status: TicketStatus;
  tickets: Ticket[];
  onDetail: (id: string) => void;
  onAdvance: (id: string) => void;
  onToggleAgent: (id: string) => void;
}

export default function Column({ status, tickets, onDetail, onAdvance, onToggleAgent }: Props) {
  return (
    <section className={`${styles.col} ${status === "in_progress" ? styles.active : ""}`}>
      <div className={styles.header}>
        <span className={styles.title}>{STATUS_LABELS[status]}</span>
        <span className={styles.count}>{tickets.length}</span>
      </div>
      <div className={styles.cards}>
        {tickets.length === 0 && (
          <div className={styles.empty}>No stories</div>
        )}
        {tickets.map((t) => (
          <TicketCard
            key={t.id}
            ticket={t}
            onDetail={onDetail}
            onAdvance={onAdvance}
            onToggleAgent={onToggleAgent}
          />
        ))}
      </div>
    </section>
  );
}
