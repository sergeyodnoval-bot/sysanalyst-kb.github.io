---
id: telecom-mvno
title: MVNO — модель виртуальных операторов
sidebar_label: MVNO
level: 7
category: specialization
tags: [telecom, mvno, virtual-operator, roaming, partner]
prerequisites: [specialization/telecom-bss-oss, specialization/telecom-billing]
leads_to: [specialization/telecom-5g-iot]
related: [integration/enterprise-integration-patterns, architecture/microservices-patterns]
estimated_time: 20
difficulty: 6
audience: senior
---

:::info[TL;DR]
MVNO (Mobile Virtual Network Operator) — оператор без своей сети. Арендует инфраструктуру у MNO (хост-оператора). Виртуальный оператор сам управляет тарифами, биллингом, маркетингом, но использует сеть и нумерацию MNO. Примеры: Yota (MVNO на Мегафон), Тинькофф Мобайл, Virgin Mobile.
:::

## Модели MVNO

| Модель | Уровень самостоятельности | Пример |
|--------|--------------------------|--------|
| **Light MVNO** | Только маркетинг и SIM-карты | Виртуальные бренды |
| **Service Provider MVNO** | Свой биллинг, своя тарификация | Тинькофф Мобайл |
| **Full MVNO** | Свой HLR/HSS, свой IMSI range | Yota |
| **Enhanced MVNO** | Своё OCS, DPI, инфраструктура | — |

```mermaid
flowchart TD
    ROOT["Компоненты, которые MVNO может иметь свои"]
    ROOT --> CRM["CRM (своя) ← обычно своя"]
    ROOT --> BL["Billing (свой) ← обычно свой"]
    ROOT --> PC["Product Catalog ← свой"]
    ROOT --> HL["HLR/HSS ← только full MVNO"]
    ROOT --> OCS["OCS ← service provider+"]
    ROOT --> PR["Provisioning ← зависит от модели"]
    ROOT --> NW["Network (базовые станции) ← только MNO"]
```

## MVNO-интеграция

```mermaid
flowchart LR
    subgraph MVNO["MVNO BSS"]
        MCRM["CRM (абоненты)"]
        MBL["Billing (MVNO)"]
    end
    subgraph MNO["MNO BSS/OSS"]
        HSS["HLR/HSS (сеть)"]
        OCS["OCS (MNO)"]
    end
    MCRM <-->|API / Roaming / TAP| HSS
    MBL <-->|API / Roaming / TAP| OCS
```

## Техническая интеграция MVNO ↔ MNO

| Система MVNO | Система MNO | Протокол | Данные |
|-------------|-------------|----------|--------|
| CRM | HLR/HSS | MAP / Diameter / API | Создание абонента, услуги |
| Order | Provisioning MNO | REST / SOAP | Активация, блокировка |
| Billing | OCS | Diameter (Ro) | Тарификация, баланс |
| Billing | Billing MNO | TAP-файлы | Роуминг-расчёты |
| CRM | HLR | MAP | MNP, перенос номера |

## MVNO-бизнес модели

| Модель | Как зарабатывает | Пример |
|--------|-----------------|--------|
| **Брендовая** | Скидка копеечная, свой маркетинг | Virgin Mobile |
| **Банковская** | Кешбэк + пакет услуг | Тинькофф Мобайл |
| **Ритейловая** | SIM в каждой коробке | МТС (как бренд до 2018) |
| **IoT MVNO** | Машины, сенсоры, устройства | — |
| **Enterprise** | Для юрлиц, свои тарифы | — |

## Требования к MVNO-системе (спецификация)

| Параметр | Пример |
|----------|--------|
| Модель | Service Provider или Full MVNO |
| MNO | 1–2 партнёра (хост-оператора) |
| Протоколы | Diameter Ro, MAP, REST API MNO |
| IMSI | Свой диапазон (для full MVNO) |
| Нумерация | DEF-коды от Минцифры |
| Billing | Свой (тарифы, пакеты) |
| Техподдержка | Своя (фронтлайн, эскалация MNO) |

## Что дальше

- [5G, IoT и новые технологии](/docs/specialization/telecom-5g-iot)

## Проверь себя

1. **Какие бывают модели MVNO?**
   *Ответ:* Light MVNO (только маркетинг), Service Provider (свой биллинг), Full MVNO (своя HLR), Enhanced MVNO (своя OCS).

2. **Какие системы MVNO может иметь свои?**
   *Ответ:* CRM, Billing, Product Catalog (обычно). HLR/HSS, OCS, Network — только у full MVNO.

3. **Как интегрируются BSS MVNO и BSS MNO?**
   *Ответ:* Через API, Diameter (для тарификации), TAP-файлы (роуминг), MAP (HLR).
