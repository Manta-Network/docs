:::note
Staking is active on Manta Network starting with v4.6.1
:::

:::caution Manta Atlantic deprecation (parachain wind-down)

Manta Atlantic’s Polkadot parachain slot is expected to expire around **late July to early August 2026** (exact timing depends on block production). Manta is consolidating on **Manta Pacific** (Ethereum L2). If you hold or stake MANTA on Atlantic, **unstake and migrate as early as possible**—do not rely on operating staking as if the chain were long-lived.

The following aligns with the **Manta Atlantic Deprecation FAQ** (announcement March 11, 2026; FAQ last updated March 10, 2026). Always confirm the latest dates in community channels.

**Roadmap milestones (general)**

| Date | Event |
| --- | --- |
| March 11, 2026 | Deprecation announcement published |
| March 18, 2026 | Staking rewards stopped; new staking no longer accepted (FAQ summary table) |
| March 20, 2026 | Cross-chain bridge inbound transfers closed (outbound only) |
| March 25, 2026 | Migration DApp goes live (URL announced with launch) |
| June 2026 | Chain enters read-only mode; migration-related transfers and withdrawing unbonded funds remain available |
| July 2026 | Slot expires; chain stops producing blocks |

**Staking-specific schedule (FAQ “I’m currently staking” section)**

- **Through March 17, 2026:** You can still earn staking rewards and initiate unstaking at any time.
- **March 17, 2026:** New staking is no longer accepted; existing stakers can still earn rewards and unstake.
- **May 1, 2026:** Staking rewards stop; forced unstaking begins.
- **After May 1, 2026:** All remaining staked positions will be forcibly unbonded.

**Unbonding:** The standard Atlantic **~7 day** unbonding period still applies after you unbond—start early to avoid queues near deadlines.

**Migration:** A dedicated **Migration DApp** detects assets and staking on Atlantic and can guide **unstake** before you choose a destination (e.g. **Manta Pacific** via Manta Bridge, or **Polkadot / other parachains** via XCM). Staked MANTA counts toward assets you should migrate. If you miss deadlines, the project plans a **1:1 MANTA airdrop** on Pacific from a chain snapshot; **non-MANTA assets (DOT, GLMR, USDt, etc.) are not covered** by that airdrop and must be migrated by you.

**Collators:** Unstake and exit in line with FAQ guidance—after **May 1, 2026**, inflation is set to **0** and collators **no longer receive block production rewards**; the goal is for all collators to exit safely before the slot expires. Follow collator community updates (e.g. Telegram) for reminders and guides.

**Where to get updates:** Discord [`#atlantic-migration`](https://discord.gg/PbaJZGPQ), X [@MantaNetwork](https://twitter.com/MantaNetwork), [Telegram — Manta official group](https://t.me/mantanetworkofficial).

:::

Manta Network runs a delegated proof-of-stake (DPoS) consensus mechanism.

Similar to other Layer 1 blockchains, block producers are selected out of a set of candidates based on the total MANTA stake backing each specific block producer candidate - in our case called a `collator`. In addition, users who don't wish to run their own `collator` can instead `delegate` their MANTA token to an existing collator and gain a share of its rewards.

### What does this mean for MANTA holders
1. High-performing block producers voted in through delegation => cheapest possible gas fees for transactions
2. Many independent collators => high censorship resistance
3. You can generate yield on your MANTA by participating in staking rewards

### Okay, so how do I start staking?

You have two routes to stake your MANTA:

1. Become a `Delegator`

All you need is some MANTA and [our delegation dApp](Delegation/dApp%20Overview)

2. Become a `Collator Runner`

This path needs technical experience and dedicated computer hardware to run a Manta blockchain node on in addition to a larger amount of MANTA than 1. and can bring higher rewards.
You can find more info about this path [in the collator section](../Collation/Overview)

## What is DPoS?
### In contrast to other PoS Networks
In contrast to other networks like Ethereum, where no on-chain mechanism exists for multiple token holders to collaborate (staking pools are used as an off-chain crutch here), our DPoS solution allows for people who can't or won't run their own collator node to `delegate` their token to one or multiple specific `collators`, thus voting that they do a good job with producing blocks, helping ensure its position in the set of at most 70 active collators and in return share in the [block rewards](Rewards) the backed collator obtains.
In order create a semi-stable set of collators, these locked tokens are subject to a 7 day waiting period if a user wishes to recover his tokens from a staking lock or change the target collator they're delegating to.

### In contrast to Polkadot/Kusama’s NPoS (nominated proof of stake)
On Polkadot/Kusama, an on-chain election occurs to distribute DOT/KSM tokens among backed nodes, while on Manta a delegator always picks one concrete collator and a concrete number of MANTA they wish to delegate to that collator.
This approach is both simpler and less computationally heavy than running a distribution election, which has a nondeterministic execution time - something that must be avoided on Parachains as it can easily lead to chain stalls.