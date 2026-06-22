# База знаний системного аналитика

Статический сайт-энциклопедия для системных аналитиков с графом знаний, тестом на уровень и треками обучения.

## Быстрый старт

```bash
npm install
npm start        # локальный сервер (http://localhost:3000)
npm run build    # production-билд в build/
npm run serve    # просмотр production-билда локально
```

## Технологии

- Docusaurus 3
- TypeScript
- React
- MDX

## Структура проекта

```
docs/         # статьи в Markdown/MDX
src/          # React-компоненты и страницы
static/       # статические файлы (img, favicon)
tests/        # данные тестов
paths/        # треки обучения
```

## Как добавить статью

Создать MDX-файл в `docs/` с frontmatter:

```yaml
---
id: my-article
title: Моя статья
level: 3
category: basics
tags: [тег1, тег2]
prerequisites: [article-id]
leads_to: [another-article]
related: []
estimated_time: 15
difficulty: 2
---
```

## Лицензия

MIT
