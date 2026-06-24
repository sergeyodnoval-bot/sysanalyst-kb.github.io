export interface TrackItem {
  type: 'article' | 'tech' | 'task';
  id: string;
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
  prev: {type: string; id: string} | null;
  next: {type: string; id: string} | null;
}

export const basePaths: Record<string, string> = {
  article: '/docs',
  tech: '/tech',
  task: '/tasks',
};

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
    'basics/how-computer-works': 'Как устроен компьютер',
    'basics/what-is-programming': 'Что такое программирование',
    'basics/what-is-software': 'Что такое программное обеспечение',
    'basics/what-is-os': 'Что такое операционная система',
    'basics/what-is-network': 'Что такое компьютерные сети',
    'basics/what-is-app-types': 'Типы приложений',
    'basics/who-is-system-analyst': 'Кто такой системный аналитик',
    'basics/it-roles': 'Роли в IT-команде',
    'basics/sa-day-in-life': 'День системного аналитика',
    'basics/what-is-sdlc': 'Что такое SDLC',
    'basics/what-is-testing': 'Как тестируют программы',
    'basics/what-is-sa-documentation': 'Документы аналитика',
    'basics/git-overview': 'Git — контроль версий',
    'basics/what-is-data': 'Что такое данные, информация, знания',
    'basics/what-is-database-basics': 'Что такое база данных (основы)',
    'basics/client-server-basics': 'Клиент-серверная архитектура',
    'basics/what-is-protocol': 'Что такое протокол взаимодействия',
    'basics/what-is-api': 'Что такое API',
    'integration/api-rest-basics': 'Основы REST API',
    'integration/api-openapi': 'OpenAPI — документирование API',
    'modeling/what-is-model': 'Что такое модель',
    'modeling/bpmn': 'BPMN — моделирование процессов',
    'modeling/use-case-diagram': 'Use Case diagram',
    'modeling/sequence-diagram': 'Sequence diagram',
    'requirements/what-is-requirement': 'Что такое требование',
    'requirements/stakeholder-communication': 'Коммуникация со стейкхолдерами',
    'requirements/user-stories': 'User Stories',
    'requirements/bdd-scenarios': 'BDD-сценарии',
    'data/sql-basics': 'Основы SQL',
    'data/json-xml': 'JSON и XML',
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
        {type: 'article', id: 'basics/how-computer-works'},
        {type: 'article', id: 'basics/what-is-programming'},
        {type: 'article', id: 'basics/what-is-software'},
        {type: 'article', id: 'basics/what-is-os'},
        {type: 'article', id: 'basics/what-is-network'},
        {type: 'tech', id: 'browser'},
        {type: 'article', id: 'basics/what-is-app-types'},
      ],
    },
    {
      title: '1. Профессия системного аналитика',
      description: 'Узнайте, кто такой SA, чем занимается, как встроен в команду.',
      items: [
        {type: 'article', id: 'basics/who-is-system-analyst'},
        {type: 'article', id: 'basics/it-roles'},
        {type: 'article', id: 'basics/sa-day-in-life'},
        {type: 'article', id: 'basics/what-is-sdlc'},
        {type: 'article', id: 'basics/what-is-testing'},
        {type: 'article', id: 'basics/what-is-sa-documentation'},
        {type: 'article', id: 'basics/git-overview'},
        {type: 'task', id: 'find-analyst-in-team'},
      ],
    },
    {
      title: '2. Работа с требованиями',
      description: 'Научитесь собирать, формулировать и документировать требования.',
      items: [
        {type: 'article', id: 'requirements/what-is-requirement'},
        {type: 'article', id: 'requirements/stakeholder-communication'},
        {type: 'article', id: 'requirements/user-stories'},
        {type: 'article', id: 'requirements/bdd-scenarios'},
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
        {type: 'article', id: 'modeling/what-is-model'},
        {type: 'article', id: 'modeling/bpmn'},
        {type: 'article', id: 'modeling/use-case-diagram'},
        {type: 'article', id: 'modeling/sequence-diagram'},
        {type: 'tech', id: 'drawio'},
        {type: 'tech', id: 'plantuml'},
      ],
    },
    {
      title: '4. Данные и базы данных',
      description: 'Поймите данные, SQL и форматы обмена.',
      items: [
        {type: 'article', id: 'basics/what-is-data'},
        {type: 'article', id: 'basics/what-is-database-basics'},
        {type: 'article', id: 'data/sql-basics'},
        {type: 'article', id: 'data/json-xml'},
        {type: 'tech', id: 'postgresql'},
        {type: 'tech', id: 'dbeaver'},
        {type: 'task', id: 'sql-query'},
      ],
    },
    {
      title: '5. Интеграции и API',
      description: 'Клиент-сервер, протоколы, REST, OpenAPI.',
      items: [
        {type: 'article', id: 'basics/client-server-basics'},
        {type: 'article', id: 'basics/what-is-protocol'},
        {type: 'article', id: 'basics/what-is-api'},
        {type: 'article', id: 'integration/api-rest-basics'},
        {type: 'tech', id: 'http'},
        {type: 'article', id: 'integration/api-openapi'},
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

export const allTracks: TrackDef[] = [juniorTrack];

function buildLookup(): Map<string, NavInfo[]> {
  const map = new Map<string, NavInfo[]>();
  for (const track of allTracks) {
    const flat = track.stages.flatMap((s, si) =>
      s.items.map((item) => ({...item, stageIndex: si})),
    );
    const total = flat.length;
    flat.forEach((item, idx) => {
      const key = `${item.type}:${item.id}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push({
        trackId: track.id,
        trackTitle: track.title,
        trackDescription: track.description,
        stageTitle: track.stages[item.stageIndex].title,
        stageIndex: item.stageIndex,
        index: idx,
        total,
        prev: idx > 0 ? {type: flat[idx - 1].type, id: flat[idx - 1].id} : null,
        next: idx < total - 1 ? {type: flat[idx + 1].type, id: flat[idx + 1].id} : null,
      });
    });
  }
  return map;
}

export const trackLookup = buildLookup();
