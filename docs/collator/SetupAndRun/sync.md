---
sidebar_position: 4
sidebar_label: 🤝 Sync
title: 🚄 Setup and run a Collator
hide_title: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Installation](installation) > [Configuration](configuration) > [Running](running) > [Session keys](keys) > Sync > [Wait](wait)

## 🤝 Sync the relay and para chains

if you have no peers on the relaychain or your node is failing to verify new blocks, ensure your node’s clock is accurate, ie. by syncing with an ntp timeserver.

you must sync both the calamari parachain and kusama relay-chain before the motion to include your collator is passed. completely synced substrate blockchain nodes will show an idle state in their logs for both `[Relaychain]` and `[Parachain]` and looks like so:

```shell=
2022-03-01 17:18:58 [Parachain] 💤 Idle (49 peers), best: #1037783 (0xa0c5…04a8), finalized #1037781 (0xabd5…1c05), ⬇ 16.7kiB/s ⬆ 14.5kiB/s
2022-03-01 17:18:55 [Relaychain] 💤 Idle (49 peers), best: #11619808 (0x24a5…ad58), finalized #11619804 (0xa362…2df4), ⬇ 478.0kiB/s ⬆ 520.5kiB/s
```

if your collator node logs do not contain both `[Relaychain] 💤 Idle` and `[Parachain] 💤 Idle` messages, your node is still syncing. do not bind a collator account to an aura session key for a node whose sync is incomplete. doing so will result in ejection of your collator.

the best way to sync is to just run your node until the idle messages show up in your logs. doing so may take up to 2 weeks, however it will also give you a perfect, cryptographically validated and complete history of the blockchains you are syncing.

if you cannot wait for the recommended sync mechanism to complete, you may obtain a fast-sync copy of the calamari and kusama blockchains taken from manta's backup nodes. to do so:
- stop your calamari service
- delete your calamari and kusama databases from the basepath (taking care not to delete your keystores which are also under the basepath)
- fetch a copy of the blockchains, extracting if required
- ensure that the entire basepath and all of its contents are owned by the user your node runs under (change ownership recursively if required)
- start your calamari service
- verify that the node is syncing correctly
- wait for both parachain and relay-chain idle messages to appear in the logs

fast-sync commands (requires [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)):
```bash
#!/bin/bash

# stop calamari service
sudo systemctl stop calamari.service

# sync calamari blockchain database
sudo -H -u manta aws s3 sync --region eu-central-1 --no-sign-request --delete s3://calamari-kusama/var/lib/substrate/chains/calamari/db/full /var/lib/substrate/chains/calamari/db/full

# sync kusama blockchain database
sudo -H -u manta aws s3 sync --region eu-central-1 --no-sign-request --delete s3://calamari-kusama/var/lib/substrate/polkadot/chains/ksmcc3/db/full /var/lib/substrate/polkadot/chains/ksmcc3/db/full

# update database `current` manifests
sudo -H -u manta bash -c 'basename $(ls /var/lib/substrate/chains/calamari/db/full/MANIFEST-*) > /var/lib/substrate/chains/calamari/db/full/CURRENT'
sudo -H -u manta bash -c 'basename $(ls /var/lib/substrate/polkadot/chains/ksmcc3/db/full/MANIFEST-*) > /var/lib/substrate/polkadot/chains/ksmcc3/db/full/CURRENT'
sudo -H -u manta bash -c 'basename $(ls /var/lib/substrate/polkadot/chains/ksmcc3/db/full/parachains/db/MANIFEST-*) > /var/lib/substrate/polkadot/chains/ksmcc3/db/full/parachains/db/CURRENT'
```
