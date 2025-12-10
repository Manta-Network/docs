# Contract Integration Notes

## 1. Contract

- **Address**: `0x04c74e8a11c669acfb7ee01012bbf5cf1e57a10d`

---

## 2. Function:

### 2.1 `claimedAmount`

Query how much reward has already been claimed by a specific owner.

**Conceptual signature:**

```ts
import {keccak256, toUtf8Bytes} from 'ethers';

// User wallet address (example)
const ADDRESS = '0xabc...';

// 1) Protocol type identifier
const protocolTypeIdentifier = keccak256(toUtf8Bytes('symbiotic'));

// 2) Digest used in contract call
const ownerAddressDigest = keccak256(
    toUtf8Bytes(protocolTypeIdentifier + ADDRESS.toLowerCase()),
);

// rewardsContract.claimedAmount(ownerAddressDigest);
```
