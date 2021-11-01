/** @type {import('@docusaurus/types').DocusaurusConfig} */
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
    navbar: {
      title: 'Manta Network Docs',
      logo: {
        alt: 'Manta Network Logo',
        src: 'img/manta.png',
      },
      items: [
        {
          href: 'https://manta.network',
          label: 'Manta Network Home',
          position: 'left',
        },
        {
          href: 'https://github.com/Manta-Network',
          label: 'GitHub',
          position: 'left',
        },
        {
          href: 'https://docs.manta.network/docs/intro/',
          label: 'Docs',
          position: 'left',
        }
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
            {
              label: 'Manta Overview',
              to: '/docs/manta/Overview',
            },
            {
              label: 'Calamari Overview',
              to: '/docs/calamari/Overview',
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
      copyright: `Copyright © ${new Date().getFullYear()} Manta Network. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/Manta-Network/docs/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
