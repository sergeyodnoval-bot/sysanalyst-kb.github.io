---
id: socnet-messenger
title: Мессенджеры и real-time коммуникации
sidebar_label: Мессенджеры и real-time
level: 7
category: specialization
tags: [socnet, messenger, realtime, chat, websocket]
prerequisites: [specialization/socnet-path]
leads_to: [specialization/socnet-graph, specialization/socnet-moderation]
related: [integration/async-message-queue, architecture/caching]
estimated_time: 25
difficulty: 6
audience: senior
---

:::info[TL;DR]
Мессенджер — real-time система обмена сообщениями. Ключевые компоненты: транспорт (WebSocket, MQTT), хранение (key-value + SQL), доставка (Inbox/Outbox модель), push-уведомления. Аналитик проектирует типы сообщений, статусную модель, E2EE, групповые чаты и интеграции (bots, payments).
:::

## Архитектура мессенджера

```mermaid
flowchart TD
    CLIENT["Клиент"] --> WS["WebSocket Gateway"]
    WS --> ROUT["Message Router"]
    ROUT --> INBOX["Inbox (получатель)"]
    ROUT --> OUTBOX["Outbox (отправитель)"]
    ROUT --> STORE["Message Store<br/>(Cassandra/Scylla)"]
    ROUT --> QUEUE["Offline Queue"]
    QUEUE --> PUSH["Push Notification"]
```

## Типы сообщений

| Тип | Описание |
|-----|----------|
| **Text** | Текстовое сообщение |
| **Image / Video** | Медиавложения |
| **Voice** | Голосовые сообщения |
| **Sticker / GIF** | Анимированные реакции |
| **System** | «Пользователь печатает», «прочитано» |
| **Service** | Боты, переводы, payments |

## Статусы сообщения

```mermaid
flowchart LR
    SENDING["Отправляется"] --> SENT["Отправлено (сервер)"]
    SENT --> DELIVERED["Доставлено (device)"]
    DELIVERED --> READ["Прочитано"]
    SENT --> FAILED["Ошибка"]
```

## Что дальше

- [Социальный граф](/docs/specialization/socnet-graph)
- [Модерация контента](/docs/specialization/socnet-moderation)

## Проверь себя

1. **Как устроена архитектура мессенджера?**
   *Ответ:* WebSocket Gateway → Router → Inbox/Outbox → Message Store → Push.

2. **Какие статусы у сообщения?**
   *Ответ:* Отправляется → Отправлено → Доставлено → Прочитано / Ошибка.
