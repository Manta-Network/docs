## 节点 session 密钥

节点需要两个帐户/密钥。

- ***节点账户***: 持有 400,000 KMA 的节点绑定账户。节点所收取的交易费将被存入该账户。 节点运行时绑定的KMA将被锁定。 此帐户密钥要仔细保管，不要存放在于节点服务器中。
- ***aura session 密钥***: 这是Collator节点用于创建区块的一次性帐户。 它绑定到节点帐户。 最好的做法是定期更换会话密钥，每个密钥最多使用一次。 当调用 author_insertKey 或 author_rotateKeys rpc 方法时，substrate 将此帐户的密钥存储在节点的文件系统（`/var/lib/substrate/chains/calamari/keystore`）上的平行链密钥库中。

:::note
插入和替换方法均使用不安全的 RPC调用来设置节点会话密钥。如果服务正在运行，则必须停止服务，然后使用`--rpc-methods=unsafe`参数设置。调用成功后，不要忘记将设置更改回`safe`，因为允许不安全的 rpc 调用会导致暴露的 rpc 端口的节点很容易地让任何人更改其会话密钥，从而导致交易费用被支付到预期之外的地方。
:::
<Tabs groupId="keys">

<TabItem value="insert" label="insert">

此命令演示使用子密钥插入会话密钥 [subkey](https://docs.substrate.io/v3/tools/subkey)。

- 使用 subkey 生成 aura 密钥

    ```bash
    #!/bin/bash

    subkey generate \
        --scheme sr25519 \
        --network calamari \
        --output-type json \
        --words 12 \
        > ./aura.json
    ```

- 创建 author_insertKey rpc payload

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

- 执行 author_insertKey rpc payload

    ```bash
    #!/bin/bash
    curl \
        --header 'Content-Type: application/json;charset=utf-8' \
        --data @./payload.json \
        http://localhost:9133

    ```

- *验证* (可选)：检查节点使用的aura 助记符是否与生成的匹配

    ```bash
    #!/bin/bash

    sudo -H -u manta cat /var/lib/substrate/chains/calamari/keystore/$(sudo -H -u manta ls /var/lib/substrate/chains/calamari/keystore/)
    ```

- *验证* (可选)：检查日志是否显示节点正在使用认证的角色运行：（`AUTHORITY`检查时间戳）

    ```bash
    #!/bin/bash

    journalctl -u calamari.service -g AUTHORITY
    ```

- 清除: 从系统中aura.json和payload.json文件

    ```bash
    #!/bin/bash

    rm ./aura.json ./payload.json
    ```

</TabItem>
<TabItem value="rotate" label="rotate">

此命令演示会话密钥更换。如果不存在则新建一个。

    ```bash
    #!/bin/bash

    curl -H 'Content-Type: application/json' --data '{ "jsonrpc":"2.0", "method":"author_rotateKeys", "id":1 }' http://localhost:9933
    ```

rpc 调用的输出应如下所示（`result`属性包含 aura 会话帐户公钥的十六进制表示*）*：

    ```json

    {"jsonrpc":"2.0","result":"0x06736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb50e6aeb15951288c562f61","id":1}

    ```

</TabItem>
</Tabs>

### 将节点帐户绑定到 aura session 密钥

:::note
如果节点日志不包含`[Relaychain] 💤 Idle`和`[Parachain] 💤 Idle`消息，您的节点需要继续同步。不要绑定一个未完全同步的节点帐户到 aura 会话密钥。这样做会导致节点被系统拒绝接入。
:::

使用 polkadot.js进行账户绑定。

- 在浏览器中 打开[calamari/developer/extrinsics ：](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/extrinsics)
    ![session.setkeys()](/img/collator-program/session.setkeys.png)
    -  在标有“using the selected account”的第一个框中，选择持有 400,000 KMA collator绑定帐户。
    - 在标有“submit the following extrinsic”的第二个（下拉）框中，选择`session`.
    - 在第三个（下拉）框中，选择`setKeys(keys, proof)`
    - 在标有`aura: SpConsensusAuraSr25519AppSr25519Public` and `proof: Bytes`第四和第五框中输入 aura 会话密钥的十六进制公钥。
    - 单击`Submit Transaction`按钮并等待确认（绿色勾号）
- 通过在浏览器中加载 [calamari/developer/chainstate](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/chainstate) 来验证整理者帐户和 aura 会话密钥是否已*绑定*：
    ![session.nextkeys()](/img/collator-program/session.nextkeys.png)
    - 在第一个（下拉）框中，标记为“selected state query”，选择`session`.
    - 在第二个（下拉）框中，选择`nextKeys(AccountId32): Option<CalamariRuntimeOpaqueSessionKeys>`。
    - 在第三个（下拉）框中，选择持有 400,000 KMA Collator绑定帐户。
    - 保持`include option`选中复选框选中。
    - `blockhash to query at`框设置为默认`0x`值
    - 单击第二个下拉框右侧的(+) 图标.
    - 验证是否出现了一个标记为`session.nextKeys(AccountId32): Option<CalamariRuntimeOpaqueSessionKeys>` 的json 对象，该对象的`aura`值为之前设置的 aura 会话十六进制公钥。

## 同步

如果中继链上没发现peers，或者您的节点无法验证新块，请确保您节点的时钟准确与 ntp 时间服务器同步。

提交申请前，您必须同步 calamari 平行链和 kusama 中继链。完全同步的底层区块链节点将在其日志中显示空闲状态，`[Relaychain]`并且`[Parachain]`看起来像这样：

```shell=
2022-03-01 17:18:58 [Parachain] 💤 Idle (49 peers), best: #1037783 (0xa0c5…04a8), finalized #1037781 (0xabd5…1c05), ⬇ 16.7kiB/s ⬆ 14.5kiB/s
2022-03-01 17:18:55 [Relaychain] 💤 Idle (49 peers), best: #11619808 (0x24a5…ad58), finalized #11619804 (0xa362…2df4), ⬇ 478.0kiB/s ⬆ 520.5kiB/s
```

如果节点日志不包含`[Relaychain] 💤 Idle`和`[Parachain] 💤 Idle`消息，您的节点需要继续同步。不要绑定一个未完全同步的Collator帐户到 aura 会话密钥。这样做会导致节点被系统拒绝接入。

最佳的同步方式是持续运行您的节点，直到空闲消息出现在您的日志中。这样做可能需要长达 2 周的时间，但它也会为您提供您正在同步的区块链的完美、经过加密验证和完整的历史记录。

如果您不想等待漫长的同步完成，可以从 manta 的备份节点获取 calamari 和 kusama 区块链的快速同步副本：

- 停止 Calamari 服务
- 从 basepath 中删除 calamari 和 kusama 数据库（注意不要删除在basepath下的keystores ）
- 获取区块链的副本
- 确保整个basepath 及其所有权限都归运行您的节点的用户所有（如需则更改权限）
- 启动 Calamari 服务
- 验证节点是否正确同步
- 等待平行链和中继链空闲消息出现在日志中

快速同步命令(requires [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)):
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
