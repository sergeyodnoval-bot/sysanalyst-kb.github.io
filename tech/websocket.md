---
id: websocket
title: WebSocket / SSE — real-time протоколы
sidebar_label: WebSocket / SSE
level: 6
category: tech
tags: [socnet, websocket, sse, realtime, protocol]
prerequisites: [specialization/socnet-messenger]
leads_to: [specialization/socnet-graph]
estimated_time: 15
difficulty: 5
audience: middle
---

:::info[TL;DR]
WebSocket — full-duplex протокол поверх TCP для real-time коммуникаций (чаты, уведомления, коллаборация). SSE (Server-Sent Events) — однонаправленный от сервера к клиенту (лента, тикеры). Аналитик выбирает протокол под сценарий: WebSocket для чатов/игр, SSE для ленты/уведомлений, Long Polling для fallback.
:::

## Сравнение

| Параметр | WebSocket | SSE | Long Polling |
|----------|-----------|-----|-------------|
| **Направление** | Full-duplex | Server → Client | Client → Server |
| **Протокол** | ws:// / wss:// | HTTP (text/event-stream) | HTTP |
| **Поток** | Сообщения | Поток событий | Запрос-ответ |
| **Браузер** | W3C API | EventSource API | XMLHttpRequest |
| **Fallback** | Polling / SSE | — | Есть |
| **Подходит** | Чат, игры | Лента, уведомления | Fallback |

## Что дальше

- [Социальный граф](/docs/specialization/socnet-graph)

## Проверь себя

1. **Чем WebSocket отличается от SSE?**
   *Ответ:* WebSocket full-duplex (чат), SSE однонаправленный от сервера (лента).
