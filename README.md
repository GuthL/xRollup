# xRollup
![Logo](https://docs.google.com/uc?id=1LQGnOGaufOhiqpFT4jEpm0D-zsV004XL)
xRollup is a layer 2 scaling solution leveraging zkSnarks.

## Why zkSNARKS for scalability?
- Validity Proofs, as opposed to Fraud Proofs
- No challenge time to unlock funds
- Very simple protocol
- Capacity to bring privacy solutions on top of the scalability

## zkSNARK Performance
SNARK solutions can hold their own in performance metrics.
- There are constant time to verify
- The proving time is O(n log(n))
- They can be very efficient for certain operations, especially for cryptographic operation

## Why xRollup?
While being a hot topic, there is no current wallet capable of handling the elliptic curve operations required to interact with any Rollup system. Various projects are thinking about it but nothing is yet usable.

[https://ethereum-magicians.org/t/eip-erc-app-keys-application-specific-wallet-accounts/2742/16](EIP ERC App Keys: application specific wallet accounts)

By extending the burner wallet, we brigded the gap.

We also implemented an centralized approver to bring even more settlements, while offering a transparent notion of trust of settlement.

## Use Cases
### Sidechain Payments
Cheap & Fast payments as found in other layer 2 solutions

### Non-custodial centralized exchange.
All the speed of a CEX, without giving exchanges (and their hackers) custodial control of your funds.
We are able to bring 34000 tps under this assumption, all with onchain settlement.

## Architecture
- Our current implementation features a centralized validator node. The "One node blockchain". This can be expanded to a consensus mechanism.
- State is pegged to smart contract on Ethereum mainnet regularly.
- Proofs can be efficently executed on validator smart contracts, one for each zkSNARK.
- Clients interact with the validators via JSON-RPC.

![Architecture Diagram](https://docs.google.com/uc?id=1HJa9jnb2yEYsP9xcIPQsgm0pWWrr7ysM)

## Build
### Deploying the xRollup Burner Wallet

```sh
cd burner-wallet
npm run build
git add build
git commit -m "Update burner wallet distribution"
cd ..
git subtree push --prefix burner-wallet/build origin gh-pages
git push
```

## Community 
Community is important - we want to share the potential of znSnarks with the world.
To that end we have a tutorial, and will be expanding it with the knowledge gained from the hackathon.

We added the deposit and withdraw mecanism for the SNARK part, part of the approver logic and the deposit mecanism on the Smart Contract.

[Expanded tutorial](https://github.com/GuthL/roll_up_circom_tutorial)
