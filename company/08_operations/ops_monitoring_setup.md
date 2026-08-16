# 🛠️ Operations & App Monitoring Setup
**Role Owner**: Operations Lead / SRE  
**Scope**: Infrastructure Monitoring, Log Management, Error Tracking & Alerting  

---

## 📊 App Health & Telemetry Stack (Free Tier Setup)

1. **Uptime Monitoring**: UptimeRobot (Free 5-min ping) targeting `GET /api/v1/health`.
2. **Error Logging**: Firebase Crashlytics & Cloud Logging.
3. **Analytics & Performance Tracking**: Google Analytics 4 (Realtime active users & page load times).
4. **Alerting Channels**: Automated Webhooks to Slack / Email on HTTP 5xx error spikes ($>1\%$).

---

## 📈 System Metrics Thresholds

| Metric | Target Normal | Warning Alert Threshold | Critical Emergency Threshold |
| :--- | :--- | :--- | :--- |
| **API Error Rate** | $< 0.05\%$ | $> 1.0\%$ | $> 5.0\%$ |
| **Video CDN Load Time** | $< 350\text{ ms}$ | $> 1000\text{ ms}$ | $> 2500\text{ ms}$ |
| **P99 API Latency** | $< 400\text{ ms}$ | $> 1200\text{ ms}$ | $> 3000\text{ ms}$ |
| **Database Connections** | $< 30\%$ capacity | $> 75\%$ capacity | $> 90\%$ capacity |
