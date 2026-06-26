---
id: elasticsearch
title: Elasticsearch — поиск и каталог
sidebar_label: Elasticsearch
level: 4
tags: [ecommerce, search, catalog, full-text, nosql]
---

Elasticsearch — распределённая поисковая система на базе Lucene. Используется в e-commerce для полнотекстового поиска по каталогу, фильтрации и аггрегаций.

**Ключевые понятия:**
- **Index** — аналог таблицы в SQL (например, `products`)
- **Document** — аналог строки (JSON)
- **Mapping** — схема данных (типы полей: text, keyword, integer, geo_point)
- **Shard** — часть индекса (для распределения)
- **Replica** — копия шарда (для отказоустойчивости)

**Для аналитика:** при проектировании каталога нужно определить, какие поля товара должны индексироваться (поиск), какие — фильтроваться (аггрегации), а какие — только отображаться. Elasticsearch — не замена БД, а поисковый слой поверх неё. Синхронизация обычно через Kafka или CDC (Change Data Capture).

**Типовые запросы:**
- `GET /products/_search?q=iphone` — полнотекстовый поиск
- Фильтры: `{"term": {"brand.keyword": "Apple"}}`
- Аггрегация: `{"aggs": {"by_category": {"terms": {"field": "category"}}}}`
- Автокомплит: `{"suggest": {"product-suggest": {"prefix": "iph", "completion": {"field": "suggest"}}}}`

**Ссылки:** [Elasticsearch Guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
