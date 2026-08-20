"use client";
import styles from "./FilterBar.module.css";
import type { AssigneePersona, Priority } from "@/lib/types";

export interface Filters {
  search: string;
  assignee: AssigneePersona | "ALL";
  priority: Priority | "ALL";
  agentOnly: boolean;
}

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
  totalStoriesCount: number;
  filteredStoriesCount: number;
}

export default function FilterBar({ filters, onChange, totalStoriesCount, filteredStoriesCount }: Props) {
  const set = (key: keyof Filters, val: any) =>
    onChange({ ...filters, [key]: val });

  const hasActiveFilters = filters.search !== "" || filters.assignee !== "ALL" || filters.priority !== "ALL" || filters.agentOnly;

  const handleClear = () => {
    onChange({ search: "", assignee: "ALL", priority: "ALL", agentOnly: false });
  };

  return (
    <div className={styles.bar}>
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Filter by keyword or ID (e.g. STORY-1)..."
          value={filters.search}
          onChange={(e) => set("search", e.target.value)}
        />
        {filters.search && (
          <button className={styles.clearSearch} onClick={() => set("search", "")}>✕</button>
        )}
      </div>

      <div className={styles.filterGroup}>
        <select
          className={`${styles.select} ${filters.assignee !== "ALL" ? styles.activeFilter : ""}`}
          value={filters.assignee}
          onChange={(e) => set("assignee", e.target.value)}
        >
          <option value="ALL">👤 All Personas</option>
          <option value="AI_BusinessOwner_Mayur">💼 Business Owner</option>
          <option value="AI_ProductOwner_Mayur">📝 Product Owner</option>
          <option value="AI_TechArchitect_Mayur">🏗️ Tech Architect</option>
          <option value="AI_UIUXDesigner_Mayur">🎨 UI/UX Designer</option>
          <option value="AI_Developer_Mayur">💻 Developer</option>
          <option value="AI_QATester_Mayur">🧪 QA Tester</option>
          <option value="AI_MarketingLead_Mayur">📣 Marketing Lead</option>
          <option value="AI_OpsSRE_Mayur">🛠️ Ops SRE</option>
          <option value="AI_LegalCompliance_Mayur">⚖️ Legal Compliance</option>
        </select>

        <select
          className={`${styles.select} ${filters.priority !== "ALL" ? styles.activeFilter : ""}`}
          value={filters.priority}
          onChange={(e) => set("priority", e.target.value)}
        >
          <option value="ALL">🎯 All Priorities</option>
          <option value="P0">🔴 P0 Blocker</option>
          <option value="P1">🟠 P1 High</option>
          <option value="P2">🔵 P2 Medium</option>
        </select>

        <button
          className={`${styles.toggleBtn} ${filters.agentOnly ? styles.toggleActive : ""}`}
          onClick={() => set("agentOnly", !filters.agentOnly)}
        >
          ⚡ AI Agent Active
        </button>

        {hasActiveFilters && (
          <button className={styles.resetFiltersBtn} onClick={handleClear}>
            ✕ Clear Filters
          </button>
        )}
      </div>

      <div className={styles.countBadge}>
        Showing {filteredStoriesCount} of {totalStoriesCount} stories
      </div>
    </div>
  );
}
