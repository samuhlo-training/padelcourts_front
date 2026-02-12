<div align="center">
  <br />
  <br />

  # <code>PROJECT_STATUS</code>

  **CURRENT_STATE_AND_ROADMAP_OVERVIEW**
  <br />

  ![Version](https://img.shields.io/badge/VERSION-0.1.0_ALPHA-black?style=for-the-badge)
  ![Status](https://img.shields.io/badge/STATUS-ACTIVE_DEVELOPMENT-green?style=for-the-badge)


  <br />
  <br />
</div>

---

### 00 __ SNAPSHOT

> **ABSTRACT:** Real-time Padel Scoring System. Frontend consumes Hono API via REST/WS. Backend manages state in PostgreSQL + Drizzle.
>
> <br />
>
> **LATEST UPDATE:** 2026-02-11
> *Focus: Documentation & Code Cleanup.*

---

### 01 __ CURRENT STATE

| LAYER | COMPONENT | STATUS | NOTES |
| :--- | :--- | :--- | :--- |
| **Frontend** | `Padel Front` | `ACTIVE` | Nuxt 3 + Tailwind + Pinia. Real-time court grid. |
| **Backend** | `Padel API` | `STABLE` | Bun + Hono. WS Pub/Sub operational. |
| **Database** | `PostgreSQL` | `STABLE` | Drizzle ORM. Schema defined & seeded. |
| **IoT** | `Telemetry` | `BETA` | Auth working. Sensor integration WIP. |

<br>

### 02 __ FEATURES ROADMAP

**[P0] AUTHENTICATION & PROFILES**
> Implement JWT auth for players/admins. User profiles with history.

**[P1] TOURNAMENT ENGINE**
> Logic for brackets, round-robin scheduling, and automatic match generation.

**[P2] ADVANCED ANALYTICS**
> SQL Views for aggregation. Player heatmaps (requires expanded telemetry).

**[P3] MEDIA INTEGRATION**
> Link recorded clips to `point_history` timestamps.

<br>

### 03 __ REFACTORING TARGETS

| TYPE | TARGET | ACTION |
| :--- | :--- | :--- |
| **Component** | `CourtStatusCard` | **SPLIT** -> `CourtHeader` + `MatchInfo` + `EmptyState` |
| **Store** | `match.store.ts` | **DECOUPLE** -> Separate Active/Live logic from Historical data |
| **Types** | `shared/types` | **UNIFY** -> Eliminate duplication between front/back |

<br>

<div align="center">
<br />
<code>MAINTAINED BY <a href='https://github.com/samuhlo'>samuhlo</a></code>
</div>
