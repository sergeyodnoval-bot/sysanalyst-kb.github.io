---
id: telecom-bss-oss
title: BSS/OSS — архитектура Telecom-систем
sidebar_label: BSS/OSS архитектура
level: 6
category: specialization
tags: [telecom, bss, oss, architecture, enterprise]
prerequisites: [specialization/telecom-path]
leads_to: [specialization/telecom-billing, specialization/telecom-crm-order]
related: [integration/enterprise-integration-patterns, architecture/microservices-patterns]
estimated_time: 20
difficulty: 5
audience: middle
---

:::info[TL;DR]
Архитектура Telecom делится на BSS (Business Support Systems) и OSS (Operations Support Systems). BSS отвечает за абонентов, тарифы, биллинг, заказы. OSS — за оборудование сети, активацию услуг и мониторинг. Стандарты: TM Forum (eTOM, SID, TAM, Open API).
:::

## BSS — Business Support Systems

BSS — всё, что связано с абонентом как с клиентом.

```mermaid
flowchart LR
    subgraph BSS["BSS (Business Support Systems)"]
        CRM["CRM"]
        PC["Product Catalog"]
        OM["Order Management"]
        B["Billing"]
        C["Charging (OCS)"]
        PM["Partner Management"]
        SS["Self-Service"]
    end
```

### Компоненты BSS

| Компонент | Назначение | Примеры систем |
|-----------|-----------|----------------|
| **CRM** | Управление абонентами, контакты, обращения | Salesforce, Oracle CRM, Amdocs |
| **Product Catalog** | Тарифы, услуги, опции, пакеты | Oracle BRM, Netcracker |
| **Order Management** | Заказы на подключение/изменение/отключение | Amdocs Order Management |
| **Billing** | Расчёт счетов post-paid | Oracle BRM, SAP CC |
| **Charging (OCS)** | Real-time тарификация pre-paid | Huawei OCS, Ericsson Charging |
| **Partner Management** | Дилеры, дистрибьюторы, MVNO | Oracle PRM |
| **Self-Service** | Личный кабинет, мобильное приложение | — |

## OSS — Operations Support Systems

OSS — всё, что связано с сетью и оборудованием.

```mermaid
flowchart LR
    subgraph OSS["OSS (Operations Support Systems)"]
        NI["Network Inventory"]
        PR["Provisioning"]
        A["Assurance (мониторинг)"]
        F["Fulfillment"]
    end
```

### Компоненты OSS

| Компонент | Назначение |
|-----------|-----------|
| **Network Inventory** | Учёт оборудования: базовые станции, коммутаторы, каналы |
| **Provisioning** | Активация услуги в сети (включить интернет, активировать VoLTE) |
| **Assurance** | Мониторинг сети, алерты, SLA |
| **Fulfillment** | Сквозной процесс «заказ → активация в сети» |

## Взаимодействие BSS и OSS

```mermaid
sequenceDiagram
    participant CRM
    participant OM as Order Management
    participant PC as Product Catalog
    participant PR as Provisioning
    participant NI as Network Inventory
    participant NW as Network
    participant B as Billing

    CRM->>OM: создание заказа
    OM->>PC: проверка тарифа
    OM->>PR: активируй тариф X на номере Y
    PR->>NI: найди свободные ресурсы
    PR->>NW: активация на оборудовании
    PR-->>OM: активировано
    OM->>B: начинай тарифицировать
```

## TM Forum стандарты

| Стандарт | Описание |
|----------|----------|
| **eTOM** | Business Process Framework — эталонные процессы Telecom |
| **SID** | Information Framework — модель данных |
| **TAM** | Application Framework — карта приложений |
| **Open API** | REST API для интеграции BSS/OSS (49+ API) |

**Для аналитика:** eTOM — ключевой стандарт для спецификации процессов. Если внедряете BSS — смотрите на соответствие eTOM.

## Требования к архитектуре BSS/OSS

| Параметр | Пример |
|----------|--------|
| Абонентская база | 10M+ |
| Задержка charging | < 100 ms (pre-paid) |
| Доступность | 99.999% (5 nines) |
| Интеграции | 50+ систем (BSS ↔ OSS ↔ внешние) |
| Legacy | TDM → IP, SS7 → Diameter |
| Стандарты | TM Forum Open API, 3GPP |

## Что дальше

- [Billing и Charging](/docs/specialization/telecom-billing)
- [CRM и Order Management](/docs/specialization/telecom-crm-order)

## Проверь себя

1. **Чем BSS отличается от OSS?**
   *Ответ:* BSS — бизнес-системы (CRM, биллинг, заказы). OSS — сетевые системы (inventory, provisioning, assurance).

2. **Какие стандарты TM Forum нужно знать?**
   *Ответ:* eTOM (процессы), SID (данные), TAM (приложения), Open API (интеграции).

3. **Как BSS и OSS взаимодействуют при подключении услуги?**
   *Ответ:* CRM → Order Management → Provisioning → Network. Provisioning подтверждает активацию, Billing начинает тарификацию.
