# 🎮 Padel Simulator Service

Este servicio permite simular partidos en tiempo real para probar el Frontend y la integración con WebSockets sin necesidad de jugar partidos reales o tener sensores IoT conectados.

## 🚀 Uso del Simulador

El simulador expone endpoints HTTP que pueden ser llamados desde el Frontend (o Postman/Curl) para iniciar y detener partidos simulados.

### 1. Iniciar Simulación

Crea un partido nuevo con 4 bots y empieza a generar puntos automáticamente cada 3 segundos.

**Endpoint:** `POST /simulator/start`

**Cuerpo (Body):**
```json
{
  "courtId": 1
}
```

**Respuesta:**
```json
{
  "status": "success",
  "message": "Simulation started for court 1"
}
```

**Comportamiento:**
1. Crea 4 jugadores "Bot" si no existen.
2. Crea un partido en estado `live` asignado a la pista indicada.
3. Empieza un bucle infinito que:
   - Genera un punto aleatorio con lógica detallada:
     - **Golpes (Strokes) variados**: Smash, Bandeja, Víbora, Voleas, Globos, etc.
     - **Tipos de punto**: Ganadores (Winners), Errores forzados/no forzados.
     - **Velocidad**: Simula velocidad para remates potentes.
   - **Genera Comentarios (CommentaryBot)**: "¡MISIL DE Bot Alpha! 🚀 Smash a 145km/h".
   - Actualiza la base de datos (Puntuación, historial, estadísticas).
   - **Dispara eventos WebSocket**:
     - `MATCH_UPDATE`: Marcador actualizado.
     - `COMMENTARY`: Nuevo comentario generado.
     - `COURT_UPDATE`: Estado de la pista.

---

### 2. Detener Simulación

Detiene el bucle de generación de puntos para un partido específico.

**Endpoint:** `POST /simulator/stop`

**Cuerpo (Body):**
```json
{
  "matchId": 123
}
```

**Respuesta:**
```json
{
  "status": "success",
  "message": "Simulation stopped for match 123"
}
```

## 🛠️ Configuración (Interna/Desarrollo)

El comportamiento de la simulación se puede ajustar en `services/simulator.ts`:

- `INTERVAL_MS`: Tiempo entre puntos (Predeterminado: 3000ms).
- `PROBABILITY_ERROR`: Probabilidad de error no forzado.
- `PROBABILITY_WINNER`: Probabilidad de ganador (winner).

## ⚠️ Notas Importantes

- El simulador corre en el **mismo proceso** que el servidor backend.
- Utiliza el servicio `MatchService` y el sistema de `Broadcast` real, por lo que **los clientes WebSocket recibirán actualizaciones reales** incluidas las notificaciones de comentarios.
- Los partidos creados se pueden ver en `/courts` y `/matches/:id`.
