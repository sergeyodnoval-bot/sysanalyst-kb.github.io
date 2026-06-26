---
id: fintech-reconciliation
title: Сверка данных (Reconciliation) в FinTech
sidebar_label: Сверка данных (Reconciliation)
level: 6
category: specialization
tags: [fintech, reconciliation, payments, settlement, matching, audit]
prerequisites: [specialization/fintech-payments, specialization/fintech-ledger]
leads_to: []
related: [data/etl-basics, data/dwh-basics, architecture/saga-pattern]
estimated_time: 25
difficulty: 5
audience: middle
---

:::info TL;DR
Reconciliation (сверка) — процесс сравнения двух наборов данных, чтобы убедиться, что они совпадают. В FinTech: сверка платежей (наш лог vs отчёт платёжного шлюза), сверка проводок (ledger vs банковская выписка), сверка остатков. Аналитик специфицирует: правила matching, обработку break'ов, периодичность, SLA точности.
:::

## Зачем нужна сверка

Без сверки каждая ошибка — потеря денег:
- Платёж прошёл у нас, но не прошёл у PSP → клиент заплатил, деньги не пришли
- Платёж прошёл у PSP, но не у нас → нужно вернуть клиенту
- Двойное списание → chargeback, штраф
- Ошибка в комиссии → недополученная прибыль

**Требование ЦБ:** обязательная сверка остатков по счетам.

## Что сверять в FinTech

| Что сверяем | С чем сверяем | Периодичность |
|-------------|---------------|---------------|
| Транзакции в нашей БД | Отчёт платёжного шлюза (Stripe, Adyen) | Ежедневно |
| Остатки на счетах | Банковская выписка | Ежедневно |
| Проводки в ledger | Транзакции в operational БД | В реальном времени |
| Комиссии | Договор с PSP | Ежемесячно |
| Возвраты / chargebacks | Отчёт платёжной системы | Ежедневно |
| Баланс (дебет = кредит) | Ledger | Каждая транзакция |

## Как работает сверка

```
Источник A         Источник B
(наша БД)          (PSP report)
     │                  │
     ▼                  ▼
┌─────────────────────────┐
│     Reconciliation      │
│       Engine            │
│                         │
│  Matching (по ключу):   │
│  - exact match          │
│  - amount within допуск │
│  - частичный match      │
│  - не matched (break)   │
└─────────────────────────┘
     │
     ├── ✅ Matched
     ├── ⚠️ Break (не сошлось)
     └── ❌ Orphan (нет пары)
```

### Matching rules

**Exact match:** все поля совпадают (ID, сумма, дата, валюта, статус)

**Amount tolerance:** сумма совпадает с точностью до N копеек (для мультивалютных, курсовых разниц)

**Partial match:** несколько записей из источника A = одна в источнике B (агрегация)

**Time window:** транзакции могут быть в разных временных зонах, match по окну ± 1 день

## Типы break'ов

| Break | Причина | Действие |
|-------|---------|----------|
| **Missing in A** | В нашей БД нет, в PSP есть | Запрос к PSP, возможно необработанный callback |
| **Missing in B** | У нас есть, в PSP нет | Возможно наш duplicate, отменить / вернуть |
| **Amount mismatch** | Суммы разные | Проверить комиссии, курсы, округления |
| **Status mismatch** | У нас success, в PSP declined | Проверить логи, обновить статус |
| **Duplicate** | В одном источнике запись дублируется | Дедупликация |

### Что делать с break'ом

1. **Auto-resolve** — если известна причина (например, комиссия PSP)
2. **Manual review** — создаётся task на оператора
3. **Escalation** — если сумма > N, уведомляется руководитель
4. **SLA:** время разбора break'а — 24 часа для P0 (деньги)

## SLA сверки

| Параметр | Типовое значение |
|----------|-----------------|
| Периодичность | Ежедневно (EOD batch), для real-time — каждые 5 мин |
| Время сверки | < 1 час для 1 млн транзакций |
| Допустимый break rate | < 0.01% от транзакций |
| Время разрешения break'а | 24 часа для P0, 72 часа для P1 |
| Retention отчётов сверки | 3 года |

## Инструменты для сверки

| Уровень | Инструмент | Когда |
|---------|-----------|-------|
| **ETL** | Airflow, dbt | Периодическая загрузка данных для сверки |
| **Database** | SQL (JOIN, EXCEPT) | Простая сверка небольших объёмов |
| **Dedicated** | Norkon, Xceptor, собственный engine | Enterprise-объёмы, сложные правила |
| **ML** | Аномалии в транзакциях | Дополнительно к точному matching |

## Как специфицировать сверку

При проектировании системы аналитик должен определить:

```yaml
Reconciliation Requirements:
  Sources:
    - Наша БД: таблица payments, поля id, amount, status, psp_ref
    - PSP: CSV-отчёт, поля ref, sum, status, fee
  Matching Key:
    - psp_ref (наш ID в системе PSP)
  Rules:
    - exact: id, amount, status
    - tolerance: amount ± 0.01 (для курсовых разниц)
    - time_window: ± 1 день
  Actions:
    - matched: пометить как reconciled
    - break: создать тикет в Jira
    - orphan: запустить ad-hoc запрос к PSP API
  SLA:
    - batch: daily at 03:00
    - completion: < 30 min
    - break resolution: 24h
```

## Ключевые термины

- **Reconciliation** — сверка, сравнение двух источников данных
- **Matching** — поиск соответствия записей по ключу
- **Break** — расхождение, запись без пары или с несовпадающими полями
- **Orphan** — запись из источника A без пары в источнике B
- **Tolerance** — допустимое отклонение суммы (для курсов, комиссий)
- **Auto-resolve** — автоматическое разрешение break'а
- **Settlement report** — отчёт платёжной системы для сверки

## Что дальше

- [Ledger и double-entry](/docs/specialization/fintech-ledger) — как устроены проводки
- [Платёжные системы](/docs/specialization/fintech-payments) — транзакции, которые сверяем
- [ETL](/docs/data/etl-basics) — как загружать данные для сверки

## Проверь себя

1. **Какие бывают типы break'ов при сверке?**
   *Ответ:* Missing in A (нет у нас, есть у PSP), Missing in B (есть у нас, нет у PSP), Amount mismatch, Status mismatch, Duplicate.

2. **Что такое tolerance в сверке и зачем он нужен?**
   *Ответ:* Допустимое отклонение суммы, например ±0.01. Нужен для комиссий, курсовых разниц, округлений.

3. **Какие SLA типичны для сверки?**
   *Ответ:* Batch раз в день, завершение < 30 мин, break rate < 0.01%, разрешение break'а за 24 часа (P0).
