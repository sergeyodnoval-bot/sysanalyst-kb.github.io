export interface TrackItem {
  type: 'article' | 'tech' | 'task';
  id: string;
  folder?: string; // for articles: source folder (basics, data, modeling, requirements, integration)
}

export interface TrackStage {
  title: string;
  description: string;
  items: TrackItem[];
}

export interface TrackDef {
  id: string;
  title: string;
  description: string;
  stages: TrackStage[];
}

export interface NavInfo {
  trackId: string;
  trackTitle: string;
  trackDescription: string;
  stageTitle: string;
  stageIndex: number;
  index: number;
  total: number;
  prev: {type: string; id: string; folder?: string} | null;
  next: {type: string; id: string; folder?: string} | null;
}

export const basePaths: Record<string, string> = {
  article: '/docs',
  tech: '/tech',
  task: '/tasks',
};

/** Build the correct URL path for a track item. */
export function trackItemPath(item: {type: string; id: string; folder?: string}): string {
  const base = basePaths[item.type] || '/docs';
  const path = item.folder ? `${item.folder}/${item.id}` : item.id;
  return `${base}/${path}`;
}

export const itemColors: Record<string, string> = {
  article: '#4f8ef7',
  tech: '#10b981',
  task: '#f59e0b',
};

export const itemIcons: Record<string, string> = {
  article: '📖',
  tech: '🔧',
  task: '🎯',
};

export const itemLabels: Record<string, Record<string, string>> = {
  article: {
    'how-computer-works': 'Как устроен компьютер',
    'what-is-programming': 'Что такое программирование',
    'what-is-software': 'Что такое программное обеспечение',
    'what-is-os': 'Что такое операционная система',
    'what-is-network': 'Что такое компьютерные сети',
    'what-is-app-types': 'Типы приложений',
    'who-is-system-analyst': 'Кто такой системный аналитик',
    'it-roles': 'Роли в IT-команде',
    'sa-day-in-life': 'День системного аналитика',
    'what-is-sdlc': 'Что такое SDLC',
    'what-is-testing': 'Как тестируют программы',
    'what-is-sa-documentation': 'Документы аналитика',
    'git-overview': 'Git — контроль версий',
    'what-is-data': 'Что такое данные, информация, знания',
    'what-is-database-basics': 'Что такое база данных (основы)',
    'client-server-basics': 'Клиент-серверная архитектура',
    'what-is-protocol': 'Что такое протокол взаимодействия',
    'what-is-api': 'Что такое API',
    'api-rest-basics': 'Основы REST API',
    'api-openapi': 'OpenAPI — документирование API',
    'what-is-model': 'Что такое модель',
    'bpmn': 'BPMN — моделирование процессов',
    'use-case-diagram': 'Use Case diagram',
    'sequence-diagram': 'Sequence diagram',
    'what-is-requirement': 'Что такое требование',
    'stakeholder-communication': 'Коммуникация со стейкхолдерами',
    'user-stories': 'User Stories',
    'bdd-scenarios': 'BDD-сценарии',
    'sql-basics': 'Основы SQL',
    'json-xml': 'JSON и XML',
    'what-is-database': 'Что такое база данных',
    'sdlc-models': 'SDLC — модели разработки',
    'scrum-basics': 'Scrum — основы',
    'kanban-basics': 'Kanban — основы',
    'scrum-detailed': 'Scrum — детально',
    'estimation': 'Оценка задач',
    'retrospectives': 'Ретроспективы',
    'agile-requirements': 'Требования в Agile',
    'soft-skills': 'Что такое soft skills',
    'critical-thinking': 'Критическое мышление',
    'business-writing': 'Деловая переписка',
    'normalization': 'Нормализация БД',
    'nosql': 'NoSQL',
    'data-modeling': 'Моделирование данных (ER)',
    'dwh-basics': 'Хранилища данных (DWH)',
    'etl-basics': 'ETL — основы',
    'data-migration': 'Миграции данных',
    'api-first-design': 'API-first design',
    'er-diagrams': 'ER-диаграммы',
    'state-diagram': 'State diagram',
    'class-diagram': 'Class diagram',
    'bpmn-advanced': 'BPMN — продвинутый',
    'c4-context': 'C4 — Context diagram',
    'c4-container': 'C4 — Container diagram',
    'dfd': 'Data Flow Diagram (DFD)',
    'component-diagram': 'Component diagram',
    'user-story-mapping': 'User Story Mapping',
    'impact-mapping': 'Impact Mapping',
    'api-design-detailed': 'Проектирование REST API',
    'api-versioning': 'Версионирование API',
    'api-auth': 'Аутентификация в API',
    'api-soap-wsdl': 'SOAP / WSDL',
    'async-message-queue': 'Асинхронное взаимодействие',
    'rabbitmq': 'RabbitMQ',
    'kafka': 'Kafka',
    'event-driven-architecture': 'EDA введение',
    'event-storming': 'Event Storming',
    'what-is-architecture': 'Что такое архитектура ПО',
    'layered-architecture': 'Слоистая архитектура',
    'monolith-vs-microservices': 'Монолит vs Микросервисы',
    'microservices-patterns': 'Микросервисы — паттерны',
    'cqrs': 'CQRS',
    'eda-detailed': 'EDA детально',
    'solid': 'SOLID для аналитика',
    'adr': 'ADR',
    'babok-overview': 'BABOK — обзор',
    'requirements-management': 'Управление требованиями',
    'stakeholder-analysis': 'Анализ стейкхолдеров',
    'cost-benefit-analysis': 'Cost-Benefit Analysis',
    'risk-management': 'Управление рисками',
    'ddd-intro': 'DDD — Domain-Driven Design',
    'hexagonal-architecture': 'Hexagonal Architecture',
    'saga-pattern': 'Saga pattern',
    'strangler-fig': 'Strangler Fig',
    'enterprise-integration-patterns': 'EIP — паттерны интеграции',
    'api-gateway': 'API Gateway',
    'event-storming-advanced': 'Event Storming (продвинутый)',
    'ba-vs-sa': 'BA vs SA',
    'data-analyst-path': 'Путь Data-аналитика',
    'solution-architect-path': 'Путь Solution-архитектора',
    'industry-analytics': 'Отраслевая аналитика',
  },
  tech: {
    browser: 'Веб-браузер',
    jira: 'Jira',
    confluence: 'Confluence',
    drawio: 'Draw.io (diagrams.net)',
    plantuml: 'PlantUML',
    postgresql: 'PostgreSQL',
    dbeaver: 'DBeaver',
    http: 'HTTP',
    openapi: 'OpenAPI Specification',
    curl: 'cURL',
    postman: 'Postman',
    miro: 'Miro',
    scrum: 'Scrum',
    figma: 'Figma',
    git: 'Git',
    kafka: 'Apache Kafka',
    rabbitmq: 'RabbitMQ',
  },
  task: {
    'find-analyst-in-team': 'Найти аналитика в знакомых',
    'elicit-requirements': 'Сбор требований у стейкхолдера',
    'write-user-story': 'Написание user story',
    'sql-query': 'SQL-запрос по ТЗ',
    'describe-feature': 'Описать существующую фичу',
    'design-rest-api': 'Проектирование REST API',
    'acceptance-criteria': 'Acceptance criteria',
    'test-checklist': 'Чек-лист тестирования',
    'bug-report': 'Баг-репорт',
    'grooming': 'Refinement (grooming)',
    'describe-system-to-friend': 'Объяснить другу интернет',
    'conduct-stakeholder-interview': 'Интервью со стейкхолдером',
    'design-database-schema': 'Проектирование схемы БД',
    'integrate-two-systems': 'Проектирование интеграции',
  },
};

const juniorTrack: TrackDef = {
  id: 'junior-track',
  title: 'Junior System Analyst',
  description: 'Полный путь от человека без IT-опыта до Junior системного аналитика',
  stages: [
    {
      title: '0. Погружение в IT',
      description: 'Поймите, как устроен компьютер, программы и интернет.',
      items: [
        {type: 'article', id: 'how-computer-works', folder: 'basics'},
        {type: 'article', id: 'what-is-programming', folder: 'basics'},
        {type: 'article', id: 'what-is-software', folder: 'basics'},
        {type: 'article', id: 'what-is-os', folder: 'basics'},
        {type: 'article', id: 'what-is-network', folder: 'basics'},
        {type: 'tech', id: 'browser'},
        {type: 'article', id: 'what-is-app-types', folder: 'basics'},
      ],
    },
    {
      title: '1. Профессия системного аналитика',
      description: 'Узнайте, кто такой SA, чем занимается, как встроен в команду.',
      items: [
        {type: 'article', id: 'who-is-system-analyst', folder: 'basics'},
        {type: 'article', id: 'it-roles', folder: 'basics'},
        {type: 'article', id: 'sa-day-in-life', folder: 'basics'},
        {type: 'article', id: 'what-is-sdlc', folder: 'basics'},
        {type: 'article', id: 'what-is-testing', folder: 'basics'},
        {type: 'article', id: 'what-is-sa-documentation', folder: 'basics'},
        {type: 'article', id: 'git-overview', folder: 'basics'},
        {type: 'task', id: 'find-analyst-in-team'},
      ],
    },
    {
      title: '2. Работа с требованиями',
      description: 'Научитесь собирать, формулировать и документировать требования.',
      items: [
        {type: 'article', id: 'what-is-requirement', folder: 'requirements'},
        {type: 'article', id: 'stakeholder-communication', folder: 'requirements'},
        {type: 'article', id: 'user-stories', folder: 'requirements'},
        {type: 'article', id: 'bdd-scenarios', folder: 'requirements'},
        {type: 'tech', id: 'jira'},
        {type: 'tech', id: 'confluence'},
        {type: 'task', id: 'elicit-requirements'},
        {type: 'task', id: 'write-user-story'},
      ],
    },
    {
      title: '3. Моделирование',
      description: 'Визуализируйте процессы, архитектуру и сценарии.',
      items: [
        {type: 'article', id: 'what-is-model', folder: 'modeling'},
        {type: 'article', id: 'bpmn', folder: 'modeling'},
        {type: 'article', id: 'use-case-diagram', folder: 'modeling'},
        {type: 'article', id: 'sequence-diagram', folder: 'modeling'},
        {type: 'tech', id: 'drawio'},
        {type: 'tech', id: 'plantuml'},
      ],
    },
    {
      title: '4. Данные и базы данных',
      description: 'Поймите данные, SQL и форматы обмена.',
      items: [
        {type: 'article', id: 'what-is-data', folder: 'basics'},
        {type: 'article', id: 'what-is-database-basics', folder: 'basics'},
        {type: 'article', id: 'sql-basics', folder: 'data'},
        {type: 'article', id: 'json-xml', folder: 'data'},
        {type: 'tech', id: 'postgresql'},
        {type: 'tech', id: 'dbeaver'},
        {type: 'task', id: 'sql-query'},
      ],
    },
    {
      title: '5. Интеграции и API',
      description: 'Клиент-сервер, протоколы, REST, OpenAPI.',
      items: [
        {type: 'article', id: 'client-server-basics', folder: 'basics'},
        {type: 'article', id: 'what-is-protocol', folder: 'basics'},
        {type: 'article', id: 'what-is-api', folder: 'basics'},
        {type: 'article', id: 'api-rest-basics', folder: 'integration'},
        {type: 'tech', id: 'http'},
        {type: 'article', id: 'api-openapi', folder: 'integration'},
        {type: 'tech', id: 'openapi'},
        {type: 'tech', id: 'curl'},
        {type: 'tech', id: 'postman'},
        {type: 'tech', id: 'miro'},
        {type: 'tech', id: 'scrum'},
        {type: 'task', id: 'describe-feature'},
        {type: 'task', id: 'design-rest-api'},
      ],
    },
    {
      title: '6. Первые рабочие задачи',
      description: 'Типовые задачи Junior аналитика в команде.',
      items: [
        {type: 'tech', id: 'figma'},
        {type: 'task', id: 'acceptance-criteria'},
        {type: 'task', id: 'test-checklist'},
        {type: 'task', id: 'bug-report'},
        {type: 'task', id: 'grooming'},
        {type: 'task', id: 'describe-system-to-friend'},
      ],
    },
  ],
};

const middleTrack: TrackDef = {
  id: 'middle-track',
  title: 'Middle System Analyst',
  description: 'Путь от Junior до Middle: процессы, данные, продвинутое моделирование, интеграции и архитектура',
  stages: [
    {
      title: '0. Процессы разработки',
      description: 'Углублённое знание методологий: Scrum, Kanban, оценка задач, ретроспективы.',
      items: [
        {type: 'article', id: 'sdlc-models', folder: 'process'},
        {type: 'article', id: 'scrum-basics', folder: 'process'},
        {type: 'article', id: 'kanban-basics', folder: 'process'},
        {type: 'article', id: 'scrum-detailed', folder: 'process'},
        {type: 'article', id: 'estimation', folder: 'process'},
        {type: 'article', id: 'retrospectives', folder: 'process'},
        {type: 'article', id: 'agile-requirements', folder: 'process'},
        {type: 'tech', id: 'scrum'},
        {type: 'tech', id: 'jira'},
        {type: 'task', id: 'grooming'},
      ],
    },
    {
      title: '1. Профессиональные навыки',
      description: 'Soft skills, критическое мышление и деловая коммуникация.',
      items: [
        {type: 'article', id: 'soft-skills', folder: 'soft'},
        {type: 'article', id: 'critical-thinking', folder: 'soft'},
        {type: 'article', id: 'business-writing', folder: 'soft'},
      ],
    },
    {
      title: '2. Проектирование данных',
      description: 'Нормализация, NoSQL, моделирование данных, DWH, ETL, миграции и API-first.',
      items: [
        {type: 'article', id: 'normalization', folder: 'data'},
        {type: 'article', id: 'nosql', folder: 'data'},
        {type: 'article', id: 'data-modeling', folder: 'data'},
        {type: 'article', id: 'dwh-basics', folder: 'data'},
        {type: 'article', id: 'etl-basics', folder: 'data'},
        {type: 'article', id: 'data-migration', folder: 'data'},
        {type: 'article', id: 'api-first-design', folder: 'data'},
        {type: 'tech', id: 'postgresql'},
        {type: 'tech', id: 'dbeaver'},
        {type: 'task', id: 'design-database-schema'},
      ],
    },
    {
      title: '3. Продвинутое моделирование',
      description: 'C4, BPMN advanced, UML-диаграммы, DFD и компонентные диаграммы.',
      items: [
        {type: 'article', id: 'bpmn-advanced', folder: 'modeling'},
        {type: 'article', id: 'er-diagrams', folder: 'modeling'},
        {type: 'article', id: 'state-diagram', folder: 'modeling'},
        {type: 'article', id: 'class-diagram', folder: 'modeling'},
        {type: 'article', id: 'c4-context', folder: 'modeling'},
        {type: 'article', id: 'c4-container', folder: 'modeling'},
        {type: 'article', id: 'dfd', folder: 'modeling'},
        {type: 'article', id: 'component-diagram', folder: 'modeling'},
        {type: 'tech', id: 'drawio'},
        {type: 'tech', id: 'plantuml'},
      ],
    },
    {
      title: '4. Интеграции — глубокий уровень',
      description: 'Детальное проектирование REST, версионирование, auth, SOAP, асинхронное взаимодействие.',
      items: [
        {type: 'article', id: 'api-design-detailed', folder: 'integration'},
        {type: 'article', id: 'api-versioning', folder: 'integration'},
        {type: 'article', id: 'api-auth', folder: 'integration'},
        {type: 'article', id: 'api-soap-wsdl', folder: 'integration'},
        {type: 'article', id: 'async-message-queue', folder: 'integration'},
        {type: 'tech', id: 'openapi'},
        {type: 'tech', id: 'postman'},
        {type: 'task', id: 'design-rest-api'},
      ],
    },
    {
      title: '5. Асинхронная архитектура',
      description: 'Брокеры сообщений, Event-Driven Architecture и Event Storming.',
      items: [
        {type: 'article', id: 'rabbitmq', folder: 'integration'},
        {type: 'article', id: 'kafka', folder: 'integration'},
        {type: 'article', id: 'event-driven-architecture', folder: 'integration'},
        {type: 'article', id: 'event-storming', folder: 'integration'},
        {type: 'tech', id: 'kafka'},
        {type: 'tech', id: 'rabbitmq'},
      ],
    },
    {
      title: '6. Архитектура и проектирование',
      description: 'Архитектурные стили, паттерны, SOLID, ADR и проектирование микросервисов.',
      items: [
        {type: 'article', id: 'what-is-architecture', folder: 'architecture'},
        {type: 'article', id: 'layered-architecture', folder: 'architecture'},
        {type: 'article', id: 'monolith-vs-microservices', folder: 'architecture'},
        {type: 'article', id: 'microservices-patterns', folder: 'architecture'},
        {type: 'article', id: 'cqrs', folder: 'architecture'},
        {type: 'article', id: 'eda-detailed', folder: 'architecture'},
        {type: 'article', id: 'solid', folder: 'architecture'},
        {type: 'article', id: 'adr', folder: 'architecture'},
        {type: 'task', id: 'integrate-two-systems'},
      ],
    },
    {
      title: '7. Процессы — продвинутый уровень',
      description: 'BABOK, управление требованиями, анализ стейкхолдеров, CBA и управление рисками.',
      items: [
        {type: 'article', id: 'babok-overview', folder: 'process'},
        {type: 'article', id: 'requirements-management', folder: 'process'},
        {type: 'article', id: 'stakeholder-analysis', folder: 'process'},
        {type: 'article', id: 'cost-benefit-analysis', folder: 'process'},
        {type: 'article', id: 'risk-management', folder: 'process'},
      ],
    },
    {
      title: '8. Продвинутая архитектура и интеграции',
      description: 'DDD, Hexagonal, Saga, Strangler Fig, EIP, API Gateway, Event Storming advanced и специализации.',
      items: [
        {type: 'article', id: 'ddd-intro', folder: 'architecture'},
        {type: 'article', id: 'hexagonal-architecture', folder: 'architecture'},
        {type: 'article', id: 'saga-pattern', folder: 'architecture'},
        {type: 'article', id: 'strangler-fig', folder: 'architecture'},
        {type: 'article', id: 'enterprise-integration-patterns', folder: 'integration'},
        {type: 'article', id: 'api-gateway', folder: 'integration'},
        {type: 'article', id: 'event-storming-advanced', folder: 'integration'},
        {type: 'article', id: 'ba-vs-sa', folder: 'specialization'},
        {type: 'article', id: 'data-analyst-path', folder: 'specialization'},
        {type: 'article', id: 'solution-architect-path', folder: 'specialization'},
        {type: 'article', id: 'industry-analytics', folder: 'specialization'},
      ],
    },
  ],
};

/** Map from Docusaurus pluginId to item type for track lookup */
export const pluginTypeMap: Record<string, string> = {
  '': 'article',
  default: 'article',
  tech: 'tech',
  tasks: 'task',
};

export function getItemType(pluginId: string | undefined): string | undefined {
  return pluginId ? pluginTypeMap[pluginId] : pluginTypeMap[''];
}

export const allTracks: TrackDef[] = [juniorTrack, middleTrack];

function buildLookup(): Map<string, NavInfo[]> {
  const map = new Map<string, NavInfo[]>();
  for (const track of allTracks) {
    const flat = track.stages.flatMap((s, si) =>
      s.items.map((item) => ({...item, stageIndex: si})),
    );
    const total = flat.length;
    flat.forEach((item, idx) => {
      const key = item.folder ? `${item.type}:${item.folder}/${item.id}` : `${item.type}:${item.id}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push({
        trackId: track.id,
        trackTitle: track.title,
        trackDescription: track.description,
        stageTitle: track.stages[item.stageIndex].title,
        stageIndex: item.stageIndex,
        index: idx,
        total,
        prev: idx > 0 ? {type: flat[idx - 1].type, id: flat[idx - 1].id, folder: (flat[idx - 1] as TrackItem).folder} : null,
        next: idx < total - 1 ? {type: flat[idx + 1].type, id: flat[idx + 1].id, folder: (flat[idx + 1] as TrackItem).folder} : null,
      });
    });
  }
  return map;
}

export const trackLookup = buildLookup();
