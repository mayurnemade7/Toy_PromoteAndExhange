"use client";
import type { Ticket } from "@/lib/types";
import styles from "./StatsBar.module.css";

interface Props { tickets: Ticket[]; }

export default function StatsBar({ tickets }: Props) {
  const total = tickets.reduce((s, t) => s + t.points, 0);
  const done  = tickets.filter((t) => t.status === "done").reduce((s, t) => s + t.points, 0);
  const active = tickets.filter((t) => t.agentPickup).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className={styles.bar}>
      <div className={styles.card}>
        <div className={styles.label}>Active Sprint</div>
        <div className={styles.value}>Sprint 1 (MVP)</div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>Total Points</div>
        <div className={styles.value}>{total} pts</div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>Done Points</div>
        <div className={styles.value} style={{ color: "var(--green)" }}>{done} pts</div>
        <div className={styles.progress}><div className={styles.progressFill} style={{ width: `${pct}%` }} /></div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>🤖 Agent Active</div>
        <div className={styles.value} style={{ color: "var(--cyan)" }}>{active}</div>
      </div>
    </div>
  );
}
