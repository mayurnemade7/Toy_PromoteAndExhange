# 📋 Product Backlog & User Stories Matrix
**Role Owner**: Product Owner  
**Sync Target**: Developers & QA Team  

---

## 🟢 Ready for Development (Sprint 1)

### US-001: Infinite Reel Feed & Video Player
- **Priority**: P0 (Blocker for Launch)
- **Points**: 5
- **Description**: As a visitor, I want to scroll vertically through toy reels so that I can discover available toys instantly.
- **Acceptance Criteria**:
  - Auto-play video when reel enters viewport.
  - Show seller avatar, toy title, category tag, and price/condition badge overlay.
  - Mute/Unmute sound control on tap.
- **Dev Task Ref**: `DEV-101` | **QA Ref**: `QA-201`

### US-002: Trade Proposal Modal & Inventory Picker
- **Priority**: P0 (Core Value)
- **Points**: 8
- **Description**: As a registered user, I want to tap "Propose Trade" on any toy reel and pick an item from my inventory to offer in exchange.
- **Acceptance Criteria**:
  - Opening modal fetches current user's listed toys.
  - Allows selecting 1 or more toys + optional cash adjustment amount.
  - Triggers push/email notification to toy owner.
- **Dev Task Ref**: `DEV-102` | **QA Ref**: `QA-202`

---

## 🟡 Refinement Pipeline (Sprint 2)

### US-003: User Profile & Verified Parent Badge
- **Priority**: P1
- **Points**: 3
- **Description**: Users can verify phone/email to receive a "Verified Community Member" badge.

### US-004: Category & Location Distance Filter
- **Priority**: P1
- **Points**: 5
- **Description**: Users can filter reels by Distance (e.g. within 5 miles), Age Range (0-3 yrs, 4-7 yrs, 8+ yrs), and Toy Category.
