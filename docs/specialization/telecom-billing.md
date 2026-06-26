---
id: telecom-billing
title: Billing и Charging — тарификация в Telecom
sidebar_label: Billing и Charging
level: 7
category: specialization
tags: [telecom, billing, charging, ocs, rating, cdr]
prerequisites: [specialization/telecom-bss-oss]
leads_to: [specialization/telecom-crm-order, specialization/telecom-mvno]
related: [architecture/saga-pattern, data/dwh-basics]
estimated_time: 25
difficulty: 6
audience: senior
---

:::info[TL;DR]
Billing (выставление счетов) и Charging (тарификация в реальном времени) — ядро Telecom. Pre-paid: деньги списываются сразу. Post-paid: счёт в конце месяца. Аналитик специфицирует тарифные планы, CDR (Call Data Records), роуминг, OCS (Online Charging System) и интеграцию с CRM.
:::

## Pre-paid vs Post-paid

| Параметр | Pre-paid | Post-paid |
|----------|----------|-----------|
| Оплата | Вперёд | В конце месяца |
| Charging | Real-time (OCS) | Batch (Billing) |
| Риск | Нулевой (нет долга) | Есть (должник) |
| Сложность | Выше (real-time) | Ниже |
| Примеры | Yota, Tele2 | Билайн (контракт) |

## Online Charging System (OCS)

OCS — система, которая тарифицирует услугу ДО её оказания (pre-paid).

```mermaid
sequenceDiagram
    participant S as Сеть (PGW/GGSN)
    participant O as OCS

    S->>O: сколько денег?
    O->>O: проверка баланса
    alt достаточно
        O-->>S: квота (500 МБ / 10 мин)
        S->>S: услуга разрешена
    else недостаточно
        O-->>S: отказ
        S->>S: блокировка услуги
    end
    Note over S,O: По исчерпании квоты → новый запрос
```

**Требования к OCS:**
- Время ответа: < 100 ms (иначе звонок оборвётся)
- Пропускная способность: 50 000 TPS (transactions per second)
- Доступность: 99.999%

## CDR — Call Data Records

Каждая операция (звонок, SMS, интернет-сессия) порождает CDR.

```
CDR содержит:
  - MSISDN (номер абонента)
  - IMSI / IMEI
  - Тип: voice / sms / data / roaming
  - Начало / окончание
  - Длительность (для voice)
  - Объём (для data, в байтах)
  - Сторона A / B (кто звонил, кому)
  - Cell ID (базовая станция)
  - Статус (success / failed)
```

**Batch-обработка CDR для post-paid:**

```mermaid
flowchart LR
    CDR["CDR"] --> M["Mediation<br/>(нормализация)"]
    M --> R["Rating<br/>(расчёт стоимости)"]
    R --> G["Guiding<br/>(корректировки)"]
    G --> BL["Billing<br/>(счёт)"]
```

## Тарифные планы (Product Catalog)

Тариф — набор правил тарификации:

```mermaid
flowchart TD
    T["Тариф «Безлимитный 2024»"] --> P1["Пакет: 1000 мин на всех"]
    P1 --> P1E["Сверх пакета: 1.5 ₽/мин"]
    T --> P2["Пакет: 30 ГБ интернета"]
    P2 --> P2E["Сверх пакета: 50 ₽/ГБ"]
    T --> SMS["SMS: 0 ₽ (безлимит)"]
    T --> ZR["Соцсети: 0 ₽ (zero-rating)"]
    T --> AB["Абонентская: 500 ₽/мес"]
    T --> RM["Роуминг: 100 ₽/МБ"]
```

## Charging-сценарии

| Сценарий | Как работает |
|----------|-------------|
| **Звонок (voice)** | OCS: запрос квоты на N минут. По окончании — новый запрос |
| **Интернет (data)** | OCS: квота на N МБ. По окончании — новый запрос |
| **SMS** | OCS: списание фиксированной суммы за SMS |
| **Роуминг** | OCS → HPLMN → VPLMN: межоператорские расчёты (TAP-файлы) |
| **Zero-rating** | OCS не тарифицирует трафик на определённые ресурсы |
| **Family share** | Расход из общего баланса семьи |

## Billing (пост-оплата)

**Процесс:**

```mermaid
flowchart LR
    A["Сбор CDR за месяц<br/>(30 млн для 1M абонентов)"] --> B["Mediation → Rating → Guiding"]
    B --> C["Генерация счетов (invoices)"]
    C --> D["Отправка абонентам<br/>(email, личный кабинет)"]
    D --> E["Списание с карты<br/>(recurring payment)"]
    E --> F["Учёт задолженностей<br/>(debt collection)"]
```

## Требования к Billing/Charging (спецификация)

| Параметр | Пример |
|----------|--------|
| Поддерживаемые типы | Pre-paid, post-paid, hybrid |
| Каналы тарификации | Voice, SMS, Data, Roaming, VAS |
| TPS (charging) | 50 000+ |
| Задержка OCS | < 100 ms |
| Время выставления счёта | < 4 часа на 10M абонентов |
| Retention CDR | 3 года |
| Роуминг | TAP-файлы (входящий/исходящий) |
| Zero-rating | По списку URL/IP |

## Что дальше

- [CRM и Order Management](/docs/specialization/telecom-crm-order)
- [Provisioning](/docs/specialization/telecom-provisioning)

## Проверь себя

1. **Чем pre-paid отличается от post-paid?**
   *Ответ:* Pre-paid — деньги вперёд, real-time charging (OCS). Post-paid — счёт в конце месяца, batch-тарификация.

2. **Как работает OCS?**
   *Ответ:* Сеть запрашивает квоту → OCS проверяет баланс → выдаёт квоту → по исчерпании — новый запрос. Время ответа < 100 ms.

3. **Что такое CDR и как он обрабатывается?**
   *Ответ:* Call Data Record — запись об операции. Процесс: Mediation → Rating → Guiding → Billing.
