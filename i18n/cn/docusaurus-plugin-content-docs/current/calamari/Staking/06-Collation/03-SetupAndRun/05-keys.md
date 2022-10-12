---
title: 🔑 Collator节点session 密钥
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[安装](installation) > [配置](configuration) > [运行](running) > [同步](sync) > Collator节点session 密钥 > [绑定](bond)


要在 Calamari 链上进行收集整理工作，任何时间都需要两个帐户/密钥对：

- **Collator 账户**: 这是持有Collator节点保证金的账户。 同时也是整理者的交易费用份额将被存入的账户。 当账户在整理时，保证金不能被花费。值得注意的是，这个账户的密钥应该被仔细保护，并且不应该存在于整理者节点的文件系统中。
- **Nimbus会话密钥**: 这是一次性账户，用于识别你的单个节点和它与网络上其他节点产生的块。当调用`author_insertKey`或`author_rotateKeys`的RPC方法时，Substrate将此密钥存储在整理器节点的文件系统（`/var/lib/substrate/chains/calamari/keystore`）上的parachain keystore中。由于这是一个热钱包密钥，如果被泄露，可能会被滥用来冒充你的节点（可能会导致未来的存款被削减），所以不经常更新会话密钥是一个很好的做法 - 通常每半年一次，最多每个会话一次。

两个密钥相互关联，以创建用于交易费用奖励支付和（在未来）削减的债券节点对。

:::note
虽然Nimbus会话密钥从`v.3.2.1`开始就存在于节点中，但它只有在`v3.3.0`时被激活。在这次升级之前，使用的是下面的Aura会话密钥。
:::

此外，您的节点可能在存储中有两个额外的密钥：
- **Aura会话密钥**: 在**v3.3.0**之前，用于决定创作节点的节点。
- **VRF会话密钥**: 未来切换到可验证的随机区块生产者选择方案的占位钥匙。

:::warning
以下两种方法（插入、更新）都使用 unsafe RPC 调用来设置节点会话密钥。
为使用它们，你必须停止运行中的节点，然后用`-rpc-methods=unsafe` CLI参数启动它。
当暴露在公共互联网上时，这种操作模式是**不安全的** ，完成后重新启动节点就不需要再使用这个CLI参数。
:::

<Tabs groupId="keys">
<TabItem value="insert" label="insert">

这条命令演示了一个会话密钥的插入，该密钥是用

:::note
从v3.2.1开始，你必须提供以下所有3个密钥，早期版本只需要Aura密钥
:::

- 为您的平台构建/安装 [subkey](https://docs.substrate.io/reference/command-line-tools/subkey/)
- 为您的平台安装 [jq utility](https://stedolan.github.io/jq/download/)
- 生成一个Aura密钥，用subkey/jq插入私钥/检查私钥的有效性
    ```bash
    #!/bin/bash
    subkey generate \
        --scheme sr25519 \
        --network calamari \
        --output-type json \
        --words 12 \
        > ./aura.json
    echo '{
        "jsonrpc":"2.0",
        "id":1,
        "method":"author_insertKey",
        "params": [
            "aura",
            "aura mnemonic phrase",
            "aura hex public key"
        ]
    }' | jq \
        --arg mnemonic "$(jq -r .secretPhrase ./aura.json)" \
        --arg hex "$(jq -r .publicKey ./aura.json)" \
        '. | .params[1] = $mnemonic | .params[2] = $hex' > ./insert-aura.json
    echo '{
        "jsonrpc":"2.0",
        "id":1,
        "method":"author_hasKey",
        "params": [
            "aura hex public key",
            "aura"
        ]
    }' | jq \
        --arg hex "$(jq -r .publicKey ./aura.json)" \
        '. | .params[0] = $hex' > ./check-aura.json
    ```

- 生成一个Nimbus（nmbs）密钥，用subkey/jq插入私钥/检查私钥的有效性
    ```bash
    #!/bin/bash
    subkey generate \
        --scheme sr25519 \
        --network calamari \
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

- 生成 VRF (rand) 密钥并用subkey/jq插入私钥/检查私钥的有效性
    ```bash
    #!/bin/bash
    subkey generate \
        --scheme sr25519 \
        --network calamari \
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

- 使用 RPC `author_insertKey` 来插入刚刚生成的`session keys`
    ```bash
    #!/bin/bash
    for key in aura nmbs rand; do
        curl \
            --header 'Content-Type: application/json;charset=utf-8' \
            --data @./insert-${key}.json \
            http://localhost:9133
    done
    ```

- **验证**：检查存储在节点中的会话密钥是否与生成的密钥匹配
    ```bash
    #!/bin/bash
    for key in aura nmbs rand; do
        has_key=$(curl \
            -s \
            --header 'Content-Type: application/json;charset=utf-8' \
            --data @./check-${key}.json \
            http://localhost:9133 | jq -r '.result == "true"')
        echo "${key}: ${has_key}"
    done
    ```

- **验证**：检查日志是否显示节点正在使用认证的角色运行：（`AUTHORITY`检查时间戳）
    ```bash
    #!/bin/bash
    journalctl -u calamari.service -g AUTHORITY
    ```

- 从这三个文件 `aura.json/nmbs.json/rand.json` 保存分别三个公钥，并且安全地备份这三个私钥文件到安全且离线的地方
- 清除: 从文件系统中删除之前步骤中创建的私钥
    ```bash
    #!/bin/bash
    rm ./aura.json ./nmbs.json ./rand.json ./insert-aura.json ./insert-nmbs.json ./insert-rand.json
    ```

</TabItem>
<TabItem value="rotate" label="rotateKeys">
此命令轮换会话密钥，即在其密钥库中创建一个新的私钥并输出相应的公钥。
如果旧密钥存在，它们仍然存在于节点的密钥库中并且不被删除。

:::note
节点不显示私钥，如果你想备份它们，以便在节点丢失时恢复你的节点凭证，请按照`insertKey`中的说明进行。如果你的会话密钥在没有备份的情况下丢失，你的节点将不得不再次走一遍`collator program`才能成为collator。
:::
更新session keys
```bash
#!/bin/bash
curl -H 'Content-Type: application/json' --data '{ "jsonrpc":"2.0", "method":"author_rotateKeys", "id":1 }' http://localhost:9933
```

这个RPC调用的输出应该如下，是三个32字节的**公共**密钥在一个长的十六进制数字中的串联。
```json
{"jsonrpc":"2.0","result":"0x06736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb50e6aeb15951288c562f6906736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb50e6aeb15951288c562f6106736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb40e6aeb15911288c562f63","id":1}
```

去掉前面的 `0x`，然后在每64个字符后分割这个数字，以恢复三个组成的公钥。
```
aura => 0x06736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb50e6aeb15951288c562f69
nimbus => 0x06736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb50e6aeb15951288c562f61
VRF => 0x06736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb40e6aeb15911288c562f63
```

</TabItem>
</Tabs>

### 将节点帐户绑定到 aura session 密钥

:::note
如果节点日志不包含`[Relaychain] 💤 Idle`和`[Parachain] 💤 Idle`消息，意味着您的节点需要继续同步。当节点未同步完成，**不要绑定** 一个未完全同步的节点帐户到 session 密钥。这样做会导致节点被系统拒绝接入。
:::

账户和session key的绑定是在链上完成的，使用 polkadot.js进行账户绑定。

- 在浏览器中 打开[calamari/developer/extrinsics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/extrinsics)
    ![session.setkeys()](/img/collator-program/session.setkeys.png)
:::note
现在展示的图片都是从dolphin测试网上截去的，但是在calamari主网上操作都是一样的。
:::

   - 在标有`using the selected account`的第一个框中，选择持有 `400,000` KMA collator绑定帐户。
   - 在标有`submit the following extrinsic`的第二个（下拉）框中，选择`session`.
   - 在第三个（下拉）框中，选择`setKeys(keys, proof)`
   - 在标有`aura: SpConsensusAuraSr25519AppSr25519Public` and `proof: Bytes`第四个对话框中输入 `aura` 会话密钥的十六进制公钥。
   - 在标有`nimbus: NimbusPrimitivesNimbusCryptoPublic` and `proof: Bytes`第五对话框中输入 `nimbus` 会话密钥的十六进制公钥。
   - 在标有`vrf: SessionKeyPrimitivesVrfVrfCryptoPublic` and `proof: Bytes`第六对话框中输入 `vrf` 会话密钥的十六进制公钥。
   - 在标有 `proof: Bytes`对话框, 再次输入十六进制的nimbus session公钥。
   - 单击`Submit Transaction`按钮，交易确认并成功的弹框将会在浏览器的右上角出现。

- 通过在浏览器中加载 [calamari/developer/chainstate](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/chainstate) 来验证整理者帐户和 session密钥是否已**绑定**：
    ![session.nextkeys()](/img/collator-program/session.nextkeys.png)
:::note
再次说明一次，现在展示的图片都是从dolphin测试网上截去的，但是在calamari主网上操作都是一样的。
:::
:::note
在提交交易`set_keys`并且生效之前，
你的节点可能会出现下面这样的一条log:<br/>`2022-07-19 17:24:18 [Parachain] 🔏 No Nimbus keys available. We will not be able to author.`<br/>
生效需要等待`6`个小时。
:::

   - 在第一个（下拉）框中，标记为`selected state query`，选择`session`.
   - 在第二个（下拉）框中，选择`nextKeys(AccountId32): Option<CalamariRuntimeOpaqueSessionKeys>`。
   - 在第三个（下拉）框中，选择持有 KMA Collator绑定帐户。
   - 保持`include option`选中复选框选中。
   - `blockhash to query at`框设置为默认`0x`值
   - 单击第二个下拉框右侧的(+) 图标.
   - 验证是否出现了一个标记为`session.nextKeys(AccountId32): Option<CalamariRuntimeOpaqueSessionKeys>` 的json 对象，该对象的`aura`, `nimbus`和`vrf`值为之前设置的 session keys 的十六进制公钥。
