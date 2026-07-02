---
id: huggingface
title: Hugging Face
sidebar_label: Hugging Face
type: technology
tech_type: tool
category: specialization
tags: [ai, ml, nlp, hub, transformers]
official_url: https://huggingface.co/
github: https://github.com/huggingface
vendor: Hugging Face Inc.
license: Apache 2.0
first_seen: 2016
difficulty: 3
estimated_time: 20
requires_articles: [specialization/ai-analyst-intro, specialization/ai-llm-rag]
used_in_tasks: [evaluate-llm-output]
alternatives: []
audience: middle
---

# Hugging Face

**Hugging Face** — платформа и экосистема для машинного обучения: библиотека `transformers`, Model Hub (500K+ моделей), Dataset Hub, Spaces (демо-приложения) и Enterprise-решения.

## Для чего используется

- **Model Hub** — поиск и загрузка предобученных моделей (LLM, эмбеддинги, классификаторы)
- **Библиотека Transformers** — единый интерфейс для работы с разными архитектурами (BERT, GPT, Llama, T5)
- **Dataset Hub** — поиск и загрузка датасетов для обучения
- **Spaces** — хостинг демо-приложений на Gradio/Streamlit
- **Inference API** — API для инференса моделей без собственной инфраструктуры

## Ключевые концепции

- **Pipeline** — готовая функция для типовой задачи (sentiment analysis, text generation, summarization)
- **Tokenizer** — преобразование текста в токены для конкретной модели
- **Model card** — документация модели: назначение, метрики, ограничения, лицензия
- **AutoModel** — автоматический выбор архитектуры под загруженную модель

## Когда использовать

- Нужна предобученная модель для типовой NLP-задачи (классификация, NER, QA)
- Строите RAG-систему и нужна open-source embedding-модель
- Требуется сравнить несколько моделей на своих данных
- Хотите быстро запустить демо-версию продукта

## Когда НЕ использовать

- Нужна проприетарная модель с жёсткими требованиями к приватности (хотя есть Enterprise-решение)
- Модель должна работать в офлайне без доступа к интернету — модели нужно скачать заранее
- Критична скорость инференса — библиотека Transformers может быть медленнее оптимизированных решений

## Альтернативы

| Альтернатива | Когда выбрать |
|-------------|---------------|
| OpenAI API | Закрытая модель, SaaS, платная, не нужно разворачивать |
| Ollama | Запуск open-source LLM локально, просто, для разработки |
| MLflow | Если нужен не hub, а experiment tracking / model registry |
| PyTorch Hub | Предобученные модели PyTorch, без NLP-специализации |

## Как начать

- [Hugging Face Course](https://huggingface.co/learn/nlp-course) — бесплатный NLP-курс
- [Model Hub](https://huggingface.co/models) — поиск моделей
- [Transformers documentation](https://huggingface.co/docs/transformers)
