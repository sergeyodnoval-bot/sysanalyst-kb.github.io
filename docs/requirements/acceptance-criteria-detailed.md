---
id: acceptance-criteria-detailed
sidebar_position: 10
title: "Acceptance Criteria (детально)"
sidebar_label: "Acceptance Criteria"
level: 2
category: requirements
tags: [requirements, l1, junior, acceptance-criteria, bdd, testing]
prerequisites: [requirements/user-stories, requirements/bdd-scenarios]
leads_to: []
related: [requirements/functional-requirements-detailed, requirements/use-cases-formal]
estimated_time: 25
difficulty: 2
---

# Acceptance Criteria (детально)

Acceptance Criteria (AC) — это условия, при выполнении которых задача (User Story) считается **готовой и принятой**. AC — это контракт между аналитиком, разработчиком и тестировщиком.

## Зачем нужны AC

- Единое понимание «готово» — без AC разработчик может сделать не то
- База для тестов — каждый AC → минимум один тест
- Scope management — если нет AC, можно «допиливать» бесконечно

## Форматы AC

### 1. Scenario-based (Gherkin / BDD)

```gherkin
Given [контекст]
When [действие]
Then [результат]
```

```
AC1: Успешный поиск товара
  Given пользователь на странице каталога
  When он вводит "ноутбук" в поиск
  Then система показывает список товаров с "ноутбук" в названии

AC2: Поиск без результатов
  Given пользователь на странице каталога
  When он вводит "zxczxc123" в поиск
  Then система показывает "ничего не найдено"
```

### 2. Checklist (список условий)

```
AC для US «Как кассир, я хочу пробить товар по штрихкоду»
  [ ] Товар найден → добавлен в чек
  [ ] Товар не найден → ошибка «товар не найден»
  [ ] Штрихкод повреждён → ошибка «не удалось распознать»
  [ ] Товар закончился → ошибка с предложением аналога
```

### 3. Rule-oriented (правила)

```
AC: Скидка применяется при выполнении всех условий:
  - Сумма корзины > 5000 ₽
  - Промокод активирован
  - Скидка не суммируется с другими акциями
```

## Как писать хорошие AC

### Принцип INVEST

| Буква | Значение | Вопрос |
|-------|----------|--------|
| **I**ndependent | Независимое | Можно ли принять US без других US? |
| **N**egotiable | Обсуждаемое | Можно ли уточнить детали? |
| **V**aluable | Ценное | Это даёт ценность пользователю? |
| **E**stimable | Оцениваемое | Можно ли оценить сложность? |
| **S**mall | Маленькое | Влезает в один спринт? |
| **T**estable | Тестируемое | Можно проверить тестом (passed/failed)? |

### Checklist хорошего AC

- [ ] Измеримо (passed/failed, нет «примерно», «как правило»)
- [ ] Не содержит реализацию (не «SQL-запрос», а «данные сохранены»)
- [ ] Покрывает happy path + минимум 1 исключение
- [ ] Не смешивает несколько требований в одном AC
- [ ] Может быть автоматизировано (хотя бы частично)

## Сколько AC нужно

| Тип задачи | Количество AC |
|-----------|---------------|
| Простая US (один сценарий) | 3–5 |
| Средняя US (несколько вариаций) | 5–10 |
| Сложная US (много ветвлений) | 10–20 |
| Багфикс | 1–3 |

## AC и Definition of Done (DoD)

| | AC | DoD |
|--|----|-----|
| **Относится к** | Конкретной US | Любой задаче в спринте |
| **Кто пишет** | Аналитик + PO | Команда (общий) |
| **Уникальность** | У каждой US свои AC | Один для всех |

**Пример DoD:** «Код заревьюен, покрыт тестами, задокументирован, прод.»

**Пример AC:** «При вводе неверного пароля — ошибка "неверный пароль".»

## Типичные ошибки

- **Слишком общие** — «работает fast» → не измеримо
- **Только happy path** — нет исключений (99% багов в исключениях)
- **AC написаны после разработки** — теряется смысл контракта
- **Слишком много AC** — 30 AC на простую форму входа — перебор
- **AC ≠ ТЗ** — AC не должны описывать каждую кнопку, только цель

## Ссылки

- [Acceptance Criteria — Mountain Goat Software](https://www.mountaingoatsoftware.com/agile/user-stories/acceptance-criteria)
- [BDD и Acceptance Criteria (Cucumber)](https://cucumber.io/docs/bdd/)
- [How to Write Good Acceptance Criteria (medium)](https://medium.com/@molly.fitzgerald/how-to-write-good-acceptance-criteria-841398bfd08d)
- [Definition of Done vs Acceptance Criteria (Scrum.org)](https://www.scrum.org/resources/blog/definition-done-vs-acceptance-criteria)
