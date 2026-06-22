# База знаний системного аналитика

Статический сайт-энциклопедия для системных аналитиков с графом знаний, тестом на уровень и треками обучения.

## Возможности

- **Граф знаний** — визуальная карта зависимостей между статьями
- **Тест на уровень** — определите свою точку старта
- **Треки обучения** — структурированные пути от Junior до Senior
- **Поиск** — локальный поиск по всем статьям
- **Тёмная тема** — переключение светлой/тёмной темы

## Быстрый старт

```bash
npm install
npm start        # локальный сервер (http://localhost:3000)
npm run build    # production-билд в build/
npm run serve    # просмотр production-билда локально
```

## Деплой на GitHub Pages

Репозиторий настроен на автоматический деплой через GitHub Actions. При пуше в ветку `main`:

1. Сайт собирается (`npm run build`)
2. Публикуется на GitHub Pages

### Настройка вручную

1. В репозитории: Settings → Pages → Source → GitHub Actions
2. Убедиться, что в `docusaurus.config.ts` указаны корректные `url` и `baseUrl`
3. Сделать пуш в `main` — деплой произойдёт автоматически

## Технологии

- Docusaurus 3
- TypeScript / React
- MDX
- ReactFlow (граф знаний)
- dagre (авто-раскладка графа)
- docusaurus-lunr-search (локальный поиск)

## Структура проекта

```
docs/                  # статьи в Markdown/MDX
├── basics/            #   основы (HTTP, клиент-сервер)
├── integration/       #   интеграции (REST, OpenAPI)
└── modeling/          #   моделирование (BPMN)
src/                   # React-компоненты и страницы
├── pages/             #   страницы (map, test, tracks)
├── components/        #   переиспользуемые компоненты
└── theme/             #   swizzled-компоненты Docusaurus
static/                # статические файлы (img, favicon)
tests/                 # данные тестов
paths/                 # треки обучения
```

## Как добавить статью

Создать MDX-файл в нужной подпапке `docs/` с frontmatter:

```yaml
---
id: my-article                # уникальный ID (совпадает с именем файла)
title: Моя статья              # заголовок
sidebar_label: Моя статья      # короткое название для меню
level: 3                      # 1..10 — уровень сложности
category: basics              # basics | requirements | modeling | integration | architecture | soft
tags: [тег1, тег2]            # теги для поиска и фильтрации
prerequisites: [article-id]   # ID статей, которые нужно знать ДО
leads_to: [another-article]   # ID статей, которые откроются ПОСЛЕ
related: []                   # связанные, но не обязательные темы
estimated_time: 15            # минут на чтение
difficulty: 2                 # 1..5 — субъективная сложность
---
```

**Важно:** В полях `prerequisites`, `leads_to`, `related` указывайте полные ID с учётом папки (например, `basics/http-protocol`, а не `http-protocol`).

## Лицензия

MIT
