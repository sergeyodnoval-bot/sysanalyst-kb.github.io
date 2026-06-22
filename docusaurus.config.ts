import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const config: Config = {
  title: 'База знаний системного аналитика',
  tagline: 'Структурированные знания для системных аналитиков — от простого к сложному',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://sysanalyst-kb.github.io',
  baseUrl: '/',

  organizationName: 'sysanalyst-kb',
  projectName: 'sysanalyst-kb',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    'docusaurus-lunr-search',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tech',
        path: 'tech',
        routeBasePath: 'tech',
        sidebarPath: './sidebars-tech.ts',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tasks',
        path: 'tasks',
        routeBasePath: 'tasks',
        sidebarPath: './sidebars-tasks.ts',
      },
    ],
    function knowledgeGraphPlugin() {
      return {
        name: 'knowledge-graph',
        async loadContent() {
          type GraphNode = {id: string; title: string; label: string; level: number; category: string; type: string; tech_type?: string; difficulty?: number};
          type GraphEdge = {from: string; to: string; type: string};
          const graph: {nodes: GraphNode[]; edges: GraphEdge[]} = {
            nodes: [],
            edges: [],
          };

          function walkDir(dir: string, prefix: string = '', nodeType: string = 'article') {
            if (!fs.existsSync(dir)) return;
            const entries = fs.readdirSync(dir, {withFileTypes: true});
            for (const entry of entries) {
              const fullPath = path.join(dir, entry.name);
              if (entry.isDirectory() && entry.name !== 'category') {
                walkDir(fullPath, prefix ? `${prefix}/${entry.name}` : entry.name, nodeType);
              } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
                const content = fs.readFileSync(fullPath, 'utf-8');
                const {data} = matter(content);
                if (!data.id) continue;

                const fullId = prefix ? `${prefix}/${data.id}` : data.id;

                const node: GraphNode = {
                  id: fullId,
                  title: data.title || data.id,
                  label: data.sidebar_label || data.title || data.id,
                  level: data.level || 1,
                  category: data.category || 'other',
                  type: nodeType,
                  difficulty: data.difficulty,
                };
                if (data.tech_type) {
                  node.tech_type = data.tech_type;
                }

                graph.nodes.push(node);

                const addEdges = (field: string, type: string) => {
                  const items = data[field];
                  if (Array.isArray(items)) {
                    for (const prereq of items) {
                      graph.edges.push({from: prereq, to: fullId, type});
                    }
                  }
                };
                addEdges('prerequisites', 'prerequisite');
                addEdges('leads_to', 'leads_to');
                addEdges('requires_articles', 'enables');
                addEdges('requires_tech', 'required_for');
                addEdges('next_tasks', 'next_task');
              }
            }
          }

          walkDir(path.resolve(__dirname, 'docs'), '', 'article');
          walkDir(path.resolve(__dirname, 'tech'), '', 'technology');
          walkDir(path.resolve(__dirname, 'tasks'), '', 'task');
          return graph;
        },
        async contentLoaded({content, actions}) {
          const {setGlobalData} = actions;
          setGlobalData(content);
        },
      };
    },
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
      defaultMode: 'light',
    },
    navbar: {
      title: 'База знаний СА',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Статьи',
        },
        {
          type: 'docSidebar',
          sidebarId: 'techSidebar',
          docsPluginId: 'tech',
          position: 'left',
          label: 'Технологии',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tasksSidebar',
          docsPluginId: 'tasks',
          position: 'left',
          label: 'Задачи',
        },
        {to: '/map', label: 'Карта знаний', position: 'left'},
        {to: '/test', label: 'Тест на уровень', position: 'left'},
        {to: '/tracks', label: 'Треки', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Проект',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/sysanalyst-kb/sysanalyst-kb',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} База знаний системного аналитика`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
