"use client";
import { useState, useEffect } from "react";
import type { Ticket, AssigneePersona, Priority, TicketStatus } from "@/lib/types";
import { ASSIGNEE_LABELS, STATUS_LABELS, STATUS_ORDER } from "@/lib/types";
import styles from "./StoryDrawer.module.css";

interface Props {
  ticket: Ticket | null;
  onClose: () => void;
  onSave: (t: Ticket) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggleAgent: (id: string) => Promise<void>;
}

export default function StoryDrawer({ ticket, onClose, onSave, onDelete, onToggleAgent }: Props) {
  const [draft, setDraft] = useState<Ticket | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setDraft(ticket ? { ...ticket } : null); }, [ticket]);

  if (!draft) return null;

  const set = <K extends keyof Ticket>(key: K, val: Ticket[K]) =>
    setDraft((d) => d ? { ...d, [key]: val } : d);

  const handleSave = async () => {
    if (!draft) return;
    setSaving(true);
    await onSave(draft);
    setSaving(false);
    onClose();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this story? This cannot be undone.")) return;
    await onDelete(draft.id);
    onClose();
  };

  const handleToggleAgent = async () => {
    await onToggleAgent(draft.id);
    setDraft((d) => d ? { ...d, agentPickup: !d.agentPickup, activatedAt: !d.agentPickup ? new Date().toISOString() : null } : d);
  };

  return (
    <>
      <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} />
      <aside className={styles.drawer}>
        <div className={styles.handle} />
        <div className={styles.header}>
          <div className={styles.idBlock}>
            <span className={styles.storyId}>{draft.id}</span>
            <input
              className={styles.titleInput}
              value={draft.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Story title…"
            />
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className={styles.sectionLabel}>Description / Acceptance Criteria</div>
        <textarea
          className={styles.desc}
          value={draft.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder={"As a user, I want…\n\nAcceptance Criteria:\n- Given… When… Then…"}
        />

        <div className={styles.sectionLabel}>Metadata</div>
        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <label>Assignee</label>
            <select value={draft.assignee} onChange={(e) => set("assignee", e.target.value as AssigneePersona)}>
              {Object.entries(ASSIGNEE_LABELS).map(([val, lbl]) => (
                <option key={val} value={val}>{lbl}</option>
              ))}
            </select>
          </div>
          <div className={styles.metaItem}>
            <label>Priority</label>
            <select value={draft.priority} onChange={(e) => set("priority", e.target.value as Priority)}>
              <option value="P0">P0 Blocker</option>
              <option value="P1">P1 High</option>
              <option value="P2">P2 Medium</option>
            </select>
          </div>
          <div className={styles.metaItem}>
            <label>Points</label>
            <select value={draft.points} onChange={(e) => set("points", parseInt(e.target.value))}>
              {[1,2,3,5,8,13].map((p) => <option key={p} value={p}>{p} pts</option>)}
            </select>
          </div>
          <div className={styles.metaItem}>
            <label>Status</label>
            <select value={draft.status} onChange={(e) => set("status", e.target.value as TicketStatus)}>
              {STATUS_ORDER.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
            </select>
          </div>
        </div>

        <div className={`${styles.agentBox} ${draft.agentPickup ? styles.agentBoxActive : ""}`}>
          <h4>🤖 Agent Pickup Status</h4>
          {draft.agentPickup ? (
            <>
              <p>Active since: {draft.activatedAt ? new Date(draft.activatedAt).toLocaleString() : "now"}</p>
              <span className={styles.activeBadge}>
                <span className={styles.pulseDot} /> Agent Pickup Active
              </span>
            </>
          ) : (
            <p>Not active for agent pickup. Click below to activate.</p>
          )}
        </div>

        {draft.agentNotes && (
          <div className={styles.agentNotes}>
            <div className={styles.sectionLabel}>🤖 Agent Notes</div>
            <pre className={styles.notesContent}>{draft.agentNotes}</pre>
          </div>
        )}

        <div className={styles.drawerActions}>
          <button className={`${styles.btn} ${styles.agentBtn}`} onClick={handleToggleAgent}>
            {draft.agentPickup ? "⏸ Deactivate" : "🤖 Activate for Agent"}
          </button>
          <button className={`${styles.btn} ${styles.primary}`} onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "💾 Save Changes"}
          </button>
          <button className={`${styles.btn} ${styles.danger}`} onClick={handleDelete}>🗑</button>
        </div>
      </aside>
    </>
  );
}
