# 📊 Test Cases Execution Matrix
**Role Owner**: QA & Testing Lead  

---

## 🧪 Functional Test Cases

| Case ID | Feature Area | Description | Expected Result | Automated/Manual | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `TC-101` | Reel Video Player | Autoplay on viewport enter | Video starts playing within 300ms without sound glitch | Automated | PASS |
| `TC-102` | Mute Toggle | Tap sound icon | Audio toggles between muted and unmuted cleanly | Manual | PASS |
| `TC-103` | Swipe Up | Swipe gesture upwards | Smooth transition to next reel; previous video pauses | Automated | PASS |
| `TC-104` | Trade Proposal | Tap "Propose Trade" | Modal opens displaying inventory list | Manual | PASS |
| `TC-105` | Empty Inventory | Propose trade with 0 toys | Show message "Add a toy to your collection first!" | Manual | PASS |

---

## ⚡ Edge Cases & Stress Tests

- **Network Offline Mode**: Turn off network mid-swipe $\rightarrow$ UI must display "Offline Mode: Retrying Connection" toast without crashing.
- **Malformed Video URL**: Supply invalid video stream URI $\rightarrow$ Player falls back gracefully to high-res thumbnail with error icon.
