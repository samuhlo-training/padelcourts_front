<div align="center">
  <br />
  <br />

  # <code>BACKEND_SPECS</code>

  **DOCUMENTACIÓN_DE_LA_API_Y_ARQUITECTURA_DEL_SISTEMA**
  <br />

  ![Bun](https://img.shields.io/badge/RUNTIME-BUN_1.x-000000?style=for-the-badge)
  ![Hono](https://img.shields.io/badge/FRAMEWORK-HONO-E36002?style=for-the-badge)
  ![Postgres](https://img.shields.io/badge/DB-POSTGRESQL-336791?style=for-the-badge)


  <br />
  <br />
</div>

---

### 00 __ ARQUITECTURA

```mermaid
graph TB
    subgraph Clients["Clientes"]
        WEB["Aplicación Web"]
        IOT["Cámaras/IoT"]
    end

    subgraph Server["Servidor Bun"]
        HONO["Router Hono"]
        WS["Servidor WebSocket"]
        CTRL["Controladores"]
        ENGINE["PadelEngine"]
    end

    subgraph Storage["Almacenamiento"]
        PG[(PostgreSQL)]
        REDIS[(Upstash Redis)]
    end

    WEB --HTTP--> HONO
    WEB --WS--> WS
    IOT --WS--> WS
    HONO --> CTRL
    WS --> CTRL
    CTRL --> ENGINE
    CTRL --> PG
    HONO --> REDIS
```

| COMPONENTE | TECNOLOGÍA | NOTA |
| :--- | :--- | :--- |
| **Entorno (Runtime)** | `Bun 1.x` | [Native ServerWebSocket] |
| **Router** | `Hono` | [API REST Estándar] |
| **ORM** | `Drizzle` | [Interfaz PostgreSQL] |
| **Caché** | `Redis` | [Upstash / Limitación de tasa (Rate Limiting)] |

<br>

### 01 __ API HTTP

**URL BASE:** `/api`

| MÉTODO | ENDPOINT | DESCRIPCIÓN | TABLA |
| :--- | :--- | :--- | :--- |
| `GET` | `/matches` | Listar partidos | `matches` |
| `POST` | `/matches` | Crear partido | `matches` |
| `POST` | `/matches/:id/point` | Registrar punto | `point_history` |
| `GET` | `/courts` | Estado de las pistas | `courts` |

> **NOTA:** `POST /matches` crea el estado inicial 0-0. `POST /point` gestiona la lógica del juego a través de `PadelEngine`.

<br>

### 02 __ API WEBSOCKET

**URL:** `ws://localhost:8000/ws`
**RATE LIMIT:** 5 sol / 10s por IP.

#### A. TIPOS DE CLIENTE

| TIPO | AUTH | CAPACIDADES |
| :--- | :--- | :--- |
| **Espectador** | `Ninguna` | `SUBSCRIBE`, `REQUEST_STATS` |
| **Dispositivo IoT** | `Token` | `TELEMETRY_EVENT` |

#### B. FLUJO DE MENSAJES (PUBSUB)

```mermaid
flowchart LR
    subgraph Espectador
        SUB["SUBSCRIBE {matchId}"]
    end

    subgraph Server["Servidor"]
        WS["Manejador WS"]
        DB[(DB)]
    end

    subgraph IoT
        TELEM["TELEMETRY {stroke, speed}"]
    end

    TELEM --> WS
    WS --> DB
    WS --"MATCH_UPDATE"--> SUB
```

<br>

### 03 __ FLUJOS DE DATOS

#### 1. PUNTUACIÓN (RUTA CRÍTICA)
1.  **ENTRADA:** `POST /point` O `TELEMETRY_EVENT`
2.  **MOTOR (ENGINE):** `PadelEngine.processPoint(snapshot, side)`
3.  **DB:** Transacción (`INSERT point`, `UPDATE stats`, `UPDATE match`)
4.  **DIFUSIÓN (BROADCAST):** `server.publish(matchId, MATCH_UPDATE)`

#### 2. AUTENTICACIÓN IOT
1.  **ENTRADA:** `AUTH_DEVICE { token }`
2.  **VERIFICACIÓN:** `SELECT * FROM courts WHERE auth_token = ?`
3.  **RESULTADO:** Asociar Socket ID con Court ID.
4.  **ACTIVACIÓN:** Permitir mensajes `TELEMETRY_EVENT`.

<br>

### 04 __ ESQUEMA DE BASE DE DATOS

| TABLA | PK | DESCRIPCIÓN |
| :--- | :--- | :--- |
| `players` | `id` | Nombre, país, ranking |
| `matches` | `id` | Puntuación actual, servidor, estado |
| `courts` | `id` | Token de auth, ref al partido activo |
| `point_history` | `id` | Registro de cada punto (replay) |
| `match_stats` | `id` | Estadísticas granulares por jugador |

<br>

<div align="center">
<br />
<code>DOCUMENTACIÓN MANTENIDA POR <a href='https://github.com/samuhlo'>samuhlo</a></code>
</div>
