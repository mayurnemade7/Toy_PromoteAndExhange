"use client";
import type { SyncState } from "@/hooks/useTickets";
import styles from "./Header.module.css";

interface HeaderProps {
  syncState: SyncState;
  onCreateStory: () => void;
  onExport: () => void;
  onReset: () => void;
}

const SYNC_CONFIG: Record<SyncState, { cls: string; label: string }> = {
  connecting: { cls: styles.dotConnecting, label: "Connecting…" },
  live:       { cls: styles.dotLive,       label: "Live ✓" },
  local:      { cls: styles.dotLocal,      label: "Local mode" },
  error:      { cls: styles.dotError,      label: "Sync error" },
};

export default function Header({ syncState, onCreateStory, onExport, onReset }: HeaderProps) {
  const { cls, label } = SYNC_CONFIG[syncState];
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        ⚡ Toy Exchange Agile
        <span className={styles.badge}>Sprint 1 • Mayur Enterprise</span>
      </div>
      <div className={styles.actions}>
        <div className={styles.sync}>
          <span className={`${styles.dot} ${cls}`} />
          <span className={styles.syncLabel}>{label}</span>
        </div>
        <button className={`${styles.btn} ${styles.danger}`} onClick={onReset} title="Reset all tickets to To-Do & scratch state">
          🔄 Reset Board
        </button>
        <button className={`${styles.btn} ${styles.primary}`} onClick={onCreateStory}>
          + New Story
        </button>
        <button className={`${styles.btn} ${styles.ghost} ${styles.hideOnMobile}`} onClick={onExport}>
          📥 Export CSV
        </button>
      </div>
    </header>
  );
}

