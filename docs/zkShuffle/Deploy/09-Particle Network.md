# Particle Auth SDK

## What is Particle Network?

**Particle Network** is the Intent-Centric, Modular Access Layer of Web3. With Particle's Wallet-as-a-Service, developers can curate unparalleled user experience through modular and customizable EOA/AA embedded wallet components. By utilizing MPC-TSS for key management, Particle can streamline onboarding via familiar Web2 accounts—such as Google accounts, email addresses, and phone numbers.


The Particle Auth SDK seamlessly integrates with Particle's Wallet-as-a-Service, offering native compatibility with Manta Pacific for activities like login, logout, and transaction or signature proposals.

## Quickstart

To get started, simply specify Manta Pacific as your preferred blockchain when setting up Particle Auth. Doing so configures the SDK for both in-app wallet functions and Web3 interactions with both Externally Owned Accounts (EOA) and ERC-4337 Account Abstraction (AA) on the Manta Pacific network.

```js
import { ParticleNetwork } from  "@particle-network/auth"; 
import { Manta } from "@particle-network/chains";
import { SmartAccount } "@particle-network/aa";

// Retrieved from https://dashboard.particle.network
const config = {
	projectId: "xx",
	clientKey: "xx",
	appId: "xx",
};

const particle = new ParticleNetwork({
	...config,
	chainName: Manta.name,
	chainId: Manta.id,
});

// If using AA
const smartAccount = new SmartAccount(new ParticleProvider(particle.auth), {
  ...config,
  aaOptions: {
    simple: [{ chainId: Manta.id, version: '1.0.0' }]
  }
});

particle.setERC4337({
  name: 'SIMPLE',
  version: '1.0.0'
});

await particle.auth.login() // Initiates social login to Manta
```

### [Particle Network Documentation](https://docs.particle.network)
### [Particle Network Blog](https://blog.particle.network)
### [Particle Network Website](https://particle.network)
