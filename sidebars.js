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
    {
      type: 'doc',
      label: 'What is Manta?',
      id:'Introduction',
    },
    {
      type: 'category',
      label: 'Concepts',
      collapsible: true,
      collapsed: false,
      items: [
        'concepts/ZKP',
        'concepts/PrivatePayment',
        'concepts/ShieldedAddress',
        'concepts/ViewingKey',
        'concepts/Signer',
        'concepts/Governance',
      ],    
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
      label: 'Collators',
      collapsible: true,
      collapsed: true,
      items: [
        'collator/CommunityCollatorProgram',
        'collator/HowToApply',
        {
          type: 'category',
          label: '🚄 Setup and Run a collator',
          collapsible: true,
          collapsed: true,
          items: [
            'collator/SetupAndRun/installation',
            'collator/SetupAndRun/configuration',
            'collator/SetupAndRun/running',
            'collator/SetupAndRun/keys',
            'collator/SetupAndRun/sync',
            'collator/SetupAndRun/wait',
          ]
        },
        'collator/HowToLeave',
      ]
    },
    {
      type: 'category',
      label: 'Guides',
      collapsible: true,
      collapsed: true,
      items: [
        'guides/DolphinPay',
        'guides/XcmOnboarding',
      ]
    },
    {
      type: 'category',
      label: 'Learn More About Manta',
      collapsible: true,
      collapsed: true,
      items: [
        'learn/PrivatePayment',
        'learn/MantaPaySpec',
        'learn/ZkpChallenge',        
      ]
    }
  ],
};
