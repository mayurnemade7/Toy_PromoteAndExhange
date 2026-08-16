"use client";
import { useState, useEffect } from "react";
import type { Ticket, AssigneePersona, Priority, TicketStatus } from "@/lib/types";
import { ASSIGNEE_LABELS, STATUS_LABELS, STATUS_ORDER } from "@/lib/types";
import styles from "./CreateModal.module.css";

type DraftTicket = Omit<Ticket, "id" | "agentPickup" | "activatedAt" | "createdAt">;

const DEFAULT: DraftTicket = {
  title: "", description: "",
  assignee: "AI_ProductOwner_Mayur",
  priority: "P1", points: 3, status: "todo",
};

interface Props {
  editTicket?: Ticket | null;
  onClose: () => void;
  onCreate: (data: DraftTicket) => Promise<void>;
  onUpdate: (t: Ticket) => Promise<void>;
}

export default function CreateModal({ editTicket, onClose, onCreate, onUpdate }: Props) {
  const isEdit = !!editTicket;
  const [draft, setDraft] = useState<DraftTicket>(DEFAULT);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(editTicket ? {
      title: editTicket.title, description: editTicket.description,
      assignee: editTicket.assignee, priority: editTicket.priority,
      points: editTicket.points, status: editTicket.status,
    } : DEFAULT);
  }, [editTicket]);

  const set = <K extends keyof DraftTicket>(key: K, val: DraftTicket[K]) =>
    setDraft((d) => ({ ...d, [key]: val }));

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!draft.title.trim()) return;
    setSaving(true);
    try {
      if (isEdit && editTicket) {
        await onUpdate({ ...editTicket, ...draft });
      } else {
        await onCreate(draft);
      }
    } catch (err) {
      console.error("Save story error:", err);
    } finally {
      setSaving(false);
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label={isEdit ? "Edit Story" : "Create Story"}>
        <div className={styles.handle} />
        <div className={styles.header}>
          <h2 className={styles.title}>{isEdit ? "Edit Story" : "Create User Story"}</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="story-title">Story Title *</label>
            <input
              id="story-title" type="text" required
              value={draft.title} onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Implement Trade Proposal Modal"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="story-desc">Description / Acceptance Criteria</label>
            <textarea
              id="story-desc"
              value={draft.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder={"As a user, I want to…\n\nAcceptance Criteria:\n- Given… When… Then…"}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="story-assignee">Assignee Persona</label>
              <select id="story-assignee" value={draft.assignee} onChange={(e) => set("assignee", e.target.value as AssigneePersona)}>
                {Object.entries(ASSIGNEE_LABELS).map(([val, lbl]) => (
                  <option key={val} value={val}>{lbl}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="story-priority">Priority</label>
              <select id="story-priority" value={draft.priority} onChange={(e) => set("priority", e.target.value as Priority)}>
                <option value="P0">P0 (Blocker)</option>
                <option value="P1">P1 (High)</option>
                <option value="P2">P2 (Medium)</option>
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="story-points">Story Points</label>
              <select id="story-points" value={draft.points} onChange={(e) => set("points", parseInt(e.target.value))}>
                {[1,2,3,5,8,13].map((p) => <option key={p} value={p}>{p} pts</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="story-status">Status Column</label>
              <select id="story-status" value={draft.status} onChange={(e) => set("status", e.target.value as TicketStatus)}>
                {STATUS_ORDER.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={`${styles.btn} ${styles.ghost}`} onClick={onClose}>Cancel</button>
            <button type="submit" className={`${styles.btn} ${styles.primary}`} disabled={saving}>
              {saving ? "Saving…" : isEdit ? "Update Story" : "Save Story"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
