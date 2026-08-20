"use client";
import { useState, useCallback, useMemo } from "react";
import { useTickets } from "@/hooks/useTickets";
import Header from "@/components/Header";
import StatsBar from "@/components/StatsBar";
import FilterBar, { type Filters } from "@/components/FilterBar";
import KanbanBoard from "@/components/KanbanBoard";
import StoryDrawer from "@/components/StoryDrawer";
import CreateModal from "@/components/CreateModal";
import AgentFeed from "@/components/AgentFeed";
import Toast, { showToast } from "@/components/Toast";
import type { Ticket } from "@/lib/types";
import styles from "./page.module.css";

const DEFAULT_FILTERS: Filters = { search: "", assignee: "ALL", priority: "ALL", agentOnly: false };

export default function AgileDashboard() {
  const {
    tickets, syncState, activeStories,
    persist, deleteTicket, advanceStatus, toggleAgentPickup, createTicket,
  } = useTickets();

  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [drawerTicketId, setDrawerTicketId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const drawerTicket = drawerTicketId ? tickets.find((t) => t.id === drawerTicketId) ?? null : null;

  const handleDetail = useCallback((id: string) => setDrawerTicketId(id), []);
  const handleCloseDrawer = useCallback(() => setDrawerTicketId(null), []);

  const handleAdvance = useCallback(async (id: string) => {
    await advanceStatus(id);
    showToast("→ Status advanced");
  }, [advanceStatus]);

  const handleToggleAgent = useCallback(async (id: string) => {
    await toggleAgentPickup(id);
    const t = tickets.find((x) => x.id === id);
    showToast(t?.agentPickup ? "⏸ Agent deactivated" : "🤖 Story activated for agent pickup!");
  }, [toggleAgentPickup, tickets]);

  const handleSaveDrawer = useCallback(async (t: Ticket) => {
    await persist(t);
    showToast("💾 Story saved!");
  }, [persist]);

  const handleDeleteDrawer = useCallback(async (id: string) => {
    await deleteTicket(id);
    showToast("🗑 Story deleted");
  }, [deleteTicket]);

  const handleCreate = useCallback(async (data: Omit<Ticket, "id" | "agentPickup" | "activatedAt" | "createdAt">) => {
    await createTicket(data);
    showToast("✅ Story created!");
  }, [createTicket]);

  const handleExport = useCallback(() => {
    const header = "ID,Title,Description,Assignee,Priority,Points,Status,AgentActive\n";
    const rows = tickets.map((t) =>
      `"${t.id}","${t.title.replace(/"/g, '""')}","${(t.description ?? "").replace(/"/g, '""').replace(/\n/g," ")}","${t.assignee}","${t.priority}",${t.points},"${t.status}","${t.agentPickup ? "YES" : "NO"}"`
    );
    const csv = header + rows.join("\n");
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([csv], { type: "text/csv" })),
      download: "AgileBoard_ToyExchange.csv",
    });
    a.click();
    showToast("📥 CSV exported!");
  }, [tickets]);

  const filteredCount = useMemo(() => {
    return tickets.filter((t) => {
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase().trim();
        if (!t.id.toLowerCase().includes(q) && !t.title.toLowerCase().includes(q) && !(t.description || "").toLowerCase().includes(q)) {
          return false;
        }
      }
      if (filters.assignee !== "ALL" && t.assignee !== filters.assignee) return false;
      if (filters.priority !== "ALL" && t.priority !== filters.priority) return false;
      if (filters.agentOnly && !t.agentPickup) return false;
      return true;
    }).length;
  }, [tickets, filters]);

  return (
    <div className={styles.page}>
      <Header
        syncState={syncState}
        onCreateStory={() => setCreateOpen(true)}
        onExport={handleExport}
      />

      <main className={styles.main}>
        <StatsBar tickets={tickets} />
        <FilterBar
          filters={filters}
          onChange={setFilters}
          totalStoriesCount={tickets.length}
          filteredStoriesCount={filteredCount}
        />
        <KanbanBoard
          tickets={tickets}
          filters={filters}
          onDetail={handleDetail}
          onAdvance={handleAdvance}
          onToggleAgent={handleToggleAgent}
        />
        <AgentFeed activeStories={activeStories} />
      </main>

      {/* Mobile FAB */}
      <button className={styles.fab} onClick={() => setCreateOpen(true)} aria-label="Create new story">+</button>

      {/* Modals */}
      {createOpen && (
        <CreateModal
          onClose={() => setCreateOpen(false)}
          onCreate={handleCreate}
          onUpdate={handleSaveDrawer}
        />
      )}

      {drawerTicket && (
        <StoryDrawer
          ticket={drawerTicket}
          onClose={handleCloseDrawer}
          onSave={handleSaveDrawer}
          onDelete={handleDeleteDrawer}
          onToggleAgent={handleToggleAgent}
        />
      )}

      <Toast />
    </div>
  );
}
