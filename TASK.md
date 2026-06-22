# TASK.md — Техническое задание на MVP

## Цель
Развернуть работающий статический сайт на Docusaurus 3 с:
- 5 демонстрационными статьями, связанными через граф зависимостей
- Визуализацией графа знаний
- Тестом на определение уровня
- Поиском по контенту
- Готовым к деплою на Vercel/GitHub Pages

## Критерии готовности MVP (Definition of Done)
- [ ] `npm run build` проходит без ошибок
- [ ] Сайт открывается локально (`npm run start`) и на деплое
- [x] Все 5 демо-статей читаются, переходы между ними работают
- [x] На странице статьи видны блоки "Что нужно знать до" и "Куда двигаться дальше"
- [ ] Карта знаний отображает все 5 статей как узлы с ребрами
- [ ] Поиск находит статью по ключевому слову из текста
- [ ] Тест на уровень работает, выдает рекомендацию
- [ ] Lighthouse Performance > 90, SEO > 95
- [ ] README.md описывает, как развернуть проект

---

## Этап 0. Инициализация проекта
**DoD:** Репозиторий создан, Docusaurus запускается локально, пустая страница открывается.

- [x] Создать репозиторий `sysanalyst-kb`
- [x] Инициализировать Docusaurus 3: `npx create-docusaurus@latest . classic --typescript`
- [x] Удалить пример-контент из `docs/` и `blog/`
- [x] Настроить `docusaurus.config.js`:
  - title: "База знаний системного аналитика"
  - url / baseUrl под будущий домен
  - тема — светлая по умолчанию, переключатель темы сохранить
  - navbar: пункты "Карта знаний", "Тест на уровень", "Треки", "Поиск"
  - footer: ссылки на репо, контакты
- [x] Настроить `sidebars.js` — автоматическая генерация из структуры `docs/`
- [x] Подключить `docusaurus-lunr-search` для локального поиска
- [x] Добавить README.md с инструкцией: `npm install`, `npm run start`, `npm run build`
- [x] Коммит: `chore: init docusaurus project`

---

## Этап 1. Модель статьи и 5 демо-статей
**DoD:** 5 статей с валидным frontmatter, переходы по ссылкам работают, поиск находит статьи.

### 1.1. Создать структуру папок в `docs/`: **ГОТОВО**

```
docs/
├── basics/
│   ├── http-protocol.md
│   └── client-server.md
├── integration/
│   ├── api-rest-basics.md
│   └── api-openapi.md
└── modeling/
    └── bpmn.md
```

### 1.2. Шаблон frontmatter — реализован во всех 5 статьях

### 1.3. Написаны 5 демо-статей:
- Цепочка: `http-protocol` → `api-rest-basics` → `api-openapi`
- `client-server` как prereq для rest
- `bpmn` изолированная
- 300-500 слов каждая, H2/H3 заголовки, таблицы
- `http-protocol` — с картинкой (http-diagram.png)
- `api-rest-basics` — со встроенным YouTube-видео (MDX iframe)
- `api-openapi` — с картинкой (swagger-example.png)

### 1.4. Созданы `_category_.json` для basics/, integration/, modeling/

**Коммит:** `feat: add 5 demo articles with dependencies` — выполнен

---

## Этап 2. Блоки навигации на странице статьи
**DoD:** На каждой статье отображаются 3 блока со ссылками на связанные статьи.

### 2.1. Созданы MDX-компоненты в `src/components/`: **ГОТОВО**

- `PrerequisitesList.tsx` — "Что нужно знать перед" ✓
- `NextStepsList.tsx` — "Куда двигаться дальше" ✓
- `RelatedTopics.tsx` — "Похожие темы" ✓
- `ArticleLink.tsx` — общий компонент ссылки с резолвингом ID

### 2.2. Swizzle `DocItem/Layout` и интеграция: **ГОТОВО**

- `src/theme/DocItem/Layout/index.tsx` — добавлены `<PrerequisitesList />` до контента, `<NextStepsList />` и `<RelatedTopics />` после контента
- Данные берутся из `useDoc().frontMatter` (prerequisites, leads_to, related)

### 2.3. Проверка `api-rest-basics`: **ГОТОВО**

- **prereq:** HTTP (`/docs/basics/http-protocol`), Клиент-сервер (`/docs/basics/client-server`) ✓
- **leads_to:** OpenAPI (`/docs/integration/api-openapi`) ✓
- **related:** не указаны — блок не отображается ✓
- **api-openapi** → related: BPMN отображается ✓

**Коммит:** `feat: add navigation blocks to article pages` — выполнен

---

## Этап 3. Карта знаний (визуализация графа)
**DoD:** Страница `/map` отображает интерактивный граф всех статей.

### 3.1. Создать страницу `src/pages/map.tsx`

### 3.2. На этапе сборки прочитать frontmatter всех статей и сформировать JSON:

```json
{
  "nodes": [
    {"id": "http-protocol", "title": "...", "level": 2, "category": "basics"}
  ],
  "edges": [
    {"from": "http-protocol", "to": "api-rest-basics", "type": "prerequisite"}
  ]
}
```

Реализовать через кастомный Docusaurus-плагин в `docusaurus.config.js` (читать `docs/**/*.md` на `loadContent`, генерировать JSON в `src/data/graph.json`).

### 3.3. Установить `reactflow` (`npm i reactflow`)

### 3.4. На странице `/map` отрендерить граф:

- Узлы — прямоугольники с названием статьи и уровнем (цвет по категории)
- Ребра — стрелки от prereq к статье
- Клик по узлу → переход на статью
- Зум, панорамирование
- Авто-раскладка (использовать `dagre` для layout)

### 3.5. Добавить пункт "Карта знаний" в navbar.

**Коммит:** `feat: add interactive knowledge map`

---

## Этап 4. Тест на определение уровня
**DoD:** Страница `/test` с 10 вопросами, по результатам — рекомендация.

### 4.1. Создать `tests/level-test.json`:

```json
{
  "questions": [
    {
      "id": "q1",
      "text": "Что такое HTTP?",
      "options": ["Протокол передачи данных", "Язык программирования", "База данных"],
      "correct": 0,
      "maps_to": "http-protocol"
    }
  ]
}
```

### 4.2. Создать страницу `src/pages/test.tsx`:

- Показывает вопросы по одному
- Считает правильные ответы
- По завершении определяет "уровень пользователя" — минимальный `level` среди статей, к которым привязаны неправильные ответы
- Рекомендует стартовую статью: первую в треке с этим уровнем

### 4.3. Добавить пункт "Тест на уровень" в navbar.

**Коммит:** `feat: add level assessment test`

---

## Этап 5. Готовые треки обучения
**DoD:** Страница `/tracks` со списком треков, внутри — линейный список статей.

### 5.1. Создать `paths/` с markdown-файлами треков:

```yaml
---
id: junior-track
title: "Путь Junior System Analyst"
description: "С нуля до первой работы"
articles:
  - http-protocol
  - client-server
  - api-rest-basics
  - api-openapi
  - bpmn
---
```

### 5.2. Создать страницу `src/pages/tracks.tsx` — список треков

### 5.3. Создать шаблон `src/pages/tracks/[id].tsx` — страница трека с прогрессом

**Коммит:** `feat: add learning tracks`

---

## Этап 6. Деплой и финализация
**DoD:** Сайт доступен по публичному URL, все DoD из начала файла выполнены.

- [ ] Настроить GitHub Actions: `on: push to main → npm run build → deploy to GitHub Pages` (или Vercel — по выбору, но GitHub Pages бесплатнее и проще)
- [ ] Добавить `CNAME` если есть домен
- [ ] Проверить Lighthouse: Performance, SEO, Accessibility, Best Practices — все > 90
- [ ] Обновить README.md: скриншоты, ссылка на деплой, инструкция для авторов
- [ ] Создать `CONTRIBUTING.md` — как добавить новую статью (шаблон frontmatter + пример)

**Коммит:** `chore: setup CI/CD and finalize MVP`

---

## Нефункциональные требования

- **Скорость:** первая отрисовка < 1.5 сек на 3G
- **SEO:** все статьи индексируются, OpenGraph-теги, sitemap.xml, robots.txt
- **Доступность:** WCAG 2.1 AA минимум (контраст, alt у картинок, навигация с клавиатуры)
- **Адаптив:** корректно на 320px — 1920px
- **Браузеры:** последние 2 версии Chrome, Firefox, Safari, Edge

## Закладки под будущее (НЕ делать в MVP, но учитывать)

- Поле `access: free|premium` во frontmatter — не добавляем, но не мешаем добавить
- Поле `author` — можно добавить уже сейчас, бесплатно
- localStorage для прогресса — не делаем, но компоненты должны допускать замену на API

---

## Порядок выполнения

Строго по этапам 0 → 6. Не переходить к следующему, пока не выполнен DoD текущего.
После каждого этапа — коммит и отметка в этом файле ([x]).