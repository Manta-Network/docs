# Contract Integration Notes

## 1. Reward Contract

- **Address**: `0x04c74e8a11c669acfb7ee01012bbf5cf1e57a10d`

---

## 2. Interface:

### 2.1 `claimedAmount`

Query how much reward has already been claimed by a specific owner.

**Code Example:**

```ts
import {keccak256, toUtf8Bytes} from 'ethers';

// User wallet address (example)
const ADDRESS = '0xabc...';

// 1) Protocol type identifier
const protocolTypeIdentifier = keccak256(toUtf8Bytes('symbiotic'));

// 2) Digest used in contract call
// if you are an operator
const operatorAddressDigest = keccak256(
    toUtf8Bytes(protocolTypeIdentifier + ADDRESS.toLowerCase()) + 'operator',
);

// if you are an delegator
const ownerAddressDigest = keccak256(
    toUtf8Bytes(protocolTypeIdentifier + ADDRESS.toLowerCase())
);

// rewardsContract.claimedAmount(ownerAddressDigest);
```
