# 📄 API & Data Contracts Specification
**Role Owner**: Tech Architect  
**Sync Target**: Frontend & Backend Engineering  

---

## 🗄️ Core Database Schemas (Firestore JSON Models)

### Collection: `toys`
```json
{
  "id": "toy_88f91a2b",
  "ownerId": "usr_99a18b7c",
  "title": "Vintage Lego Star Wars Millennium Falcon",
  "description": "Mint condition, 100% complete with box and manual.",
  "category": "Building Blocks",
  "ageRange": "8-12 years",
  "condition": "Like New",
  "estimatedValue": 120.00,
  "videoUrl": "https://cdn.toyexchange.com/reels/vid_001.mp4",
  "thumbnailUrl": "https://cdn.toyexchange.com/thumbs/th_001.jpg",
  "tags": ["lego", "starwars", "vintage"],
  "status": "AVAILABLE", // AVAILABLE | IN_TRADE | EXCHANGED
  "location": {
    "city": "San Francisco",
    "state": "CA",
    "geohash": "9q8yy"
  },
  "stats": {
    "likes": 142,
    "views": 2400,
    "shares": 18
  },
  "createdAt": "2026-08-15T12:00:00Z",
  "updatedAt": "2026-08-15T12:00:00Z"
}
```

---

### Collection: `trade_proposals`
```json
{
  "id": "trp_10293847",
  "proposerId": "usr_11111111",
  "receiverId": "usr_99a18b7c",
  "requestedToyId": "toy_88f91a2b",
  "offeredToyIds": ["toy_77a23c4d"],
  "cashTopUp": 15.00,
  "message": "Hi! I have the Lego X-Wing, would love to trade + add $15!",
  "status": "PENDING", // PENDING | ACCEPTED | REJECTED | CANCELLED | COMPLETED
  "createdAt": "2026-08-15T14:30:00Z"
}
```

---

## 🔌 REST / GraphQL API Endpoint Specifications

### 1. `GET /api/v1/reels`
- **Query Params**: `limit` (default: 10), `category`, `geohash`, `cursor`
- **Response**:
```json
{
  "status": "success",
  "data": {
    "reels": [ /* Array of Toy Objects */ ],
    "nextCursor": "toy_88f91a2b_17894678"
  }
}
```

### 2. `POST /api/v1/trades/propose`
- **Headers**: `Authorization: Bearer <JWT>`
- **Payload**:
```json
{
  "requestedToyId": "toy_88f91a2b",
  "offeredToyIds": ["toy_77a23c4d"],
  "cashTopUp": 15.00,
  "message": "Trade proposal message"
}
```
