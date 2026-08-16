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

### Database Configuration (Switchable)
The Agile Dashboard supports multiple data providers. It uses a unified `DatabaseProvider` interface.
By default, the API reads from `lib/localStore.ts` if Firebase is not configured.
To force a specific provider, you can use the `.env` variable:
```env
NEXT_PUBLIC_DB_PROVIDER=local
# OR
NEXT_PUBLIC_DB_PROVIDER=firebase
```

### Deployment Options
The monorepo is fully configured to be easily deployed to multiple cloud providers natively!

**Vercel (Recommended for Next.js):**
Simply connect your GitHub repository to Vercel. The included `vercel.json` ensures that Turborepo is properly utilized and the dashboard is deployed automatically.

**Firebase App Hosting:**
We have also included a `firebase.json` configured for Firebase's Next.js integration.
```bash
firebase deploy --only hosting
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
