# 📊 Free Google Tools Integration & Authentication Guide
**Scope**: Collaborative Workspace, Analytics, Backlog Sync & Cloud Backend  

---

## 🛠️ Integrated Free Google Tool Stack

| Tool | Purpose | Cost Tier | Integration Method |
| :--- | :--- | :--- | :--- |
| **Google Drive / Docs** | Collaborative Document Repository for Role Docs | Free (15GB) | Share Link / Google Workspace API |
| **Google Sheets** | Product Backlog, Test Matrix & Marketing KPIs | Free | CSV Sync / Google Sheets API |
| **Google Firebase** | Database (Firestore), Auth, Storage, Hosting | Free Spark Tier | Firebase CLI (`firebase-tools`) |
| **Google Analytics 4** | User Funnel, Reel Engagement & Web Telemetry | Free | GA4 Measurement Script |
| **Google Looker Studio** | Executive Business & Marketing Dashboard | Free | Live Connection to Google Sheets / GA4 |

---

## 🔑 Authentication & Setup Checkpoints (Step-by-Step Prompting)

Whenever authentication or cloud setup is required for any system, the agent will prompt you with detailed instructions. Below are the standard setup procedures:

### Checkpoint 1: Firebase Project & Database Setup
1. **Command to execute**:
   ```bash
   npx -y firebase-tools@latest login
   ```
2. **Action Required**: The terminal will open a browser window asking you to authenticate with your Google account.
3. **Project Initialization**:
   ```bash
   npx -y firebase-tools@latest init firestore hosting
   ```

---

### Checkpoint 2: Google Sheets Live Sync Setup
1. Create a Google Sheet named `Toy_Exchange_Master_Backlog`.
2. Add columns: `ID`, `Role`, `Title`, `Priority`, `Status`, `Assignee`.
3. To enable automated sync, share the sheet with your Service Account email or export as synced CSV.

---

### Checkpoint 3: Google Analytics 4 (GA4) Integration
1. Go to [analytics.google.com](https://analytics.google.com) and create a free Web Data Stream.
2. Copy your `G-XXXXXXXXXX` Measurement ID.
3. Paste the Measurement ID into `index.html` header tag.
