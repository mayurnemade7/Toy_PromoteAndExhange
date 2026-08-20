"use client";
import type { SyncState } from "@/hooks/useTickets";
import styles from "./Header.module.css";

interface HeaderProps {
  syncState: SyncState;
  onCreateStory: () => void;
  onExport: () => void;
}

const SYNC_CONFIG: Record<SyncState, { cls: string; label: string }> = {
  connecting: { cls: styles.dotConnecting, label: "Connecting…" },
  live:       { cls: styles.dotLive,       label: "Live Firestore" },
  local:      { cls: styles.dotLocal,      label: "Local Mode" },
  error:      { cls: styles.dotError,      label: "Sync Error" },
};

export default function Header({ syncState, onCreateStory, onExport }: HeaderProps) {
  const { cls, label } = SYNC_CONFIG[syncState];
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.projectIcon}>🧸</div>
        <div className={styles.titleGroup}>
          <div className={styles.breadcrumb}>Projects / Toy Promote & Exchange</div>
          <div className={styles.boardTitle}>
            Agile Kanban Board
            <span className={styles.badge}>Sprint 1</span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.sync}>
          <span className={`${styles.dot} ${cls}`} />
          <span className={styles.syncLabel}>{label}</span>
        </div>

        <button className={`${styles.btn} ${styles.ghost}`} onClick={onExport} title="Export current tickets to CSV">
          📥 Export CSV
        </button>

        <button className={`${styles.btn} ${styles.primary}`} onClick={onCreateStory}>
          + Create Story
        </button>
      </div>
    </header>
  );
}
