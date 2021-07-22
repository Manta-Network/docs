---
sidebar_position: 3
---

# Join the network

Specifically our test-net ----> https://telemetry.manta.systems/#/Calamari-Parachain%20Development

## As a collator

#### specific to this node
  - ``my_node_name=my-awesome-manta-node``
  - ``my_node_port=30333``
  - ``my_node_ws_port=9944``
  - ``my_db_path=/path/to/my/db``

#### common for all nodes, you should have those files from the previous section
  - ``relay_chain_spec_file=/full/path/to/rococo.json``
  - ``para_chain_binary=/full/path/to/calamari-pc``

```bash

${para_chain_binary} \
  --collator \
  --name ${my_node_name} \
  --base-path ${my_db_path} \
  --chain calamari-dev \
  --parachain-id 7777 \
  --port ${my_node_port} \
  --ws-port ${my_node_ws_port} \
  --rpc-cors all \
  --telemetry-url 'wss://api.telemetry.manta.systems/submit/ 0' \
  --bootnodes /dns/alice.calamari.dev.manta.systems/tcp/30333/p2p/12D3KooWHPLqWuSDzVgMLor9DVcwoSxV27pKVqzuFcEH2ogyLNBu \
  -- \
  --bootnodes /dns/alice.rococo.mock.manta.systems/tcp/30333/p2p/12D3KooWJMcEQUbxq2CE1qoCqHCWxqjBfnpfeBCyqqrHBABJKbVr \
  --chain ${relay_chain_spec_file}
```
  If it does not launch, give it extra permissions with:
  
  ``sudo chmod 777 ${para_chain_binary}``

Check https://telemetry.manta.systems/#list/Calamari-Parachain%20Development to see if your node is in the list.
If you want to explore with the Polkadot.js front-end, replace this string ``wss://${node_name}`` with one of the node names in the network.
With that you can connect to it and try to communicate with the block chain with extrinsics, or explore it with the block explorer.

Take note of the following:
- The ``--chain`` argument is constant ``calamari-dev``, it must match the one we used to launch the network in the first place.
- The ``--parachain-id`` argument is a constant ``7777``, which is the id we used when we registered it on the relay chain.
- There are two ``--bootnodes`` constant arguments, one for the parachain node and one for the relay chain node.
- The ``--collator`` argument. It can be changed to ``--validator`` to become a validator or removed in order to become a full node.