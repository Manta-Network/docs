# Data Indexers

## Goldsky

[​Index Manta Pacific with Goldsky](https://docs.goldsky.com/chains/manta#overview)

### Overview

Goldsky is a high-performance data indexing provider for Manta that makes it easy to extract, transform, and load on-chain data to power both application and analytics use cases. Goldsky offers two primary approaches to indexing and accessing blockchain data: [Subgraphs](https://docs.goldsky.com/subgraphs) (high-performance subgraphs) and [Mirror](https://docs.goldsky.com/mirror) (real-time data replication pipelines).

### Scope

Goldsky has partnered with Manta to make our product available to the ecosystem and provide dedicated support for Manta data indexing. The full scope of our partnership (which products are enabled, what partner-exclusive benefit is available, and who this benefit is available to) is outlined below.

|                  | Subgraphs                                             | Mirror                                              |
| ---------------- | ----------------------------------------------------- | --------------------------------------------------- |
| **Enablement**   | Yes                                                   | Yes                                                 |
| **Benefit**      | 100% discount on Subgraph workers and entities stored | 10% discount on Pipeline workers and events written |
| **Availability** | Select developers                                     | All developers                                      |

Where perks are available to projects specified by the chain ecosystem, please reach out to their developer relations team for an access code and link to private signup form. Where perks are openly available to all developers, please contact [sales@goldsky.com](mailto:sales@goldsky.com) to apply the applicable partnership perks to your project.

### Getting started

To use Goldsky, you’ll need to create an account, install the CLI, and log in.

Install Goldsky's CLI and log in

### Subgraphs

Manta subgraphs can be deployed on Goldsky in 2 ways:

- Via CLI from a local subgraph configuration file. If you are familiar with developing subgraphs already, you'll be familiar with this approach; after defining a subgraph locally (with a `subgraph.yaml` file, a `schema.graphql` file, and the necessary mappings to translate raw event data into the entities defined in the schema), you can deploy subgraphs to Goldsky (once the Goldsky CLI is installed) using `goldsky subgraph deploy <name>/<version> --path .` For more, read the [step-by-step guide](https://docs.goldsky.com/get-started/subgraphs).
- Via instant subgraphs, where you can pass through a contract address and the ABI for that contract. This is a quick-start option that automatically generates the underlying subgraph configuration files on your behalf, making it easy to extract blockchain event data and serve it as an API endpoint without complex setup. Use the `--from-abi` flag in the command above instead of `--path`. For more, read the [no-code subgraphs guide](https://docs.goldsky.com/guides/create-a-no-code-subgraph).

Both Manta Pacific mainnet and testnet are available at the chain slugs `manta-pacific-mainnet` and `manta-pacific-testnet` respectively.

### Mirror

Support for Goldsky Mirror for Manta is currently in progress. If you’d like to be notified when support is launched publicly, contact us at [sales@goldsky.com](mailto:sales@goldsky.com).

**Getting support**

Can't find what you're looking for? Reach out to us at [support@goldsky.com](mailto:support@goldsky.com) for help.

## Codex

### Overview

Codex is a blockchain data API providing real-time and historical DeFi data across 100+ networks via GraphQL, including Manta Pacific (chain ID `169`). With access to over 70 million tokens and 700 million wallets, Codex delivers sub-second data for building token explorers, trading bots, portfolio trackers, and DeFi dashboards.

Codex offers:

- **GraphQL API** — A single endpoint with 73 query operations covering token prices, OHLCV charts, DEX trades, liquidity pools, wallet activity, and aggregated analytics
- **Real-time subscriptions** — 25 WebSocket data streams for live token prices, trade events, new pairs, and wallet activity
- **Webhooks** — Push-based notifications for on-chain events without persistent connections
- **TypeScript/JavaScript SDK** — A thin wrapper around the GraphQL API with built-in subscription handling

### Getting Started

1. Sign up at [dashboard.codex.io](https://dashboard.codex.io/signup)
2. Copy your API key from the dashboard
3. Visit the [Docs](https://docs.codex.io) for a full API Reference
4. Make your first request — for example, fetch trending tokens on Manta Pacific:

```bash
curl -X POST https://graph.codex.io/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_API_KEY" \
  -d '{"query": "{ filterTokens(filters: { network: [169] }) { results { token { name symbol address } } } }"}'
```

Explore the API interactively with the [GraphQL Explorer](https://docs.codex.io/explore).

### Resources

- [Codex Documentation](https://docs.codex.io/)
- [Supported Networks](https://docs.codex.io/chains)
- [GraphQL API Reference](https://docs.codex.io/api-reference)
- [SDK](https://github.com/Codex-Data/sdk)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

