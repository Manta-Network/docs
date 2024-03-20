### Manta Binary Upgrades

Although [forkless upgrades](https://wiki.polkadot.network/docs/learn-runtime-upgrades#forkless-upgrades) largely allow for upgrades without needing to change the node software, every once in a while, chain upgrades will break the client binary and require manual updating.

:warning: Please follow the [Manta node github releases](https://github.com/Manta-Network/Manta/releases) closely for upgrade instructions.

### Taking the Collator Offline

You can (and should) notify the network your collator will be offline **for more than 6 hours** by running `parachainStaking::goOffline()` from your collator account.
![](images/collator-go-offline.png)

This will remove you from the set of candidates temporarily without removing your collators
It takes effect at the start of the next round after execution (at most 6 hours).

Neither you, nor your delegators will receive any rewards in the time you are offline (whether you run the above extrinsic or not), so ensure to keep downtimes to a minimum or you will risk losing delegators and thus your spot in the active collator set.

Conversely, once your maintenance concludes, re-add your collator to the active set with `parachainStaking::goOnline()`
![](images/collator-go-online.png)

Again, this takes effect at the start of the next round after execution (at most 6 hours).