---
id: unity
title: Unity / Unreal Engine — игровые движки
sidebar_label: Unity / Unreal
level: 5
category: tech
tags: [gamedev, unity, unreal, engine]
prerequisites: [specialization/gamedev-architecture]
leads_to: [specialization/gamedev-matchmaking]
estimated_time: 15
difficulty: 4
audience: junior
---

:::info[TL;DR]
Unity и Unreal Engine — основные игровые движки. Unity популярен для мобильных и казуальных игр (C#), Unreal — для AAA/PC (C++ + Blueprints). Аналитику полезно понимать возможности движка: что можно сделать на клиенте, что требует сервера, как работают asset bundles и remote config.
:::

## Сравнение

| Параметр | Unity | Unreal Engine |
|----------|-------|---------------|
| **Язык** | C# | C++, Blueprints |
| **Платформы** | Mobile, PC, Console | PC, Console, Mobile |
| **Графика** | Средняя (HDRP/URP) | Высокая (Nanite, Lumen) |
| **Стоимость** | Бесплатно (до $200K) | Бесплатно (royalty 5%) |
| **Mobile** | Лидер | Менее популярен |
| **Asset Store** | Огромный | Marketplace |

## Что важно аналитику

| Аспект | Описание |
|--------|----------|
| **Remote Config** | Управление параметрами без апдейта |
| **Asset Bundles** | Обновление контента без App Store |
| **SDK Integration** | Appsflyer, Firebase, GameAnalytics |
| **A/B Testing** | Data layers, remote config |

## Что дальше

- [Матчмейкинг и игровые сессии](/docs/specialization/gamedev-matchmaking)

## Проверь себя

1. **Какие движки популярны в GameDev?**
   *Ответ:* Unity (мобильные, казуальные, C#) и Unreal Engine (AAA, C++/Blueprints).
