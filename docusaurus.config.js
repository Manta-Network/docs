/** @type {import('@docusaurus/types').DocusaurusConfig} */

const math = require('remark-math');
const katex = require('rehype-katex');

module.exports = {
  title: 'Manta Network Technical Resources',
  tagline:
    'For the first privacy-preserving protocol built for scalability, privacy and interoperability.',
  url: 'https://docs.manta.network',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'Manta-Network', // github org name.
  projectName: 'docs', // repo name.
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
	navbar: {
		title: "Manta Network Docs",
		logo: {
			alt: "Manta Network Logo",
			src: "img/manta2.png",
		},
		items: [
			{
				href: "https://manta.network",
				label: "Manta Network",
				position: "right",
			},
			{
				href: "http://calamari.network/",
				label: "Calamari Network",
				position: "right",
			},
			{
				href: "https://github.com/Manta-Network",
				label: "GitHub",
				position: "right",
			},
			{
				type: "localeDropdown",
				position: "right",
			},
		],
	},
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/Introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/mantanetwork',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/mantanetworkofficial',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/MnaM4mqq',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Manta-Network',
            },
            {
              label: 'Email',
              href: 'mailto:contact@manta.network',
            },
          ],
        },
      ],
      copyright: `Copyright © 2019-${new Date().getFullYear()} Manta Network.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
          editUrl: 'https://github.com/Manta-Network/docs/edit/main/',
		  showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
		gtag: {
			trackingID: "G-J7YDH8B96W",
		},
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css',
      integrity:
        'sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc',
      crossorigin: 'anonymous',
    },
  ],
  plugins: [
    [
      require.resolve('@cmfcmf/docusaurus-search-local'),
      {
        indexDocs: true,
        indexPages: false,
        language: ["en", "zh"],
        maxSearchResults: 10,
      },
    ],
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'cn'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      cn: {
        label: '中文',
      }
    }
  }
};
