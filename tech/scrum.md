id: scrum
audience: junior
sidebar_position: 3
title: Scrum
sidebar_label: Scrum
type: technology
tech_type: methodology
level: 2
category: process
tags: [scrum, agile, methodology, project-management]
prerequisites: []
leads_to: []
related: []
estimated_time: 25
difficulty: 2
official_url: https://scrumguides.org/
first_seen: 1995
requires_articles: [process/scrum-basics]
used_in_tasks: [grooming]
alternatives: [kanban, xp, safe]

# Scrum

Scrum — фреймворк гибкой разработки (Agile), ориентированный на итеративную поставку ценности. Работа ведётся **спринтами** — фиксированными интервалами (обычно 1–4 недели).

## Для чего используется

- Разработка продукта с неопределёнными требованиями
- Проекты, где важна скорость изменений и обратная связь
- Команды, которые могут самоорганизовываться
- Продуктовая разработка (не проекты с фиксированным сроком)

## Когда Scrum НЕ подходит

- **Фиксированный бюджет и дедлайн** — Scrum не даёт гарантий по срокам
- **Распределённая команда без overlap** — сложно синхронизироваться
- **Команда без опыта Agile** — Scrum требует дисциплины
- **Поддерживающая разработка (support)** — Kanban лучше
- **Чёткие требования от заказчика** — Waterfall может быть эффективнее

## Сравнение: Scrum vs Kanban

| Критерий | Scrum | Kanban |
|----------|-------|--------|
| **Циклы** | Фиксированные спринты (1–4 недели) | Непрерывный поток (no sprints) |
| **Роли** | PO, SM, Dev Team | Нет обязательных ролей |
| **Артефакты** | Product Backlog, Sprint Backlog, Increment | Kanban board (To Do / In Progress / Done) |
| **События** | Planning, Daily, Review, Retro | Ежедневная стендап (опционально) |
| **Изменения во время цикла** | Запрещены (спринт locked) | Разрешены в любой момент |
| **Метрики** | Velocity, Burn-down | Cycle Time, Throughput, WIP |
| **Когда выбирать** | Разработка нового продукта, нестабильные требования | Поддержка, bug fixing, мелкие задачи, DevOps |
| **Гибкость** | Низкая внутри спринта, высокая между спринтами | Высокая (меняй приоритеты ежедневно) |

**Вывод:** Scrum — для продуктовых команд с итеративной разработкой. Kanban — для поддержки, эксплуатации и команд, которым нужна гибкость без фиксированных циклов.

## Сравнение: Scrum vs XP (Extreme Programming)

XP фокусируется на **инженерных практиках**, Scrum — на **управлении процессом**:

| Критерий | Scrum | XP |
|----------|-------|-----|
| Фокус | Процесс, роли, артефакты | Инженерные практики (TDD, CI, pair programming) |
| Итерации | Спринты 1–4 нед | Итерации 1–2 нед |
| Роли | PO, SM, Dev Team | Customer, Programmer, Tester, Coach |
| Практики | Планирование, ретроспектива | TDD, CI, Refactoring, Pair programming |
| Совместимость | Можно комбинировать с XP | Можно комбинировать со Scrum (Scrum + XP = лучший Agile) |

## Роль системного аналитика в Scrum

- Уточняет требования вместе с Product Owner
- Декомпозирует User Stories на задачи
- Участвует в Sprint Planning и Refinement (grooming)
- Проверяет соответствие реализации требованиям (acceptance testing)
- Документирует нефункциональные требования
- Ведёт документацию параллельно с разработкой (не «всё в конце»)

## Преимущества

- Быстрая обратная связь от заказчика
- Адаптивность к изменениям (каждый спринт — новая возможность)
- Прозрачность процесса (Daily, Review, Retro)
- Фокус на поставке ценности (не «сделать всё по ТЗ», а «дать бизнесу ценность»)

## Недостатки

- Требует высокой дисциплины команды
- Сложно применять в распределённых командах без опыта
- Не подходит для проектов с фиксированным бюджетом и сроком
- Риск «Scrum-but» — делаем Scrum, но по факту всё как раньше
- Product Owner должен постоянно быть вовлечён

## Как начать

1. Прочитайте [Scrum Guide](https://scrumguides.org/) (13 страниц, 20 минут)
2. Определите Product Owner и Scrum Master
3. Создайте Product Backlog (первые User Stories)
4. Назначьте первый Sprint Planning (обычно 2 недели)
5. Проведите Daily Scrum (15 мин, стоя)
6. После спринта — Review и Retrospective

## Ссылки

- [Scrum Guide (официальный)](https://scrumguides.org/)
- [Scrum.org — глоссарий и сертификация](https://www.scrum.org/)
- [Scrum vs Kanban (Atlassian)](https://www.atlassian.com/agile/scrum/kanban)
- [Scrum + XP (PDF, Henrik Kniberg)](https://www.infoq.com/minibooks/scrum-xp-from-the-trenches/)
- [State of Agile Report](https://stateofagile.com/)
