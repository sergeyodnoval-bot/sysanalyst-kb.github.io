---
id: gamedev-publishing
title: Публикация игры — App Store, Google Play, IAP, рейтинг
sidebar_label: "Публикация и платформы"
level: 6
category: specialization
tags: [gamedev, publishing, appstore, google-play, iap, rating, esrb, pegi, coppa, gdpr]
prerequisites: [specialization/gamedev-monetization]
leads_to: []
related: [specialization/gamedev-sdk]
estimated_time: 30
difficulty: 5
audience: middle
---

:::info[TL;DR]
Публикация игры в App Store и Google Play — не «кинь билд — и готово». Аналитик участвует в создании IAP-продуктов в консолях, настройке возрастного рейтинга (ESRB/PEGI), проверке правил платформы (loot boxes запрещены в ряде стран), настройке аналитики и атрибуции. Если не знать правил — игру могут отклонить на ревью или забанить после релиза. Потеря времени на ревью: 1–7 дней (App Store) / 1–3 часа (Google Play).
:::

## Для кого эта статья

Middle/Senior SA, выпускающий игру в продакшн. После прочтения вы:

- Поймёте, как создавать IAP-продукты в App Store Connect и Google Play Console
- Узнаете, как устроен возрастной рейтинг (ESRB, PEGI) и что он меняет в гейм-дизайне
- Сможете подготовить игру к ревью: чек-лист для аналитика
- Поймёте правовые ограничения: loot boxes, gambling, GDPR/COPPA

## 1. App Store Connect (Apple)

### IAP-продукты

App Store Connect — консоль для управления iOS-приложениями. Аналитик заводит IAP-продукты:

**Типы IAP в App Store:**

| Тип | Описание | Пример | Можно восстановить? |
|-----|----------|--------|-------------------|
| **Consumable** | Расходуемый, покупается многократно | 100 гемов | Нет |
| **Non-Consumable** | Покупается один раз навсегда | Скин, персонаж | Да (Restore Purchases) |
| **Auto-Renewable Subscription** | Авто-подписка (ежемесячно) | VIP-подписка | Да |
| **Non-Renewing Subscription** | Подписка на срок (без авто) | Сезонный пропуск | Да |

**Настройка IAP-продукта:**

```
Product ID: com.sakb.game.gems_100
Type: Consumable
Price: $0.99 (Tier 1)
Display Name: "100 Gems"
Description: "100 gems to upgrade your cards!"
Localization: RU («100 гемов»), DE («100 Edelsteine»), JP («100ジェム»)
Review Screenshot: (скриншот того, что получает игрок)
```

**Что проверяет аналитик перед загрузкой:**
- [ ] Все ID продукта соответствуют коду (Unity IAP catalog)
- [ ] Цены настроены для всех валютных зон (USD, EUR, RUB, JPY, KRW)
- [ ] Screenshot для ревью приложен
- [ ] Localization для всех языков
- [ ] Subscription group (если подписки) — shared secrets

### App Store Review Guidelines

Основные причины отклонения App Store:

| Правило | Описание |
|---------|----------|
| **4.7 (Loot Boxes)** | Платное получение случайного контента должно быть описано в приложении |
| **5.1 (Privacy)** | Необходимо объяснить, какие данные собираются (App Privacy Label) |
| **5.4 (Gambling)** | Игры с реальными деньгами требуют лицензии. Симуляция казино — ограничена |
| **1.1 (Offensive Content)** | Контент не должен оскорблять |
| **2.1 (App Completeness)** | Билд не должен крашиться, должны быть все IAP доступны |
| **3.1 (IAP)** | Цифровые товары должны использовать Apple IAP (не сторонние платёжки) |
| **4.9 (Loot Box Probabilities)** | В Китае, Японии, Корее — обязательное указание шансов выпадения |

**Кейс:** В 2024 Apple начала требовать указывать шансы выпадения в приложениях с лутбоксами (глобально, не только Азия). Аналитик должен добавить экран «Probabilities» в игру.

## 2. Google Play Console

### IAP-продукты

Google Play Console — аналогично, но с нюансами:

| Параметр | App Store | Google Play |
|----------|-----------|-------------|
| **Типы IAP** | 4 (Consumable, Non-Consumable, Auto-Renewable, Non-Renewing) | Managed Product (consumable + non-consumable), Subscription |
| **Price tiers** | 87 фиксированных Tier (Tier 1 = $0.99) | Любая цена от $0.05 |
| **Review time** | 1–7 дней | 1–3 часа |
| **Test accounts** | Sandbox (в Xcode) | Internal / Closed / Open Tracks |
| **Subscription management** | App Store Connect | Google Play Console |
| **Restore** | StoreKit restorePurchases | Привязка к аккаунту Google |

**Google Play Policy для игр:**

| Правило | Описание |
|---------|----------|
| **Real-money gambling** | Запрещено (нужна лицензия и региональные ограничения) |
| **Loot boxes** | Обязательно указывать шансы (с 2025) |
| **Misleading ads** | Реклама не должна обещать то, чего нет в игре |
| **Store listing** | Screenshots, описание, категория — должны соответствовать игре |
| **Data safety** | Аналогично Apple Privacy Label |

### Play Integrity API

Google Play Integrity — защита от читеров и пиратства:

```
Игра → запрос Integrity токена → Google → верификация
      → ответ: device_verification, app_verification, account_details
```

Используется для: проверки, что игра запущена на лицензионном устройстве, без рута и без фейковых IAP.

## 3. Возрастной рейтинг (ESRB / PEGI / IARC)

Возрастной рейтинг — обязательное требование платформ. Без него игра не публикуется.

### Системы рейтинга

| Система | Регион | Категории |
|---------|--------|-----------|
| **ESRB** | Северная Америка | EC (Early Childhood), E (Everyone), E10+, T (Teen), M (Mature 17+), AO (Adults Only 18+) |
| **PEGI** | Европа | PEGI 3, PEGI 7, PEGI 12, PEGI 16, PEGI 18 |
| **IARC** | Весь мир (кроме US/CA) | Единая анкета → рейтинг для 40+ стран |
| **CERO** | Япония | A, B, C, D, Z |
| **GRB** | Корея | ALL, 12+, 15+, 18+ |

### Как рейтинг влияет на гейм-дизайн

| Фактор | ESRB E10+ | ESRB T (Teen) | ESRB M (Mature) |
|--------|-----------|---------------|-----------------|
| **Кровь** | Нет | Минимально | Да |
| **Насилие** | Мультяшное | Реалистичное | Графическое |
| **Язык** | Без ругани | Умеренно | Сильная |
| **IAP/Loot Boxes** | Да (с пометкой) | Да | Да |
| **Gambling** | Нет имитации | Нет | Ограничено |
| **Доступная аудитория** | Максимум | Средняя | 17+ |

**Важно:** Игра с PEGI 18 теряет ~40% потенциальной аудитории (дети не могут скачать). Если твоя игра — casual match-3, а в ней лутбоксы с имитацией казино — получишь PEGI 18 и потеряешь рынок.

### IARC-анкета

Заполняется в Google Play Console (и через Apple):

```
Вопросы IARC:
1. Есть ли насилие? (уровень)
2. Есть ли сексуальный контент? (уровень)
3. Есть ли дискриминация? (уровень)
4. Есть ли сцены с наркотиками/алкоголем? (уровень)
5. Есть ли страх/ужасы? (уровень)
6. Есть ли IAP (включая лутбоксы)?
7. Есть ли доступ к соцсетям?
8. Есть ли обмен информацией между игроками?
9. Есть ли азартные игры (симуляция)?
```

**После заполнения:** IARC выдаёт рейтинг для 40+ стран автоматически.

## 4. Loot Boxes и гемблинг

Это отдельная большая тема. Законодательство меняется быстро.

### Регуляция по странам

| Страна | Статус | Что нельзя | Что нужно |
|--------|--------|-----------|-----------|
| **Бельгия** | Полный запрет (2018) | Платные лутбоксы (gambling) | Нельзя продавать случайные предметы за реальные деньги |
| **Нидерланды** | Частичный запрет | Лутбоксы без указания шансов | Обязательно указывать шансы |
| **Китай** | Жёсткое регулирование | Gacha без лимитов | Max 100 подряд откр（гарант после 90), обязательное указание шансов, обязательная публикация probability |
| **Япония** | Комплексное регулирование | Kompu gacha (комбо-гача) запрещён | Шансы должны быть указаны |
| **Корея** | Обязательное указание | — | Все шансы выпадения — публично |
| **Великобритания** | Рассматривается | — | Исследование влияния на детей |
| **ЕС** | Рассматривается | — | Закон о защите потребителей |
| **США** | Нет федерального закона | — | Некоторые штаты рассматривают |

### Что делать аналитику

```yaml
Loot Box Design Checklist:
[ ] 1. В каких странах игра доступна?
[ ] 2. Есть ли платные лутбоксы?
     - Если да — проверяем Бельгия/Нидерланды (запрет)
[ ] 3. Указаны ли шансы выпадения?
     - Обязательно для Китай, Корея, Япония (с 2024 — и Apple глобально)
[ ] 4. Можно ли купить лутбокс за hard currency (купленную за деньги)?
     - Если да → это регулируется как gambling в ряде стран
[ ] 5. Есть ли имитация казино (рулетка, слоты)?
     - Если да → PEGI 18 / ESRB M, потеря рынка
[ ] 6. Есть ли pity system (гарант после N попыток)?
     - Рекомендуется (Genshin Impact: 90 pull pity)
```

## 5. GDPR / COPPA / Privacy

### GDPR (Европа)

Любая игра, доступная в ЕС, должна соблюдать GDPR:

- **Consent popup** — перед сбором данных (IDFA, GAID)
- **Data deletion** — игрок может запросить удаление данных
- **Age gate** — если игрок &lt; 16 лет (в некоторых странах &lt; 13) — нужен parental consent
- **Privacy policy** — обязательна в App Store и Google Play

### COPPA (США)

Если игра ориентирована на детей (&lt; 13 лет):

- Нельзя собирать персональные данные без parental consent
- Нельзя показывать поведенческую рекламу
- Нельзя использовать push-уведомления без согласия родителя
- Обязательно: COPPA-compliant privacy policy

**Важно:** Если в игре есть лутбоксы + дети = нарушение COPPA (манипулятивные механики).

### App Privacy Label (Apple)

С 2020 Apple требует указывать, какие данные собирает приложение:

```yaml
Data Collected:
  - Contact Info (email): Linked to user
  - Identifiers (IDFA, User ID): Linked to user
  - Usage Data (events, crashes): Linked to user
  - Diagnostics (performance): Not linked
  - Purchase History: Linked to user
```

Apple проверяет соответствие заявленного и реального. Если не совпадает — отклоняют.

## 6. Чек-лист публикации для аналитика

```
[ ] IAP Products:
     [ ] Все продукты заведены в App Store Connect + Google Play
     [ ] Цены настроены для всех регионов
     [ ] Screenshots для ревью приложены
     [ ] Localization для всех поддерживаемых языков
     [ ] Интеграция с Unity IAP протестирована (sandbox)

[ ] Analytics / SDK:
     [ ] Firebase Analytics + Crashlytics + Remote Config
     [ ] AppsFlyer / Adjust (атрибуция, postback)
     [ ] Push-уведомления (FCM + APNs)
     [ ] Revenue events передаются (af_purchase)
     [ ] Privacy consent popup (GDPR / ATT)

[ ] Age Rating:
     [ ] IARC анкета заполнена
     [ ] Рейтинг получен (ESRB / PEGI / IARC)
     [ ] Проверено, что рейтинг соответствует контенту

[ ] Legal:
     [ ] Privacy Policy (ссылка в App Store + в игре)
     [ ] Terms of Service
     [ ] Loot box probability disclosure (если нужно)
     [ ] GDPR consent (для ЕС)
     [ ] COPPA compliance (если дети)

[ ] App Store Listing:
     [ ] App icon, screenshots, preview video
     [ ] Description (keywords)
     [ ] Category (Games > Strategy/RPG/Casual)
     [ ] Content rating (ESRB/PEGI/IARC)
     [ ] Privacy labels

[ ] Тестирование:
     [ ] Sandbox IAP (Apple) / Internal test (Google)
     [ ] TestFlight (iOS) / Internal Track (Android)
     [ ] Проверка всех SDK на production-конфиге
     [ ] Проверка postback в AppsFlyer
     [ ] Проверка push-уведомлений
```

## 7. Что дальше после публикации

После выхода игры работа аналитика не заканчивается:

- **Мониторинг метрик** — retention, ARPU, crash rate
- **Hotfix через Remote Config** — без App Store Review
- **Asset Bundles** — новый контент без перевыпуска
- **A/B тесты** — оптимизация онбординга, цен, ивентов
- **Обновление IAP** — новые продукты, промо, скидки
- **Seasonal events** — LiveOps-календарь

## Ссылки для самостоятельного изучения

| Ресурс | Описание | Ссылка |
|--------|----------|--------|
| App Store Review Guidelines | Полный список правил Apple | https://developer.apple.com/app-store/review/guidelines/ |
| Google Play Policy Center | Политики Google Play | https://play.google.com/about/developer-content-policy/ |
| App Store Connect Documentation | Документация по IAP и публикации | https://developer.apple.com/app-store-connect/ |
| Google Play Console Help | Публикация в Google Play | https://support.google.com/googleplay/android-developer/ |
| IARC Rating System | Возрастной рейтинг (международный) | https://www.globalratings.com/ |
| ESRB Game Rating | Рейтинг ESRB | https://www.esrb.org/ratings-guide/ |
| PEGI Rating | Европейский рейтинг | https://pegi.info/ |
| GDPR for Games | GDPR в игровом контексте | https://gdpr.eu/games/ |
| COPPA Compliance | Федеральная комиссия США | https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa |
| Loot Box Regulations | Регуляция лутбоксов по странам | https://gameworldobserver.com/loot-box-regulation-by-country/ |
| Apple Privacy Labels | Настройка Privacy Labels | https://developer.apple.com/app-store/app-privacy-details/ |
| Unity IAP Documentation | Unity IAP — официальная документация | https://docs.unity3d.com/Manual/UnityIAP.html |

## Проверь себя

1. **Какие типы IAP есть в App Store?**
   *Ответ:* Consumable, Non-Consumable, Auto-Renewable Subscription, Non-Renewing Subscription. Google Play: Managed Product и Subscription.

2. **Как возрастной рейтинг (ESRB/PEGI) влияет на аудиторию?**
   *Ответ:* PEGI 18 = потеря ~40% аудитории (дети не могут установить). На рейтинг влияют: насилие, кровь, ругань, gambling-механики.

3. **В каких странах запрещены платные лутбоксы?**
   *Ответ:* Бельгия (полный запрет), Нидерланды (частичный). В Китае, Японии, Корее — обязательное указание шансов и pity system.

4. **Что такое IARC и как он работает?**
   *Ответ:* International Age Rating Coalition — единая анкета, после заполнения выдаётся рейтинг для 40+ стран. Используется в Google Play и App Store.

5. **Какие SDK нужно настроить перед публикацией?**
   *Ответ:* Firebase (Analytics + Crashlytics + Remote Config), AppsFlyer (атрибуция), Unity IAP (покупки), Push (FCM/APNs). Обязательно: GDPR consent popup и Privacy Policy.
