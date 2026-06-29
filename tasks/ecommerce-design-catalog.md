---
id: ecommerce-design-catalog
title: Проектирование каталога товаров
sidebar_label: Каталог товаров
type: task
tags: [ecommerce, catalog, domain-model, mvc, arch]
prerequisites: [specialization/ecommerce-catalog]
related: [tech/elasticsearch]
stepik_id: 
estimated_time: 45
difficulty: 5
audience: middle
---

:::info[TL;DR]
Спроектируйте структуру каталога товаров для интернет-магазина. Условие: мультибрендовый магазин одежды, 20 000 SKU, категории иерархические (до 3 уровней), у товара — вариативные характеристики (цвет, размер). Обоснуйте выбор хранения (SQL / NoSQL / Search engine).
:::

## Предпосылки

Вы — системный аналитик в e-commerce компании «Модный Склад». Задача: спроектировать каталог товаров. Магазин продаёт одежду: бренды, категории, товары с вариациями (цвет, размер).

**Требования:**

- 20 000 SKU
- Иерархическая категория (до 3 уровней): `Одежда → Верхняя → Куртки`
- У товара: 1+ вариаций (цвет × размер)
- Каждая вариация — свой остаток (stock) и цена (может отличаться)
- Поиск по названию, бренду, категории
- Фильтры: по цене, цвету, размеру, бренду
- Админка: CRUD для товаров, категорий, брендов

## Задание

Необходимо:

1. **Domain-модель** — нарисовать Mermaid-диаграмму сущностей: Brand, Category, Product, Variant, Stock
2. **Выбор хранилища** — таблица "Плюсы/минусы" для трёх вариантов: SQL (PostgreSQL), MongoDB, Elasticsearch
3. **Архитектурная схема** — Mermaid C4-diagram: Client → BFF → Catalog API → DB / ES
4. **Текстовое обоснование** — почему вы выбрали именно такое решение

## Решение

### 1. Domain-модель

```mermaid
erDiagram
    Brand {
        int id PK
        string name
        string slug
        string logo_url
    }
    Category {
        int id PK
        string name
        string slug
        int parent_id FK
        int level
    }
    Product {
        int id PK
        string name
        string description
        int brand_id FK
        int category_id FK
        datetime created_at
        decimal base_price
    }
    Variant {
        int id PK
        int product_id FK
        string sku
        string color
        string size
        decimal price_adjustment
    }
    Stock {
        int variant_id FK
        int warehouse_id
        int quantity
    }

    Brand ||--o{ Product : "has"
    Category ||--o{ Product : "belongs to"
    Product ||--o{ Variant : "has"
    Variant ||--o{ Stock : "has"
```

### 2. Выбор хранилища

| Критерий | PostgreSQL | MongoDB | Elasticsearch |
|----------|-----------|---------|-------------|
| **ACID** | ✅ | ❌ (eventual) | ❌ |
| **Иерархическая категория** | ✅ CTE recursive | ✅ nested | ❌ сложно |
| **Вариативные атрибуты** | ⚠️ EAV или JSONB | ✅ документы вложенные | ⚠️ nested |
| **Поиск full-text** | ⚠️ через GIN-индекс | ⚠️ через text index | ✅ отлично |
| **Faceted фильтры** | ⚠️ через GROUP BY | ⚠️ через aggregation | ✅ отлично |
| **CRUD-админка** | ✅ | ✅ | ❌ |

**Рекомендация:** PostgreSQL (Source of Truth) + Elasticsearch (Search). PostgreSQL хранит доменную модель (бренды, категории, товары, вариации, остатки). Elasticsearch — поисковый слой для каталога (full-text + faceted фильтры). Синхронизация — через CDC (Debezium → Kafka).

### 3. Архитектурная схема

```mermaid
flowchart TD
    B["Browser / App"] --> API["Catalog API<br/>(REST)"]
    API --> DB["PostgreSQL<br/>— domain model"]
    API --> ES["Elasticsearch<br/>— search & filters"]
    ADM["Admin Panel"] --> API
    DB -->|"CDC → Debezium → Kafka → Logstash"| ES

    subgraph Storage
        DB
        ES
    end
```

### 4. Обоснование

- PostgreSQL — Source of Truth для всех CRUD-операций админки и корзины
- Elasticsearch — для пользовательского поиска (фильтры по цене, цвету, размеру — aggregations)
- CDC (Change Data Capture) — синхронизация без дополнительного кода
- Вариации (Variant) — отдельная таблица, не JSONB, чтобы можно было независимо управлять ценой и остатком

## Критерии приемки

- ✅ Domain-модель покрывает Brand, Category, Product, Variant, Stock
- ✅ Обоснован выбор хранилища (таблица сравнения)
- ✅ Архитектурная схема с Client → BFF → API → DB/ES
- ✅ Описана синхронизация между DB и ES
- ✅ Учтена админка (CRUD)
