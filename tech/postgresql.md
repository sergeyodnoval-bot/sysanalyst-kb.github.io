---
id: postgresql
title: "PostgreSQL"
sidebar_label: PostgreSQL
type: technology
tech_type: technology
category: data
tags: [database, sql, postgres, relational, acid]
official_url: "https://www.postgresql.org/"
license: "PostgreSQL License (Open Source)"
first_seen: 1996
requires_articles: [basics/what-is-database, data/sql-basics]
used_in_tasks: []
alternatives: [mysql, oracle, sqlserver]
difficulty: 2
estimated_time: 20
audience: junior
---

# PostgreSQL

PostgreSQL — самая популярная открытая реляционная база данных. Считается одной из самых надёжных, функциональных и стандартных СУБД. Используется от стартапов до крупных корпораций.

## Для чего используется

- **Хранение структурированных данных** — таблицы, связи, индексы
- **Транзакционные нагрузки (OLTP)** — банки, CRM, ERP
- **Аналитические запросы (OLAP)** — агрегации, окна, партиционирование
- **Геопространственные данные** — через расширение PostGIS (альтернатива Oracle Spatial)
- **JSON-документы (NoSQL-режим)** — JSONB с индексацией GIN
- **Full-text search** — встроенный поиск (альтернатива Elasticsearch в простых случаях)

## Почему PostgreSQL

| Характеристика | PostgreSQL |
|---------------|-----------|
| Модель | Реляционная + объектно-реляционная |
| SQL | Полная поддержка SQL:2016 |
| Транзакции | ACID, MVCC, Serializable |
| Репликация | Streaming, Logical (каскадная) |
| Расширяемость | Свои типы данных, индексы, функции на PL/pgSQL / Python / C |
| JSON | JSONB с GIN-индексами |
| Полнотекстовый поиск | Встроенный (tsvector/tsquery) |
| Индексы | B-tree, Hash, GiST, GIN, SP-GiST, BRIN |
| Лицензия | PostgreSQL License (Free, как MIT) |

## Типы данных

- Числовые: `INTEGER`, `BIGINT`, `DECIMAL`, `NUMERIC`, `SERIAL`
- Строковые: `VARCHAR(n)`, `CHAR(n)`, `TEXT`
- Даты: `DATE`, `TIMESTAMP`, `TIMESTAMPTZ`, `INTERVAL`
- JSON: `JSON`, `JSONB` (бинарный, с индексацией)
- Массивы: `TEXT[]`, `INTEGER[]`
- Сетевые: `INET`, `CIDR`, `MACADDR`
- Гео: `GEOMETRY`, `GEOGRAPHY` (через PostGIS)
- UUID, Range types, ENUM, XML, BIT

## Сравнение: PostgreSQL vs MySQL vs Microsoft SQL Server

| Критерий | PostgreSQL | MySQL (Oracle) | SQL Server (Microsoft) |
|----------|-----------|---------------|----------------------|
| **Лицензия** | Open Source (Free) | Open Source + Enterprise | Proprietary (дорого) |
| **Стандарт SQL** | SQL:2016 (полный) | SQL:2016 (частично) | SQL:2016 (наибольшее расширение) |
| **JSON** | JSONB (индексируемый) | JSON (не индексируется) | JSON (с OPENJSON) |
| **Полнотекстовый поиск** | Встроенный | Встроенный (MyISAM/InnoDB) | Встроенный (очень мощный) |
| **Геоданные** | PostGIS (лучший open source) | Spatial Extensions | MSSQL Spatial |
| **Репликация** | Streaming, Logical | Master-Slave, Group, InnoDB Cluster | Always On, Mirroring, Replication |
| **ACID** | Полный (MVCC) | InnoDB — да, MyISAM — нет | Полный |
| **CTE / Window Functions** | Да (сложные рекурсии) | Да (с MySQL 8.0) | Да |
| **Экосистема** | Большая (DevOps, CI) | Огромная (каждый хостинг) | MSSQL-стек (.NET, Azure) |
| **Сложность** | Средняя | Низкая (LAMP-стек) | Высокая (Windows / Docker) |
| **Когда выбирать** | Нужна функциональность, надёжность, open source | Простота хостинга, WordPress, LAMP | Компания на .NET / Azure |

## Когда использовать PostgreSQL

- **Начинаете новый проект** — PostgreSQL лучший выбор по умолчанию
- **Нужна функциональность** — JSONB, PostGIS, full-text search, расширения
- **Open source / без бюджета на лицензии**
- **Стандартный SQL** — портируемость между СУБД (легче migrate)
- **Сложные запросы** — CTE, window functions, recursive queries

## Когда НЕ использовать PostgreSQL

- **Высоконагруженная аналитика (> 10 ТБ)** — ClickHouse или Greenplum
- **Простые key-value сценарии** — Redis (быстрее и проще)
- **Когда в компании стандарт Microsoft** — SQL Server
- **Высокая нагрузка на запись (> 100K writes/сек)** — рассмотрите Cassandra / ScyllaDB
- **LAMP-стек (Legacy)** — MySQL всё ещё де-факто для WordPress
- **Встроенная БД (mobile, desktop)** — SQLite

## Инструменты для работы

- **DBeaver** — универсальный GUI-клиент (рекомендуется для аналитика)
- **pgAdmin** — официальная админка от PostgreSQL
- **psql** — консольный клиент (для DevOps)
- **DataGrip** — IDE от JetBrains (платный)

## Как начать

1. Установите через `sudo apt install postgresql` (Linux) или [официальный инсталлятор](https://www.postgresql.org/download/) (Windows/macOS)
2. Запустите: `sudo systemctl start postgresql`
3. Создайте БД: `sudo -u postgres createdb mydb`
4. Подключитесь: `psql -U postgres -d mydb`
5. Создайте таблицу: `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);`
6. Вставьте: `INSERT INTO users (name) VALUES ('Аналитик');`
7. Выберите: `SELECT * FROM users;`

## Ссылки

- [Официальный сайт](https://www.postgresql.org/)
- [Документация (лучшая в своём классе)](https://www.postgresql.org/docs/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [PostgreSQL vs MySQL (сравнение)](https://www.postgresqltutorial.com/postgresql-getting-started/postgresql-vs-mysql/)
- [Use the Index, Luke — курс по индексам](https://use-the-index-luke.com/)
