# 🚨 Incident Response & Escalation Playbook
**Role Owner**: Operations Lead / SRE  

---

## 🚨 Incident Severity Levels & Response SLA

- **SEV-1 (Critical)**: Platform completely down, security breach, data loss.  
  - *Response SLA*: $< 15$ minutes. Escalated directly to Tech Architect & Lead Dev.
- **SEV-2 (Major)**: Core feature broken (e.g., trade proposal modal failing for all users).  
  - *Response SLA*: $< 1$ hour.
- **SEV-3 (Minor)**: UI alignment bug, single non-critical video failing to load.  
  - *Response SLA*: $< 24$ hours. Routed to next sprint backlog.

---

## 📝 Incident Post-Mortem Template

```markdown
# Incident Post-Mortem: [INCIDENT TITLE]
**Date**: YYYY-MM-DD  
**Severity**: SEV-1 | SEV-2  
**Incident Commander**: Operations Lead  

### 1. Summary & Timeline
- **14:00 UTC**: Alert triggered by UptimeRobot.
- **14:05 UTC**: SRE acknowledged incident and inspected Cloud Logging.
- **14:15 UTC**: Root cause identified (expired Firebase Auth token rule).
- **14:25 UTC**: Fix deployed via Cloud Functions update. Service restored.

### 2. Root Cause Analysis (5 Whys)
- Why did API fail? Auth rule returned 403.
- Why did rule fail? Secret key rotation mismatch in environment variables.

### 3. Action Items to Prevent Recurrence
- [ ] Add automated automated integration check before key deployment.
- [ ] Update staging environment secret rotation script.
```
