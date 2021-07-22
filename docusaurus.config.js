/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Manta Network Technical Resources',
  tagline: 'For the first privacy-preserving protocol built for scalability, privacy and interoperability.',
  url: 'https://docs.manta.network',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'Manta-Network', // github org name.
  projectName: 'docs', // repo name.
  themeConfig: {
    navbar: {
      title: 'Manta Network Documentation',
      logo: {
        alt: 'Manta Network Logo',
        src: 'img/manta.png',
      },
      items: [
        {
          href: 'https://manta.network',
          label: 'manta.network',
          position: 'left',
          label: 'manta.network',
        },
        {
          href: 'https://github.com/Manta-Network/docs',
          label: 'documentation repository',
          position: 'right',
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
              to: '/docs/intro',
            },
            {
              label: 'Running Manta',
              to: '/docs/running-manta/get-manta',
            },
            {
              label: 'Running Calamari',
              to: '/docs/calamari/node-operators/introduction',
            }
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
      copyright: `Copyright © ${new Date().getFullYear()} Manta Network. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/Manta-Network/docs/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
