---
id: unity
title: Unity / Unreal Engine — игровые движки
sidebar_label: Unity / Unreal
type: technology
tech_type: tool
level: 5
category: tech
tags: [gamedev, unity, unreal, engine, rendering, ecs, asset-bundles]
prerequisites: [specialization/gamedev-architecture]
leads_to: [specialization/gamedev-matchmaking]
estimated_time: 30
difficulty: 4
audience: junior
official_url: https://docs.unity3d.com/Manual/
version: "Unity 6 / Unreal 5.5"
requires_articles: [specialization/gamedev-architecture]
used_in_tasks: [gamedev-matchmaking-flow]
alternatives: [unreal-engine, godot, custom-engine]
---

:::info[TL;DR]
Unity и Unreal Engine — два доминирующих игровых движка. **Unity** (C#, .NET) — лидер мобильных и казуальных игр, выбор для стартапов. **Unreal Engine** (C++, Blueprints) — стандарт AAA-индустрии (ПК/консоли). Аналитику важно понимать возможности движка: что можно сделать на клиенте, что требует сервера, как работают asset bundles, remote config и SDK-интеграции. Выбор движка определяет стек технологий, стоимость разработки и состав команды.
:::

## Что это и зачем

### Unity (Unity Technologies)

Unity — самый популярный игровой движок в мире (60%+ мобильных игр). Работает на C# с компиляцией через IL2CPP в нативный код.

**Ключевые возможности:**
- **Render Pipeline:** Built-in (legacy), URP (Universal Render Pipeline) — для mobile, HDRP (High Definition) — для PC/консолей
- **DOTS/ECS** (Data-Oriented Tech Stack) — архитектура Entity-Component-System для производительных симуляций
- **Addressables** — асинхронная загрузка ассетов с управлением памятью
- **Asset Bundles** — загрузка контента без перевыпуска через App Store
- **IL2CPP** — компиляция C# в C++, затем в нативный код (лучше производительность, но дольше сборка)
- **Unity Gaming Services** — Cloud Save, Multiplayer, Economy, Ads — единая экосистема

**На чём сделан:** Genshin Impact (мобильная версия — Unity), Pokémon GO, Hearthstone, Hollow Knight, Among Us, Call of Duty: Mobile

### Unreal Engine (Epic Games)

Unreal Engine — движок для визуально впечатляющих игр (AAA). Работает на C++ с визуальным скриптингом Blueprints.

**Ключевые возможности:**
- **Nanite** — виртуальная геометрия: миллионы полигонов без LOD
- **Lumen** — динамическое глобальное освещение в реальном времени
- **Chaos Physics** — физика разрушений, cloth, fluids
- **Blueprints** — визуальный скриптинг (без C++)
- **MetaSounds** — процедурный аудио-движок
- **Control Rig** — анимационные риги с процедурной анимацией

**На чём сделан:** Fortnite, PUBG (оригинал), Gears 5, Hellblade 2, Black Myth: Wukong, Tekken 8

## Детальное сравнение

| Параметр | Unity | Unreal Engine |
|----------|-------|---------------|
| **Язык** | C# (IL2CPP → C++) | C++, Blueprints (визуальный) |
| **Основная платформа** | Mobile (iOS/Android) | PC, Console, Mobile (менее оптимизирован) |
| **Рендеринг** | URP (mobile), HDRP (PC) | Nanite + Lumen (out-of-the-box) |
| **Графика** | Средняя (с HDRP — достойно) | Высокая (AAA-стандарт) |
| **ECS / Data-oriented** | DOTS (Unity 2020+) | MassEntity (UE5+) |
| **Сеть/Multiplayer** | Netcode for GameObjects + Transport | Unreal Multiplayer (RPC, Replication, Server Travel) |
| **Asset store** | Unity Asset Store (огромный) | Fab (ранее — Unreal Marketplace) |
| **Стоимость** | Personal: бесплатно (до $200K revenue); Pro: $2K/год/сиденье | Бесплатно, 5% royalty после $1M (per-game) |
| **Source code** | Доступен только в Enterprise | Полный C++ исходный код (доступен всем) |
| **Learning curve** | Низкая (C# проще) | Высокая (C++ сложнее, но Blueprints помогают) |
| **Community** | Большая, много туториалов | Меньше, но выше качество |

## Когда что выбирать

| Сценарий | Рекомендация | Почему |
|----------|-------------|--------|
| **Мобильная F2P-игра** | Unity | URP оптимален для mobile, огромное количество готовых ассетов, Asset Bundles для LiveOps |
| **AAA-action на ПК/консоли** | Unreal Engine | Nanite + Lumen дают графику следующего поколения, полный контроль над исходниками |
| **Инди-игра 2D** | Unity | Лучший 2D-тулчейн (Tilemap, Sprite Shape, 2D Light) |
| **Hyper-casual** | Unity | Минимальный билд, быстрая итерация, SDK-интеграции |
| **Battle Royale / 100 игроков** | Unreal Engine | Встроенный мультиплеер, Dedicated Server, оптимизация под большую сетку |
| **Симулятор / Фотореализм** | Unreal Engine | Nanite + Lumen + MetaSounds |
| **Cross-platform (Mobile + PC)** | Unity | Один проект, разные платформы, меньше переделок |

## Архитектура Unity-проекта (для аналитика)

```
Assets/
├── Scripts/           # C#-скрипты
│   ├── GameLogic/     # Core loop, economy
│   ├── UI/            # Интерфейсы
│   ├── Network/       # Photon / Netcode
│   └── Analytics/     # AppsFlyer, Firebase
├── Resources/         # Asset Bundles для Remote Config
├── AddressableAssets/ # Addressables groups
├── Prefabs/           # Шаблоны объектов
└── Settings/          # Remote Config default values
```

**Ключевые файлы для аналитика:**
- `ScriptableObjects` — данные валют, предметов, уровней (редактируются в Unity)
- `Remote Config` — параметры, меняющиеся без апдейта (цены IAP, сложность)
- `Build Settings` — настройки платформы, билд номера
- `PlayerSettings` — идентификатор приложения, версии SDK

## Remote Config и A/B тесты

Remote Config — ключевая фича для LiveOps:

```json
{
  "economy": {
    "gold_per_battle": 80,
    "energy_regen_sec": 300,
    "starter_pack_price": 0.99
  },
  "levels": {
    "difficulty_multiplier": 1.0,
    "boss_hp_scale": 1.2
  },
  "promo": {
    "show_offer_on_level": 3,
    "offer_discount": 70
  }
}
```

**Как использовать:** аналитик меняет JSON → игра подтягивает при рестарте (или в реальном времени) → можно A/B тестировать любые параметры без апдейта клиента.

## Asset Bundles и контент без апдейта

Механика обновления контента без App Store Review:

1. Разработчик собирает Asset Bundle (модели, текстуры, UI)
2. Загружает на CDN (AWS S3, CloudFront)
3. Игра при запуске проверяет версию Remote Config
4. Если новая версия — скачивает Bundle в фоне
5. **App Store Review не требуется** — контент подгружается динамически

**Используется для:** ивент-бандлов, новых скинов, сезонного контента.

## Что важно аналитику про движки

1. **Unity = мобильный фокус.** 60%+ мобильных игр на Unity. Если твоя игра mobile-first — почти наверняка Unity.
2. **Unreal = AAA.** Если твоя игра — с открытым миром, фотореализмом, 100+ игроков — Unreal.
3. **Remote Config = твой лучший друг.** Все A/B тесты и ивенты делаются через него.
4. **Asset Bundles = контент без апдейта.** Экономит время на App Store Review (1–3 дня).
5. **Аддоны (Addressables) — стандарт.** С 2020 года Unity рекомендует Addressables вместо старых Asset Bundles.

## Ссылки для самостоятельного изучения

| Ресурс | Описание | Ссылка |
|--------|----------|--------|
| Unity Manual | Полная документация движка (все модули) | https://docs.unity3d.com/Manual/ |
| Unity Scripting API | C# API для всех компонентов | https://docs.unity3d.com/ScriptReference/ |
| Unity Asset Store | Готовые ассеты, SDK, плагины | https://assetstore.unity.com/ |
| Unreal Engine Documentation | Официальная документация UE5 | https://docs.unrealengine.com/ |
| Unreal Blueprints Tutorial | Визуальный скриптинг для начинающих | https://docs.unrealengine.com/5.4/en-US/blueprints-visual-scripting/ |
| Netcode for GameObjects | Мультиплеер Unity — официальный гайд | https://docs.unity3d.com/Packages/com.unity.netcode.gameobjects@latest/ |
| Unity DOTS/ECS | Data-Oriented Tech Stack — документация | https://docs.unity3d.com/Packages/com.unity.entities@latest/ |
| Unreal Multiplayer | Сетевой мультиплеер UE5 | https://docs.unrealengine.com/5.4/en-US/networking-and-multiplayer-in-unreal-engine/ |
| Learn Unity (Unity Learn) | Интерактивные курсы от Unity | https://learn.unity.com/ |
| Unreal Online Learning | Официальные курсы от Epic Games | https://dev.epicgames.com/community/unreal-engine/learning |

## Проверь себя

1. **Когда выбирают Unity, а когда Unreal?**
   *Ответ:* Unity — мобильные/казуальные, C#, быстрая разработка. Unreal — AAA, фотореализм, C++/Blueprints, крупные сетевые проекты.

2. **Что такое Remote Config и зачем он нужен аналитику?**
   *Ответ:* Управление параметрами игры без перевыпуска (A/B тесты, ивенты, цены). Задаётся JSON — игра подтягивает при старте.

3. **Как работают Asset Bundles / Addressables?**
   *Ответ:* Контент собирается в бандл, загружается на CDN, игра скачивает без App Store Review. Используется для скинов, ивентов, сезонного контента.

4. **Какая рендер-пайплайн в Unity используется для mobile?**
   *Ответ:* URP (Universal Render Pipeline) — оптимизирован для мобильных устройств. HDRP — для ПК/консолей.

5. **Что такое IL2CPP в Unity?**
   *Ответ:* Компилятор C# → C++ → нативный код. Даёт лучшую производительность и защиту от reverse engineering, но увеличивает время сборки.
