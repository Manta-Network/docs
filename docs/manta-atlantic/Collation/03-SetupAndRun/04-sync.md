---
sidebar_position: 4
sidebar_label: 🤝 Sync
title: 🚄 Setup and run a Collator
hide_title: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Installation](installation) > [Configuration](configuration) > [Running](running) > Sync > [Session keys](keys) > [Bond](bond)

## 🤝 Sync the relay and para chains

if you have no peers on the relaychain or your node is failing to verify new blocks, ensure your node’s clock is accurate, ie. by syncing with an ntp timeserver.

you must sync both the manta parachain and polkadot relay-chain before the motion to include your collator is passed. completely synced substrate blockchain nodes will show an idle state in their logs for both `[Relaychain]` and `[Parachain]` and looks like so:

```shell=
2022-03-01 17:18:58 [Parachain] 💤 Idle (49 peers), best: #1037783 (0xa0c5…04a8), finalized #1037781 (0xabd5…1c05), ⬇ 16.7kiB/s ⬆ 14.5kiB/s
2022-03-01 17:18:55 [Relaychain] 💤 Idle (49 peers), best: #11619808 (0x24a5…ad58), finalized #11619804 (0xa362…2df4), ⬇ 478.0kiB/s ⬆ 520.5kiB/s
```

if your collator node logs do not contain both `[Relaychain] 💤 Idle` and `[Parachain] 💤 Idle` messages, your node is still syncing. do not bind a collator account to an aura session key for a node whose sync is incomplete. doing so will result in ejection of your collator.

the best way to sync is to just run your node until the idle messages show up in your logs. doing so may take up to 2 weeks, however it will also give you a perfect, cryptographically validated and complete history of the blockchains you are syncing.

if you cannot wait for the recommended sync mechanism to complete, you may obtain a fast-sync copy of the manta and polkadot blockchains taken from manta's backup nodes. to do so:
- stop your manta service
- delete your manta and polkadot databases from the basepath (taking care not to delete your keystores which are also under the basepath)
- fetch a copy of the blockchains, extracting if required
- ensure that the entire basepath and all of its contents are owned by the user your node runs under (change ownership recursively if required)
- start your manta service
- verify that the node is syncing correctly
- wait for both parachain and relay-chain idle messages to appear in the logs

list available snapshot date are
* `2024-06-28UTC` (latest)
* `2024-05-07UTC`
* `2024-03-07UTC`
* `2024-02-12UTC`
* `2024-01-29UTC`
* `2024-01-28UTC`
* `2023-12-05UTC`

fast-sync commands (requires [zstd](https://github.com/facebook/zstd)):
```bash
#!/bin/bash

# install zstd
sudo apt install zstd # this command might be different accordingly to your distro

# stop manta service
sudo systemctl stop manta.service

# sync manta blockchain database
lib_path="/var/lib/substrate" # change this accordingly
snapshot_date="2024-06-28UTC" # change this accordingly
identity="$(sudo -H -u manta cat "${lib_path}"/chains/manta/db/full/IDENTITY)"
echo "identity: ${identity}"
sudo -H -u manta rm -r "${lib_path}"/chains/manta/db/full
curl -L https://manta-polkadot.s3.amazonaws.com/backup/"${snapshot_date}"/manta.tar.zst | sudo -H -u manta tar --zstd -C "${lib_path}"/chains/manta -xv
echo "${identity}" | sudo -H -u manta tee "${lib_path}"/chains/manta/db/full/IDENTITY

# sync polkadot blockchain database
identity_relay="$(sudo -H -u manta cat "${lib_path}"/polkadot/chains/polkadot/db/full/IDENTITY)"
identity_para="$(sudo -H -u manta cat "${lib_path}"/polkadot/chains/polkadot/db/full/parachains/db/IDENTITY)"
echo "identity_relay: ${identity_relay}"
echo "identity_para: ${identity_para}"
sudo -H -u manta rm -r "${lib_path}"/polkadot/chains/polkadot/db/full
curl -L https://manta-polkadot.s3.amazonaws.com/backup/"${snapshot_date}"/manta-polkadot.tar.zst | sudo -H -u manta tar --zstd -C "${lib_path}"/polkadot/chains/polkadot -xv
echo "${identity_relay}" | sudo -H -u manta tee "${lib_path}"/polkadot/chains/polkadot/db/full/IDENTITY
echo "${identity_para}" | sudo -H -u manta tee "${lib_path}"/polkadot/chains/polkadot/db/full/parachains/db/IDENTITY

# update database `current` manifests
sudo -H -u manta bash -c "basename $(ls "${lib_path}"/chains/manta/db/full/MANIFEST-*) > \"${lib_path}\"/chains/manta/db/full/CURRENT"
sudo -H -u manta bash -c "basename $(ls "${lib_path}"/polkadot/chains/polkadot/db/full/MANIFEST-*) > \"${lib_path}\"/polkadot/chains/polkadot/db/full/CURRENT"
sudo -H -u manta bash -c "basename $(ls "${lib_path}"/polkadot/chains/polkadot/db/full/parachains/db/MANIFEST-*) > \"${lib_path}\"/polkadot/chains/polkadot/db/full/parachains/db/CURRENT"
```
