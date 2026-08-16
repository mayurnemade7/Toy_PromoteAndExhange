"use client";
import { useState, useCallback } from "react";
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

const DEFAULT_FILTERS: Filters = { assignee: "ALL", priority: "ALL", agentOnly: false };

export default function AgileDashboard() {
  const {
    tickets, syncState, activeStories,
    persist, deleteTicket, advanceStatus, toggleAgentPickup, createTicket, resetBoard,
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

  const handleReset = useCallback(async () => {
    if (window.confirm("Are you sure you want to reset all stories to 'To-Do' and scratch state?")) {
      await resetBoard();
      showToast("🔄 Agile Board reset to scratch!");
    }
  }, [resetBoard]);

  const handleExport = useCallback(() => {
    const header = "ID,Title,Description,Assignee,Priority,Points,Status,AgentActive\n";
    const rows = tickets.map((t) =>
      `"${t.id}","${t.title.replace(/"/g, '""')}","${(t.description ?? "").replace(/"/g, '""'). replace(/\n/g," ")}","${t.assignee}","${t.priority}",${t.points},"${t.status}","${t.agentPickup ? "YES" : "NO"}"`
    );
    const csv = header + rows.join("\n");
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([csv], { type: "text/csv" })),
      download: "AgileBoard_ToyExchange.csv",
    });
    a.click();
    showToast("📥 CSV exported!");
  }, [tickets]);

  return (
    <div className={styles.page}>
      <Header syncState={syncState} onCreateStory={() => setCreateOpen(true)} onExport={handleExport} onReset={handleReset} />


      <main className={styles.main}>
        <StatsBar tickets={tickets} />
        <FilterBar filters={filters} onChange={setFilters} />
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
