---
id: tmforum
title: TM Forum Open API — стандарт Telecom
sidebar_label: TM Forum
type: technology
tech_type: standard
level: 4
tags: [telecom, tm-forum, open-api, standard, integration]
official_url: https://www.tmforum.org/oda/open-apis/
version: "ODA R20.5"
requires_articles: [specialization/telecom-bss-oss, specialization/telecom-path]
used_in_tasks: [telecom-oss-integration, telecom-design-billing]
alternatives: [3gpp, itu-t]
---

TM Forum — глобальная ассоциация, разрабатывающая стандарты для Telecom-индустрии.

**Ключевые фреймворки:**
- **eTOM (Business Process Framework)** — эталонные бизнес-процессы оператора связи
- **SID (Information Framework)** — модель данных (абонент, услуга, тариф, заказ)
- **TAM (Application Framework)** — карта приложений BSS/OSS
- **Open API** — 49+ REST API для интеграции BSS/OSS

**Популярные Open API для аналитика:**

| API | Назначение |
|-----|------------|
| `TMF620` | Product Catalog Management |
| `TMF622` | Product Ordering |
| `TMF629` | Customer Management |
| `TMF630` | API Specification |
| `TMF632` | Party Management |
| `TMF636` | Service Testing |
| `TMF638` | Service Inventory |
| `TMF639` | Resource Inventory |

**Для аналитика:** при проектировании BSS-системы проверяйте API на соответствие TM Forum Open API. Это снижает стоимость интеграции с партнёрами и MNO. Многие Telecom-вендоры (Amdocs, Ericsson, Huawei) поддерживают TM Forum из коробки.

**Архитектура:** Open API базируются на REST + JSON, спецификация в OpenAPI 3.0. Каждый API имеет унифицированный lifecycle (POST, PATCH, GET, DELETE) и стандартные ошибки (TMF630).

**Ссылки:** [TM Forum Open API](https://www.tmforum.org/oda/open-apis/)
