<div align="center">
  <br />
  <br />

  # <code>PADELCOURTS_FRONT_APP</code>

  **INTERFAZ_DE_PUNTUACIÓN_DE_PÁDEL_MODERNA_Y_EN_TIEMPO_REAL**
  <br />

  ![Nuxt 3](https://img.shields.io/badge/Nuxt_3-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
  ![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)


  <br />
  <br />
</div>

---

### 00 __ VISTA PREVIA

![Hero Preview](https://github.com/samuhlo/padelcourts_front/raw/main/public/preview.png)

> **ABSTRACT** Un frontend de alto rendimiento y en tiempo real para Padel Counters. Ofrece marcadores de partidos en vivo, telemetría del estado de las pistas y comentarios automatizados a través de WebSockets.
>
> <br />
>
> **ORIGEN:** Implementación personalizada.
> *Construido con Screaming Architecture e integración dedicada de IoT.*
>
> <br />
>
> **DOCS:** [ESPECIFICACIONES_BACKEND](docs/backend/CURRENT_STATE_DOCS.md) | [ESTADO](docs/PROJECT_STATUS.md)

---

### 01 __ ARQUITECTURA Y DECISIONES

| COMPONENTE | TECNOLOGÍA | NOTA |
| :--- | :--- | :--- |
| **Core** | `Nuxt 3` | [Server Side Rendering + Static Generation] |
| **Punt de vista reactivo** | `Vue 3` | [Composition API + Script Setup] |
| **Estado** | `Pinia` | [Stores Modulares: Match / Court / WS] |
| **Tiempo Real** | `Native WS` | [Implementación directa, sin sobrecarga de Socket.io] |
| **Estilos** | `Tailwind` | [Utility-first + Phosphor Icons] |

<br>

### 02 __ INSTALACIÓN

*Ejecutar entorno local:*

```bash
# 1. Clonar
git clone https://github.com/samuhlo/padelcourts_front.git

# 2. Instalar dependencias (Bun es obligatorio)
bun install

# 3. Lanzar
bun run dev
```

### 03 __ CARACTERÍSTICAS CLAVE

**TELEMETRÍA EN TIEMPO REAL** -> Actualizaciones instantáneas de puntuaciones, estadísticas y disponibilidad de pistas.
**CÓDIGO BRUTALISTA** -> Comentarios estrictos, screaming architecture, sin rellenos.
**INTEGRACIÓN IOT** -> Handshake fluido con sensores de pista y cámaras.

A. EL HOOK (WebSocket Composable)
Cliente websocket con reconexión automática y manejo de mensajes tipados.

```typescript
// [FRAGMENTO BRUTALISTA]
// █ CORE: MANEJADOR DE MENSAJES
// =============================================================================
socket.onmessage = (event) => {
  const message: ServerMessage = JSON.parse(event.data);

  switch (message.type) {
    case "MATCH_UPDATE":
      // SINCRONIZACIÓN -> Actualizar el estado local del partido instantáneamente
      menuStore.updateMatch(message.payload);
      break;

    case "COURT_STATUS":
      // REFRESCO -> Disparar la actualización de la cuadrícula del dashboard
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
