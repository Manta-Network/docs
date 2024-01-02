# How to mint ZKSBT

1. install zksbt JS SDK
```shell
    npm install @zksbt/jssdk
```
2. initialize zksbt JS SDK
```typescript=
    import { ZKSbtSDK } from "@zksbt/jssdk"

    const ZKSBT_CONTRACT = '0xa44155ffbcE68C9C848f8Ea6F28C40311085125E'
    const provider = new ethers.providers.JsonRpcProvider(MANTA_RPC);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const sdk = await ZKSbtSDK.create(wallet, ZKSBT_CONTRACT)
```

3. Ask for certification
```typescript=
    const CATEGORY = 109n          // MANTA PACIFIC ASSET CERTIFICATE
    const ATTRIBUTE = "1"
    const URL = "https://npo-cdn.asmatch.xyz/MantaPacific/ETH/ETH_moreThan1.jpg"
    const claim_signature = await sdk.claimSbtSignature(CATEGORY, ATTRIBUTE)
    const request = {
        "sig": claim_signature,
        "publicAddress": sdk.identity.getCommitment().toString(),
        "category": CATEGORY.toString(),
        "attribute": ATTRIBUTE,
        "url": URL,
        "email": ""
      }
    const API = 'https://prod.asmatch-api-npo.asmatch.xyz/pomp/premint';
    await axios.post(API, request)
```
4. check certificate data
```json=
Response data: {
  code: 0,
  message: 'success',
  data: {
    asset_id: '91856531439484927',
    attribute: '1',
    eth_address: '0x9cda03ce3a07c7494a34a9ba53cd75dd8e00c5b9',
    sig_address: '0xa7d2C348D30AD1cF527AFF6c9C56110F91BDa649',
    signature: '0x2a11462a728882e6b1f834931104d92db9aaeb6741e9668842ba6a9aac38faa613bba08265fdeb4c16af98ea96f953b135d5aa3218cbc6b0a4357550be22df1a1b',
    sbt_url: 'https://npo-cdn.asmatch.xyz/MantaPacific/ETH/ETH_moreThan1.jpg',
    verifyTimestamp: '1698631406716',
    certificate_msg: 'Sign this meesage to claim zkSBT :  public address 2120648137430114184213068244856561888015650291389717374042288473592882019645 sbt category 109 sbt attribute 1 sbt id 91856531439484927 verify timestamp 1698631406716'
  }
}
```
5. send on-chain mint transaction
```typescript=
    const res = await sdk.mint(
            CATEGORY,
            ATTRIBUTE,
            response.data.data.asset_id,
            BigInt(response.data.data.verifyTimestamp),
            response.data.data.signature
          )
```
6. check transaction status
```typescript=
    if (res.status != 1) {
        throw new Error("pomp mint fail , res ", res)
    }
```
