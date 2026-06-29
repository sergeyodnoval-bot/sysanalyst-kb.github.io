---
id: gamedev-monetization
title: Монетизация — IAP, реклама, подписки
sidebar_label: Монетизация (IAP, реклама)
level: 7
category: specialization
tags: [gamedev, monetization, iap, ads, subscription, purchase]
prerequisites: [specialization/gamedev-economy, specialization/gamedev-social]
leads_to: [specialization/gamedev-liveops]
related: [integration/api-rest-basics]
estimated_time: 20
difficulty: 6
audience: senior
---

:::info[TL;DR]
Монетизация в играх: IAP (внутриигровые покупки) через App Store / Google Play, реклама (rewarded, interstitial, banner), подписки. Ключевые метрики: ARPU, ARPPU, конверсия в платящего, LTV. Аналитик проектирует store-интеграцию, рекламные placements, ценообразование и трекинг покупок.
:::

## Типы монетизации

```mermaid
flowchart TD
    M["Монетизация"]
    M --> IAP["IAP — внутриигровые покупки"]
    M --> ADS["Реклама"]
    M --> SUB["Подписки"]
    IAP --> CONSUMABLE["Расходуемые<br/>(гемы, энергия)"]
    IAP --> NONCONS["Не-расходуемые<br/>(скины, персонажи)"]
    IAP --> SUBSCRIPTION["Авто-подписка<br/>(ежемесячный бонус)"]
    ADS --> REWARDED["Rewarded video<br/>(+бонус за просмотр)"]
    ADS --> INTERSTITIAL["Interstitial<br/>(между сессиями)"]
    ADS --> BANNER["Banner<br/>(постоянно)"]
```

## Метрики монетизации

| Метрика | Описание | Кому важна |
|---------|----------|-----------|
| **ARPU** | Средний доход на пользователя | Product |
| **ARPPU** | Средний доход на платящего | Monetization |
| **Conversion rate** | % платящих игроков | Маркетинг |
| **LTV** | Lifetime value игрока | Стратегия |
| **pLTV** | Прогнозируемый LTV (первые 7 дней) | UA |
| **Retention D1/D7/D30** | Возврат игроков | Product |

## Процесс покупки IAP

```mermaid
sequenceDiagram
    participant P as Игрок
    participant C as Клиент (Unity)
    participant AS as App Store
    participant BS as Backend

    P->>C: Нажал «Купить 100 гемов»
    C->>AS: SKPayment
    AS-->>P: FaceID / TouchID
    P->>AS: Подтверждение
    AS-->>C: Receipt
    C->>BS: POST /verify {receipt}
    BS->>AS: Проверка receipt
    AS-->>BS: OK
    BS->>BS: Начисление гемов
    BS-->>C: OK + баланс
    C-->>P: Гемы начислены
```

## Что дальше

- [LiveOps — управление живым продуктом](/docs/specialization/gamedev-liveops)

## Проверь себя

1. **Какие типы IAP бывают?**
   *Ответ:* Расходуемые (гемы), не-расходуемые (скины), подписки.

2. **Какие метрики монетизации самые важные?**
   *Ответ:* ARPU, ARPPU, Conversion rate, LTV, Retention D1/D7/D30.
