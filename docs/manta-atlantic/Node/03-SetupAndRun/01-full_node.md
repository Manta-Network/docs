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

### Configuration

- --base-path <PATH\> (e.g `/opt/manta/lib`)
- --chain manta

### Example Command

```bash
./manta --base-path /opt/manta/lib --chain manta
```

### Check Full Node

check for `👤 Role: FULL` line in logs

```bash
Jan 10 00:06:40 f1.manta.systems manta[2795938]: 2024-01-10 00:06:40 ❤️  by Manta Network, 2020-2024
Jan 10 00:06:40 f1.manta.systems manta[2795938]: 2024-01-10 00:06:40 📋 Chain specification: Manta Parachain
Jan 10 00:06:40 f1.manta.systems manta[2795938]: 2024-01-10 00:06:40 🏷  Node name: 🦾 f1 🦾
Jan 10 00:06:40 f1.manta.systems manta[2795938]: 2024-01-10 00:06:40 👤 Role: FULL
Jan 10 00:06:40 f1.manta.systems manta[2795938]: 2024-01-10 00:06:40 💾 Database: RocksDb at /var/lib/substrate/chains/manta/db/full
Jan 10 00:06:40 f1.manta.systems manta[2795938]: 2024-01-10 00:06:40 ⛓  Native runtime: manta-4600 (manta-1.tx7.au1)
```
