# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Dependencies

- Node v14
- Ganache v7.0.1
- Truffle 5.4.13

# Run tests 

Install node dependencies:
```sh
npm install
```

In folder `eth-contracts`

Run ganache in a separate terminal
```sh
ganache -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" -a 100
```

Run tests in another terminal
```sh
truffle test
```

# External links

[SolnSquareVierifier.json ABI](eth-contracts/SolnSquareVerifier.json)

- SolnSquareVerifier Contract on rinkeby: https://rinkeby.etherscan.io/address/0x608b46F0f62A4827337F860546C6f7d2525FBD59
- SolnSquareVerifier contract owner on rinkeby: https://rinkeby.etherscan.io/address/0xc135a2fd016510b943148d71d094f161b0DE9394
- Initial account that minted 10 tokens and sold 5 of them on rinkeby to [0xCD4f75B51D70234f64bA77fFeff639288D24049e](https://testnetsopensea.io/0xcd4f75b51d70234f64ba77ffeff639288d24049e) account:
  - On Etherscan https://rinkeby.etherscan.io/address/0x81e96057C0A606DBe60069BFB788630855F1DEAA
  - On OpenSea: https://testnets.opensea.io/0x81e96057C0A606DBe60069BFB788630855F1DEAA
- Account that bought these 5 tokens on rinkeby:
  - On Etherscan https://rinkeby.etherscan.io/address/0xCD4f75B51D70234f64bA77fFeff639288D24049e
  - On OpenSea: https://testnets.opensea.io/0xcd4f75b51d70234f64ba77ffeff639288d24049e

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
