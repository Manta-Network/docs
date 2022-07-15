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
