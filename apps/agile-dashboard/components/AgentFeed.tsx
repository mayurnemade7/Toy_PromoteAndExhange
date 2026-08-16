"use client";
import { useState, useEffect } from "react";
import type { Ticket } from "@/lib/types";
import styles from "./AgentFeed.module.css";

interface Props { activeStories: Ticket[]; }

export default function AgentFeed({ activeStories }: Props) {
  const [restUrl, setRestUrl] = useState("/api/active-stories");

  useEffect(() => {
    setRestUrl(`${window.location.origin}/api/active-stories`);
  }, []);

  const feed = activeStories.map((t) => ({
    id: t.id, title: t.title, description: t.description,
    assignee: t.assignee, priority: t.priority,
    points: t.points, status: t.status,
    agentPickup: true, activatedAt: t.activatedAt,
    agentNotes: t.agentNotes ?? null,
  }));

  return (
    <div className={styles.panel}>
      <div className={styles.panelTitle}>🤖 Agent Pickup Feed — Live Active Stories</div>
      <pre className={styles.code}>
        {feed.length
          ? JSON.stringify(feed, null, 2)
          : 'No active stories. Click "🤖 Activate" on any card to enable agent pickup.'}
      </pre>
      <p className={styles.note}>
        📡 <strong>Agents poll:</strong>{" "}
        <code className={styles.url}>{restUrl}</code>
        <br />
        Filter by persona: <code>{restUrl}?assignee=AI_Developer_Mayur</code>
        <br />
        Any story with <code>agentPickup: true</code> appears here in real-time.
      </p>
    </div>
  );
}
