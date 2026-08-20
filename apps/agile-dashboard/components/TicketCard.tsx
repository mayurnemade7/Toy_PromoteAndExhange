"use client";
import React from "react";
import type { Ticket } from "@/lib/types";
import { ASSIGNEE_LABELS } from "@/lib/types";
import styles from "./TicketCard.module.css";

interface Props {
  ticket: Ticket;
  onDetail: (id: string) => void;
  onAdvance: (id: string) => void;
  onToggleAgent: (id: string) => void;
}

const PRIORITY_CONFIG: Record<string, { label: string; cls: string; icon: string }> = {
  P0: { label: "P0 Blocker", cls: styles.p0, icon: "🔴" },
  P1: { label: "P1 High",    cls: styles.p1, icon: "🟠" },
  P2: { label: "P2 Medium",  cls: styles.p2, icon: "🔵" },
};

export default function TicketCard({ ticket, onDetail, onAdvance, onToggleAgent }: Props) {
  const assigneeShort = ASSIGNEE_LABELS[ticket.assignee]?.replace(/^.+?\s/, "") ?? ticket.assignee;
  const pConfig = PRIORITY_CONFIG[ticket.priority] || { label: ticket.priority, cls: styles.p2, icon: "⚪" };

  const handleCardClick = () => {
    onDetail(ticket.id);
  };

  const handleAdvanceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdvance(ticket.id);
  };

  const handleToggleAgentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleAgent(ticket.id);
  };

  return (
    <article
      className={`${styles.card} ${ticket.agentPickup ? styles.agentOn : ""}`}
      onClick={handleCardClick}
      title="Click to view/edit details"
    >
      <div className={styles.topRow}>
        <span className={styles.ticketId}>{ticket.id}</span>
        
        <div className={styles.topTags}>
          <span className={`${styles.priorityBadge} ${pConfig.cls}`} title={`Priority: ${pConfig.label}`}>
            {pConfig.icon} {ticket.priority}
          </span>
          
          <button
            className={`${styles.agentToggle} ${ticket.agentPickup ? styles.agentActive : ""}`}
            onClick={handleToggleAgentClick}
            title={ticket.agentPickup ? "AI Agent is Active on this story" : "Click to activate for AI Agent"}
          >
            ⚡ {ticket.agentPickup ? "AI Active" : "Activate"}
          </button>
        </div>
      </div>

      <h3 className={styles.title}>{ticket.title}</h3>

      {ticket.description && (
        <p className={styles.descSnippet}>{ticket.description}</p>
      )}

      <div className={styles.bottomRow}>
        <div className={styles.assigneePill} title={`Assigned to: ${ticket.assignee}`}>
          <span className={styles.avatarIcon}>👤</span>
          <span className={styles.assigneeName}>{assigneeShort}</span>
        </div>

        <div className={styles.rightActions}>
          <span className={styles.pointsBadge} title={`${ticket.points} Story Points`}>
            {ticket.points} pts
          </span>
          
          <button
            className={styles.nextBtn}
            onClick={handleAdvanceClick}
            title="Move story to next status"
          >
            →
          </button>
        </div>
      </div>
    </article>
  );
}
