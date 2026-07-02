id: jira
audience: junior
sidebar_position: 1
title: Jira
sidebar_label: Jira
type: technology
tech_type: tool
level: 2
category: requirements
tags: [jira, project-management, agile, tasks, tracking]
official_url: https://www.atlassian.com/software/jira
vendor: Atlassian
license: Proprietary (SaaS / Self-hosted)
first_seen: 2002
requires_articles: [requirements/what-is-requirement, requirements/user-stories]
used_in_tasks: [write-user-story, elicit-requirements]
alternatives: []
difficulty: 2
estimated_time: 12

# Jira

Jira — это система управления проектами и задачами от компании Atlassian. Стандарт де-факто для Agile-команд: в Jira ведут бэклог, планируют спринты, отслеживают баги и хранят историю проекта.

## Для чего используется

- Ведение бэклога — список всех user stories, задач и багов
- Планирование спринтов — перетаскивание задач из бэклога в спринт
- Отслеживание статуса — To Do → In Progress → Done
- Доски (Scrum / Kanban) — визуализация потока задач
- Отчёты — burndown chart, velocity, cumulative flow
- Интеграции — с Confluence, Bitbucket, GitLab, Slack

## Ключевые концепции

### Issue (задача)

Основная единица работы в Jira. Каждый тип задачи — это отдельный issue. Основные типы:

- **Story** — user story
- **Task** — техническая задача
- **Bug** — дефект / ошибка
- **Epic** — крупная тема, объединяющая несколько stories
- **Sub-task** — подзадача внутри story/task

### Проект

Набор задач, объединённых общей целью. Обычно один проект = одна команда или один продукт.

### Спринт

Фиксированный временной отрезок (1–4 недели), в течение которого команда реализует выбранные задачи.

### Доска

Визуальное представление статуса задач: колонки «Сделать», «В работе», «На проверке», «Готово».

## Типовые поля задачи

- **Summary** — краткое описание (заголовок)
- **Description** — полное описание, acceptance criteria, BDD-сценарии
- **Priority** — важность (Highest, High, Medium, Low, Lowest)
- **Assignee** — ответственный
- **Reporter** — кто создал
- **Labels** — теги для поиска
- **Fix versions** — версия, в которой исправлено
- **Attachment** — файлы, скриншоты, схемы

## Структура типовой задачи аналитика

В Jira аналитик чаще всего работает со stories. Типовая структура:

**Summary:** Как менеджер, я хочу фильтровать заказы по дате

**Description:**
- Acceptance criteria
  - Менеджер выбирает дату «с» и дату «по» в календаре
  - Заказы фильтруются в реальном времени
  - Если заказов нет — сообщение «Нет заказов за выбранный период»

**Attachment:** прототип экрана фильтрации (скриншот или Figma)

**Labels:** frontend, mvp, analytics

## Для кого этот инструмент

Jira используют все участники команды разработки:

- **Product Owner** — ведёт бэклог и приоритизирует
- **Scrum Master** — планирует спринты и следит за процессом
- **System Analyst** — создаёт и уточняет stories
- **Developer** — берёт задачи в работу
- **Tester** — проверяет и закрывает задачи

## Преимущества

- Гибкая настройка полей и workflows
- Мощная система поиска (JQL — Jira Query Language)
- Богатые интеграции с другими инструментами Atlassian
- Отчёты для ретроспектив и планирования
- Поддержка Scrum и Kanban

## Недостатки

- Сложный для новых пользователей — много терминов и настроек
- Тяжёлый — может тормозить при большом количестве задач
- Платная лицензия для коммерческого использования
- Бесплатная версия ограничена (до 10 пользователей)

## Как начать

1. Зарегистрируйтесь в Atlassian Cloud (бесплатно до 10 человек)
2. Создайте проект по шаблону Scrum
3. Добавьте первую story
4. Настройте колонки доски под ваш процесс
5. Пригласите команду

## Ссылки

- [Jira Product Guide](https://www.atlassian.com/software/jira/guides)
- [Jira для аналитиков — Atlassian Community](https://community.atlassian.com/)
