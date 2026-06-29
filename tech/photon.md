---
id: photon
title: Photon / Netcode — мультиплеер
sidebar_label: Photon / Netcode
level: 6
category: tech
tags: [gamedev, photon, multiplayer, netcode, realtime]
prerequisites: [specialization/gamedev-matchmaking]
leads_to: [specialization/gamedev-social]
estimated_time: 15
difficulty: 5
audience: middle
---

:::info[TL;DR]
Photon (Exit Games) — популярный сервис для мультиплеера: Photon PUN (Unity), Photon Quantum (deterministic), Photon Chat. Альтернативы: Unity Netcode, Mirror, Nakama, Colyseus. Аналитик выбирает тип синхронизации (authoritative vs peer-to-peer) и архитектуру сессии.
:::

## Типы мультиплеера

| Подход | Описание | Хост | Пример |
|--------|----------|------|--------|
| **P2P** | Peer-to-peer | Один из игроков | Казуальные (до 4) |
| **Client-Server** | Сервер — authority | Выделенный | PvP-игры |
| **Dedicated Server** | Выделенный | Хост | MMO, королевская битва |
| **Photon Cloud** | Photon-хостинг | Облачные сервера | Clash Royale |

## Технологии

| Технология | Описание |
|-----------|----------|
| **Photon PUN** | Unity SDK, простой мультиплеер |
| **Photon Quantum** | Deterministic lockstep (до 64 игроков) |
| **Photon Chat** | Встроенный чат |
| **Unity Netcode** | Первый-party решение от Unity |
| **Mirror** | Open-source альтернатива |

## Что дальше

- [Социальные механики](/docs/specialization/gamedev-social)

## Проверь себя

1. **Какие есть способы организации мультиплеера?**
   *Ответ:* P2P, Client-Server, Dedicated Server, Photon Cloud.
