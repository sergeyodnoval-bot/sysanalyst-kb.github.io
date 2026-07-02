---
id: vector-database
title: Vector Database (Qdrant, Pinecone, Weaviate)
sidebar_label: Vector Database
type: technology
tech_type: technology
category: specialization
tags: [ai, ml, vector, embedding, search, database]
official_url: https://qdrant.tech/
first_seen: 2020
difficulty: 4
estimated_time: 25
requires_articles: [specialization/ai-llm-rag]
used_in_tasks: [design-rag-pipeline]
alternatives: []
audience: middle
---

# Vector Database (Векторная БД)

**Vector Database** — специализированная база данных для хранения и поиска векторных представлений (embeddings) — числовых массивов, которые кодируют смысл текста, изображения или другого контента.

## Для чего используется

- **Семантический поиск** — поиск по смыслу, а не по ключевым словам
- **RAG-системы** — хранение и поиск документов для контекста LLM
- **Рекомендательные системы** — поиск похожих объектов (товаров, фильмов, статей)
- **Поиск аномалий** — поиск объектов, далёких от всех остальных в векторном пространстве

## Ключевые концепции

- **Embedding** — векторное представление объекта (текста, изображения), созданное нейросетью
- **Vector index** — структура данных для быстрого поиска ближайших соседей (HNSW, IVF)
- **Distance metric** — мера близости векторов: cosine similarity, euclidean distance, dot product
- **Filtering** — поиск по метаданным (фильтр по дате, автору, категории) + векторный поиск
- **Hybrid search** — комбинация семантического (векторного) и keyword-поиска (BM25)

## Популярные реализации

| Продукт | Лицензия | Хостинг | Особенность |
|---------|----------|---------|-------------|
| **Qdrant** | Open Source (Apache 2.0) | Self-hosted / Cloud | Быстрый, на Rust, хорошая документация |
| **Pinecone** | Proprietary | Only Cloud | Простой API, не нужно управлять инфраструктурой |
| **Weaviate** | Open Source (BSD) | Self-hosted / Cloud | Встроенные модули (Q&A, генерация) |
| **ChromaDB** | Open Source (Apache 2.0) | Embedded / Self-hosted | Простой, для прототипирования |
| **Milvus** | Open Source (Apache 2.0) | Self-hosted / Cloud | Высокая производительность, Kubernetes |

## Когда использовать

- Строите RAG-систему — векторная БД обязательный компонент
- Нужен семантический поиск по неструктурированным данным
- Объём данных больше, чем может поместиться в контекст LLM
- Требуется поиск с фильтрацией по метаданным

## Когда НЕ использовать

- Поиск только по ключевым словам — обычный Elasticsearch достаточно и дешевле
- Очень мало данных (< 10K документов) — линейный поиск по всем векторам быстр и без векторной БД
- Нет эмбеддингов — нужна хотя бы одна модель для векторизации текста

## Альтернативы

| Альтернатива | Когда выбрать |
|-------------|---------------|
| Elasticsearch | Keyword search + векторный поиск (с плагином) — универсальное решение |
| PostgreSQL + pgvector | Если уже есть PostgreSQL — встроенное расширение для векторов |
| FAISS | Библиотека для векторного поиска, не БД — для batch-сценариев |

## Как начать

- [Qdrant Quickstart](https://qdrant.tech/documentation/quick-start/)
- [Pinecone Quickstart](https://docs.pinecone.io/docs/quickstart)
- [Weaviate Quickstart](https://weaviate.io/developers/weaviate/quickstart)
- [pgvector](https://github.com/pgvector/pgvector) — если уже используете PostgreSQL
