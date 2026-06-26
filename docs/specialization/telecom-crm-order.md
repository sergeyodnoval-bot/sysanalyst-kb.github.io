---
id: telecom-crm-order
title: CRM и Order Management в Telecom
sidebar_label: CRM и Order Management
level: 6
category: specialization
tags: [telecom, crm, order-management, customer]
prerequisites: [specialization/telecom-bss-oss]
leads_to: [specialization/telecom-provisioning]
related: [integration/api-design-detailed, requirements/user-stories]
estimated_time: 20
difficulty: 5
audience: middle
---

:::info[TL;DR]
CRM в Telecom — не просто контакты, а управление жизненным циклом абонента: регистрация, смена тарифа, блокировка, отключение, MNP (перенос номера). Order Management — заказы на услуги, которые идут в Provisioning и далее в сеть.
:::

## Жизненный цикл абонента в CRM

```mermaid
flowchart LR
    R["Регистрация"] --> A["Активация"] --> S["Обслуживание"] --> B["Блокировка"] --> D["Отключение"]
    R --> R1["Анкета<br/>Паспорт<br/>Идентиф. (KYC)"]
    A --> A1["Выбор тарифа<br/>SIM активация"]
    S --> S1["Смена тарифа<br/>Подключение услуг<br/>MNP"]
    B --> B1["Долг (voluntary)<br/>Блокировка (involuntary)"]
    D --> D1["Расторжение договора<br/>Переход к другому<br/>оператору (MNP)"]
```

### Ключевые процессы CRM

| Процесс | Описание |
|---------|----------|
| **Новый абонент** | Регистрация, KYC, выбор тарифа, выдача SIM |
| **MNP (перенос)** | Перенос номера от другого оператора (через ЦСП) |
| **Смена тарифа** | Изменение тарифного плана (немедленно/след. месяц) |
| **Блокировка** | Добровольная (потеря SIM) / принудительная (долг) |
| **Роуминг** | Включение/отключение роуминга |
| **Отключение** | Расторжение договора, MNP к другому оператору |

## Order Management в Telecom

Заказы в Telecom отличаются от e-commerce — они активируют услуги в сети.

```
Order
 ├── id
 ├── subscriber (MSISDN, IMSI)
 ├── type: activation / change_tariff / add_service / deactivation / mnp
 ├── items:
 │    ├── service: "Безлимитный интернет 30 ГБ"
 │    ├── tariff_id: T-2024-01
 │    └── parameters: {start_date, end_date, auto_renew}
 ├── status: NEW → VALIDATED → IN_PROGRESS → COMPLETED → FAILED
 └── external_ref: provisioning_id
```

### Типы заказов

| Тип заказа | Описание | SLA |
|------------|----------|-----|
| **Активация SIM** | Новый абонент | < 5 мин |
| **Смена тарифа** | Изменение тарифного плана | < 1 мин |
| **Подключение услуги** | Добавление опции (100 ГБ интернета) | < 1 мин |
| **Блокировка** | Блокировка по request | < 1 мин |
| **MNP** | Перенос номера | < 24 часа (по закону) |
| **Отключение** | Расторжение договора | < 24 часа |

## Fulfillment — сквозной процесс

```mermaid
sequenceDiagram
    participant CRM
    participant OM as Order Management
    participant PR as Provisioning
    participant NW as Network
    participant BL as Billing

    CRM->>OM: создание заказа на активацию
    OM->>OM: Есть ли свободный номер? Ресурсы сети?
    OM->>PR: активировать тариф X на номере Y
    PR->>NW: настройка HLR/HSS, PGW, OCS
    NW-->>PR: подтверждение
    PR-->>OM: заказ выполнен
    OM->>BL: начать тарификацию
    OM->>CRM: абонент активен, отправить SMS
```

## Требования к CRM/OM (спецификация)

| Параметр | Пример |
|----------|--------|
| Абонентов | 10M+ |
| Заказов в день | 100 000+ |
| Время выполнения | < 5 мин (активация) |
| Интеграции | Provisioning, Billing, OCS, Network |
| MNP | Через ЦСП (система переноса нумерации) |
| KYC | Проверка паспорта, ЕСИА |
| Compliance | 152-ФЗ, СОРМ, anti-fraud |

## Что дальше

- [Provisioning и активация услуг](/docs/specialization/telecom-provisioning)
- [Регуляторика в Telecom](/docs/specialization/telecom-regulations)

## Проверь себя

1. **Какие этапы проходит абонент в CRM?**
   *Ответ:* Регистрация → Активация → Обслуживание → Блокировка → Отключение (MNP).

2. **Чем Order Management в Telecom отличается от e-commerce OMS?**
   *Ответ:* Заказы в Telecom активируют услуги в сети (через Provisioning), а не просто меняют статус заказа.

3. **Что такое MNP и какой SLA?**
   *Ответ:* Mobile Number Portability — перенос номера к другому оператору. SLA: < 24 часа.
