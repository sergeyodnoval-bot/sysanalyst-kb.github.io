id: dbeaver
audience: junior
title: "DBeaver"
sidebar_label: DBeaver
type: technology
tech_type: tool
category: data
tags: [database, sql, tool, desktop]
official_url: "https://dbeaver.io/"
vendor: "DBeaver Corporation"
license: "Apache 2.0 (Community Edition)"
first_seen: 2012
requires_articles: [basics/what-is-database, data/sql-basics]
used_in_tasks: []
alternatives: [datagrip]
difficulty: 2
estimated_time: 10

# DBeaver

DBeaver — это универсальный GUI-клиент для работы с базами данных. Поддерживает PostgreSQL, MySQL, Oracle, SQL Server, SQLite и десятки других СУБД. Бесплатная Community Edition покрывает 90% потребностей аналитика.

## Для чего используется

- Просмотр структуры БД (таблицы, схемы, индексы)
- Написание и выполнение SQL-запросов
- Экспорт данных в CSV/Excel/JSON
- Визуализация связей между таблицами (ER-диаграмма)
- Сравнение схем и данных между базами

## Ключевые концепции

### Основные возможности

| Возможность | Описание |
|------------|----------|
| **Обозреватель БД** | Древовидная структура: сервер → база → схема → таблица |
| **Редактор SQL** | Подсветка синтаксиса, автодополнение, история запросов |
| **ER-диаграмма** | Визуализация таблиц и связей между ними |
| **Экспорт данных** | CSV, Excel, JSON, XML, Markdown |
| **Data Editor** | Просмотр и редактирование данных в табличном виде |
| **SSH Tunnel** | Подключение к удалённым БД через SSH |

### Почему DBeaver, а не DataGrip

| Критерий | DBeaver CE | DataGrip |
|----------|-----------|----------|
| Цена | Бесплатно | $199/год |
| Поддерживаемые СУБД | 80+ | 15+ |
| ER-диаграммы | Да | Да |
| Интеграция с IntelliJ | Нет | Полная |

Для Junior аналитика DBeaver Community Edition — оптимальный выбор.

## Когда использовать

- Нужно быстро посмотреть структуру БД
- Написать и проверить SQL-запрос
- Выгрузить данные для анализа (CSV/Excel)
- Понять, какие таблицы связаны с какими

## Когда НЕ использовать

- **Тяжёлая админка БД** — pgAdmin или SQL Server Management Studio
- **Работа с БД в IDE** — DataGrip (для IntelliJ) лучше интегрирован
- **Миграции схем** — Liquibase или Flyway

## Как начать

1. Скачайте DBeaver Community Edition с [официального сайта](https://dbeaver.io/download/)
2. Установите и запустите
3. Нажмите «Новое подключение», выберите PostgreSQL
4. Введите хост, порт, базу, пользователя, пароль
5. Откройте схему → посмотрите таблицы → напишите первый SELECT

## Ссылки

- [Официальный сайт](https://dbeaver.io/)
- [Документация](https://github.com/dbeaver/dbeaver/wiki)
- [Скачать DBeaver](https://dbeaver.io/download/)
