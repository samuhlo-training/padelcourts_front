<div align="center">
  <br />
  <br />

  # <code>PROJECT_STATUS</code>

  **RESUMEN_DE_ESTADO_ACTUAL_Y_HOJA_DE_RUTA**
  <br />

  ![Version](https://img.shields.io/badge/VERSION-0.1.0_ALPHA-black?style=for-the-badge)
  ![Status](https://img.shields.io/badge/STATUS-ACTIVE_DEVELOPMENT-green?style=for-the-badge)


  <br />
  <br />
</div>

---

### 00 __ SNAPSHOT

> **ABSTRACT:** Sistema de puntuación de pádel en tiempo real. El frontend consume una API Hono vía REST/WS. El backend gestiona el estado en PostgreSQL + Drizzle.
>
> <br />
>
> **ÚLTIMA ACTUALIZACIÓN:** 2026-02-11
> *Enfoque: Documentación y limpieza de código.*

---

### 01 __ ESTADO ACTUAL

| CAPA | COMPONENTE | ESTADO | NOTAS |
| :--- | :--- | :--- | :--- |
| **Frontend** | `Padel Front` | `ACTIVO` | Nuxt 3 + Tailwind + Pinia. Cuadrícula de pistas en tiempo real. |
| **Backend** | `Padel API` | `ESTABLE` | Bun + Hono. WS Pub/Sub operativo. |
| **Base de Datos** | `PostgreSQL` | `ESTABLE` | Drizzle ORM. Esquema definido y poblado (seeded). |
| **IoT** | `Telemetría` | `BETA` | Auth funcionando. Integración de sensores en progreso (WIP). |

<br>

### 02 __ HOJA DE RUTA (ROADMAP)

**[P0] AUTENTICACIÓN Y PERFILES**
> Implementar autenticación JWT para jugadores/administradores. Perfiles de usuario con historial.

**[P1] MOTOR DE TORNEOS**
> Lógica para cuadros (brackets), programación round-robin y generación automática de partidos.

**[P2] ANALÍTICA AVANZADA**
> Vistas SQL para agregación. Mapas de calor de jugadores (requiere telemetría ampliada).

**[P3] INTEGRACIÓN MULTIMEDIA**
> Vincular clips grabados con marcas de tiempo en `point_history`.

<br>

### 03 __ OBJETIVOS DE REFACTORIZACIÓN

| TIPO | OBJETIVO | ACCIÓN |
| :--- | :--- | :--- |
| **Componente** | `CourtStatusCard` | **DIVIDIR** -> `CourtHeader` + `MatchInfo` + `EmptyState` |
| **Store** | `match.store.ts` | **DESACOPLAR** -> Separar lógica activa/en vivo de datos históricos |
| **Tipos** | `shared/types` | **UNIFICAR** -> Eliminar duplicidad entre front/back |

<br>

<div align="center">
<br />
<code>MANTENIDO POR <a href='https://github.com/samuhlo'>samuhlo</a></code>
</div>
