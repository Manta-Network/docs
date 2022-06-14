---
sidebar_position: 4
sidebar_label: 🔑 Session keys
title: 🚄 Setup and run a Collator
hide_title: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Installation](installation) > [Configuration](configuration) > [Running](running) > Session keys > [Sync](sync) > [Wait](wait)

## 🔑 Collator session (aura) keys

to collate, two accounts/keys are required at any given time.
- **collator account**: this is the account that holds the collator bond of 400,000 KMA. it is also the account that the collator's share of transaction fees will be deposited into. the bond cannot be spent while the account is collating. the keys for this account should be protected carefully and should never exist on the filesystem of the collator node.
- **aura session key**: this is a disposable account used by the collator node to author blocks. it is bound to the collator account. it is good practice to rotate the session key on a regular basis and up to once per session. substrate stores the keys for this account in the parachain keystore on the filesystem of the collator node (`/var/lib/substrate/chains/calamari/keystore`) when either of the author_insertKey or author_rotateKeys rpc methods are called.

:::note
both of the following methods (insert, rotate) use an unsafe rpc call to set the node session key. you must stop the service if it is running, then run the node with the `--rpc-methods=unsafe` parameter setting in order for the calls to succeed. don't forget to change the setting back to `safe` afterwards as a node that allows unsafe rpc calls and has an exposed rpc port can easily have its session keys changed by anyone, reulting in transaction fees being paid out somewhere other than where they are intended.
:::

<Tabs groupId="keys">
<TabItem value="insert" label="insert">

this command demonstrates a session key insertion using a key created with [subkey](https://docs.substrate.io/v3/tools/subkey).

- generate an aura key with subkey

  ```bash
  #!/bin/bash

  subkey generate \
    --scheme sr25519 \
    --network calamari \
    --output-type json \
    --words 12 \
    > ./aura.json
  ```

- create an author_insertKey rpc payload

  ```bash
  #!/bin/bash

  echo '{
      "jsonrpc":"2.0",
      "id":1,
      "method":"author_insertKey",
      "params": [
        "aura",
        "<mnemonic phrase>",
        "<public key>"
      ]
    }' | jq \
      --arg mnemonic "$(jq -r .secretPhrase ./aura.json)" \
      --arg public "$(jq -r .publicKey ./aura.json)" \
      '. | .params[1] = $mnemonic | .params[2] = $public' > ./payload.json
  ```

- execute the author_insertKey rpc payload

  ```bash
  #!/bin/bash

  curl \
    --header 'Content-Type: application/json;charset=utf-8' \
    --data @./payload.json \
    http://localhost:9133
  ```

- *validation assertion*: optionally, check that the aura mnemonic in use by the node, matches the one generated

  ```bash
  #!/bin/bash

  sudo -H -u manta cat /var/lib/substrate/chains/calamari/keystore/$(sudo -H -u manta ls /var/lib/substrate/chains/calamari/keystore/)
  ```

- *validation assertion*: optionally, check that the service logs show that the node is running with role: `AUTHORITY` (check the timestamps)

  ```bash
  #!/bin/bash

  journalctl -u calamari.service -g AUTHORITY
  ```

- *clean up*: remove secrets from the filesystem that were created when generated and for the payload

  ```bash
  #!/bin/bash

  rm ./aura.json ./payload.json
  ```

</TabItem>
<TabItem value="rotate" label="rotate">

this command demonstrates a session key rotation. if no session key exists, one is created.

```bash
#!/bin/bash

curl -H 'Content-Type: application/json' --data '{ "jsonrpc":"2.0", "method":"author_rotateKeys", "id":1 }' http://localhost:9933
```

the output from the rpc call should look like this (the `result` property contains the hex representation of the aura session account's *public* key):
```json
{"jsonrpc":"2.0","result":"0x06736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb50e6aeb15951288c562f61","id":1}
```

</TabItem>
</Tabs>

### bind the collator account to the aura session key

:::note
if your collator node logs do not contain both `[Relaychain] 💤 Idle` and `[Parachain] 💤 Idle` messages, your node is still syncing. **do not bind** a collator account to an aura session key for a node whose sync is incomplete. doing so will result in ejection of your collator.
:::

account binding is accomplished on-chain. the simplest way to do this, is with polkadot.js.

- load [calamari/developer/extrinsics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/extrinsics) in a browser:
  ![session.setkeys()](/img/collator-program/session.setkeys.png)
   - in the first box, labelled "using the selected account", select the collator account holding the 400,000 KMA collator bond.
   - in the second (dropdown) box labelled "submit the following extrinsic", select `session`.
   - in the third (dropdown) box, select `setKeys(keys, proof)`
   - in both the fourth box and fifth boxes, labelled `aura: SpConsensusAuraSr25519AppSr25519Public` and `proof: Bytes`, enter the hex public key of the aura session key.
   - click on the `Submit Transaction` button and wait for confirmation (a green tick), to appear in the upper right corner of the browser window.
- verify that the collator account and the aura session key are *bound* by loading [calamari/developer/chain state](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/chainstate) in a browser:
  ![session.nextkeys()](/img/collator-program/session.nextkeys.png)
   - in the first (dropdown) box, labelled "selected state query", select `session`.
   - in the second (dropdown) box, select `nextKeys(AccountId32): Option<CalamariRuntimeOpaqueSessionKeys>`.
   - in the third (dropdown) box, select the collator account holding the 400,000 KMA collator bond.
   - leave the `include option` checkbox selected.
   - leave the `blockhash to query at` box set to the default `0x` value.
   - click on the small plus (`+`) icon to the right of the second dropdown box.
   - verify that a new box labelled `session.nextKeys(AccountId32): Option<CalamariRuntimeOpaqueSessionKeys>` appears and contains a json object whose `aura` value is set to the aura session hex public key generated earlier.
