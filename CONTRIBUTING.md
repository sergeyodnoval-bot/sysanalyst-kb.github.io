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
prerequisites: [basics/http-protocol]
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

## Как добавить трек обучения

Создайте MD-файл в `paths/`:

```yaml
---
id: my-track
title: Название трека
description: Описание трека
articles:
  - category/article-1
  - category/article-2
---
```

## Как добавить вопрос в тест

Отредактируйте `tests/level-test.json`:

```json
{
  "id": "q11",
  "text": "Текст вопроса",
  "options": ["Вариант 1", "Вариант 2", "Вариант 3", "Вариант 4"],
  "correct": 0,
  "maps_to": "category/article-id"
}
```

## Процесс разработки

1. Форкнуть репозиторий
2. Создать ветку: `git checkout -b feature/my-feature`
3. Внести изменения
4. Проверить сборку: `npm run build`
5. Создать PR в main
