---
id: telecom-provisioning
title: Provisioning и активация услуг
sidebar_label: Provisioning
level: 6
category: specialization
tags: [telecom, provisioning, activation, hlr, hss, network]
prerequisites: [specialization/telecom-bss-oss, specialization/telecom-crm-order]
leads_to: [specialization/telecom-5g-iot]
related: [integration/async-message-queue, architecture/event-driven-architecture]
estimated_time: 20
difficulty: 5
audience: middle
---

:::info[TL;DR]
Provisioning — мост между BSS и сетью. Получает заказ из Order Management и конфигурирует сетевое оборудование: HLR/HSS (голос), PGW/GGSN (данные), OCS (тарификация). Без Provisioning абонент не получит услугу.
:::

## Что такое Provisioning

Provisioning (активация) — процесс настройки сети для предоставления услуги абоненту.

```mermaid
flowchart TD
    OM["Order Management"] --> PR["Provisioner"]
    PR --> HLR["HLR/HSS (голос)"]
    PR --> PGW["PGW/GGSN (данные)"]
    PR --> OCS["OCS (тарификация)"]
```

## Что конфигурирует Provisioning

| Сетевой элемент | Что настраивает | Протокол |
|----------------|----------------|----------|
| **HLR/HSS** | Голосовые услуги, роуминг, переадресация | MAP/SS7, Diameter, LDAP |
| **PGW/GGSN** | Доступ в интернет, APN, QoS, IP-адрес | RADIUS, Diameter, GTP |
| **OCS** | Тарифный план, квоты, zero-rating | Diameter (Ro, Rf) |
| **SMSC** | SMS-услуги | SMPP, SS7 |
| **MMSC** | MMS | MM7 |
| **VoLTE AS** | VoLTE, IMS | SIP, Diameter (Sh) |

## Типовые сценарии Provisioning

### 1. Активация нового абонента

```mermaid
sequenceDiagram
    participant O as Order
    participant P as Provisioning
    participant H as HLR
    participant G as PGW
    participant C as OCS

    O->>P: активировать тариф «X», номер «+7 999...»
    P->>H: создать запись абонента, услуги
    H-->>P: OK
    P->>G: настроить APN для интернета
    G-->>P: OK
    P->>C: создать аккаунт для тарификации
    C-->>P: OK
    P-->>O: COMPLETED
```

### 2. Смена тарифа

```mermaid
sequenceDiagram
    participant O as Order
    participant P as Provisioning
    participant C as OCS

    O->>P: сменить тариф с «X» на «Y»
    P->>C: изменить тарифный план
    C-->>P: OK
    P-->>O: COMPLETED
```

### 3. Блокировка

```mermaid
sequenceDiagram
    participant O as Order
    participant P as Provisioning
    participant H as HLR
    participant G as PGW
    participant C as OCS

    O->>P: заблокировать номер (долг)
    P->>H: отключить все услуги
    P->>G: отключить интернет
    P->>C: заблокировать аккаунт
    P-->>O: COMPLETED
```

## Provisioning-сценарии вне Telecom

**Для аналитика:** лайфхак — понимание Provisioning в Telecom помогает проектировать любые системы, где нужно активировать услугу в подключённых системах (Device Management в IoT, KYC в FinTech, подключение к API-шлюзу).

```mermaid
flowchart LR
    O["Order"] --> V["Validity Check"] --> PR["Provisioning<br/>(3-5 external systems)"] --> N["Notification"] --> C["Completion"]
```

## Требования к Provisioning (спецификация)

| Параметр | Пример |
|----------|--------|
| SLA на активацию | < 5 мин |
| SLA на смену тарифа | < 1 мин |
| SLA на блокировку | < 30 сек |
| Кол-во сетевых систем | 5+ (HLR, PGW, OCS, SMSC, MMSC) |
| Retry mechanism | 3 попытки с exponential backoff |
| Rollback | Откат всех изменений при ошибке |
| Мониторинг | Алерт при падении успешности ниже 99.5% |

## Что дальше

- [Регуляторика в Telecom](/docs/specialization/telecom-regulations)
- [5G и IoT](/docs/specialization/telecom-5g-iot)

## Проверь себя

1. **Что делает Provisioning?**
   *Ответ:* Получает заказ из BSS и конфигурирует сетевое оборудование (HLR, PGW, OCS) для предоставления услуги.

2. **Какие системы конфигурирует Provisioning?**
   *Ответ:* HLR/HSS (голос), PGW/GGSN (интернет), OCS (тарификация), SMSC (SMS), VoLTE AS.

3. **Что такое Saga в контексте Provisioning?**
   *Ответ:* Цепочка вызовов: если один шаг упал — откатить предыдущие (rollback). Аналог Saga pattern.
