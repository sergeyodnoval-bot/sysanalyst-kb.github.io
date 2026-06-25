# База знаний системного аналитика

Статический сайт-энциклопедия для системных аналитиков с графом знаний, тестом на уровень и треками обучения.

Содержит три типа контента:
- **Статьи** (`/docs/`) — теория от HTTP до BPMN
- **Технологии** (`/tech/`) — стандарты, инструменты и методологии
- **Задачи** (`/tasks/`) — практические кейсы с пошаговым подходом

## Возможности

- **Граф знаний** — визуальная карта с 3 типами узлов (статьи, технологии, задачи) и фильтрами
- **Тест на уровень** — определите свою точку старта
- **Треки обучения** — структурированные пути от Junior до Senior с прогресс-баром
- **Cross-reference блоки** — связанные технологии и задачи на каждой статье
- **Поиск** — локальный поиск по всем документам
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
├── basics/            #   основы (компьютер, программирование, HTTP, ОС)
├── requirements/      #   требования и стейкхолдеры
├── modeling/          #   моделирование (BPMN, UML, C4, DFD)
├── integration/       #   интеграции (REST, OpenAPI, брокеры сообщений)
├── data/              #   данные и SQL
├── architecture/      #   архитектура и паттерны
├── process/           #   процессы и методологии (Scrum, Kanban)
└── soft/              #   soft skills и деловая переписка
tech/                  # технологии (стандарты, инструменты, методологии)
├── openapi.md         #   стандарт
├── postman.md         #   инструмент
└── scrum.md           #   методология
tasks/                 # практические задачи с пошаговым подходом
├── design-rest-api.md
├── conduct-stakeholder-interview.md
└── ...
src/                   # React-компоненты и страницы
├── pages/             #   страницы (map — граф, test — тест, tracks — треки)
├── components/        #   переиспользуемые компоненты (UsedTechnologies, RequiredKnowledge и др.)
├── data/              #   данные треков и метаданные
└── theme/             #   swizzled-компоненты Docusaurus (Layout с блоками)
static/                # статические файлы (img, favicon)
tests/                 # данные теста на уровень
```

## Как добавить контент

Подробные инструкции — в [CONTRIBUTING.md](CONTRIBUTING.md).

Кратко:
- **Статью** — создать `.md` в `docs/` с frontmatter (prerequisites, leads_to)
- **Технологию** — создать `.md` в `tech/` с `tech_type` (standard/tool/methodology)
- **Задачу** — создать `.md` в `tasks/` с `type: task` и difficulty
- **Трек** — добавить в `src/data/tracks-data.ts` с этапами и ссылками на статьи, технологии и задачи

## Лицензия

MIT
