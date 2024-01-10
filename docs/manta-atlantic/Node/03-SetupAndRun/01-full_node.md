---
sidebar_position: 2
sidebar_label: 🦾 Full Node
title: 🚄 Setup and run a Full Node
hide_title: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 🥡 Full Node
A full node prunes historical states: all finalized blocks' states older than a configurable number except the genesis block's state. This is 256 blocks from the last finalized one by default. A pruned node this way requires much less space than an archive node.

By specifying RPC endpoint parameters, node can be accessed over the WebSocket protocol, which can be used to access the underlying network and/or validator node. By default, you can access your node's RPC server from localhost (for example, to rotate keys or do other maintenance).

### Configuration

- --base-path <PATH\> (e.g `/opt/manta/lib`)
- --chain manta

for version `>= v4.6.0` (inclusive)

- --rpc-port <PORT\> (e.g `9944`)
- --rpc-cors <ORIGINS\> (e.g `all`)
- --rpc-max-connections <COUNT\> (default: `100`)
- --rpc-methods <METHOD\> (e.g `safe`)

for version `< v4.6.0` (exclusive)

- --ws-port <PORT\> (e.g `9944`)
- --ws-max-connections <COUNT\> (default: `100`)
- --rpc-port <PORT\> (e.g `9933`)
- --rpc-cors <ORIGINS\> (e.g. `all`)
- --rpc-methods <METHOD\> (e.g `safe`)


### Example Command

for version `>= v4.6.0` (inclusive)

```bash
./manta --base-path /opt/manta/lib --chain manta --rpc-port 9944 --rpc-cors all --rpc-max-connections 100 --rpc-methods safe
```

for version `< v4.6.0` (exclusive)

```bash
./manta --base-path /opt/manta/lib --chain manta --rpc-port 9933 --rpc-cors all --ws-max-connections 100 --ws-port 9944
```

### Check Full Node Logs

check for `👤 Role: FULL` line in logs

```bash
Jan 10 00:06:40 f1.manta.systems manta[2795938]: 2024-01-10 00:06:40 ❤️  by Manta Network, 2020-2024
Jan 10 00:06:40 f1.manta.systems manta[2795938]: 2024-01-10 00:06:40 📋 Chain specification: Manta Parachain
Jan 10 00:06:40 f1.manta.systems manta[2795938]: 2024-01-10 00:06:40 🏷  Node name: 🦾 f1 🦾
Jan 10 00:06:40 f1.manta.systems manta[2795938]: 2024-01-10 00:06:40 👤 Role: FULL
Jan 10 00:06:40 f1.manta.systems manta[2795938]: 2024-01-10 00:06:40 💾 Database: RocksDb at /var/lib/substrate/chains/manta/db/full
Jan 10 00:06:40 f1.manta.systems manta[2795938]: 2024-01-10 00:06:40 ⛓  Native runtime: manta-4600 (manta-1.tx7.au1)
```

### Test RPC Node

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "rpc_methods"}' http://127.0.0.1:9944/
```
