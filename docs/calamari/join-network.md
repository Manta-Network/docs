---
sidebar_position: 3
---

# Join the network

Specifically, the Calamari [testnet](https://telemetry.manta.systems/#list/Calamari%20Parachain%20Testnet) is running on the Westend relay chain.

## As a full node

#### specific to this node
  - ``my_node_name=my-awesome-manta-node``
  - ``my_node_port=30333``
  - ``my_node_ws_port=9944``
  - ``my_db_path=/path/to/my/db``

#### common for all nodes, you should have those files from the previous section
  - ``relay_chain_spec_file=/full/path/to/westend.json``
  - ``para_chain_binary=/full/path/to/calamari-pc``

```bash

${para_chain_binary} \
  --name ${my_node_name} \
  --base-path ${my_db_path} \
  --chain calamari-dev \
  --parachain-id 2093 \
  --port ${my_node_port} \
  --ws-port ${my_node_ws_port} \
  --rpc-cors all \
  --telemetry-url 'wss://api.telemetry.manta.systems/submit/ 0' \
  --bootnodes /ip4/127.0.0.1/tcp/31201/p2p/12D3KooWRa2oYs5uFiD43VZiq4618d4VJivRdJCS7h5W6TQHgLpx \
  -- \
  --bootnodes /dns/1.westend.paritytech.net/tcp/30333/p2p/12D3KooWPVPzs42GvRBShdUMtFsk4SvnByrSdWqb6aeAAHvLMSLS \
  --chain ${relay_chain_spec_file}
```
  If it does not launch, give it extra permissions with:
  
  ``sudo chmod +x ${para_chain_binary}``
            # TODO: is this the correct URL
Check [here](https://telemetry.manta.systems/#list/Calamari%20Parachain%20Testnet) to see if your node is in the list.
If you want to explore with the Polkadot.js front-end, replace this string ``wss://${node_name}`` with one of the node names in the network.
With that you can connect to it and try to communicate with the block chain with extrinsics, or explore it with the block explorer.

Take note of the following:
- The ``--chain`` argument is constant ``calamari-testnet``, it must match the one we used to launch the network in the first place.
- The ``--parachain-id`` argument is a constant ``2093``, which is the id we used when we registered it on the relay chain.
- There are two ``--bootnodes`` constant arguments, one for the parachain node and one for the relay chain node.

#### Stay tuned for updates about joining the network as a Collator, as well as the incentives associated with that.