---
id: postgresql
title: "PostgreSQL"
sidebar_label: PostgreSQL
type: technology
tech_type: technology
category: data
tags: [database, sql, postgres, relational]
official_url: "https://www.postgresql.org/"
license: "PostgreSQL License (Open Source)"
first_seen: 1996
requires_articles: [basics/what-is-database, data/sql-basics]
used_in_tasks: []
alternatives: [mysql, oracle]
difficulty: 2
estimated_time: 15
---

# PostgreSQL

PostgreSQL (Postgres) — это самая популярная открытая реляционная база данных. Считается одной из самых надёжных и функциональных СУБД. Используется от стартапов до крупных корпораций.

## Для чего используется

- Хранение структурированных данных в таблицах
- Обработка транзакционных нагрузок (OLTP)
- Аналитические запросы (OLAP с партиционированием)
- Геопространственные данные (через PostGIS)
- Хранение JSON-документов (NoSQL-режим)

## Ключевые концепции

### Почему PostgreSQL

| Характеристика | PostgreSQL |
|---------------|-----------|
| Модель | Реляционная + объектно-реляционная |
| SQL | Полная поддержка SQL:2016 |
| Расширяемость | Типы данных, индексы, функции |
| Транзакции | ACID, MVCC, Serializable |
| Репликация | Streaming, Logical |
| JSON | JSONB с индексацией |
| Лицензия | PostgreSQL License (Free) |

### Типы данных

PostgreSQL поддерживает все стандартные типы SQL плюс собственные:

- Числовые: `INTEGER`, `BIGINT`, `DECIMAL`, `NUMERIC`
- Строковые: `VARCHAR`, `CHAR`, `TEXT`
- Даты: `DATE`, `TIMESTAMP`, `TIMESTAMPTZ`, `INTERVAL`
- JSON: `JSON`, `JSONB`
- Массивы: `TEXT[]`, `INTEGER[]`
- Сетевые: `INET`, `CIDR`
- Гео: `GEOMETRY` (через PostGIS)

### Инструменты для работы

- **DBeaver** — универсальный GUI-клиент
- **pgAdmin** — официальная админка
- **psql** — консольный клиент

## Когда использовать

- Нужна надёжная БД с ACID-транзакциями
- Стандартный SQL без vendor-specific расширений
- Проект с открытым исходным кодом или без бюджета на лицензии
- JSONB для гибридного хранения

## Когда НЕ использовать

- **Высоконагруженная аналитика (> 10 ТБ)** — ClickHouse или Greenplum
- **Простые key-value сценарии** — Redis
- **Когда в компании стандарт Microsoft** — SQL Server

## Как начать

1. Установите PostgreSQL через `sudo apt install postgresql` (Linux) или [официальный инсталлятор](https://www.postgresql.org/download/) (Windows/macOS)
2. Запустите сервер и создайте свою первую базу
3. Подключитесь через psql или DBeaver
4. Создайте таблицу, вставьте данные, выполните SELECT

## Ссылки

- [Официальный сайт](https://www.postgresql.org/)
- [Документация](https://www.postgresql.org/docs/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
