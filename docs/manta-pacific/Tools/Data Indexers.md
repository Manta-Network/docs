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
