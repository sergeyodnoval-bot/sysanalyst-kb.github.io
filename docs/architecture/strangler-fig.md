---
id: strangler-fig
sidebar_position: 12
title: "Strangler Fig — миграция legacy"
sidebar_label: "Strangler Fig"
level: 7
category: architecture
tags: [architecture, l4, senior, strangler-fig, migration, legacy, monolith]
prerequisites: [architecture/monolith-vs-microservices]
leads_to: []
related: [data/data-migration, architecture/hexagonal-architecture, architecture/microservices-patterns]
estimated_time: 30
difficulty: 7
---

# Strangler Fig — миграция legacy

Strangler Fig (или Strangler Pattern) — это стратегия постепенной замены legacy-системы на новую **без простоев и big-bang миграции**.

Название происходит от одноимённого дерева-душителя (фикус-душитель), которое прорастает вокруг дерева-хозяина и постепенно заменяет его.

## Проблема

Legacy-систему нельзя переписать «с нуля» за один раз:
- Миллионы строк кода
- Тысячи пользователей, которые не могут ждать
- Бизнес-логика, которую никто полностью не знает
- Риск остановки бизнеса

## Как работает Strangler Fig

```
  Stage 0: legacy работает полностью
  ┌───────────────────────────────────┐
  │          Legacy System            │
  │  ┌─────┐ ┌─────┐ ┌─────┐        │
  │  │Модуль│ │Модуль│ │Модуль│  ... │
  │  │  A   │ │  B   │ │  C   │      │
  │  └─────┘ └─────┘ └─────┘        │
  └───────────────────────────────────┘

  Stage 1: модуль A вынесен
  ┌──────────────────────┐  ┌────────┐
  │   New Service        │  │ Legacy │
  │  ┌────────────────┐  │  │ ┌─────┐│
  │  │ Module A (new) │  │  │ │  B  ││
  │  └────────────────┘  │  │ │  C  ││
  │        Router        │  │ └─────┘│
  └──────────────────────┘  └────────┘

  Stage N: legacy полностью заменён
  ┌───────────────────────────────────┐
  │    New System (microservices)     │
  │  ┌─────┐ ┌─────┐ ┌─────┐        │
  │  │  A  │ │  B  │ │  C  │  ...   │
  │  └─────┘ └─────┘ └─────┘        │
  └───────────────────────────────────┘
```

## Ключевые элементы

### 1. Router (маршрутизатор)

Прослойка (API Gateway / reverse proxy), которая направляет запросы либо в legacy, либо в новый сервис — в зависимости от URL, заголовка или feature flag.

```
         ┌─────────┐
         │  Router  │
         └────┬─────┘
              │
       ┌──────┴──────┐
       ▼              ▼
   ┌────────┐   ┌──────────┐
   │ Legacy │   │ New Svc  │
   └────────┘   └──────────┘
```

### 2. Feature Flags

Позволяют включать новый сервис для части пользователей (по id, региону, плану).

### 3. Anti-Corruption Layer (ACL)

Защищает новый сервис от legacy-модели. Трансформирует данные между старой и новой схемой.

### 4. Parallel Run

Новый сервис запускается параллельно, но трафик ещё не перенаправлен. Сравниваются результаты.

## Пошаговый процесс

1. **Identify** — найти подходящий модуль для первой итерации (слабо связанный, понятная логика)
2. **Extract** — вынести логику в новый сервис (с ACL)
3. **Route** — настроить маршрутизацию на новый сервис
4. **Monitor** — сравнить error rate, latency, результаты
5. **Remove** — удалить старый модуль из legacy (или отключить маршрут)
6. **Repeat** — следующий модуль

## Когда использовать

- **Огромный монолит** — 500k+ строк кода
- **Нет полного понимания** — логика восстанавливается в процессе
- **Нельзя остановить** — 24/7 система (banking, e-commerce)
- **Постепенная миграция на микросервисы**

Когда **НЕ** использовать:
- Маленькая система (проще переписать за месяц)
- Систему можно остановить на weekend (big bang дешевле)

## Риски

- **Долго** — миграция может занять годы
- **Router overhead** — каждая операция проверяет, куда идти
- **Разные модели** — согласование данных между старым и новым
- **Двойная стоимость** — пока оба живут, платим за обе инфраструктуры
- **Потеря знаний** — эксперты legacy могут уволиться до завершения

## Пример: Amazon

Amazon мигрировала с монолита на микросервисы именно через Strangler Fig. Каждая команда «откусывала» кусок функциональности и превращала в отдельный сервис. Миграция заняла несколько лет.

## Связь с другими паттернами

| Паттерн | Связь |
|---------|-------|
| **Anti-Corruption Layer** | обязательный компонент strangler fig |
| **Big-Bang** | противоположная стратегия («всё сразу») |
| **Trickle Migration** | похожая стратегия для данных |
| **Feature Flags** | включают новый сервис постепенно |
| **Parallel Run** | доверие к новому сервису до переключения |

## Ссылки

- [StranglerFigApplication (Martin Fowler)](https://martinfowler.com/bliki/StranglerFigApplication.html)
- [Strangler Fig pattern (Microsoft)](https://docs.microsoft.com/en-us/azure/architecture/patterns/strangler-fig)
- [Миграция монолита: Amazon story](https://aws.amazon.com/blogs/enterprise-strategy/how-amazon-migrated-from-a-monolithic-application-to-microservices/)
- [Feature Flags для Strangler Fig](https://launchdarkly.com/blog/the-strangler-fig-pattern-and-feature-flags/)
- [Strangler Fig — по-русски](https://habr.com/ru/company/avito/blog/562976/)
