---
id: srs
sidebar_position: 13
title: "SRS — Software Requirements Specification"
sidebar_label: "SRS — спецификация требований"
level: 3
category: requirements
tags: [requirements, l2, senior, srs, specification, documentation]
prerequisites: [requirements/what-is-requirement, requirements/user-stories, requirements/bdd-scenarios]
leads_to: []
related: [requirements/functional-requirements-detailed, requirements/nfr, requirements/traceability]
estimated_time: 30
difficulty: 3
---

# SRS — Software Requirements Specification

SRS (Software Requirements Specification) — это документ, который описывает **что должна делать система**, её поведение, ограничения и атрибуты качества. SRS — основной артефакт этапа анализа требований.

## Зачем нужен SRS

- **Единый источник истины** — все заинтересованные стороны видят одно описание
- **Контракт** — основа для оценки стоимости и сроков
- **База для тестирования** — каждый тест-кейс ссылается на requirement ID
- **База для архитектуры** — архитектор проектирует решение на основе SRS

## Структура SRS (IEEE 830)

### 1. Введение

- **Purpose** — цель документа
- **Scope** — границы системы
- **Definitions** — глоссарий терминов (Ubiquitous Language)
- **References** — ссылки на источники (интервью, прототипы, регламенты)

### 2. Общее описание

- **Product perspective** — контекст системы (C4 Context)
- **User characteristics** — кто пользователи, уровень подготовки
- **Assumptions & dependencies** — что предполагается, от чего зависит

### 3. Функциональные требования

Таблица или структурированный список:

| ID | Функция | Приоритет | Источник |
|----|---------|-----------|----------|
| FR-001 | Регистрация пользователя | Must | REQ-001 |
| FR-002 | Поиск товаров | Must | REQ-003 |
| FR-003 | Восстановление пароля | Should | REQ-007 |

### 4. Нефункциональные требования

| ID | Категория | Требование | Цель |
|----|-----------|-----------|------|
| NFR-001 | Performance | p95 latency < 500 мс | 1000 RPS |
| NFR-002 | Availability | Uptime 99.9% | 8.76 ч/год |
| NFR-003 | Security | TLS 1.3, JWT | PCI DSS |

### 5. Ограничения

- Технологический стек (если определён)
- Бюджет
- Сроки

### 6. Приложения

- Use Case диаграммы
- ER-диаграммы
- Прототипы экранов
- API-спецификации

## Форматы SRS

| Формат | Плюсы | Минусы |
|--------|-------|--------|
| **Google Docs / Confluence** | Совместное редактирование, комментарии | Версионирование слабое |
| **Markdown в Git** | Версионирование, code review | Неудобно бизнесу |
| **Dedicated tools (Doors, Jama)** | Traceability, audit | Дорого, сложно |
| **Специализированные (ReQtest, ModernRequirements)** | Agile-friendly | Меньше контроля |

## Как писать SRS

1. **Соберите источники** — все интервью, протоколы, прототипы
2. **Составьте глоссарий** — чтобы все говорили на одном языке
3. **Functional requirements** — от высокого уровня к деталям
4. **NFR** — согласуйте с архитектором
5. **Review** — как минимум: аналитик → архитектор → тестировщик → бизнес
6. **Утверждение** — подпись / approval в Confluence

## Согласование SRS

Типовые вопросы на согласовании:

- «А что, если клиент не заполнил email?» — не описано в FR → доработка
- «Почему 99.9% а не 99.99%?» — NFR не согласован с бизнесом
- «А это точно входит в MVP?» — scope creep

## Типичные ошибки

- **SRS — это роман** — 200 страниц текста без структуры (никто не читает)
- **SRS без ID** — невозможно сослаться на требование
- **SRS не обновляется** — требования изменились, SRS — нет
- **SRS без NFR** — есть только FR (как быстро? как безопасно?)
- **SRS без исключений** — только happy path

## SRS в Agile

В чистом Agile SRS не пишут (working software over comprehensive documentation). На практике:

- **Продуктовая команда** — User Stories + Acceptance Criteria = достаточно
- **Enterprise / Подряд** — SRS обязателен (контракт, аудит)
- **Компромисс** — SRS на уровне модуля / epic, детали — в US + AC

## Ссылки

- [IEEE 830-1998 — Recommended Practice for SRS](https://standards.ieee.org/ieee/830/1228/)
- [ВSRS Template — Volere](https://www.volere.org/templates/requirements-specification-template/)
- [How to Write an SRS (medium)](https://medium.com/swlh/how-to-write-a-software-requirements-specification-srs-document-89d919f75d6c)
- [SRS в Confluence — шаблон](https://www.atlassian.com/software/confluence/templates/software-requirements-specification)
