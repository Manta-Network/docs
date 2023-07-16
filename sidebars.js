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
            type: "category",
            label: "Manta Network",
            collapsible: false,
            items: [
                {
                    type: "category",
                    label: "What is Manta?",
                    items: [
                        {
                            type: "doc",
                            label: "What is Manta?",
                            id: "Introduction",
                        },
                        {
                            type: "doc",
                            label: "What is Manta Pacific (Layer 2)",
                            id: "introduction/Manta-Pacific",
                        },
                        {
                            type: "doc",
                            label: "What is Manta Atlantic (Layer1)",
                            id: "introduction/Manta-Atlantic",
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Core Concepts",
                    items: [
                        "concepts/ZKP",
                        "concepts/zkAsset",
                        "concepts/zkAddress",
                        "concepts/TrustedSetup",
                        "concepts/proofkey",
                    ],
                },
                {
                    type: "category",
                    label: "Research",
                    items: [
                        "learn/Talks",
                        "learn/PrivatePayment",
                        "learn/Spec",
                        "learn/Papers",
                    ],
                },
                "manta/Token",
                "manta/Ecosystem",
            ],
        },
        {
            type: "category",
            label: "Product Guides",
            collapsible: false,
            items: [
                {
                    type: "category",
                    label: "NPO",
                    items: [
                        {
                            type: "doc",
                            label: "About NPO -zkSBT ",
                            id: "guides/npo/About",
                        },
                        {
                            type: "doc",
                            label: "Benefits",
                            id: "guides/npo/Benefits",
                        },
                        {
                            type: "doc",
                            label: "For Users",
                            id: "guides/npo/ForUsers",
                        },
                        {
                            type: "doc",
                            label: "For Developers",
                            id: "guides/npo/ForDeveloper",
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Manta Wallet",
                    items: [
                        {
                            type: "doc",
                            label: "Get Started",
                            id: "guides/MantaWallet",
                        },
                        {
                            type: "doc",
                            label: "Migration",
                            id: "guides/MantaWalletMigration",
                        },
                        {
                            type: "doc",
                            label: "Update",
                            id: "guides/MantaWalletUpdate",
                        },
                        {
                            type: "doc",
                            label: "Consolidate UTXOs",
                            id: "guides/ConsolidateUTXOs",
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Manta Pay",
                    items: [
                        {
                            type: "doc",
                            label: "Manta Wallet User (New)",
                            id: "guides/MantaPay-Wallet",
                        },
                        {
                            type: "doc",
                            label: "Manta Signer User",
                            id: "guides/MantaPay-Signer",
                        },
                    ],
                },
                {
                    type: "doc",
                    label: "Bridge",
                    id: "guides/Bridge",
                },
                {
                    type: "category",
                    label: "Staking",
                    items: [
                        {
                            type: "category",
                            label: "KMA Staking",
                            items: [
                                "calamari/Staking/Overview",
                                "calamari/Staking/Rewards",
                                "calamari/Staking/Rules",
                                {
                                    type: "category",
                                    label: "Delegation",
                                    items: [
                                        "calamari/Staking/Delegation/dApp Overview",
                                        "calamari/Staking/Delegation/HowTo Delegate",
                                    ],
                                },
                                "calamari/Staking/StakingFAQ",
                            ],
                        },
                        // NOTE: To be created later
                        // {
                        //   type: 'category',
                        //   label: 'MANTA Staking',
                        //   items: [
                        //     'guides/staking/MANTA/Overview',
                        //   ],
                        // }
                    ],
                },
                "guides/MantaSigner",
            ],
        },
        {
            type: "category",
            label: "Manta Pacific Testnet",
            collapsible: false,
            items: [
                {
                    type: "doc",
                    label: "Testnet Quickstart",
                    id: "zkShuffle/Testnet-Quickstart",
                },
                {
                    type: "category",
                    label: "Universal Circuits (Alpha): zkShuffle",

                    items: [
                        {
                            type: "doc",
                            label: "Overview",
                            id: "zkShuffle/Overview",
                        },
                        {
                            type: "autogenerated",
                            dirName: "zkShuffle/Circuits",
                        },
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "Calamari Test Network",
            collapsible: false,
            items: [
                {
                    type: "doc",
                    label: "What is Calamari?",
                    id: "calamari/Overview",
                },
                {
                    type: "category",
                    label: "Develop on Calamari Testnet",
                    items: [
                        {
                            type: "doc",
                            label: "How to use Manta Wallet in dApp",
                            id: "developers/manta.js/how-to-use-manta-private-wallet-in-dapp",
                        },
                        {
                            type: "doc",
                            label: "How to use Manta.js SDK",
                            id: "developers/manta.js/how-to-use-manta-js-sdk",
                        },
                        {
                            type: "doc",
                            label: "How to Mint zkSBT",
                            id: "developers/manta.js/how-to-mint-zk-sbt",
                        },
                        {
                            type: "category",
                            label: "Integration with Calamari",
                            items: [
                                {
                                    type: "doc",
                                    label: "Get Started",
                                    id: "calamari/DevelopOnCalamari",
                                },
                                {
                                    type: "category",
                                    label: "Cross-Chain Interactions (XCM)",
                                    items: [
                                        "guides/XcmOverview",
                                        "guides/XcmTransfers",
                                        "guides/XcmOnboarding",
                                    ],
                                },
                            ],
                        },
                        {
                            type: "category",
                            label: "Collation",
                            items: [
                                "calamari/Staking/Collation/Overview",
                                "calamari/Staking/Collation/Requirements",
                                {
                                    type: "category",
                                    label: "SetupAndRun",
                                    items: [
                                        "calamari/Staking/Collation/SetupAndRun/installation",
                                        "calamari/Staking/Collation/SetupAndRun/configuration",
                                        "calamari/Staking/Collation/SetupAndRun/running",
                                        "calamari/Staking/Collation/SetupAndRun/sync",
                                        "calamari/Staking/Collation/SetupAndRun/keys",
                                        "calamari/Staking/Collation/SetupAndRun/bond",
                                    ],
                                },
                                "calamari/Staking/Collation/Maintenance",
                                "calamari/Staking/Collation/Reduce Bond",
                                "calamari/Staking/Collation/Unbond",
                                "calamari/Staking/Collation/CollatorFAQ",
                                "calamari/Staking/Early Collator Program",
                            ],
                        },
                    ],
                },
                "Codebase",
                {
                    type: "category",
                    label: "🐙 Calamari Token (KMA)",
                    items: [
                        {
                            type: "autogenerated",
                            dirName: "calamari/KMA",
                        },
                        "calamari/CrowdloanClaim",
                    ],
                },
                "calamari/Governance",
                "calamari/Partnership",
            ],
        },
        {
            type: "category",
            label: "Previous Events",
            collapsible: false,
            items: [
                {
                    type: "link",
                    label: "Squad Game",
                    href: "https://squadgame.manta.network/",
                },
                {
                    type: "link",
                    label: "Manta Network Crowdloan", // string - the label that should be displayed.
                    href: "https://crowdloanstrategy.manta.network/", // string - the target URL.
                },
            ],
        },
    ],
};
