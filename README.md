# xRollup
![Logo](https://docs.google.com/uc?id=1LQGnOGaufOhiqpFT4jEpm0D-zsV004XL)
xRollup is a layer 2 scaling solution leveraging zkSnarks.

## Why zkSNARKS for scalaibility?
- Validity Proofs, as opposed to Fraud Proofs
- No challenge time to unlock funds
- Very simple protocol
- Capacity to bring privacy solutions on top of the scalability

## zkSNARK Performance
SNARK solutions can hold their own in performance metrics.
- There are constant time to verify
- The proving time is O(n log(n))
- They can be very efficient for certain operations, especially for cryptographic operation

## Projects
### Sidechain Payments
Cheap & Fast payments as found in other layer 2 solutions

### Non-custodial centralized exchange.
All the speed of a CEX, without giving exchanges (and their hackers) custodial control of your funds.

![Architecture Diagram](https://docs.google.com/uc?id=1HJa9jnb2yEYsP9xcIPQsgm0pWWrr7ysM)

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
