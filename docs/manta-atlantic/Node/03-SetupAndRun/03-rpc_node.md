---
sidebar_position: 3
sidebar_label: 🗃️ Rpc Node
title: 🚄 Setup and run a Rpc Node
hide_title: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 🥡 Rpc Node

The RPC node can be accessed over the WebSocket protocol, which can be used to access the underlying network and/or validator node. By default, you can access your node's RPC server from localhost (for example, to rotate keys or do other maintenance).

### Configuration

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

### Test RPC Node

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "rpc_methods"}' http://127.0.0.1:9944/
```
