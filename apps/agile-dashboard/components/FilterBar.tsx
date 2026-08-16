"use client";
import styles from "./FilterBar.module.css";
import type { AssigneePersona, Priority } from "@/lib/types";

export interface Filters {
  assignee: AssigneePersona | "ALL";
  priority: Priority | "ALL";
  agentOnly: boolean;
}

interface Props { filters: Filters; onChange: (f: Filters) => void; }

export default function FilterBar({ filters, onChange }: Props) {
  const set = (key: keyof Filters, val: string | boolean) =>
    onChange({ ...filters, [key]: val });

  return (
    <div className={styles.bar}>
      <div className={styles.group}>
        <span className={styles.label}>Persona</span>
        <select value={filters.assignee} onChange={(e) => set("assignee", e.target.value)}>
          <option value="ALL">All Roles</option>
          <option value="AI_BusinessOwner_Mayur">💼 BusinessOwner</option>
          <option value="AI_ProductOwner_Mayur">📝 ProductOwner</option>
          <option value="AI_TechArchitect_Mayur">🏗️ TechArchitect</option>
          <option value="AI_UIUXDesigner_Mayur">🎨 UIUXDesigner</option>
          <option value="AI_Developer_Mayur">💻 Developer</option>
          <option value="AI_QATester_Mayur">🧪 QATester</option>
          <option value="AI_MarketingLead_Mayur">📣 MarketingLead</option>
          <option value="AI_OpsSRE_Mayur">🛠️ OpsSRE</option>
          <option value="AI_LegalCompliance_Mayur">⚖️ LegalCompliance</option>
        </select>
      </div>
      <div className={styles.group}>
        <span className={styles.label}>Priority</span>
        <select value={filters.priority} onChange={(e) => set("priority", e.target.value)}>
          <option value="ALL">All</option>
          <option value="P0">P0 Blocker</option>
          <option value="P1">P1 High</option>
          <option value="P2">P2 Medium</option>
        </select>
      </div>
      <div className={styles.group}>
        <span className={styles.label}>View</span>
        <select value={filters.agentOnly ? "ACTIVE" : "ALL"} onChange={(e) => set("agentOnly", e.target.value === "ACTIVE")}>
          <option value="ALL">All Stories</option>
          <option value="ACTIVE">🤖 Agent Active Only</option>
        </select>
      </div>
    </div>
  );
}
