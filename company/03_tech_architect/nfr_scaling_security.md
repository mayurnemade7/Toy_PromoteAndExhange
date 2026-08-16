# 🛡️ Non-Functional Requirements (NFRs): Security, Scaling & Latency
**Role Owner**: Tech Architect  

---

## ⚡ 1. Performance & Latency SLA

- **First Contentful Paint (FCP)**: $< 1.0\text{ s}$
- **Largest Contentful Paint (LCP)**: $< 2.2\text{ s}$
- **Video Initial Start Latency**: $< 350\text{ ms}$ via edge caching.
- **API Response P95 Latency**: $< 180\text{ ms}$.

---

## 📈 2. Scalability Architecture

- **Stateless Services**: All backend API endpoints are 100% stateless to allow dynamic scaling from 1 to 50,000+ concurrent instances.
- **Database Partitioning**: Firestore collections are indexed by `geohash` for location queries and `created_at` for chronological feeds.
- **CDN Caching**: Static assets and media files carry 1-year Immutable Cache headers (`Cache-Control: public, max-age=31536000, immutable`).

---

## 🔒 3. Enterprise Security & Hardening Model

### OWASP Top 10 Safeguards:
1. **Input Sanitization & Injection Prevention**: All user HTML inputs sanitized using DOMPurify before storage or rendering.
2. **Authentication & Session Tokens**: HTTP-Only Secure Cookies or Firebase JWT tokens with short expiry (1 hour) and refresh rotation.
3. **CORS & CSP Headers**: Strict Content Security Policy preventing unauthorized script execution or inline evaluation.
4. **Rate Limiting**: API Gateway limits requests to 100 req/min per IP to eliminate Brute Force & Denial of Service attacks.
5. **Firestore Security Rules**: Database rules enforce document ownership (`request.auth.uid == resource.data.ownerId`).

---

## 🔁 4. High Availability & Disaster Recovery (DR)

- **Multi-Region Replication**: Firestore auto-replicates across multi-region clusters ($99.999\%$ availability).
- **Automated Backups**: Daily automated snapshots exported to GCS with 30-day retention.
- **RTO (Recovery Time Objective)**: $< 15$ minutes.
- **RPO (Recovery Point Objective)**: $< 1$ minute.
