---
id: langchain
title: LangChain
sidebar_label: LangChain
type: technology
tech_type: tool
category: specialization
tags: [ai, llm, framework, python, rag]
official_url: https://www.langchain.com/
github: https://github.com/langchain-ai/langchain
vendor: LangChain Inc.
license: MIT
first_seen: 2022
difficulty: 4
estimated_time: 25
requires_articles: [specialization/ai-llm-rag]
used_in_tasks: [design-rag-pipeline]
alternatives: [llamaindex]
---

# LangChain

**LangChain** — фреймворк с открытым исходным кодом для разработки приложений на базе LLM. Предоставляет готовые компоненты для построения RAG-пайплайнов, AI-агентов и цепочек промптов.

## Для чего используется

- **RAG-пайплайны** — загрузка документов, чанкинг, эмбеддинги, retrieval, генерация
- **AI-агенты** — LLM + инструменты (API, калькулятор, поиск) для выполнения действий
- **Цепочки промптов** — последовательные вызовы LLM с передачей контекста
- **Интеграция с моделями** — единый интерфейс для OpenAI, Anthropic, Llama, HuggingFace

## Ключевые концепции

- **Chain** — последовательность шагов: промпт → LLM → парсинг выхода
- **Retriever** — компонент для поиска релевантных документов (через векторную БД или поисковый движок)
- **Agent** — LLM, который сам решает, какой инструмент вызвать и с какими аргументами
- **Tool** — функция, которую может вызвать агент (API, calculator, SQL-запрос)
- **Memory** — механизм сохранения истории диалога между вызовами

## Когда использовать

- Строите RAG-систему и не хотите писать инфраструктуру с нуля
- Нужна интеграция с разными LLM-провайдерами
- Требуется быстрое прототипирование AI-приложения
- Нужны готовые шаблоны для типовых сценариев

## Когда НЕ использовать

- Проект требует максимальной производительности — LangChain добавляет overhead
- Нужен fine-grained контроль над каждым шагом — проще написать свой пайплайн
- Команда не знает Python (LangChain только для Python/JS)
- Критична стабильность API — LangChain быстро меняется

## Альтернативы

| Альтернатива | Описание |
|-------------|----------|
| LlamaIndex | Специализируется на RAG и индексации документов |
| Semantic Kernel | Фреймворк от Microsoft, интеграция с Azure |
| AutoGen | Фреймворк от Microsoft для мультиагентных систем |
| Собственная реализация | Полный контроль, но больше кода |

## Как начать

- [Официальная документация LangChain](https://python.langchain.com/docs/get_started/introduction)
- [LangChain Academy](https://academy.langchain.com/) — бесплатный курс
- Готовые шаблоны на [LangChain Templates](https://github.com/langchain-ai/langchain/tree/master/templates)
