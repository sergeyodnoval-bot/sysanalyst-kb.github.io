# Contribution Guide

## Как добавить новую статью

1. Выберите подходящую категорию: `basics/`, `requirements/`, `modeling/`, `integration/`, `architecture/` или `soft/`
2. Создайте MDX-файл в соответствующей папке `docs/`
3. Заполните frontmatter (обязательные поля):

```yaml
---
id: unique-article-id
title: Название статьи
sidebar_label: Краткое название
level: 5
category: basics
tags: [тег1, тег2]
prerequisites: [category/prereq-id]
leads_to: [category/next-id]
related: [category/related-id]
estimated_time: 20
difficulty: 3
---
```

### Поля frontmatter

| Поле | Тип | Обязательное | Описание |
|------|-----|-------------|----------|
| `id` | string | да | Уникальный ID. Используйте `kebab-case`, включает папку (напр. `modeling/uml`) |
| `title` | string | да | Заголовок статьи |
| `sidebar_label` | string | да | Короткое название для меню |
| `level` | number (1-10) | да | Уровень сложности |
| `category` | enum | да | `basics`, `requirements`, `modeling`, `integration`, `architecture`, `soft` |
| `tags` | string[] | да | Теги для поиска и фильтрации |
| `prerequisites` | string[] | да | ID статей, которые нужно знать ДО этой. Пустой массив `[]`, если нет |
| `leads_to` | string[] | да | ID статей, которые откроются ПОСЛЕ этой. Пустой массив `[]`, если нет |
| `related` | string[] | да | Связанные темы (необязательные). Пустой массив `[]`, если нет |
| `estimated_time` | number | да | Минут на чтение |
| `difficulty` | number (1-5) | да | Субъективная сложность |

### Пример минимальной статьи

```markdown
---
id: basics/rest-fundamentals
title: Основы REST
sidebar_label: REST
level: 4
category: integration
tags: [rest, http, json]
prerequisites: [tech/http]
leads_to: [integration/openapi]
related: [basics/client-server]
estimated_time: 15
difficulty: 2
---

# Основы REST

Содержание статьи...
```

### Правила оформления

1. Заголовки — H2 (`##`) и H3 (`###`), H1 только в начале статьи
2. Код — в тройных обратных кавычках с указанием языка
3. Картинки — класть в `static/img/`, ссылаться как `/img/имя.png`
4. YouTube-видео — через MDX `<iframe>`
5. Связи между статьями указывать полными ID

## Как добавить новую технологию

1. Создайте `.md` файл в папке `tech/`
2. Заполните frontmatter в зависимости от `tech_type`:

### Для standard (стандарты/спецификации)

```yaml
---
id: my-standard
title: Название стандарта
sidebar_label: Кратко
tech_type: standard
level: 3
category: integration
tags: [тег1, тег2]
prerequisites: [category/article-id]
leads_to: []
related: []
estimated_time: 25
difficulty: 3
official_url: https://example.com/spec
version: "1.0.0"
published_date: 2023-01-01
first_seen: 2015
citation_key: my-standard-ref
requires_articles: [category/article-id]
used_in_tasks: [task-id]
alternatives: [other-tech-id]
---
```

### Для tool (инструменты)

```yaml
---
id: my-tool
title: Название инструмента
sidebar_label: Инструмент
tech_type: tool
level: 2
category: testing
tags: [инструмент, api]
prerequisites: [category/article-id]
leads_to: []
related: []
estimated_time: 15
difficulty: 2
vendor: Название вендора
official_url: https://example.com/
first_seen: 2020
requires_articles: [category/article-id]
used_in_tasks: [task-id]
alternatives: []
---
```

### Для methodology (методологии)

```yaml
---
id: my-methodology
title: Название методологии
sidebar_label: Методология
tech_type: methodology
level: 2
category: process
tags: [agile, methodology]
prerequisites: []
leads_to: []
related: []
estimated_time: 20
difficulty: 2
official_url: https://scrumguides.org/
first_seen: 1995
requires_articles: []
used_in_tasks: []
alternatives: []
---
```

### Поля frontmatter для технологий

| Поле | Тип | Для tech_type | Описание |
|------|-----|---------------|----------|
| `tech_type` | enum | все | `standard`, `tool`, `methodology`, `book` |
| `official_url` | string | standard, methodology | Официальная ссылка |
| `version` | string | standard | Версия спецификации |
| `published_date` | date | standard | Дата публикации |
| `first_seen` | number | все | Год первого появления. Используется для бейджа 🆕 (≤ 3 лет) |
| `citation_key` | string | standard, book | Ключ для цитирования в сносках |
| `vendor` | string | tool | Название вендора |
| `requires_articles` | string[] | все | ID статей, которые нужно знать для работы с технологией |
| `used_in_tasks` | string[] | все | ID задач, где применяется технология |
| `alternatives` | string[] | все | ID альтернативных технологий |

## Как добавить новую задачу

1. Создайте `.md` файл в папке `tasks/`
2. Заполните frontmatter:

```yaml
---
id: my-task
title: Название задачи
sidebar_label: Кратко
type: task
category: integration
difficulty: 2
estimated_time: 90
requires_articles:
  - category/article-id
  - category/another-article
requires_tech:
  - tech-id
deliverables:
  - Описание результата 1
  - Описание результата 2
context: |
  Многострочное описание контекста задачи.
steps:
  - Шаг 1
  - Шаг 2
pitfalls:
  - Типичная ошибка 1
  - Типичная ошибка 2
next_tasks:
  - next-task-id
previous_tasks: []
part_of_tracks:
  - track-id
---
```

### Калибровка difficulty

| Уровень | Значение | Соответствие |
|---------|----------|--------------|
| 1 | ★☆☆☆☆ | Trainee / Intern |
| 2 | ★★☆☆☆ | Junior / Strong Junior |
| 3 | ★★★☆☆ | Middle |
| 4 | ★★★★☆ | Senior |
| 5 | ★★★★★ | Lead / Architect |

### Поля frontmatter для задач

| Поле | Тип | Описание |
|------|-----|----------|
| `requires_articles` | string[] | Статьи, которые нужно изучить ДО выполнения задачи |
| `requires_tech` | string[] | Технологии, которые нужно освоить |
| `next_tasks` | string[] | Логически следующие задачи |
| `pitfalls` | string[] | Типичные ошибки при выполнении |
| `deliverables` | string[] | Ожидаемый результат работы |
| `part_of_tracks` | string[] | Треки, в которые входит задача |

## Правило цитирования стандартов

Для технологий типа `standard` и `book` обязательно указывать:
- `official_url` — ссылка на оригинал
- `citation_key` — ключ для сноски

Формат сноски в теле статьи:
```
Текст с упоминанием стандарта [^citation-key].

[^citation-key]: Название. URL: official_url (дата обращения: ДД.ММ.ГГГГ)
```

## Как связи отражаются на карте знаний

Граф строится автоматически из frontmatter всех файлов в `docs/`, `tech/` и `tasks/`:

| Тип связи | Из | В | Поле-источник |
|-----------|-----|---|---------------|
| prerequisite | статья | статья | `prerequisites` у статьи |
| enables | статья | технология | `requires_articles` у технологии |
| required_for | технология | задача | `requires_tech` у задачи |
| next_task | задача | задача | `next_tasks` у задачи |
| alternative | технология | технология | `alternatives` у технологии |
| leads_to | статья | статья | `leads_to` у статьи |

## Как добавить вопрос в тест

Отредактируйте `tests/level-test.json`:

```json
{
  "id": "q14",
  "text": "Текст вопроса",
  "options": ["Вариант 1", "Вариант 2", "Вариант 3", "Вариант 4"],
  "correct": 0,
  "maps_to": "category/article-id"
}
```

Для вопросов по технологиям добавьте поле `maps_to_type: "technology"`:

```json
{
  "id": "q15",
  "text": "Вопрос про технологию",
  "options": ["Опция 1", "Опция 2", "Опция 3", "Опция 4"],
  "correct": 2,
  "maps_to": "tech-id",
  "maps_to_type": "technology"
}
```

## Как добавить трек обучения

Треки определяются в `src/data/tracks-data.ts`. Добавьте новый объект `TrackDef`:

```typescript
const myTrack: TrackDef = {
  id: 'my-track',
  title: 'Название трека',
  description: 'Описание трека',
  stages: [
    {
      title: '1. Первый этап',
      description: 'Описание этапа',
      items: [
        {type: 'article', id: 'article-id', folder: 'category'},
        {type: 'tech', id: 'tech-id'},
        {type: 'task', id: 'task-id'},
      ],
    },
  ],
};
```

Затем добавьте трек в массив `allTracks`:

```typescript
export const allTracks: TrackDef[] = [juniorTrack, middleTrack, myTrack];
```

### Формат элементов трека

| Поле | Тип | Значение |
|------|-----|----------|
| `type` | `'article'` \| `'tech'` \| `'task'` | Тип контента |
| `id` | string | ID элемента (без префикса папки) |
| `folder` | string | Только для `article`: категория (basics, modeling, ...) |

### Добавление отображаемых названий

Для каждого нового ID добавьте запись в `itemLabels` в `src/data/tracks-data.ts`:

```typescript
itemLabels: {
  article: { 'new-article-id': 'Название статьи', ... },
  tech: { 'new-tech-id': 'Название технологии', ... },
  task: { 'new-task-id': 'Название задачи', ... },
}
```

## Процесс разработки

1. Форкнуть репозиторий
2. Создать ветку: `git checkout -b feature/my-feature`
3. Внести изменения
4. Проверить сборку: `npm run build`
5. Создать PR в main
