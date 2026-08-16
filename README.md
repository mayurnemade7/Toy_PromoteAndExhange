# Toy Promote & Exchange 🧸♻️

Welcome to the **Toy Promote & Exchange** monorepo! This platform is designed to help users promote, trade, and exchange toys sustainably.

## 🎯 Purpose
The purpose of this application is to create a community-driven ecosystem where parents, collectors, and kids can exchange toys they no longer need, reducing waste and extending the lifecycle of toys.

## 🏗️ Architecture & Structure
This is a modern monorepo powered by **Turborepo** and **pnpm**.

### Apps
- **`apps/agile-dashboard`**: A Next.js application used by our team (and AI Agents) for sprint planning, story tracking, and Kanban management. It acts as our internal command center.
- **`apps/frontend`**: (Planned) The main user-facing web application where users can swipe through toy reels, propose trades, and manage their inventory.
- **`apps/backend`**: (Planned) The backend services and APIs powering the platform.

### Key Technologies
- **Framework**: Next.js (React)
- **Database**: Firebase (Firestore) for real-time ticket and toy data
- **Styling**: Vanilla CSS & CSS Modules (Glassmorphism design system)
- **Monorepo Tooling**: Turborepo & pnpm

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20
- pnpm >= 9

### Installation
```bash
# Install dependencies
pnpm install
```

### Running Locally
To start the development servers:
```bash
# Start all apps
pnpm dev

# Start only the Agile Dashboard
pnpm dev:dashboard
```

## 🤖 AI Agent Workflow
This repository includes a dedicated AI Agent workflow (`agents/pickup-agent.ts`) that monitors the Agile Dashboard for activated stories and helps automate development tasks!
