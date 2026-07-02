id: drawio
audience: junior
title: "Draw.io (diagrams.net)"
sidebar_label: "Draw.io"
type: technology
tech_type: tool
category: modeling
tags: [modeling, tool, diagram, uml, bpmn]
official_url: "https://www.diagrams.net/"
vendor: "JGraph Ltd"
license: "Apache 2.0"
first_seen: 2012
requires_articles: [modeling/what-is-model]
used_in_tasks: [design-database-schema]
alternatives: [miro, figma]
difficulty: 1
estimated_time: 5

# Draw.io (diagrams.net)

Draw.io (сейчас развивается под именем diagrams.net) — бесплатный инструмент для создания диаграмм. Не требует установки: работает в браузере, но есть и desktop-версия.

## Основные возможности

- **Все популярные нотации:** BPMN, UML (все типы диаграмм), ER, C4, блок-схемы, майнд-карты
- **Интеграция с облаками:** Google Drive, OneDrive, GitHub, GitLab, Dropbox
- **Экспорт:** PNG, SVG, PDF, HTML (встраиваемый)
- **Шаблоны:** стартовые наборы для BPMN, UML, ER, C4
- **Совместная работа:** через облачное хранение (но не real-time, как в Miro)

## Форматы файлов

Draw.io сохраняет диаграммы в формате `.drawio` — это XML, который можно положить в Git и отслеживать изменения. При экспорте в SVG ссылки сохраняются кликабельными.

## Как аналитик использует Draw.io

Draw.io — основной инструмент для ежедневной работы с диаграммами:

- Быстро набросать BPMN-схему на созвоне
- Нарисовать ER-диаграмму для документации
- Собрать C4-диаграмму для архитектурного описания
- Сохранить диаграмму в репозиторий проекта

## Альтернативы

- **Miro** — лучше для воркшопов и совместной работы в реальном времени
- **Figma** — лучше для UI/UX, но есть и diagram-плагины
- **Lucidchart** — мощнее, но платный

## Когда выбрать Draw.io

| Сценарий | Draw.io | Miro | Figma |
|----------|---------|------|-------|
| Схема для документации | ★★★★★ | ★★★ | ★★★ |
| Воркшоп с командой | ★★ | ★★★★★ | ★★★ |
| Встраивание в git | ★★★★★ | ★ | ★ |
| Быстрый скетч | ★★★★ | ★★★★ | ★★★ |

## Ссылки

- [Официальный сайт](https://www.diagrams.net/)
- [Draw.io на GitHub](https://github.com/jgraph/drawio)
- [Библиотеки для C4](https://github.com/structurizr/drawio)
