#!/usr/bin/env npx ts-node
/**
 * agents/pickup-agent.ts
 * ─────────────────────────────────────────────────────────────
 * AI Agent Task Pickup Runner & Monitor
 *
 * Polls /api/active-stories on the Agile Dashboard.
 * When a task is activated by clicking "🤖 Activate", it sets status to
 * "in_progress" and prepares the task payload for AI execution.
 *
 * Usage:
 *   AGILE_URL=http://localhost:3000 PERSONA=ALL POLL_MS=5000 npx ts-node pickup-agent.ts
 */

const AGILE_URL   = process.env.AGILE_URL   ?? "http://localhost:3000";
const PERSONA     = process.env.PERSONA      ?? "ALL";
const POLL_MS     = parseInt(process.env.POLL_MS ?? "5000"); // 5s default for fast testing

interface ActiveStory {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: string;
  points: number;
  status: string;
  activatedAt: string | null;
  agentNotes: string | null;
  agentPickup?: boolean;
}

interface FeedResponse {
  ok: boolean;
  count: number;
  fetchedAt: string;
  stories: ActiveStory[];
}

const processingSet = new Set<string>();

async function fetchActiveStories(): Promise<ActiveStory[]> {
  const url = new URL("/api/active-stories", AGILE_URL);
  if (PERSONA !== "ALL") url.searchParams.set("assignee", PERSONA);

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = (await res.json()) as FeedResponse;
  return data.stories;
}

async function updateStoryOnBoard(story: ActiveStory, updates: Partial<ActiveStory>): Promise<void> {
  const updatedTicket = { ...story, ...updates };
  const res = await fetch(new URL("/api/tickets", AGILE_URL).toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticket: updatedTicket }),
  });
  if (!res.ok) {
    console.error(`   ⚠️ Failed to update story ${story.id} on board: ${res.status}`);
  }
}

async function processActiveStory(story: ActiveStory): Promise<void> {
  if (processingSet.has(story.id)) return;
  processingSet.add(story.id);

  try {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`\n==================================================`);
    console.log(`🤖 [${timestamp}] ACTIVE STORY DETECTED: [${story.id}] ${story.title}`);
    console.log(`   Assignee: ${story.assignee}`);
    console.log(`   Priority: ${story.priority} | Points: ${story.points}`);
    console.log(`   Description:\n${(story.description || "").split("\n").map((l) => "     " + l).join("\n")}`);

    if (story.status !== "in_progress") {
      console.log(`\n⏳ Updating story status -> in_progress on Agile Dashboard...`);
      await updateStoryOnBoard(story, {
        status: "in_progress",
        agentNotes: `⚡ [${timestamp}] Story picked up by persona ${story.assignee}.\nReady for AI execution confirmation.`,
      });
      console.log(`✅ Status updated to in_progress! Waiting for AI task execution...`);
    }

    console.log(`==================================================\n`);
  } catch (err) {
    console.error(`❌ Error processing active story ${story.id}:`, err);
  } finally {
    processingSet.delete(story.id);
  }
}

async function poll(): Promise<void> {
  console.log(`[${new Date().toLocaleTimeString()}] Polling ${AGILE_URL}/api/active-stories (persona: ${PERSONA})`);
  try {
    const stories = await fetchActiveStories();
    if (stories.length === 0) {
      console.log("   No active stories at this time.");
      return;
    }
    console.log(`   Found ${stories.length} active story/stories.`);
    for (const story of stories) {
      await processActiveStory(story);
    }
  } catch (err) {
    console.error("   Poll error:", err);
  }
}

// ── Main loop ─────────────────────────────────────────────────
console.log("🤖 Toy Exchange Agent Pickup & Monitor");
console.log(`   Board URL: ${AGILE_URL}`);
console.log(`   Persona:   ${PERSONA}`);
console.log(`   Poll interval: ${POLL_MS / 1000}s`);
console.log("─".repeat(50));

poll();
setInterval(poll, POLL_MS);
