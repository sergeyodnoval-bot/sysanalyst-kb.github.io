---
id: drawio
title: "Draw.io (diagrams.net)"
sidebar_label: Draw.io
type: technology
tech_type: tool
category: modeling
tags: [modeling, diagram, bpmn, uml, tool]
official_url: "https://www.diagrams.net/"
vendor: "JGraph Ltd"
license: "Apache 2.0"
first_seen: 2012
requires_articles: [basics/what-is-model]
used_in_tasks: []
alternatives: [plantuml]
difficulty: 1
estimated_time: 10
---

# Draw.io (diagrams.net)

Draw.io — это бесплатный инструмент для создания диаграмм. Работает в браузере (можно интегрировать с Google Drive, GitHub, Confluence) и как настольное приложение. Поддерживает BPMN, UML, ERD, flowchart и десятки других нотаций.

## Для чего используется

- Моделирование бизнес-процессов (BPMN, flowchart)
- Создание архитектурных схем (C4, AWS, Kubernetes)
- Прототипирование интерфейсов (wireframes)
- Визуализация ER-диаграмм (для БД)
- Документация в Confluence (есть плагин)

## Ключевые концепции

### Форматы файлов

Draw.io использует собственный формат `.drawio` (XML), но поддерживает экспорт в PNG, SVG, PDF, HTML.

### Интеграции

- **Google Drive** — диаграммы хранятся как Google-документы
- **GitHub** — `.drawio` файлы можно хранить в репозитории и ревьювить изменения
- **Confluence/Notion** — есть плагины для вставки диаграмм
- **VS Code** — расширение для редактирования `.drawio` прямо в IDE

### Нотации

В Draw.io есть готовые наборы фигур для большинства нотаций:

| Нотация | Когда использовать |
|---------|------------------|
| BPMN 2.0 | Бизнес-процессы |
| UML | Class, Use Case, Sequence, Activity |
| ERD | Модели данных |
| C4 | Архитектура ПО |
| Flowchart | Алгоритмы и логика |
| Wireframe | Прототипы интерфейсов |

## Почему это выбор №1 для аналитика в РФ

В российских компаниях Draw.io — стандарт де-факто:

- Бесплатный, не требует лицензии
- Не зависит от санкционных ограничений
- Работает офлайн (настольная версия)
- Файлы в Git — можно делать code review диаграмм
- В Confluence Cloud и Data Center есть официальный плагин

## Когда использовать

- Быстро набросать схму для обсуждения на встрече
- Создать BPMN-диаграмму процесса
- Задокументировать архитектуру решения
- Сделать wireframe нового экрана

## Когда НЕ использовать

- **Сложные BPMN-диаграммы с исполнителями/пулами** — Camunda Modeler удобнее
- **Текстовое описание диаграмм** — PlantUML лучше (диаграмма = код)
- **Enterprise-документирование** — Enterprise Architect или Sparx более формальны

## Как начать

1. Откройте [app.diagrams.net](https://app.diagrams.net/) — не требует установки
2. Выберите, куда сохранять файлы (Google Drive / GitHub / устройство)
3. Начните с шаблона или пустого холста
4. Попробуйте нарисовать простой flowchart

## Ссылки

- [Официальный сайт](https://www.diagrams.net/)
- [Библиотека шаблонов](https://app.diagrams.net/templates)
- [Draw.io в VS Code](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)
- [Плагин для Confluence](https://marketplace.atlassian.com/apps/1211404/draw-io-diagrams-for-confluence)
