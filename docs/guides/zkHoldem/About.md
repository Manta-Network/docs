# Introducing zkHoldem - Decentralized Poker Room as a Reality

<div style={{textAlign: 'center',marginBottom: '24px'}}>
    <img alt="zkHoldem" src="/img/guides/zkHoldem/zkHoldem.webp" width="70%"/>
</div>

## What is zkHoldem?

zkHoldem is the world’s first online Texas Hold’em platform where fairness can be 100% guaranteed. Play with crypto against players around the world in a true peer-to-peer manner, the way online poker is always supposed to be.

Through the implementation of ZKP technology, for the first time ever, we are enabling a 100% on-chain & decentralized poker experience where:

-   Deposits/Withdrawals are virtually instantaneous with no centralized entity controlling your fund
-   Transparent card shuffling and dealing process is guaranteed by zkShuffle smart contract
-   The content of your hole cards is accessible only to yourself and nobody else in the world

In essence, you can think of zkHoldem as online poker reimagined with new technologies, built by a bunch of poker enthusiasts who happen to be cryptography experts as well.

Also it is worth mentioning that we have already demoed zkHoldem at the ETH SF hackathon in 2022, **winning multiple bounties from industry giants like Optimism, ENS and ApeCoin DAO.**

   <div style={{textAlign: 'center'}}>
    <img alt="1" src="/img/guides/zkHoldem/1.webp" width="70%"/>
   </div>

## Why & How are we doing this?

**Anything that can possibly go wrong, does.**
If we were to look back, 2022 will probably be marked as the year showcasing how much centralization actually sucks in the history of crypto. Billions of user funds were lost simply because the giants who we once idolized turned out to be absolute scammers/morons.

The thing with centralization is that while being relatively more efficient, it always brings about the single point of failure that eventually will be triggered by someone, whether maliciously or innocently, and mess up the entire system.

**Poker has long been struggling with centralization since its inception:**

With traditional poker rooms, whether online or in-person, the house or the platform operator is this single point of failure.

They can have all the licenses, all the complicated security measures and all the top-notch ambassadors (remember FTX?), but as long as they are the ones who deal your cards, ultimately you are putting your trust, rather blindly, to a third party who can easily take advantage of this trust and destroy you in the most fundamental sense.

**Fool me once, shame on you. Fool me twice …**
We are not trying to solve a problem that doesn’t exist. **Thousands, if not millions, of players have lost their money to rugged online poker platforms that have built in cheating systems that give certain advantages throughout the years: [Full Tilt Poker](https://bleacherreport.com/articles/858162-full-tilt-poker-ponzi-scheme-online-poker-is-more-sinister-than-we-thought), [PokerSpot](https://www.pokerhistory.eu/history/online-poker-scandals/poker-spot-scandal), [Ultimate Bet](https://www.pokernews.com/news/2011/03/travis-makar-leaks-god-mode-email-from-ultimatebet-scandal-9946.htm), [Lock Poker](https://www.gamblingsites.com/history/lock-poker/#:~:text=The%20site%20started%20canceling%20payouts,Absolute%20Poker%20and%20Ultimate%20Bet.), [Absolute Poker](https://upswingpoker.com/ultimate-bet-absolute-poker-scandal/), [Purple Lounge](https://www.safestpokersites.com/purple-lounge/)…** just a few I can think of off the top of my head, but you get the idea.

   <div style={{textAlign: 'center'}}>
    <img alt="2" src="/img/guides/zkHoldem/2.webp" width="70%"/>
   </div>

I’m not saying all poker rooms cheat, and probably most of them have never cheated (yet), but if they do at some point in the future, whether for their own financial interest or to save their daughter from enthusiastic gambler/kidnapper who want to make it all back in one trade, **who is there to protect you?**

For poker players, the legitimacy of the platform shouldn’t be our concern in the first place. We just want to focus on the hand we are playing and the next move. Everything else is just noise.

Currently, a better alternative doesn’t exist. We deposit our funds to some poorly designed websites, play our cards and assume the best.

## Blockchain might fix this, when combined with the right tech

Blockchain, despite being immutable and decentralized, by itself is not enough to become the new infrastructure for a decentralized poker room to be built upon given its transparent nature.

**After all, what is the point of playing poker if your opponents can see your hands from public on-chain data?**

For on-chain poker (or any kind of imperfect information game) to work, we need to be able to bring privacy onto the blockchain.

That is where zero knowledge proof (ZKP) comes into play.

   <div style={{textAlign: 'center'}}>
    <img alt="3" src="/img/guides/zkHoldem/3.webp" width="70%"/>
   </div>

Essentially what ZKP allows is **proving to the blockchain that you have what you claim to have without revealing the actual content.** In the context of a poker game, it means that your hands won’t be visible on-chain until showdown (assuming you haven’t folded already), with the blockchain still being able to verify the validity of your hand, that it has not been manipulated in any way.

By implementing ZKP, your hand is not only hidden from your opponents, but from everyone else in the world, including the protocol designers (us).

**Well, what about the dealer?**

Okay now we have figured out the privacy part, but since blockchain is decentralized and everything, who is going to be the dealer then?

**Without going into too much technical detail, let’s just say that the card dealing is performed through a series of interactions between the players and the smart contract.**

For those of you who are interested, our card dealing design is inspired by the solution originally proposed in “Mental Poker” by the creators of the RSA-encryption protocol, and the design is realized using the zkContract developed by Poseidon.

   <div style={{textAlign: 'center'}}>
    <img alt="4" src="/img/guides/zkHoldem/4.webp" width="90%"/>
   </div>

In summary, here’s how the card dealing process works:

Before the game begins, each player at the table shuffles the deck once and encrypts it using their private key, so that other players cannot see the result of the shuffling.
After one round of shuffling, each player takes out 2 cards as their hole cards. They then decrypt the hole cards of all other players, so that each player can only see their own hole cards and not those of others.
For the Flop, Turn, and River, all players decrypt the community cards so that they are visible to everyone.
At showdown, the remaining players decrypt their own hands for everyone else to see and compare their hands.
Through this process, the card dealing becomes fully automated and does not rely on a centralized third party, effectively creating a card game without the house.

Closing thoughts
Poker players should focus on playing cards and nothing more:

Not suspecting other players having “God modes”, not waiting for payment withdrawal, and certainly not worrying that they might lose everything because the platform fails.

While we wouldn’t really call ourselves “decentralization MAXIs” at zkHoldem, we definitely believe that online poker at its current form is not built for serious players. Powered by blockchain + ZKP, zkHoldem might be able to provide a better alternative to the status quo.

If you are interested in what we are doing, follow us on Twitter @zkHoldem and check out our website at https://zkholdem.xyz.

We are expecting to launch a beta version within 2023 Q1 and hopefully something that you can play around with before that, so definitely stay tuned.
