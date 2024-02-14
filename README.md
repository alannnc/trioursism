# triourism

# How to use

In a terminal, run the following commands:

```
codesign -s - .bitcoin/bin/bitcoind
```

```
npm install
npm run btc:start
```

In another terminal run:

```
npm run icp:start
```

Open another terminal and run:

```
npm run icp:deploy
```

or

```
npm run icp:deploy:local
```

# How to mint ckBTC

Instructions to mint to a principalId
codesign only for mac

```
codesign -s - .bitcoin/bin/bitcoin-cli
```

```bash
npm run btc:mint --address=$ADDRESS
# Sometimes you have to wait a few seconds
dfx canister call wallet updateBalance
```
