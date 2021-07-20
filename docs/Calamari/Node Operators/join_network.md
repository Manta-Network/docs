---
sidebar_position: 3
---

# Join the network

Specifically our test-net ----> https://telemetry.manta.systems/#/Calamari-Parachain%20Development

## As a validator

```bash

# specific to this node
my_node_name=my-awesome-manta-node
my_node_port=30333
my_node_ws_port=9944
my_db_path=/path/to/my/db

# common for all nodes, you should have those files from the previous section
relay_chain_spec_file=/full/path/to/rococo.json
para_chain_binary=/full/path/to/calamari-pc

${para_chain_binary} \
  --validator \
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

  If it does not launch, give it extra permissions with:
  
  sudo chmod 777 ${para_chain_binary}
```

TODO: Explain all the arguments.

Check https://telemetry.manta.systems/#list/Calamari-Parachain%20Development to see if your node is in the list.
If you want to explore with the Polkadot.js front-end, replace this string ``wss://${node_name}`` with one of the node names in the network.
With that you can connect to it and try to communicate with the block chain with extrinsics, or explore it with the block explorer.