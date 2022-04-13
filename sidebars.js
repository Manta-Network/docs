/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  docs: [
    'Introduction',
    {
      type: 'category',
      label: 'Manta',
      items: ['manta/Overview'],
    },
    {
      type: 'category',
      label: 'Calamari (Manta\'s Canary Network)',
      collapsible: true,
      collapsed: false,
      items: [
        'calamari/Overview',
        'calamari/KMA',
        'calamari/Governance',
        'calamari/api',
        'calamari/CrowdloanClaim',
      ],
    },
    {
      type: 'category',
      label: 'Dolphin',
      collapsible: true,
      collapsed: false,
      items: [
        'dolphin/Overview',
        'dolphin/DolphinPay',
        'dolphin/PrivatePayment',
        'dolphin/PrivateExchange',
      ],
    },
    {
      type: 'category',
      label: 'Signer',
      items: [
        'signer/Overview',
        'signer/HowToUseIt',
      ],
    },
    {
      type: 'category',
      label: 'Collators',
      collapsible: true,
      collapsed: false,
      items: [
        'collator/CommunityCollatorProgram',
        'collator/HowToApply',
        'collator/SetupAndRun',
        'collator/HowToLeave',
      ]
    },
    {
      type: 'category',
      label: 'Learn About Zero-Knowledge Proofs',
      collapsible: true,
      collapsed: false,
      items: [
        'education/ZkpChallenge',
      ]
    }
  ],
};
