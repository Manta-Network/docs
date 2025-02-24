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
                    type: "doc",
                    label: "Manta Token",
                    id: "mantaToken/mantaToken",
                },
                {
                    type: "category",
                    label: "Research",
                    items: [
                        {
                            type: "doc",
                            label: "Zero-Knowledge Proofs",
                            id: "concepts/ZKP",
                        },
                        {
                            type: "doc",
                            label: "Celestia",
                            id: "concepts/Celestia",
                        },
                        {
                            type: "doc",
                            label: "ZKEVM",
                            id: "concepts/ZKEVM",
                        },
                        {
                            type: "doc",
                            label: "Universal Circuits (Alpha): zkShuffle",
                            id: "zkShuffle/Overview",
                        },
                        {
                            type: "doc",
                            label: "OP Stack",
                            id: "concepts/OPStack",
                        },
                        {
                            type: "doc",
                            label: "Fast Finality",
                            id: "concepts/fast-finality",
                        },
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "Manta Pacific Network",
            collapsible: false,
            items: [
                {
                    type: "doc",
                    label: "Network Information",
                    id: "manta-pacific/Build on Manta/Network Information",
                },
                // {
                //     type: "category",
                //     label: "Network Info",
                //     items: [
                //         {
                //             type: "doc",
                //             label: "Quickstart",
                //             id: "manta-pacific/Quickstart",
                //         },

                //         {
                //             type: "doc",
                //             label: "Block Explorer",
                //             id: "manta-pacific/Block Explorer",
                //         },
                //         {
                //             type: "doc",
                //             label: "JSON-RPC Nodes",
                //             id: "manta-pacific/JSON-RPC Nodes",
                //         },
                //         {
                //             type: "doc",
                //             label: "Testnet Info",
                //             id: "manta-pacific/Testnet Info",
                //         },
                //     ],
                // },
                {
                    type: "category",
                    label: "Building on Manta",
                    items: [
                        {
                            type: "doc",
                            label: "EVM Compatibility",
                            id: "manta-pacific/EVM Compatible",
                        },
                        {
                            type: "doc",
                            label: "Manta Contracts",
                            id: "manta-pacific/Build on Manta/Contracts",
                        },
                        {
                            type: "doc",
                            label: "Tokens",
                            id: "manta-pacific/Build on Manta/Tokens",
                        },
                        {
                            type: "doc",
                            label: "Fees",
                            id: "manta-pacific/Build on Manta/Fees",
                        },
                        {
                            type: "doc",
                            label: "Differences between Ethereum and Manta",
                            id: "manta-pacific/Build on Manta/Differences between Ethereum and MantaNetwork",
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Tools",
                    items: [
                        {
                            type: "doc",
                            label: "Node Providers",
                            id: "manta-pacific/Tools/Node Providers",
                        },
                        {
                            type: "doc",
                            label: "Block Explorers",
                            id: "manta-pacific/Tools/Block Explorers",
                        },
                        {
                            type: "doc",
                            label: "Network Faucets",
                            id: "manta-pacific/Tools/Network Faucets",
                        },
                        {
                            type: "doc",
                            label: "Oracles",
                            id: "manta-pacific/Tools/Oracles",
                        },
                        {
                            type: "doc",
                            label: "Data Indexers",
                            id: "manta-pacific/Tools/Data Indexers",
                        },
                        {
                            type: "doc",
                            label: "Onramps",
                            id: "manta-pacific/Tools/Onramps",
                        },
                        {
                            type: "doc",
                            label: "Security Partners",
                            id: "manta-pacific/Tools/Security Partners",
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Bridges",
                    items: [
                        {
                            type: "doc",
                            label: " Bridge $MANTA Token Between Manta Pacific and Manta Atlantic",
                            id: "manta-pacific/Tools/Bridge/Bridge $MANTA Token Between Manta Pacific and Manta Atlantic",
                        },
                        {
                            type: "category",
                            label: "Native Bridge",
                            items: [
                                {
                                    type: "doc",
                                    label: "How to Use Native Bridge",
                                    id: "manta-pacific/Tools/Bridge/Native Bridge/How to Use Native Bridge",
                                },
                                {
                                    type: "doc",
                                    label: "How to deploy Ethereum token on Manta",
                                    id: "manta-pacific/Tools/Bridge/Native Bridge/How to deploy Ethereum token on Manta",
                                },
                                {
                                    type: "doc",
                                    label: "How to list token on Native Bridge",
                                    id: "manta-pacific/Tools/Bridge/Native Bridge/How to list token on Native Bridge",
                                },
                                {
                                    type: "doc",
                                    label: "How to use JS SDK bridge token between Ethereum and Manta",
                                    id: "manta-pacific/Tools/Bridge/Native Bridge/How to use JS SDK bridge token between Ethereum and Manta",
                                },
                                {
                                    type: "doc",
                                    label: "FAQ",
                                    id: "manta-pacific/Tools/Bridge/Native Bridge/FAQ",
                                },
                            ],
                        },
                        {
                            type: "doc",
                            label: "Third party Bridge",
                            id: "manta-pacific/Tools/Bridge/Third party Bridge",
                        },
                        {
                            type: "doc",
                            label: "Bridging Celestia‘s $TIA to Manta Pacific",
                            id: "manta-pacific/Tools/Bridge/Bridging Celestia‘s $TIA to Manta Pacific",
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Manta Pacific Node",
                    items: [
                        // {
                        //     type: "doc",
                        //     label: "Hardware conditions",
                        //     id: "manta-pacific/Manta Pacific Node/Hardware conditions",
                        // },
                        {
                            type: "doc",
                            label: "How to run Replica Node",
                            id: "manta-pacific/Manta Pacific Node/How to run Replica Node",
                        },
                        // {
                        //     type: "doc",
                        //     label: "Join Telegram to get node updates",
                        //     id: "manta-pacific/Manta Pacific Node/Join Telegram to get node updates",
                        // },
                    ],
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
                {
                    type: "category",
                    label: "NPO-zkSBT",
                    items: [
                        {
                            type: "autogenerated",
                            dirName: "zkSBT/auto",
                        },
                        {
                            type: "doc",
                            label: "Design",
                            id: "zkSBT/zkSBT Asset",
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Deploy Your App",
                    items: [
                        {
                            type: "autogenerated",
                            dirName: "zkShuffle/Deploy",
                        },
                    ],
                },
                {
                    type: "doc",
                    label: "Manta Pacific Roadmap",
                    id: "concepts/Roadmap",
                },
                // {
                //     type: "category",
                //     label: "Bridge to Manta Pacific ",
                //     items: [
                //         {
                //             type: "autogenerated",
                //             dirName: "bridge-to-pacific",
                //         },
                //     ],
                // },
                {
                    type: "doc",
                    label: "SPACE ID Name Service and SPACE ID",
                    id: "manta-pacific/Space ID",
                },
            ],
        },
        {
            type: "category",
            label: "Manta Atlantic Network",
            collapsible: false,
            items: [
                {
                    type: "doc",
                    label: "Network Information",
                    id: "manta-atlantic/Network Information",
                },
                {
                    type: "category",
                    label: "Collator",
                    items: [
                        {
                            type: "autogenerated",
                            dirName: "manta-atlantic/Collation",
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Node",
                    items: [
                        "manta-atlantic/Node/Overview",
                        "manta-atlantic/Node/Requirements",
                        {
                            type: "category",
                            label: "SetupAndRun",
                            items: [
                                "manta-atlantic/Node/SetupAndRun/full_node",
                                "manta-atlantic/Node/SetupAndRun/archive_node",
                            ],
                        },
                    ],
                },
                {
                    type: "doc",
                    label: "Bridge",
                    id: "manta-atlantic/Bridge",
                },
                {
                    type: "category",
                    label: "Staking",
                    items: [
                        "manta-atlantic/Staking/Overview",
                        "manta-atlantic/Staking/Rewards",
                        "manta-atlantic/Staking/Rules",
                        {
                            type: "category",
                            label: "Delegation",
                            items: [
                                "manta-atlantic/Staking/Delegation/dApp Overview",
                                "manta-atlantic/Staking/Delegation/HowTo Delegate",
                            ],
                        },
                        "manta-atlantic/Staking/StakingFAQ",
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "OpenZL",
            collapsible: false,
            items: [
                {
                    type: "doc",
                    label: "Introduction",
                    id: "openzl/introduction",
                },
                {
                    type: "category",
                    label: "ECLAIR Basics",
                    items: [
                        {
                            type: "doc",
                            label: "Native vs Non-Native Computation",
                            id: "openzl/native_nonnative",
                        },
                        {
                            type: "category",
                            label: "ECLAIR Standard Library",
                            items: [
                                {
                                    type: "doc",
                                    label: "Introduction",
                                    id: "openzl/std/eclair_std_lib",
                                },
                                {
                                    type: "doc",
                                    label: "Bool",
                                    id: "openzl/std/bool",
                                },
                                {
                                    type: "doc",
                                    label: "Cmp",
                                    id: "openzl/std/cmp",
                                },
                                {
                                    type: "doc",
                                    label: "Num",
                                    id: "openzl/std/num",
                                },
                                {
                                    type: "doc",
                                    label: "Ops",
                                    id: "openzl/std/ops",
                                },
                            ],
                        },
                        {
                            type: "doc",
                            label: "Allocation",
                            id: "openzl/alloc",
                        },
                    ],
                },
                {
                    type: "doc",
                    label: "Tutorial: Poseidon Permutation",
                    id: "openzl/poseidon_permutation_tutorial",
                },
                {
                    type: "category",
                    label: "Proof System Plugins",
                    items: [
                        {
                            type: "doc",
                            label: "Introduction",
                            id: "openzl/proof_systems",
                        },
                    ],
                },
            ],
        },
    ],
};
