## Deploy Manta SFP operator (Manta Symbiotic Finality Provider)

Repo Link: [manta-fp](https://github.com/Manta-Network/manta-fp)


:::danger important
> The staking amount needs to be greater than 400,000 Manta to receive rewards.
> If the operator is deregistered, the operator name, address, and reward address can no longer be used.

:::

#### Steps to Deploy a SFP operator

1. install go via [go doc](https://go.dev/doc/install)

2. clone the `manta-fp` code, build, and generate the `sfpd.conf` config file under `/data/manta-fp-sfpd-1/home`

   ```sh
   git clone https://github.com/Manta-Network/manta-fp
   cd manta-fp
   make build
   mkdir -p /data/manta-fp-sfpd-1/home /data/manta-fp-sfpd-1/db
   ./build/sfpd init --home /data/manta-fp-sfpd-1/home
   ```

3. Adjust `sfpd.conf` for testnet:
   `OperatorName` should be unique
   `RewardAddress` is your address to receive fp rewards, it's recommended to set a different address with your operator address for security reasons
   `EnableKms` can be enabled to use kms to sign
   `ChainId = 11155111` is the eth testnet ChainId
   `StartHeight` The latest height from which we start polling the chain of eth testnet
   `EthRpc` The rpc url of eth testnet
   `L2OutputOracleAddr = 0x2dd44d1b04170C5623cCc55DD5ed43FAB08b0B46` The testnet L2OutputOracleAddr
   `MantaStakingMiddlewareAddress = 0x63e3e4542315512d717cc0997b518ab00aa496f0` The testnet MantaStakingMiddlewareAddress
   `SymbioticOperatorRegisterAddress = 0x6F75a4ffF97326A00e52662d82EA4FdE86a2C548` The testnet SymbioticOperatorRegisterAddress
   `DBPath` The db path, need to be persistent
   `Namespace = 00006d742d66702d746e` The celestia Mocha testnet namespace
   `DaRpc` The celestia testnet rpc url. You can deploy a [celestia light node](https://docs.celestia.org/how-to-guides/light-node) of Mocha testnet. It also has a [helm chart](https://github.com/celestiaorg/helm-charts).

   ```
      [Application Options]
      ; The interval between each attempt to submit finality signature or public randomness after a failure
      SubmissionRetryInterval = 1s
    
      ; The interval between each finality signature(s) submission
      SignatureSubmissionInterval = 1s
    
      ; The maximum number of retries to submit finality signature or public randomness
      MaxSubmissionRetries = 20
    
      ; The name of operator; The name needs to be registered in the contract
      OperatorName = 
    
      ; The manta address to receive fp rewards
      RewardAddress = 
    
      ; The custom commission, 10000 = 100%
      Commission = 1000
    
      ; Logging level for all subsystems
      LogLevel = info
    
      EnableKms = false
    
      [opeventconfig]
      ; The chain id of the chain
      ChainId = 
    
      ; The height from which we start polling the chain
      StartHeight = 
    
      ; The block step of chain blocks scan
      BlockStep = 500
    
      ; The maximum number of ethereum blocks that can be stored in the buffer
      BufferSize = 500
    
      ; The rpc uri of ethereum
      EthRpc = 
    
      ; Specifies how many blocks are need to consider a transaction confirmed.
      NumConfirmations = 10
    
      ; Specifies how many ErrNonceTooLow observations are required to give up on a tx at a particular nonce without receiving confirmation.
      SafeAbortNonceTooLowCount = 3
    
      ; The contract address of L2OutputOracle address
      L2OutputOracleAddr = 
    
      ; The interval between each polling of blocks; the value should be set depending on the block production time but could be set smaller for quick catching up
      PollInterval = 5s
    
      ; Whether to use cloud hsm
      EnableHsm = false
    
      ; The api name of hsm
      HsmApiName =
    
      ; The creden of hsm
      HsmCreden =
    
      ; The address of hsm
      HsmAddress =
    
      ; the contract address of the manta-staking-middleware
      MantaStakingMiddlewareAddress = 
    
      ; the contract address of the symbiotic_operator_register_address
      SymbioticOperatorRegisterAddress = 
    
      [dbconfig]
      ; The directory path in which the database file should be stored.
      DBPath = /data/manta-fp-sfpd-1/db
    
      ; The name of the database file.
      DBFileName = symbiotic-fp.db
    
      ; Prevents the database from syncing its freelist to disk, resulting in improved performance at the expense of increased startup time.
      NoFreelistSync = true
    
      ; Specifies if a Bolt based database backend should be automatically compacted on startup (if the minimum age of the database file is reached). This will require additional disk space for the compacted copy of the database but will result in an overall lower database size after the compaction.
      AutoCompact = false
    
      ; Specifies the minimum time that must have passed since a bolt database file was last compacted for the compaction to be considered again.
      AutoCompactMinAge = 168h0m0s
    
      ; Specifies the timeout value to use when opening the wallet database.
      DBTimeout = 1m0s
    
      [celestiaconfig]
      ; Namespace ID for DA node
      Namespace = 
    
      ; Dial address of data availability grpc client
      DaRpc = http://celstia-node:26658
    
      ; Timeout for celestia requests
      Timeout = 1m0s
    
      [metrics]
      ; IP of the Prometheus server
      Host = 0.0.0.0
    
      ; Port of the Prometheus server
      Port = 2113
    
      ; The interval of Prometheus metrics updated
      UpdateInterval = 100ms
    
      [api]
      ; IP of the http server
      Host = 0.0.0.0
    
      ; Port of the http server
      Port = 8080
   ```

4. Adjust `sfpd.conf` for mainnet: to be implemented

5. Start SFP operator

   If EnableKms is false
   ```sh
   ./build/sfpd start --home /data/manta-fp-sfpd-1/home --auth-token $(CELESTIA_AUTH_TOKEN) --private-key $(FP_EVM_PRIVATE_KEY)
   ```

   If EnableKms is true
   ```sh
   ./build/sfpd start --home /data/manta-fp-sfpd-1/home --auth-token $(CELESTIA_AUTH_TOKEN) --kms-region $(KMS_REGION) --kms-id $(KMS_ID)
   ```

6. Health check api: `http://localhost:8080/ping`

7. Metrics: `http://localhost:2113/metrics`

#### Rewards

There is no available UI (Coming soon!) for operators to check and claim their rewards. You can get the accumulated rewards operators through our API service:

Base URL: `https://main.reward-api.pacific-staking.manta.network`

- Check the **accumulated** claimable rewards amount:

Path: `/reward/all-amount`

Method: `POST`

Parameters:

| Parameter | Type | Example Value | Description |
|-----------|------|---------------|-------------|
| address | string | "0x9e22e7f3ad7a800c6a4cd42f9f3bc3b36fe11ec3" | The operator's address |
| protocolType | string | "symbiotic" | The protocol type, should be "symbiotic" for Manta FP |
| isOperator | boolean | true | `true` for operator |
| isPending | boolean | false | (Optional) `true`: pending rewards, `false`: claimable rewards |

Example response:
```
{
    "success": true,
    "data": [
        {
            "amount": "1677619047619047618631", // with 18 decimals
            "rewardAddress": "0x9e22e7f3ad7a800c6a4cd42f9f3bc3b36fe11ec3",
            "ownerAddress": "0x9e22e7f3ad7a800c6a4cd42f9f3bc3b36fe11ec3",
            "lastUpdated": 1753370401000
        }
    ]
}
```

- Claim rewards

In order to claim rewards operators must get the signature from our service and call the token distribution contract to perform the token claiming.

1. Get signature

Path: `/reward/claim-all-data`

Method: `POST`

Parameters:

| Parameter | Type | Example Value | Description |
|-----------|------|---------------|-------------|
| address | string | "0x9e22e7f3ad7a800c6a4cd42f9f3bc3b36fe11ec3" | The operator's address |
| protocolType | string | "symbiotic" | The protocol type, should be "symbiotic" for Manta FP |
| isOperator | boolean | true | `true` for operator |


Example response:
```
{
    "success": true,
    "data": [
        {
            "calldata": "0x514302ca0000000000000000000000009e22e7f3ad7a800c6a4cd42f9f3bc3b36fe11ec374be214f4c1988163ca53f8d0b53c59e4d74a4c549975d6887444fdb8b8837f6000000000000000000000000000000000000000000000000bed1d0263d9f0000000000000000000000000000000000000000000000000000000000000000001cd704ba26bc476806be3381c49887bd28f1f5360ac195887dc7c245319efa740369db40b4520070f76e6b7a47cf69b04a27aac6a5fb4e3c4039835e3b27c354a2"
        }
    ]
}
```

2. Call token distribution contract with signature

The following command use foundry [cast](https://foundry-book.zksync.io/cast/) tool to interact with our [token distribution contract](#).

```
cast send 0xtodo {CALLDATA_FROM_LAST_STEP}
```

After transaction is confirmed the rewards will be transferred to reward address set when registered.

