import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

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

  plugins: ['docusaurus-lunr-search'],

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
