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
        {
          type: 'category',
          label: 'Что такое программирование',
          link: {type: 'doc', id: 'basics/what-is-programming'},
          collapsible: true,
          collapsed: true,
          items: [
            'basics/what-is-os',
            'basics/git-overview',
          ],
        },
        {
          type: 'category',
          label: 'Кто такой системный аналитик',
          link: {type: 'doc', id: 'basics/who-is-system-analyst'},
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
        {
          type: 'category',
          label: 'Клиент-серверная архитектура',
          link: {type: 'doc', id: 'basics/client-server-basics'},
          collapsible: true,
          collapsed: true,
          items: [
            'basics/what-is-protocol',
            'basics/what-is-api',
            'basics/what-is-app-types',
          ],
        },
        {
          type: 'category',
          label: 'Что такое данные, информация, знания',
          link: {type: 'doc', id: 'basics/what-is-data'},
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
