---
sidebar_position: 5
sidebar_label: 🔑 Session keys
title: 🚄 Setup and run a Collator
hide_title: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Installation](installation) > [Configuration](configuration) > [Running](running) > [Sync](sync) > Session keys > [Bond](bond)

## 🔑 Collator session keys

To collate on the Manta chain, two accounts/keys are required at any given time:
- **Collator Account**: This is the account that holds the collator bond. it is also the account that the collator's share of transaction fees will be deposited into. the bond cannot be spent while the account is collating. the keys for this account should be protected carefully and should never exist on the filesystem of the collator node.
- **Nimbus Session Key**: This is a disposable account used to identify your individual node and blocks it has produced with other nodes on the network.  Substrate stores this key in the parachain keystore on the filesystem of the collator node (`/var/lib/substrate/chains/manta/keystore`) when either of the author_insertKey or author_rotateKeys RPC methods are called. As this is a hot-wallet key that can be abused to impersonate your node if leaked (potentially leading to slashing of deposited funds in the future) it is good practice to infrequently rotate the session key - typically every half year, once per session at most.

Both keys are associated with one another to create a bond-node pair for transaction fee reward payouts and (in the future) slashing.

In addition, your node might have two additional keys in storage:
- **Aura Session Key**: Now-unused key to decide eligibility to author blocks *before* v3.3.0
- **VRF Session Key**: Placeholder for a future [VRF](https://en.wikipedia.org/wiki/Verifiable_random_function)-based block proposer assignment mechanism that is inactive as of v3.2.1. The future mechanism will use the key you set here, so if you set it now, you won't have to touch the node later when it is enabled.

:::warning
Both of the following methods (insert, rotate) use an **unsafe** RPC call to set the node session key.
In order to use them, you must stop the node if running and start it with a `--rpc-methods=unsafe` CLI parameter.
This mode of operation is **unsafe** when exposed to the public internet, restart the node without this CLI parameter when done.
:::

<Tabs groupId="keys">
<TabItem value="insert" label="insertKey">

This command demonstrates a session key insertion using a key created with

- Build/Install [subkey](https://docs.substrate.io/reference/command-line-tools/subkey/) for your platform
- Install the [jq utility](https://stedolan.github.io/jq/download/) for your platform
- Generate a Nimbus (nmbs) key and insert/check payloads with subkey/jq
  ```bash
  #!/bin/bash
  subkey generate \
    --scheme sr25519 \
    --network manta \
    --output-type json \
    --words 12 \
    > ./nmbs.json
  echo '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"author_insertKey",
    "params": [
      "nmbs",
      "nmbs mnemonic phrase",
      "nmbs hex public key"
    ]
  }' | jq \
    --arg mnemonic "$(jq -r .secretPhrase ./nmbs.json)" \
    --arg hex "$(jq -r .publicKey ./nmbs.json)" \
    '. | .params[1] = $mnemonic | .params[2] = $hex' > ./insert-nmbs.json
  echo '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"author_hasKey",
    "params": [
      "nmbs hex public key",
      "nmbs"
    ]
  }' | jq \
    --arg hex "$(jq -r .publicKey ./nmbs.json)" \
    '. | .params[0] = $hex' > ./check-nmbs.json
  ```
- Generate a VRF (rand) key and insert/check payloads with subkey/jq
  ```bash
  #!/bin/bash
  subkey generate \
    --scheme sr25519 \
    --network manta \
    --output-type json \
    --words 12 \
    > ./rand.json
  echo '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"author_insertKey",
    "params": [
      "rand",
      "rand mnemonic phrase",
      "rand hex public key"
    ]
  }' | jq \
    --arg mnemonic "$(jq -r .secretPhrase ./rand.json)" \
    --arg hex "$(jq -r .publicKey ./rand.json)" \
    '. | .params[1] = $mnemonic | .params[2] = $hex' > ./insert-rand.json
  echo '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"author_hasKey",
    "params": [
      "rand hex public key",
      "rand"
    ]
  }' | jq \
    --arg hex "$(jq -r .publicKey ./rand.json)" \
    '. | .params[0] = $hex' > ./check-rand.json
  ```
- Execute the `author_insertKey` RPC payloads
  ```bash
  #!/bin/bash
  for key in nmbs rand; do
    curl \
      --header 'Content-Type: application/json;charset=utf-8' \
      --data @./insert-${key}.json \
      http://localhost:9133
  done
  ```
- **Validation**: Check that the session keys stored in the node match the generated ones (below command returns a `"result":true` field)
  ```bash
  #!/bin/bash
  for key in nmbs rand; do
    has_key=$(curl \
      -s \
      --header 'Content-Type: application/json;charset=utf-8' \
      --data @./check-${key}.json \
      http://localhost:9133 )
    echo "${key}: ${has_key}"
  done
  ```
- **Validation**: Check that node logs show your node is running with role: `AUTHORITY` (check the timestamps)
  ```bash
  #!/bin/bash
  journalctl -u manta.service -g AUTHORITY
  ```
- Note down the `publicKey` fields from `nmbs.json` and `rand.json` and/or back-up these key files to a **secure**, offline location
- **Cleanup**: Remove secrets from the filesystem that were created in earlier steps
  ```bash
  #!/bin/bash
  rm ./nmbs.json ./rand.json ./insert-nmbs.json ./insert-rand.json
  ```

</TabItem>
<TabItem value="rotate" label="rotateKeys">

:::warning
Ensure your node is [fully synced](sync) before attempting this method
:::

This command rotates session keys, i.e. creates a new private key in its keystore and outputs the corresponding public keys.
If old keys exist, they remain present in the node's keystore and are *not* deleted.

:::note
The private keys are not displayed by the node, if you wish to back them up in order to restore your node credentials in case of loss of the node, follow the instructions in insertKey. If your session keys get lost without backup, you will have to go through the collator program ondboarding process again with your new node
:::
Run
```bash
#!/bin/bash
curl -H 'Content-Type: application/json' --data '{ "jsonrpc":"2.0", "method":"author_rotateKeys", "id":1 }' http://localhost:9133
```
**note** the `9133` port is the value passed to `--rpc-port` change this accordingly

Output from this RPC call should look like the following and is a concatenation of three 32-byte *public* keys in one long hex number.
```json
{"jsonrpc":"2.0","result":"0x06736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb50e6aeb15951288c562f6906736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb50e6aeb15951288c562f6106736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb40e6aeb15911288c562f63","id":1}
```
Strip the leading `0x` and then split this number after every 64 characters to recover the three constituent public keys.
Prepend each of them individually with a `0x` and note them for further use. It should look like
```
nimbus => 0x8a8af929d1219802dc8155d0b5381c41d49a185aae2c8bf3537d5c124a63a63e
VRF => 0x48c832d59679790f579d6009f5bb56ef0b52da49d7e4c504fe50847d04b12474
```
</TabItem>
</Tabs>

:::note
Verify that your node does *NOT* show log lines like `2022-07-19 17:24:18 [Parachain] 🔏 No Nimbus keys available. We will not be able to author.`<br/>
If it does even after restarting the node the procedure above failed, redo the above steps following the instructions closely.
:::

### Bind collator account to the Session Keys

:::note
If your collator node logs do not contain both `[Relaychain] 💤 Idle` and `[Parachain] 💤 Idle` messages, your node is still syncing. **DO NOT BIND** a collator account to session key if sync is incomplete. Doing so may result in ejection of your collator.
:::

Account binding is done on-chain. The simplest way to do this is using polkadot.js.
- Load [manta/developer/extrinsics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.manta.systems%2F#/extrinsics) in a browser:
  ![session.setkeys()](/img/collator-program/session.setkeys-manta.png)
:::
   - In the first box, labelled "using the selected account", select the collator account holding the [collator MANTA bond](../Requirements#manta-bond).
   - In the second (dropdown) box labelled "submit the following extrinsic", select `session`.
   - In the third (dropdown) box, select `setKeys(keys, proof)`
:::
   - In the fifth box, labelled `nimbus: NimbusPrimitivesNimbusCryptoPublic`, enter the hex public key of the Nimbus session key you generated earlier.
   - In the sixth box, labelled `vrf: SessionKeyPrimitivesVrfVrfCryptoPublic`, enter the hex public key of the VRF session key you generated earlier.
   - In the seventh box labelled `proof: Bytes`, enter the hex public key of the Nimbus session key *again*.
   - Click on the `Submit Transaction` button and wait for confirmation (a green tick), to appear in the upper right corner of the browser window.
- Verfy that the collator account and the Session keys are *bound* by loading [manta/developer/chain state](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.manta.systems%2F#/chainstate) in a browser:
  ![session.nextkeys()](/img/collator-program/session.nextkeys-manta.png)
:::
   - In the first (dropdown) box, labelled "selected state query", select `session`.
   - In the second (dropdown) box, select `nextKeys(AccountId32): Option<MantaRuntimeOpaqueSessionKeys>`.
   - In the third (dropdown) box, select the collator account holding the MANTA collator bond.
   - Leave the `include option` checkbox selected.
   - Leave the `blockhash to query at` box set to the default `0x` value.
   - Click on the small plus (`+`) icon to the right of the second dropdown box.
   - Verify that a new box labelled `session.nextKeys(AccountId32): Option<MantaRuntimeOpaqueSessionKeys>` appears and contains a json object whose,`nimbus` and `vrf` values are set to the hex public keys generated earlier.
