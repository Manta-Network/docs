# Deploy a Manta Symbiotic Finality Provider (SFP) Operator

**GitHub repo**: [manta-fp](https://github.com/Manta-Network/manta-fp)

:::info Important Note
- **Minimum Stake**: 100,000 MANTA tokens required to receive rewards
- **Operator Registration**: Once deregistered, the operator name, address, and reward address cannot be reused
:::

## Installation Steps

### 1. Install Go

Follow the official [Go installation guide](https://go.dev/doc/install) for your system.

Verify installation:
```bash
go version
```

### 2. Clone and Build SFP

```bash
# Clone repository
git clone https://github.com/Manta-Network/manta-fp
cd manta-fp

# Build the binary
make build

# Create required directories
mkdir -p /data/manta-fp-sfpd-1/home /data/manta-fp-sfpd-1/db

# Initialize configuration
./build/sfpd init --home /data/manta-fp-sfpd-1/home
```

### 3. Configure SFP

Edit the generated `sfpd.conf` file in `/data/manta-fp-sfpd-1/home/`:

#### Testnet Configuration

   `OperatorName` should be unique
   `RewardAddress` is your address to receive fp rewards, it's recommended to set a different address with your operator address for security reasons
   `EnableKms` can be enabled to use kms to sign
   `ChainId = 11155111` is the ETH Testnet ChainId
   `StartHeight` The latest block height from which we start polling the chain of ETH Testnet
   `EthRpc` The rpc url of ETH Testnet
   `L2OutputOracleAddr = 0x2dd44d1b04170C5623cCc55DD5ed43FAB08b0B46` The Testnet L2OutputOracleAddr
   `MantaStakingMiddlewareAddress = 0x63e3e4542315512d717cc0997b518ab00aa496f0` The Testnet MantaStakingMiddlewareAddress
   `SymbioticOperatorRegisterAddress = 0x6F75a4ffF97326A00e52662d82EA4FdE86a2C548` The Testnet SymbioticOperatorRegisterAddress
   `DBPath` The db path, need to be persistent
   `Namespace = 00006d742d66702d746e` The Celestia Mocha Testnet namespace
   `DaRpc` The Celestia Mocha Testnet rpc url. You can deploy a [celestia light node](https://docs.celestia.org/how-to-guides/light-node) of Mocha Testnet. It also has a [helm chart](https://github.com/celestiaorg/helm-charts).

```toml
[Application Options]
# Operator identification (must be unique across the network). Needs to be registered in the contract
OperatorName = 

# Address to receive operator rewards. Recommended: use a different address from your operator address for better security
RewardAddress = 

# Commission rate (10000 = 100%, 1000 = 10%)
Commission = 1000

# Logging level for subsystems
LogLevel = info

# Enable AWS KMS for key management and signing (optional)
EnableKms = false

# Interval between each attempt to submit finality signature or public randomness after a failure
SubmissionRetryInterval = 1s

# Interval between each finality signature(s)
SignatureSubmissionInterval = 1s

# Maximum no. of retries to submit finality signature or public randomness
MaxSubmissionRetries = 20

[opeventconfig]
# Chain ID - Ethereum Sepolia testnet
ChainId = 11155111

# Starting block height from where chain polling begins
StartHeight = 

# Block step for chain scanning
BlockStep = 500

# Maximum no. of Ethereum blocks that can be stored in the buffer
BufferSize = 500

# Number of blocks needed to consider a transaction confirmed
NumConfirmations = 10

#ErrNonceTooLow threshold to drop a transaction at a particular nonce without receiving confirmation
SafeAbortNonceTooLowCount = 3

# Ethereum RPC endpoint
EthRpc = 

# Contract addresses (Testnet)
L2OutputOracleAddr = "0x2dd44d1b04170C5623cCc55DD5ed43FAB08b0B46"
MantaStakingMiddlewareAddress = "0x63e3e4542315512d717cc0997b518ab00aa496f0"
SymbioticOperatorRegisterAddress = "0x6F75a4ffF97326A00e52662d82EA4FdE86a2C548"

# Polling interval
PollInterval = 5s

[cloudhsm]
EnableHSM = false
HsmApiName = 
HsmCreden = 
HsmAddress = 

[dbconfig]
# Database configuration; path needs to be persistent
DBPath = /data/manta-fp-sfpd-1/db
DBFileName = symbiotic-fp.db

# Prevents database from syncing its freelist to disk for better performance, but with increased startup time
NoFreelistSync = true

# Compacts the Bolt DB on startup if file is older than minimum age; uses extra space temporarily but reduces final DB size.
AutoCompact = false
AutoCompactMinAge = 168h0m0s

# Timeout value to use when opening wallet DB
DBTimeout = 1m0s

[celestiaconfig]
# Celestia namespace ID for DA node
Namespace = 00006d742d66702d746e

# Dial address of data availability grpc client
DaRpc =

# Timeout for Celestia requests
Timeout = 1m0s

[metrics]
# Prometheus metrics endpoint
Host = 0.0.0.0
Port = 2113
UpdateInterval = 100ms

[api]
# HTTP API endpoint
Host = 0.0.0.0
Port = 8080
```

#### Mainnet Configuration

   `OperatorName` should be unique
   `RewardAddress` is your address to receive fp rewards, it's recommended to set a different address with your operator address for security reasons
   `EnableKms` can be enabled to use kms to sign
   `ChainId = 1` is the ETH Mainnet ChainId
   `StartHeight` The latest block height from which we start polling the chain of ETH Mainnet
   `EthRpc` The rpc url of ETH Mainnet
   `L2OutputOracleAddr = 0x30c789674ad3B458886BBC9abf42EEe19EA05C1D` The Mainnet L2OutputOracleAddr
   `MantaStakingMiddlewareAddress = 0xb385a5412950c28144d74014f843189583a1d9fa` The Mainnet MantaStakingMiddlewareAddress
   `SymbioticOperatorRegisterAddress = 0xAd817a6Bc954F678451A71363f04150FDD81Af9F` The Mainnet SymbioticOperatorRegisterAddress
   `DBPath` The db path, need to be persistent
   `Namespace = 00006d742d66702d6d6e` The Celestia Mainnet namespace
   `DaRpc` The Celestia Mainnet rpc url. You can deploy a [celestia light node](https://docs.celestia.org/how-to-guides/light-node) of Mainnet. It also has a [helm chart](https://github.com/celestiaorg/helm-charts).

```toml
[Application Options]
; The name of operator; The name needs to be registered in the contract
OperatorName =

; The manta address to receive fp rewards
RewardAddress =

; The interval between each attempt to submit finality signature or public randomness after a failure
SubmissionRetryInterval = 1s

; The interval between each finality signature(s) submission
SignatureSubmissionInterval = 1s

; The maximum number of retries to submit finality signature or public randomness
MaxSubmissionRetries = 20

; The custom commission, 10000 = 100%
Commission = 1000

; Logging level for all subsystems
LogLevel = info

EnableKms = false

[opeventconfig]
; The chain id of the chain
ChainId = 1

; he height from which we start polling the chain
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

; The contract address of L2OutputOracle address (Mainnet)
L2OutputOracleAddr = 0x30c789674ad3B458886BBC9abf42EEe19EA05C1D

; the contract address of the manta-staking-middleware (Mainnet)
MantaStakingMiddlewareAddress = 0xb385a5412950c28144d74014f843189583a1d9fa

; the contract address of the symbiotic_operator_register_address (Mainnet)
SymbioticOperatorRegisterAddress = 0xAd817a6Bc954F678451A71363f04150FDD81Af9F

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
Namespace = 00006d742d66702d6d6e

; Dial address of data availability grpc client
DaRpc =

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

:::info Celestia Light Node
- Quick setup for Celestia light node if you choose to deploy your own: https://docs.celestia.org/how-to-guides/light-node
- Link to the Helm chart: https://github.com/celestiaorg/helm-charts 
:::

### 4. prepare your operator ETH private key

For example, your can use below node script to generate your operator eth private key

```node
const { Wallet } = require("ethers");

const wallet = Wallet.createRandom();

console.log("地址:", wallet.address);
console.log("私钥:", wallet.privateKey);
console.log("助记词:", wallet.mnemonic.phrase);
```

### 5. Start the SFP Operator

#### Option A: If `EnableKms = false`

```bash
# Set environment variables
export CELESTIA_AUTH_TOKEN="your-celestia-auth-token"
export FP_EVM_PRIVATE_KEY="your-operator-eth-private-key"

# Start the operator
./build/sfpd start \
  --home /data/manta-fp-sfpd-1/home \
  --auth-token $CELESTIA_AUTH_TOKEN \
  --private-key $FP_EVM_PRIVATE_KEY
```

#### Option B: If `EnableKms = true`

```bash
# Set environment variables
export CELESTIA_AUTH_TOKEN="your-celestia-auth-token"
export KMS_REGION="chosen-region"
export KMS_ID="your-kms-key-id"

# Start the operator
./build/sfpd start \
  --home /data/manta-fp-sfpd-1/home \
  --auth-token $CELESTIA_AUTH_TOKEN \
  --kms-region $KMS_REGION \
  --kms-id $KMS_ID
```

## Rewards API

Operator rewards accumulate over time and can be claimed through the reward API and token distribution contract.

**Base URL:** `https://prod.reward-api.pacific-staking.manta.network`

### 1. Fetch Accumulated Reward Amount

Check your total claimable rewards amount.

- **Path:** `/reward/all-amount`
- **Method:** `POST`
- **Content-Type:** `application/json`

**Request Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | string | Yes | Your operator's Ethereum address |
| `protocolType` | string | Yes | Must be `"symbiotic"` for Manta FP |
| `isOperator` | boolean | Yes | Set to `true` for operators |
| `isPending` | boolean | No | `false` for claimable rewards (default), `true` for pending rewards |

**Example Request**:
```bash
curl -X POST https://prod.reward-api.pacific-staking.manta.network/reward/all-amount \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0x9e22e7f3ad7a800c6a4cd42f9f3bc3b36fe11ec3",
    "protocolType": "symbiotic",
    "isOperator": true,
    "isPending": false
  }'
```

**Example Response**:
```json
{
    "success": true,
    "data": [
        {
            "amount": "1677619047619047618631", // Amount in wei (18 decimals)
            "rewardAddress": "0x9e22e7f3ad7a800c6a4cd42f9f3bc3b36fe11ec3",
            "ownerAddress": "0x9e22e7f3ad7a800c6a4cd42f9f3bc3b36fe11ec3",
            "lastUpdated": 1753370401000 // Unix timestamp in milliseconds
        }
    ]
}
```

:::info Converting from wei to MANTA
```javascript
// Convert from wei to MANTA
const amountInWei = "1677619047619047618631";
const amountInManta = amountInWei / 1e18; // 1677.619 MANTA
```
:::

### 2. Claim Rewards

#### Step 1: Get Claim Signature

Fetch the signature required to claim your rewards.

- **Path:** `/reward/claim-all-data`  
- **Method:** `POST`
- **Content-Type:** `application/json`

**Request Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | string | Yes | Your operator's Ethereum address |
| `protocolType` | string | Yes | Must be `"symbiotic"` for Manta FP |
| `isOperator` | boolean | Yes | Set to `true` for operators |

**Example Request**:
```bash
curl -X POST https://prod.reward-api.pacific-staking.manta.network/reward/claim-all-data \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0x9e22e7f3ad7a800c6a4cd42f9f3bc3b36fe11ec3",
    "protocolType": "symbiotic",
    "isOperator": true
  }'
```

**Example Response**:
```json
{
    "success": true,
    "data": [
        {
            "calldata": "0x514302ca0000000000000000000000009e22e7f3ad7a800c6a4cd42f9f3bc3b36fe11ec374be214f4c1988163ca53f8d0b53c59e4d74a4c549975d6887444fdb8b8837f6000000000000000000000000000000000000000000000000bed1d0263d9f0000000000000000000000000000000000000000000000000000000000000000001cd704ba26bc476806be3381c49887bd28f1f5360ac195887dc7c245319efa740369db40b4520070f76e6b7a47cf69b04a27aac6a5fb4e3c4039835e3b27c354a2"
        }
    ]
}
```

#### Step 2: Execute On-chain Claim

Use the calldata from [Step 1](#step-1-get-claim-signature) to call the token distribution contract and claim your rewards on-chain.

```bash
# Install cast if not already installed: https://book.getfoundry.sh/getting-started/installation

# Set your private key (use secure method in production)
export PRIVATE_KEY="your-private-key"

# Claim rewards
cast send TODO_CONTRACT_ADDRESS \
  "${CALLDATA_FROM_STEP_1}" \
  --private-key $PRIVATE_KEY
```
Once the transaction is confirmed, rewards will be automatically transferred to the reward address you specified during registration.

## Monitoring and Maintenance

- Health check API: `curl http://localhost:8080/ping`
- Metrics API: `http://localhost:2113/metrics`

## Support and Resources

- **Technical Support**: [Manta Network Discord](https://discord.gg/ktZWgwSu93)
- **GitHub Issues**: [manta-fp repository](https://github.com/Manta-Network/manta-fp/issues)