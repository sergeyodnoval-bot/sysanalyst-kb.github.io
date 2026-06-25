# TASK.md v2 — Развитие MVP: технологии, задачи и расширенный граф

## Контекст
Предыдущий этап MVP завершён (см. `TASK.v1.archive.md`). Сайт работает:
- Docusaurus 3 + TypeScript настроен
- 5 демо-статей в `docs/` с валидным frontmatter
- Swizzle `DocItem/Layout` с блоками Prerequisites/NextSteps/Related
- Плагин `knowledgeGraphPlugin` читает `docs/**/*.md` через `gray-matter`
- ReactFlow + dagre на `/map` с 5 узлами
- Тест на уровень, треки, поиск — работают
- CI/CD на GitHub Pages настроен

**Цель этого этапа:** расширить сайт до трёх типов контента (статьи + технологии + задачи) с единым графом и cross-reference блоками.

## Критерии готовности этапа (Definition of Done)
- [x] `npm run build` проходит без ошибок после всех изменений
- [x] Папка `tech/` настроена как отдельный content plugin, URL `/tech/[id]`
- [x] Папка `tasks/` настроена как отдельный content plugin, URL `/tasks/[id]`
- [x] 3+ демо-технологии (разные `tech_type`): standard, tool, methodology
- [x] 2+ демо-задачи (разные `difficulty`): Strong Junior, Middle
- [x] Карта знаний `/map` отображает 3 типа узлов с разными формами/цветами
- [x] Фильтры на карте работают (по типу, по tech_type, по difficulty)
- [x] На странице статьи видны блоки "Используемые технологии" и "Практические задачи"
- [x] На странице технологии видны блоки "Что нужно знать", "Где применяется", "Альтернативы", "Ссылка на оригинал"
- [x] На странице задачи видны блоки "Необходимые знания", "Следующие задачи", "Типичные ошибки"
- [x] Бейдж "🆕 New" отображается для технологий с `first_seen` ≤ 3 года от текущего
- [x] Поиск находит технологии и задачи по ключевым словам

---

## ✅ Этап A. Модель технологии + 3 демо-технологии
**DoD:** Папка `tech/` работает как отдельный раздел, 3 технологии с разными `tech_type` открываются по URL.

### A.1. Настроить content plugin для `tech/`

В `docusaurus.config.ts` добавить второй экземпляр `@docusaurus/plugin-content-docs`:

```typescript
{
  id: 'tech',
  path: 'tech',
  routeBasePath: 'tech',
  sidebarPath: require.resolve('./sidebars-tech.js'),
  editUrl: '...',
}
```

Создать `sidebars-tech.js` по аналогии с основным `sidebars.js`.

### A.2. Шаблон frontmatter для `tech/`

Обязательные поля:

```yaml
---
id: string              # уникальный ID, совпадает с именем файла
title: string           # полное название
sidebar_label: string   # короткое название для меню
type: technology        # фиксированное значение
tech_type: enum         # technology | tool | standard | methodology | book
category: enum          # basics | requirements | modeling | integration | architecture | process | soft | specialization
tags: string[]

# Справочная информация
official_url: string    # ссылка на оригинал (обязательно для standard и book)
github: string          # опционально
vendor: string          # вендор/автор
license: string         # для technology/tool

# Версионность (для standard и book)
version: string
published_date: date    # формат YYYY-MM-DD
superseded_by: string   # ID новой версии, если есть

# Для пометки "новых" технологий
first_seen: number      # год появления

# Связи
requires_articles: string[]   # ID статей (с префиксом папки, например "basics/http-protocol")
used_in_tasks: string[]       # ID задач
alternatives: string[]        # ID альтернатив

# Метаданные
difficulty: number      # 1..5
estimated_time: number  # минуты

# Для standard и book — цитирование
citation_key: string
citation_format: string
---
```

### A.3. Создать 3 демо-технологии

1. **`tech/openapi.md`** (tech_type: standard)
   - `official_url: https://spec.openapis.org/oas/latest.html`
   - `version: "3.1.0"`, `published_date: 2021-02-15`
   - `first_seen: 2010` (Swagger)
   - `citation_key: openapi31`
   - `requires_articles: [integration/api-rest-basics]`
   - `used_in_tasks: [design-rest-api]`
   - В теле статьи — сноска `[^openapi31]` с цитированием

2. **`tech/postman.md`** (tech_type: tool)
   - `vendor: Postman Inc.`
   - `official_url: https://www.postman.com/`
   - `first_seen: 2012`
   - `requires_articles: [integration/api-rest-basics]`

3. **`tech/scrum.md`** (tech_type: methodology)
   - `official_url: https://scrumguides.org/`
   - `first_seen: 1995`
   - `category: process`
   - `requires_articles: []` (базовая методология)

### A.4. Проверить
- `/tech/openapi` открывается, ссылка на оригинал кликабельна
- `/tech/postman` и `/tech/scrum` работают
- Sidebar для `tech/` отображается
- Поиск находит "OpenAPI", "Postman", "Scrum"

**Коммит:** `feat: add tech/ section with 3 demo technologies of different subtypes`

---

## ✅ Этап B. Модель задачи + 2 демо-задачи
**DoD:** Папка `tasks/` работает как отдельный раздел, 2 задачи с валидным frontmatter.

### B.1. Настроить content plugin для `tasks/`

В `docusaurus.config.ts` добавить третий экземпляр `@docusaurus/plugin-content-docs`:

```typescript
{
  id: 'tasks',
  path: 'tasks',
  routeBasePath: 'tasks',
  sidebarPath: require.resolve('./sidebars-tasks.js'),
  editUrl: '...',
}
```

Создать `sidebars-tasks.js`.

### B.2. Шаблон frontmatter для `tasks/`

```yaml
---
id: string
title: string
sidebar_label: string
type: task                # фиксированное значение
category: enum            # включая soft
difficulty: number        # 1..5 — калибруется по уровню аналитика
estimated_time: number    # минуты на выполнение

# Что нужно изучить
requires_articles: string[]
requires_tech: string[]

# Результат
deliverables: string[]
context: string           # многострочный текст (использовать YAML multiline |)
steps: string[]
pitfalls: string[]

# Связь задача → задача
next_tasks: string[]
previous_tasks: string[]  # опционально

# Связь с треками
part_of_tracks: string[]
---
```

### B.3. Создать 2 демо-задачи

1. **`tasks/design-rest-api.md`** (difficulty: 2, category: integration)
   - `requires_articles: [basics/http-protocol, basics/client-server, integration/api-rest-basics, integration/api-openapi]`
   - `requires_tech: [openapi, postman]`
   - `deliverables: [OpenAPI-спецификация, Sequence diagram, Таблица endpoint'ов]`
   - `next_tasks: [write-api-documentation]`
   - В теле — пошаговый подход, чек-лист, пример результата

2. **`tasks/conduct-stakeholder-interview.md`** (difficulty: 3, category: soft)
   - `requires_articles: []` (можно добавить позже)
   - `requires_tech: [confluence, jira]` (если добавим как демо)
   - `deliverables: [Протокол интервью, Список требований, Матрица стейкхолдеров]`
   - `next_tasks: []`
   - В теле — подготовка, проведение, фиксация результатов

### B.4. Проверить
- `/tasks/design-rest-api` открывается
- Чек-лист шагов рендерится
- Ссылки на статьи и технологии работают
- Sidebar для `tasks/` отображается

**Коммит:** `feat: add tasks/ section with 2 demo tasks`

---

## ✅ Этап C. Расширение графа знаний (3 типа узлов)
**DoD:** Карта знаний `/map` отображает статьи, технологии и задачи с разными визуальными стилями.

### C.1. Расширить `knowledgeGraphPlugin`

В существующем плагине добавить чтение `tech/**/*.md` и `tasks/**/*.md`:

```typescript
// Читать три типа контента
const articles = readMarkdownFiles('docs/**/*.md', 'article');
const technologies = readMarkdownFiles('tech/**/*.md', 'technology');
const tasks = readMarkdownFiles('tasks/**/*.md', 'task');

const allNodes = [...articles, ...technologies, ...tasks];
```

Для каждого типа собирать свои поля:
- **article:** id, title, level, category
- **technology:** id, title, tech_type, category, first_seen, difficulty
- **task:** id, title, category, difficulty, estimated_time

### C.2. Расширить рёбра графа

Добавить новые типы рёбер:
- `prerequisite` — статья → статья (уже есть)
- `enables` — статья → технология (через `requires_articles` технологии)
- `required_for` — технология → задача (через `requires_tech` задачи)
- `next_task` — задача → задача (через `next_tasks`)
- `alternative` — технология → технология (через `alternatives`)

Важно: рёбра `enables` и `required_for` строятся **автоматически** из frontmatter технологий и задач, а не дублируются в статьях.

### C.3. Обновить визуализацию на `/map`

Создать кастомные узлы ReactFlow для каждого типа:

| Тип | Форма | Цвет | Дополнительно |
|---|---|---|---|
| article | Прямоугольник | Синий (#3b82f6) | — |
| technology (standard) | Шестиугольник с рамкой | Зелёный (#10b981) | Бейдж "🆕" если new |
| technology (tool) | Шестиугольник со скруглениями | Зелёный | Бейдж "🆕" если new |
| technology (methodology) | Шестиугольник пунктирный | Зелёный | Бейдж "🆕" если new |
| technology (book) | Шестиугольник | Зелёный | — |
| task | Овал | Оранжевый (#f59e0b) | Размер по difficulty |

Ребра разных типов — разные стили:
- `prerequisite` — сплошная стрелка
- `enables` — пунктирная стрелка
- `required_for` — штрих-пунктирная
- `next_task` — жирная стрелка
- `alternative` — серая без стрелки

### C.4. Добавить фильтры на `/map`

Панель фильтров над графом:
- [x] Статьи (показать/скрыть)
- [x] Технологии (с подчекбоксами: standard, tool, methodology, book)
- [x] Задачи (с фильтром по difficulty: 1-2, 3, 4-5)
- [x] Показывать рёбра альтернатив

Фильтры должны скрывать узлы и их изолированные рёбра.

### C.5. Проверить
- На карте 10 узлов (5 статей + 3 технологии + 2 задачи)
- Все рёбра отображаются корректно
- Фильтры работают
- Клик по узлу технологии → `/tech/[id]`
- Клик по узлу задачи → `/tasks/[id]`
- Бейдж "🆕 New" на `postman` (first_seen: 2012) — **не показывается** (прошло > 3 лет)
- Если добавить технологию с `first_seen: 2024` — бейдж появится

**Коммит:** `feat: extend knowledge graph with 3 node types and filters`

---

## ✅ Этап D. UX-блоки для страниц статей
**DoD:** На каждой статье видны связанные технологии и задачи.

### D.1. Создать компоненты в `src/components/`

- **`UsedTechnologies.tsx`** — список технологий, применяемых в статье
  - Группировка по `tech_type` (Стандарты / Инструменты / Методологии)
  - Для каждой технологии — название, бейдж "🆕" если new, ссылка
  - Берёт данные: ищет все технологии, у которых в `requires_articles` есть ID текущей статьи

- **`PracticalTasks.tsx`** — список задач, где применяется статья
  - Для каждой задачи — название, difficulty (звёздочки ⭐), estimated_time
  - Берёт данные: ищет все задачи, у которых в `requires_articles` есть ID текущей статьи

### D.2. Интегрировать в существующий swizzle

В `src/theme/DocItem/Layout/index.tsx` добавить после `<NextStepsList />`:

```tsx
{doc.type !== 'technology' && doc.type !== 'task' && (
  <>
    <UsedTechnologies />
    <PracticalTasks />
  </>
)}
```

### D.3. Проверить на статье `api-rest-basics`
- Блок "Используемые технологии": OpenAPI (standard), Postman (tool)
- Блок "Практические задачи": design-rest-api (⭐⭐, 120 мин)
- Клики работают

**Коммит:** `feat: add UsedTechnologies and PracticalTasks blocks to articles`

---

## ✅ Этап E. UX-блоки для страниц технологий и задач
**DoD:** На страницах `tech/` и `tasks/` видны связанные материалы.

### E.1. Создать компоненты

- **`RequiredKnowledge.tsx`** — для технологий и задач
  - Две секции: "Статьи" и "Технологии" (для задач)
  - Берёт данные из `requires_articles` и `requires_tech`

- **`AppliedInTasks.tsx`** — для технологий
  - Список задач, где применяется технология
  - Берёт данные: ищет задачи, у которых в `requires_tech` есть ID текущей технологии

- **`AlternativesList.tsx`** — для технологий
  - Список альтернативных технологий с кратким пояснением

- **`NextTasksList.tsx`** — для задач
  - Список задач, которые логически следуют

- **`CitationBlock.tsx`** — для технологий типа standard/book
  - Показывает `official_url`, `version`, `published_date`
  - Формат цитирования для копирования

- **`NewBadge.tsx`** — универсальный бейдж "🆕 New" для технологий

### E.2. Создать swizzle для tech/ и tasks/

Docusaurus позволяет swizzle шаблоны для конкретных content plugin. Создать:
- `src/theme-tech/DocItem/Layout/index.tsx` — для `/tech/[id]`
- `src/theme-tasks/DocItem/Layout/index.tsx` — для `/tasks/[id]`

Или использовать условную логику в едином swizzle через `usePluginData('tech')` / `usePluginData('tasks')`.

### E.3. Проверить

На странице `tech/openapi`:
- Блок "Что нужно знать": статья `api-rest-basics`
- Блок "Где применяется": задача `design-rest-api`
- Блок "Ссылка на оригинал": spec.openapis.org, версия 3.1.0
- Блок "Цитирование": готовый текст для сноски

На странице `tasks/design-rest-api`:
- Блок "Необходимые знания": статьи (http-protocol, client-server, api-rest-basics, api-openapi), технологии (openapi, postman)
- Блок "Следующие задачи": write-api-documentation (если добавим)
- Блок "Типичные ошибки": список pitfalls из frontmatter

**Коммит:** `feat: add navigation blocks to tech and task pages`

---

## ✅ Этап F. Обновление тестов и треков
**DoD:** Тест учитывает новые типы контента, треки включают технологии и задачи.

### F.1. Расширить `tests/level-test.json`

Добавить вопросы по технологиям:
```json
{
  "id": "q11",
  "text": "Какой стандарт описывает REST API?",
  "options": ["OpenAPI", "ISO 25010", "RFC 2616", "BPMN 2.0"],
  "correct": 0,
  "maps_to": "openapi",
  "maps_to_type": "technology"
}
```

### F.2. Обновить `src/pages/test.tsx`

- Поддержка `maps_to_type: "technology"` — рекомендация ведёт на `/tech/[id]`
- Если пользователь ошибся на технологии — рекомендовать изучить соответствующую статью

### F.3. Создать треки в `src/data/tracks-data.ts`

Треки определяются как TypeScript-объекты, а не MD-файлы в `paths/`:

```typescript
// src/data/tracks-data.ts
const juniorTrack: TrackDef = {
  id: 'junior-track',
  title: 'Junior System Analyst',
  description: '...',
  stages: [
    {
      title: '0. Погружение в IT',
      description: '...',
      items: [
        {type: 'article', id: 'how-computer-works', folder: 'basics'},
        {type: 'tech', id: 'browser'},
        {type: 'task', id: 'find-analyst-in-team'},
      ],
    },
  ],
};
```

Также в `tracks-data.ts` определяются:
- `itemLabels` — отображаемые названия для каждого ID по типу контента
- `itemColors` — цвета для маркеров типов
- `itemIcons` — иконки для маркеров типов
- `trackItemPath()` — функция построения URL по типу и ID
- `allTracks` — экспортируемый массив всех треков

### F.4. Обновить `src/pages/tracks.tsx` и детальный view

- Отображать треки списком-карточек (свёрнуто), клик — разворачивает состав
- Прогресс-бар учитывает все этапы трека
- Сводка: N статей · M технологий · K задач

### F.5. Проверить
- Тест включает вопросы по OpenAPI
- Трек junior-track показывает 5 статей + 2 технологии + 1 задачу
- Клики ведут на правильные URL

**Коммит:** `feat: extend tests and tracks with technologies and tasks`

---

## Этап G. Финализация и документация
**DoD:** Проект готов к использованию, документация обновлена.

### G.1. Обновить `CONTRIBUTING.md`

Добавить разделы:
- Как добавить новую технологию (шаблон frontmatter + примеры для каждого tech_type)
- Как добавить новую задачу (шаблон + калибровка difficulty)
- Правило цитирования стандартов (формат сносок, обязательные поля)
- Как связи отражаются на карте знаний

### G.2. Обновить `README.md`

- Описание трёх типов контента
- Скриншоты карты знаний с 3 типами узлов
- Инструкция по локальному запуску

### G.3. Обновить `PROJECT_CONTEXT.md`

Зафиксировать финальные решения:
- Подтипы tech_type
- Версионность для standards
- first_seen для бейджа "New"
- next_tasks для задач
- Калибровка difficulty по уровню аналитика

### G.4. Проверить Lighthouse

Запустить `npm run build && npx serve build` и проверить:
- Performance > 90
- SEO > 95
- Accessibility > 90
- Best Practices > 90

### G.5. Деплой

- [ ] Запушить в main
- [ ] Дождаться GitHub Actions
- [ ] Проверить сайт на публичном URL
- [ ] Убедиться, что все новые страницы индексируются (sitemap.xml обновился)

**Коммит:** `chore: finalize stage 2 — tech, tasks, extended graph`

---

## Нефункциональные требования (наследуются из v1)

- Скорость: первая отрисовка < 1.5 сек на 3G
- SEO: все статьи/технологии/задачи индексируются, OpenGraph-теги
- Доступность: WCAG 2.1 AA
- Адаптив: 320px — 1920px
- Браузеры: последние 2 версии Chrome, Firefox, Safari, Edge

## Закладки под будущее (НЕ делать сейчас)

- Поле `access: free|premium` — не добавляем
- Авторизация и прогресс — не делаем
- Достижения/бейджи — не делаем
- Глоссарий — не нужен (теги + поиск покрывают)

---

## Порядок выполнения

Строго по этапам A → G. Не переходить к следующему, пока не выполнен DoD текущего.
После каждого этапа — коммит и отметка в этом файле ([x]).

## Архив

Предыдущий TASK.md (этапы 0–6) сохранён в `TASK.v1.archive.md` для истории.