---
sidebar_position: 5
sidebar_label: 🔑 Session keys
title: 🚄 Setup and run a Collator
hide_title: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Installation](installation) > [Configuration](configuration) > [Running](running) > [Sync](sync) > Session keys > [Wait](wait)

## 🔑 Collator session keys

To collate on the Calamari chain, two accounts/keys are required at any given time:
- **Collator Account**: This is the account that holds the collator bond of 400,000 KMA. it is also the account that the collator's share of transaction fees will be deposited into. the bond cannot be spent while the account is collating. the keys for this account should be protected carefully and should never exist on the filesystem of the collator node.
- **Nimbus Session Key**: This is a disposable account used to identify your individual node and blocks it has produced with other nodes on the network.  Substrate stores this key in the parachain keystore on the filesystem of the collator node (`/var/lib/substrate/chains/calamari/keystore`) when either of the author_insertKey or author_rotateKeys RPC methods are called. As this is a hot-wallet key that can be abused to impersonate your node if leaked (potentially leading to slashing of deposited funds in the future) it is good practice to infrequently rotate the session key - typically every half year, once per session at most.

Both keys are associated with one another to create a bond-node pair for transaction fee reward payouts and (in the future) slashing.

:::note
While the Nimbus session key is present in the node since v.3.2.1, it will only become active with v3.3.0. Before this upgrade, the Aura session key below is used.
:::

In addition, your node might have two additional keys in storage:
- **Aura Session Key**: Used in the node to decide on the authoring node *before* v3.3.0
- **VRF Session Key**: A placeholder key for a future switch to a verifiably-random block producer selection scheme

:::warning
Both of the following methods (insert, rotate) use an **unsafe** RPC call to set the node session key.
In order to use them, you must stop the node if running and start it with a `--rpc-methods=unsafe` CLI parameter.
This mode of operation is **unsafe** when exposed to the public internet, restart the node without the CLI parameter when done.
:::

<Tabs groupId="keys">
<TabItem value="insert" label="insertKey">

This command demonstrates a session key insertion using a key created with [subkey](https://docs.substrate.io/v3/tools/subkey).

:::note
Starting with v3.2.1 you must provide all 3 of the following keys, earlier revisions needed only the Aura key
:::

- Generate an Aura key with subkey
  ```bash
  #!/bin/bash
  subkey generate \
    --scheme sr25519 \
    --network calamari \
    --output-type json \
    --words 12 \
    > ./aura.json
  ```
- Generate a Nimbus key with subkey
  ```bash
  #!/bin/bash
  subkey generate \
    --scheme sr25519 \
    --network calamari \
    --output-type json \
    --words 12 \
    > ./nimbus.json
  ```
- Generate a VRF key with subkey
  ```bash
  #!/bin/bash
  subkey generate \
    --scheme sr25519 \
    --network calamari \
    --output-type json \
    --words 12 \
    > ./vrf.json
  ```
- Create an author_insertKey RPC payload
  ```bash
  #!/bin/bash
  echo '{
      "jsonrpc":"2.0",
      "id":1,
      "method":"author_insertKey",
      "params": [
        "aura",
        "<mnemonic phrase1>",
        "<public key1>",
        "nimb",
        "<mnemonic phrase2>",
        "<public key2>",
        "rand",
        "<mnemonic phrase3>",
        "<public key3>"
      ]
    }' | jq \
      --arg s_aura "$(jq -r .secretPhrase ./aura.json)" \
      --arg p_aura "$(jq -r .publicKey ./aura.json)" \
      --arg s_nimbus "$(jq -r .secretPhrase ./nimbus.json)" \
      --arg p_nimbus "$(jq -r .publicKey ./nimbus.json)" \
      --arg s_vrf "$(jq -r .secretPhrase ./vrf.json)" \
      --arg p_vrf "$(jq -r .publicKey ./vrf.json)" \
      '. | .params[1] = $s_aura | .params[2] = $p_aura' \
      '. | .params[3] = $s_nimbus | .params[4] = $p_nimbus' \
      '. | .params[5] = $s_vrf | .params[6] = $p_vrf' > ./payload.json
  ```
- Execute the author_insertKey RPC payload
  ```bash
  #!/bin/bash
  curl \
    --header 'Content-Type: application/json;charset=utf-8' \
    --data @./payload.json \
    http://localhost:9133
  ```
- **Validation**: Check that the mnemonics stored in the node matches the generated one
  ```bash
  #!/bin/bash
  sudo -H -u manta cat /var/lib/substrate/chains/calamari/keystore/$(sudo -H -u manta ls /var/lib/substrate/chains/calamari/keystore/)
  ```
- **Validation**: Check that node logs show your node is running with role: `AUTHORITY` (check the timestamps)
  ```bash
  #!/bin/bash
  journalctl -u calamari.service -g AUTHORITY
  ```
- **Cleanup**: Remove secrets from the filesystem that were created in earlier steps
  ```bash
  #!/bin/bash
  rm ./aura.json ./nimbus.json ./vrf.json ./payload.json
  ```

</TabItem>
<TabItem value="rotate" label="rotateKeys">

This command rotates session keys, i.e. creates a new private key in its keystore and outputs the corresponding public keys.
Old keys are discarded if they exist. 

:::note
The private keys are not displayed by the node, if you wish to back them up in order to restore your node credentials in case of loss of the node, follow the instructions in insertKey. If your session keys get lost without backup, you will have to go through the collator program ondboarding process again with your new node
:::
Run
```bash
#!/bin/bash
curl -H 'Content-Type: application/json' --data '{ "jsonrpc":"2.0", "method":"author_rotateKeys", "id":1 }' http://localhost:9933
```
Output from this RPC call should look like the following and is a concatenation of three 32-byte *public* keys in one long hex number.
```json
{"jsonrpc":"2.0","result":"0x06736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb50e6aeb15951288c562f6906736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb50e6aeb15951288c562f6106736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb40e6aeb15911288c562f63","id":1}
```
Strip the leading `0x` and then split this number after every 64 characters to recover the three constituent public keys.
Prepend each of them individually with a `0x` and note them for further use. It should look like
```
aura => 0x06736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb50e6aeb15951288c562f69
nimbus => 0x06736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb50e6aeb15951288c562f61
VRF => 0x06736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb40e6aeb15911288c562f63
```
</TabItem>
</Tabs>

### Bind collator account to the Session Keys

:::note
If your collator node logs do not contain both `[Relaychain] 💤 Idle` and `[Parachain] 💤 Idle` messages, your node is still syncing. **DO NOT BIND** a collator account to session key if sync is incomplete. Doing so may result in ejection of your collator.
:::

Account binding is done on-chain. The simplest way to do this is using polkadot.js.
- Load [calamari/developer/extrinsics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/extrinsics) in a browser:
  ![session.setkeys()](/img/collator-program/session.setkeys.png)
:::note
Although the screenshot shows a connected dolphin node, the procedure is identical when connected to the Calamari Network
:::
   - In the first box, labelled "using the selected account", select the collator account holding the 400,000 KMA collator bond.
   - In the second (dropdown) box labelled "submit the following extrinsic", select `session`.
   - In the third (dropdown) box, select `setKeys(keys, proof)`
   - In both the fourth box labelled `aura: SpConsensusAuraSr25519AppSr25519Public`, enter the hex public key of the Aura session key you generated earlier.
   - In both the fifth box, labelled `nimbus: SpConsensusAuraSr25519AppSr25519Public`, enter the hex public key of the Nimbus session key you generated earlier.
   - In both the sixth boxes, labelled `vrf: SpConsensusAuraSr25519AppSr25519Public`, enter the hex public key of the VRF session key you generated earlier.
   - In both the seventh box labelled `proof: Bytes`, enter the hex public key of the Nimbus session key *again*.
   - Click on the `Submit Transaction` button and wait for confirmation (a green tick), to appear in the upper right corner of the browser window.
- Verfy that the collator account and the Session keys are *bound* by loading [calamari/developer/chain state](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/chainstate) in a browser:
  ![session.nextkeys()](/img/collator-program/session.nextkeys.png)
:::note
Although the screenshot shows a connected dolphin node, the procedure is identical when connected to the Calamari Network
:::
   - In the first (dropdown) box, labelled "selected state query", select `session`.
   - In the second (dropdown) box, select `nextKeys(AccountId32): Option<CalamariRuntimeOpaqueSessionKeys>`.
   - In the third (dropdown) box, select the collator account holding the 400,000 KMA collator bond.
   - Leave the `include option` checkbox selected.
   - Leave the `blockhash to query at` box set to the default `0x` value.
   - Click on the small plus (`+`) icon to the right of the second dropdown box.
   - Verify that a new box labelled `session.nextKeys(AccountId32): Option<CalamariRuntimeOpaqueSessionKeys>` appears and contains a json object whose `aura`,`nimbus` and `vrf` values are set to the hex public keys generated earlier.
