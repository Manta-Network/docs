# Deploy a Manta Symbiotic Finality Provider (SFP) Operator

**GitHub repo**: [manta-fp](https://github.com/Manta-Network/manta-fp)

:::info Important Note
- **Minimum Stake**: 400,000 MANTA tokens required to receive rewards
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
Namespace =

# Dial address of data availability grpc client
DaRpc = http://celstia-node:26658

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
:::info Celestia Light Node
- Quick setup for Celestia light node if you choose to deploy your own: https://docs.celestia.org/how-to-guides/light-node
- Link to the Helm chart: https://github.com/celestiaorg/helm-charts 
:::

#### Mainnet Configuration

:::info Coming Soon
Mainnet configuration will be available upon mainnet launch. Key differences will include:
- Production Ethereum mainnet RPC
- Mainnet contract addresses
- Production Celestia namespace
:::

### 4. Start the SFP Operator

#### Option A: If `EnableKms = false`

```bash
# Set environment variables
export CELESTIA_AUTH_TOKEN="your-celestia-auth-token"
export FP_EVM_PRIVATE_KEY="your-operator-private-key"

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

:::info
A web-based UI for rewards management is coming soon. Currently, operators must use the API to check and claim rewards.
:::

**Base URL:** `https://main.reward-api.pacific-staking.manta.network`

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
curl -X POST https://main.reward-api.pacific-staking.manta.network/reward/all-amount \
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
curl -X POST https://main.reward-api.pacific-staking.manta.network/reward/claim-all-data \
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

- **Technical Support**: [Manta Network Discord](https://discord.gg/)
- **GitHub Issues**: [manta-fp repository](https://github.com/Manta-Network/manta-fp/issues)