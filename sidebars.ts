import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  mainSidebar: [
    {
      type: 'category',
      label: 'Основы IT',
      collapsible: true,
      collapsed: false,
      items: [
        'basics/what-is-software',
        'basics/how-computer-works',
        'basics/what-is-network',
        'basics/what-is-programming',
        {
          type: 'category',
          label: 'Разработка и инструменты',
          collapsible: true,
          collapsed: true,
          items: [
            'basics/what-is-os',
            'basics/git-overview',
          ],
        },
        'basics/who-is-system-analyst',
        {
          type: 'category',
          label: 'Профессия аналитика',
          collapsible: true,
          collapsed: true,
          items: [
            'basics/what-is-sdlc',
            'basics/what-is-testing',
            'basics/what-is-sa-documentation',
            'basics/it-roles',
            'basics/sa-day-in-life',
          ],
        },
        'basics/client-server-basics',
        {
          type: 'category',
          label: 'Взаимодействие систем',
          collapsible: true,
          collapsed: true,
          items: [
            'basics/what-is-protocol',
            'basics/what-is-api',
            'basics/what-is-app-types',
          ],
        },
        'basics/what-is-data',
        {
          type: 'category',
          label: 'Базы данных',
          collapsible: true,
          collapsed: true,
          items: [
            'basics/what-is-database-basics',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Работа с требованиями',
      collapsible: true,
      collapsed: false,
      items: [
        'requirements/what-is-requirement',
        'requirements/stakeholder-communication',
        'requirements/user-stories',
        'requirements/bdd-scenarios',
      ],
    },
    {
      type: 'category',
      label: 'Моделирование',
      collapsible: true,
      collapsed: false,
      link: {type: 'generated-index', title: 'Моделирование'},
      items: [
        'modeling/bpmn',
      ],
    },
    {
      type: 'category',
      label: 'Интеграция',
      collapsible: true,
      collapsed: false,
      link: {type: 'generated-index', title: 'Интеграция'},
      items: [
        'integration/api-rest-basics',
        'integration/api-openapi',
      ],
    },
  ],
};

export default sidebars;
