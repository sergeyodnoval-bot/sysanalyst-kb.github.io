---
id: telecom-5g-iot
title: 5G, IoT и новые технологии в Telecom
sidebar_label: 5G и IoT
level: 7
category: specialization
tags: [telecom, 5g, iot, network-slicing, edge-computing]
prerequisites: [specialization/telecom-bss-oss]
leads_to: []
related: [architecture/microservices-patterns, integration/event-driven-architecture]
estimated_time: 20
difficulty: 6
audience: senior
---

:::info[TL;DR]
5G — не просто «быстрее», а новая архитектура: network slicing, edge computing, low latency, mMTC (massive IoT). Для аналитика 5G означает новые бизнес-модели: B2B-сеть для заводов, IoT-тарифы для миллионов устройств, SLA на уровне сети.
:::

## Что нового в 5G (vs 4G)

| Параметр | 4G | 5G |
|----------|-----|-----|
| Скорость | до 1 Гбит/с | до 20 Гбит/с |
| Задержка | 30–50 ms | 1–10 ms |
| Устройств на км² | 100K | 1M |
| Энергопотребление | Высокое | Низкое (NB-IoT) |
| Ядро сети | EPC | 5GC (Service-Based Architecture) |
| Сети | — | Network Slicing |

## Архитектура 5G

Ключевое отличие: 5G Core (5GC) построен как микросервисы (SBA — Service-Based Architecture).

```mermaid
flowchart TD
    subgraph 5GC["5GC (Service-Based Architecture)"]
        NSSF["NSSF<br/>(слайсинг)"]
        NEF["NEF<br/>(экспозинг)"]
        NRF["NRF<br/>(репозиторий)"]
        UDM["UDM<br/>(абон. данные)"]
        AUSF["AUSF<br/>(аутентиф.)"]
        PCF["PCF<br/>(политики)"]
    end
    NSSF --- NEF --- NRF --- UDM --- AUSF --- PCF
    NEF --> AMF["AMF (управление доступом)"]
    AMF --> SMF["SMF (управление сессиями)"]
    SMF --> UPF["UPF (плоскость данных — быстрый путь)"]
\```

## Network Slicing

**Идея:** на одной физической сети создаются несколько виртуальных «срезов» с разным SLA.

```mermaid
flowchart TD
    PHY["Физическая сеть 5G"]
    PHY --> S1["Slice 1: eMBB<br/>(широкополосный — обычные абоненты)"]
    S1 --> S1S["SLA: скорость > 100 Мбит/с, latency < 20 ms"]
    PHY --> S2["Slice 2: URLLC<br/>(сверхнизкая задержка)"]
    S2 --> S2S["SLA: latency < 5 ms, надёжность 99.999%"]
    S2 --> S2E["Пример: автономные автомобили, remote surgery"]
    PHY --> S3["Slice 3: mMTC<br/>(массовый IoT)"]
    S3 --> S3S["SLA: до 1 млн устройств/км², энергопотребление минимальное"]
    S3 --> S3E["Пример: smart meters, сенсоры"]
\```

## IoT в Telecom

### Типы IoT-подключений

| Технология | Скорость | Дальность | Применение |
|-----------|----------|-----------|------------|
| **NB-IoT** | ~200 Кбит/с | 10+ км | Умные счётчики, парковки |
| **LTE-M** | ~1 Мбит/с | 5+ км | Трекинг, носимые устройства |
| **5G mMTC** | ~10 Мбит/с | 1+ км | Промышленные сенсоры |
| **Cat-1** | ~10 Мбит/с | 5+ км | POS-терминалы, телеметрия |

### IoT-архитектура

```mermaid
flowchart LR
    D["Device"] --> NB["NB-IoT"] --> NW["Network"] --> PL["IoT Platform"] --> BS["BSS"]
    PL --> APP["Application<br/>(аналитика, UI)"]
\```

**IoT Platform — ключевой компонент:**
- **Device Management** — регистрация, OTA-обновления, состояние
- **Data Ingestion** — приём данных от миллионов устройств
- **Rules Engine** — обработка событий
- **Billing Integration** — тарификация по объёму данных / пакетам

## Edge Computing для Telecom

**Идея:** вычислительные мощности на границе сети (рядом с базовой станцией).

```mermaid
flowchart LR
    CL["Cloud (дата-центр)"] <--> CN["Core Network"] <--> ED["Edge (у БС)"] <--> DV["Device"]
    ED --> ED1["Low latency (< 10 ms)"]
    ED --> ED2["Обработка данных локально"]
\```

**Для аналитика:** Edge Computing означает требования к биллингу — как тарифицировать обработку на edge? Как учитывать потреблённые ресурсы?

## Требования к BSS для 5G и IoT

| Параметр | 5G/IoT |
|----------|--------|
| Тарификация | По slice, latency, throughput |
| IoT Billing | Per device (миллионы), data pool |
| Network Slicing | Product Catalog умеет slices |
| SLA | Юридические обязательства по скорости/задержке |
| Provisioning | Активация slice в реальном времени |
| API монетизация | TM Forum Open API для B2B |

## Что дальше

- [BSS/OSS архитектура](/docs/specialization/telecom-bss-oss) — ещё раз с точки зрения 5G
- [TM Forum Open API](/tech/tmforum) — стандарты для монетизации

## Проверь себя

1. **Что такое Network Slicing в 5G?**
   *Ответ:* Виртуальные срезы сети с разным SLA (eMBB — широкополосный, URLLC — низкая задержка, mMTC — массовый IoT).

2. **Какие технологии IoT используются в Telecom?**
   *Ответ:* NB-IoT (низкая скорость, дальняя связь), LTE-M (средняя), 5G mMTC (массовый).

3. **Как Edge Computing меняет требования к BSS?**
   *Ответ:* Нужно тарифицировать не только трафик, но и вычислительные ресурсы на edge, SLA по latency.
