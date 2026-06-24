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
        prev: idx > 0 ? {type: flat[idx - 1].type, id: flat[idx - 1].id, folder: (flat[idx - 1] as TrackItem).folder} : null,
        next: idx < total - 1 ? {type: flat[idx + 1].type, id: flat[idx + 1].id, folder: (flat[idx + 1] as TrackItem).folder} : null,
      });
    });
  }
  return map;
}

export const trackLookup = buildLookup();
