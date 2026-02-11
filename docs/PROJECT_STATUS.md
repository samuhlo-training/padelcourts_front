# 📊 PROJECT STATUS: PADEL COUNTERS

> **Last Updated:** 2026-02-11
> **Version:** 0.1.0-alpha

---

## 🏗️ Current App State

### Frontend (Nuxt 3 + Vue 3)
- **Pages:**
  - `/courts`: Real-time court status (Main Dashboard).
  - `/matches`: Live match tracking and history.
  - `/history`: Detailed match archives.
- **State Management:** Pinia stores for `courts`, `matches`, and `websocket`.
- **Real-time:** WebSocket integration for live score updates and court status changes.
- **UI:** Tailwind CSS + Phosphor Icons. Bento Grid layout for courts.

### Backend (Bun + Hono)
- **API:** REST endpoints for Matches, Courts, and Commentary.
- **Database:** PostgreSQL with Drizzle ORM.
- **Real-time:** Native Bun WebSockets with Pub/Sub for specific match channels.
- **IoT Integration:** Auth token system for court cameras/sensors.

---

## 🚀 Potential Features (Roadmap)
- **Authentication:** User login for players and admins (currently stateless/mock).
- **Tournament Mode:** Logic for brackets, round-robin, and automated scheduling.
- **User Profiles:** Stats tracking, match history per user, and ranking visualization.
- **Media Integration:** Link recorded video clips to specific points in `point_history`.
- **Advanced Telemetry:** Heatmaps of player positions (requires IoT expansion).

---

## 🛠️ Refactoring Opportunities
- **Component Extraction:**
  - `CourtStatusCard` is becoming large; split into `CourtHeader`, `MatchInfo`, and `EmptyState`.
  - Extract specific "ScoreBoard" components from `MatchDetail`.
- **Store Optimization:**
  - `match.store.ts`: Better separation between "active match" (live) and "historical match" (static).
- **Type Safety:**
  - Align frontend `types/index.ts` strictly with backend `shared/types` to avoid duplication.

---

## 🔌 Backend Improvements
- **Expanded Telemetry:** Handle more complex stroke types (e.g., "Bandeja", "Vibora").
- **Analytics Engine:** Create SQL views for aggregations (e.g., "Unforced Errors per Set") to speed up stats endpoints.
- **Better Logging:** Implement structured logging (JSON) for production observability.
