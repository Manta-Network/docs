---
sidebar_position: 1
sidebar_label: 🗃️ Archive Node
title: 🚄 Setup and run a Archive Node
hide_title: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 🥡 Archive Node
An archive node keeps all the past blocks and their states. An archive node makes it convenient to query the past state of the chain at any point in time. Finding out what an account's balance at a particular block was or which extrinsics resulted in a specific state change are fast operations when using an archive node. However, an archive node takes up a lot of disk space - around Kusama's 12 millionth block, this was around 660 GB.

Similar to full node rpc parameters can also be specified serve the archive node as rpc node

### Configuration

- --pruning archive

### Example Command

```bash
./manta --base-path /opt/manta/lib --chain manta --pruning archive
```

### Check Archive Node Logs

check for `👤 Role: FULL` line in logs

```bash
Jan 10 00:06:40 a7.manta.systems manta[2795938]: 2024-01-10 00:06:40 ❤️  by Manta Network, 2020-2024
Jan 10 00:06:40 a7.manta.systems manta[2795938]: 2024-01-10 00:06:40 📋 Chain specification: Manta Parachain
Jan 10 00:06:40 a7.manta.systems manta[2795938]: 2024-01-10 00:06:40 🏷  Node name: 🗃️ a7 🗃️
Jan 10 00:06:40 a7.manta.systems manta[2795938]: 2024-01-10 00:06:40 👤 Role: FULL
Jan 10 00:06:40 a7.manta.systems manta[2795938]: 2024-01-10 00:06:40 💾 Database: RocksDb at /var/lib/substrate/chains/manta/db/full
Jan 10 00:06:40 a7.manta.systems manta[2795938]: 2024-01-10 00:06:40 ⛓  Native runtime: manta-4600 (manta-1.tx7.au1)
```
