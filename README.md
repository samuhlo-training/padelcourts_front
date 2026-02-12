<div align="center">
  <br />
  <br />

  # <code>PADELCOURTS_FRONT_APP</code>

  **MODERN_REALTIME_PADEL_SCORING_INTERFACE**
  <br />

  ![Nuxt 3](https://img.shields.io/badge/Nuxt_3-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
  ![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)


  <br />
  <br />
</div>

---

### 00 __ PREVIEW

![Hero Preview](https://github.com/samuhlo/padelcourts_front/raw/main/public/preview.png)

> **ABSTRACT:** A high-performance, real-time frontend for Padel Counters. Delivers live match scores, court status telemetry, and automated commentary via WebSockets.
>
> <br />
>
> **ORIGIN:** Custom Implementation.
> *Built with Screaming Architecture and dedicated IoT integration.*
>
> <br />
>
> **DOCS:** [BACKEND_SPECS](docs/backend/CURRENT_STATE_DOCS.md) | [STATUS](docs/PROJECT_STATUS.md)

---

### 01 __ ARCHITECTURE & DECISIONS

| COMPONENT | TECH | NOTE |
| :--- | :--- | :--- |
| **Core** | `Nuxt 3` | [Server Side Rendering + Static Generation] |
| **Reactive** | `Vue 3` | [Composition API + Script Setup] |
| **State** | `Pinia` | [Modular Stores: Match / Court / WS] |
| **Realtime** | `Native WS` | [Direct implementation, no Socket.io overhead] |
| **Styles** | `Tailwind` | [Utility-first + Phosphor Icons] |

<br>

### 02 __ INSTALLATION

*Run local environment:*

```bash
# 1. Clone
git clone https://github.com/samuhlo/padelcourts_front.git

# 2. Install dependencies (Bun is mandatory)
bun install

# 3. Ignite
bun run dev
```

### 03 __ KEY FEATURES

**REAL-TIME TELEMETRY** -> Instant updates for scores, stats, and court availability.
**BRUTALIST CODEBASE** -> Strict commenting, screaming architecture, no fluff.
**IOT INTEGRATION** -> Seamless handshake with court sensors and cameras.

A. THE HOOK (WebSocket Composable)
Auto-reconnecting websocket client with typed message handling.

```typescript
// [BRUTALIST SNIPPET]
// █ CORE: MESSAGE HANDLER
// =============================================================================
socket.onmessage = (event) => {
  const message: ServerMessage = JSON.parse(event.data);

  switch (message.type) {
    case "MATCH_UPDATE":
      // SYNC -> Update local match state instantly
      menuStore.updateMatch(message.payload);
      break;

    case "COURT_STATUS":
      // REFRESH -> Trigger dashboard grid update
      courtStore.refreshStatus(message.payload);
      break;
      
    // ...
  }
};
```

<div align="center">
<br />

<code>DESIGNED & CODED BY <a href='https://github.com/samuhlo'>samuhlo</a></code>

<small>Lugo, Galicia</small>

</div>
