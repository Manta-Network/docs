---
sidebar_position: 1
---

# Run Manta

## As a validator

```bash

# specific to this node
my_node_name=my-awesome-manta-node
my_node_port=30333
my_node_ws_port=9944
my_node_blockchain_path=/path/to/my/node/blockchain

# useful to any manta node
manta_chain_spec_path=/path/to/manta-chain-spec.json

manta \
  --name=${my_node_name} \
  --port=${my_node_port} \
  --ws-port=${my_node_ws_port} \
  --chain=${manta_chain_spec_path} \
  --base-path=${my_node_blockchain_path} \
  --bootnodes=/dns/${manta_peer_fqdn}/tcp/${manta_peer_port}/p2p/${manta_peer_pub_key} \
  --rpc-cors=all \
  --validator
```