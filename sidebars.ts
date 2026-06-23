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
        'basics/what-is-programming',
        'basics/who-is-system-analyst',
        'basics/client-server-basics',
        'basics/what-is-api',
        'basics/what-is-protocol',
        'basics/it-roles',
        'basics/sa-day-in-life',
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
