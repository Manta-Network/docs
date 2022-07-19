# ⛓ XCM 集成

## 流程介绍:

* 在 Calamari 和本地 polkadot-launch 两个环境测试 XCM。

* 成为 Rococo 上的一个 parachain。

*  在Rococo上计算和资助你的parachain的主账户。

* 在 Calamari 上打开 HRMP 通道。

* 注册资产。

* 完成 parachain 之间的 XCM 测试。

* 进一步讨论。

* 与 Manta 团队联系:
    - Georgi (XCM 工程师): @Ghz (Telegram)
    - Shumo (联合创始人): @xstec (Telegram)

## 本地 XCM 集成

- 作为第一步，我们坚持要求两个团队首先在本地网络上运行所有测试。
- 为此，你可以从发布页面下载最新的manta文件。
- 然后使用polkadot-launch来启动一个 `calamari-local` 或`calamari-dev`网络进行测试。
- 你还需要使用最新版本的Polkadot启动一个`rococo-local` 中继链。
- 这里有一个[calamari-dev](XcmOnboarding#example-polkadot-launch-config)的 Polkadot-launch 参考配置。
- 如果你的代码库有一个特定的分支，请让我们知道，我们应该对它进行测试。

## 在 Rococo 上进行 XCM 集成

- Calamari 整合的下一步是与我们的 parachain（Dolphin）在官方 Rococo 中继链上的集成。作为集成整合的一部分，你需要在 Dolphin 上注册一个 HRMP 通道。在 Rococo 生态系统上我们也可以测试与其它一些 parachain 的整合，因为大多数 Kusama 链也已经部署在 Rococo 上。

### Rococo 生态数据

- [Rococo endpoint](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/explorer)
- [Dolphin endpoint](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Feddie.rococo.dolphin.engineering#/explorer)
- [Rococo 水龙头指南](https://wiki.polkadot.network/docs/build-pdk#obtaining-roc)
- [Dolphin 水龙头](https://discord.gg/UvXpxuyg)

### 节点同步和开放 Rococo 插槽申请

- 为了同步节点，你可以使用以下 [中继链](https://raw.githubusercontent.com/paritytech/polkadot/master/node/service/res/rococo.json) （注意：中继链是基于Rococo的，可能需要几个小时来同步）
- 在Rococo上注册你的 parachain。为此，你需要打开一个 [Rococo 插槽申请](https://github.com/paritytech/subport/issues)，并按照说明进行操作。

## 计算和充值你的平行链 Parachain 主账户

- 要计算出你的Parachain的主账户，你可以使用以下工具: [https://github.com/Manta-Network/Dev-Tools/tree/main/caclulate-sovereign-account](https://github.com/Manta-Network/Dev-Tools/tree/main/caclulate-sovereign-account)
   
- 确保你在运行该命令时提供你在Rococo上选择的parachain ID（标志-paraid NUMBER）。例如，Dolphin的中继链和其他parachain的Sovereign账户可以通过以下方式获得:
    

```
ts-node calculateSovereignAddress.ts --paraid 2084
```
- 结果如下格式:
```
Sovereign Account Address on Relay: 0x7061726124080000000000000000000000000000000000000000000000000000
Sovereign Account Address on other Parachains (Generic): 0x7369626c24080000000000000000000000000000000000000000000000000000
Sovereign Account Address on Dolphin: 0x7369626c24080000000000000000000000000000
```

- 一旦你得到了你的 `Sovereign账户`的地址，请使用 [Rococo 水龙头](https://wiki.polkadot.network/docs/build-pdk#obtaining-roc)为其充值。否则，你将无法创建HRMP通道，因为交易将因费用不足而失败。如果你需要额外的资金，请告诉我们。

## 用 Dolphin 创建 HRMP 通道
### 获取中继编码的请求数据以打开 HRMP 通道。

- 一旦你的 Parachain 上线，你需要在 Parachain 和 Dolphin 之间建立 HRMP 通道。
- 第一步，从中继链中获得一个请求数据。外在因素包含的目标 parachain ID、最大消息数和最大消息大小，并在下一请求中描述。
- 在 PolkadotJS 应用程序中，切换到 Rococo 网络。 转到 Developer -> [Javascript section](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/js)部分。运行以下代码，注意用你自己的 ID 替换 demo 中的 para ID：

```
const tx = api.tx.hrmp.hrmpInitOpenChannel(2084, 8, 1024);
console.log(tx.toHex());
```

- 结果如下:

`0x3c040x1700240800000800000000040000`, remove the leading hex `3c04`, and so the encoded result is `0x1700240800000800000000040000`.

### 发送 XCM 到中继链

- 下一步是建立并向中继链发送一个XCM消息，该消息将请求通过中继链打开一个通道。这个 XCM消息需要从 root 账户（通过 SUDO 或 governance）发送，该消息可以分解为以下内容：
    1. 提取资产：将资金从原 parachain 的主权账户中取出（在中继链中）到一个 holding 状态账户
    2. 购买：从中继链中购买执行时间，以执行 XCM 信息
    3. 交易：提供要执行的调用数据
    4. 存款资产（可选）：执行后退还剩余的资金。如果不提供，将不进行退款
- 因此，要建立/发送XCM，你需要：
    1. 在 Polkadot.js 应用程序中你需要选择 parachain -> extrinsics
    2. 设置以下参数：PolkadotXcm -> send
    3. 对于 dest（V1）设置，目的地必须是中继链
    `{ parents:1, interior: Here }`
    4. 对于信息（V2），你需要添加4个标签（之前描述过）:
        1. WithdrawAsset { id: Concrete { parents: 0, interior: Here}, Fungible: 1000000000000 }
        2. BuyExecution { id: Concrete: {parents: 0, interior: Here}, Fungible: 1000000000000, weightLimit: Unlimited }
        3. Transact { originType: Native, requireWeightAtMost: 1000000000, call: XcmDoubleEncoded: { encoded: RelayEncodedCallData } }
            注意：你需要提供之前获得的编码的 CallData
        4. RefundSurplus
        5. DepositAsset: { assets: Wild { Wild: All }, maxAssets: 1, beneficiary: { parents: 0, interior: X1 { X1: AccountId32 { network: Any, id: SovereignAccountonRelay } } } }
    
    **请注意:** 上面使用的值是在这个测试环境中使用的参考值，不要在生产中使用这些值！
    
- 一旦这个消息被发送，中继链应该执行内容并请求 Dolphin 打开通道
- ****一旦你请求打开通道，请告知我们，因为请求需要被** Dolphin **接受****

下面是一个完整的演示案例：

![https://i.imgur.com/GUN8qJd.png](https://i.imgur.com/GUN8qJd.png)

![https://i.imgur.com/3ONY21d.png](https://i.imgur.com/3ONY21d.png)

## 接收与 Calamari 的 HRMP 频道

- 通道是单向的。这意味着如果你在 Dolphin 开了一个通道，它将只允许你从你的 parachain 向Dolphin 发送代币。所以需要有一个通道，Dolphin 会请求发回代币，而你需要接受。
- 接受通道的过程与打开通道的过程类似，也就是说，你必须在中继链中构建一个调用数据，然后通过你的parachain的XCM得到执行。

### 获取中继的请求数据以接受 HRMP 通道

- 为了从中继链中获得编码过的请求数据，接受一个带有目标parachain的信道请求，请采取以下步骤:
- 在 PolkadotJS 应用程序中，切换到实时 Polkadot/Kusama 网络。 进入 Developer -> [Javascript section](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/js)，运行以下代码，注意用你自己的 id 替换 demo 中的 para ID:
```
const tx = api.tx.hrmp.hrmpAcceptOpenChannel(2084);
console.log(tx.toHex());
```

- 结果如下:

`0x1c04170124080000`, remove the leading hex `1c04`, and the encoded result is `0x170124080000`.

### 发送 XCM 到中继链

- 步骤和之前一样（当提出打开一个通道的请求时）。主要的区别是在`转账`项中，你需要提供上面计算的编码呼叫数据。这个XCM消息需要从根账户发送（无论是通过SUDO 或governance）：
```
Transact { originType: Native, requireWeightAtMost: 1000000000, call: XcmDoubleEncoded: { encoded: RelayEncodedCallData } }
```
    
**请注意**: 上面使用的值是在这个测试环境中使用的参考值，不要在生产中使用这些值!
    
## 资产注册

### 在 Dolphin 上注册资产

- 一旦通道被打开，我们需要注册将被转移到 Dolphin 的资产。为此，我们需要以下信息：
    1. 你资产的 `MultiLocation` 。请注明 parachain ID和 interior（如任何pallet index，general index等）。
    2. `Asset Name`
    3. `Asset symbol`
    4. `Number of decimals`
- 请将此信息作为评论写在 issue 上。
- 一旦资产被注册，我们将确认。我们还将设置一个任意的 UnitsPerSecond，这是每秒钟执行 XCM消息所收取的代币数量。
- 在资产成功注册后，你可以尝试将代币从你的 parachain 转移到 Dolphin。
- 为了测试，也请提供您的 Parachain WS 终端，以便我们能够连接到它。最后，我们需要你将一些资金充值到以下账户:
    
    `5CacAW3K4gq3Ufv2dAqUFYWKoqJcQaFu346ahesmt4sua7Xx`
    
- 如果你需要 DOL 代币（Dolphin 的原生代币）来使用你的 parachain 资产，你可以从我们的Discord Bot 获取--或者你也可以发给我们你的地址，我们会提供一些 DOL 代币

### 在你的 Parachain 上注册 Calamari 的代币

- 你可以使用以下的MultiLocation来在你的 parachain 上注册我们的 DOL 代币：

`{ "parents": 1, "interior": {"X1": { "Parachain": 2084 }}`

- 以及以下元数据:

```
Name: Dolphin
Symbol: DOL
Decimals: 18
```

- 注意：这与 Calamari MultiLocation 是不同的!

### Polkadot 启动配置实例

```
{
	"relaychain": {
		"bin": "./polkadot",
		"chain": "rococo-local",
		"nodes": [
			{
				"name": "alice",
				"wsPort": 9944,
				"port": 30444,
				"flags": [
					"--rpc-cors=all",
					"--execution=wasm",
					"--wasm-execution=compiled",
				]
			},
			{
				"name": "bob",
				"wsPort": 9955,
				"port": 30555,
				"flags": [
					"--rpc-cors=all",
					"--execution=wasm",
					"--wasm-execution=compiled",
				]
			},
			{
				"name": "charlie",
				"wsPort": 9966,
				"port": 30666,
				"flags": [
					"--rpc-cors=all",
					"--execution=wasm",
					"--wasm-execution=compiled",
				]
			}
		],
		"genesis": {
			"runtime": {
				"runtime_genesis_config": {
					"configuration": {
						"config": {
							"validation_upgrade_frequency": 10,
							"validation_upgrade_delay": 10
						}
					}
				}
			}
		}
	},
	"parachains": [
		{
			"bin": "./manta",
			"chain": "calamari-dev",
			"nodes": [
				{
					"wsPort": 9801,
					"port": 31201,
					"name": "alice",
					"flags": [
						"--rpc-cors=all",
						"--rpc-port=9971",
						"--execution=wasm",
						"--wasm-execution=compiled"
					]
				}
			]
		}
	],
	"hrmpChannels": [
	],
	"types": {},
	"finalization": false
}
```

## Calamari 和 Manta 的下一步

* 在Calamari（和未来的 Manta）上进行 XCM 整合之前，以下功能必须在 Rococo 生态系统中与Dolphin 完成并充分测试:

    1. Dolphin 和你的 parachain 之间的双向 HRMP 通道
    2. 双向的资产注册（DOL 代币和你的 parachain 的代币）
    3. 双方团队都必须通过 Polkadot.js 应用程序成功测试资产转移
* 一切就绪后，我们就可以发起治理提案，在 Kusama parachains 开放 HRMP 渠道和资产登记，以及准备相关的市场活动。
