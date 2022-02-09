const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";
const privateKey = "589cb6d87d643cc286c85bc60c784048230ada610ea1af04adc0ec0da52a8f62";

module.exports = {
  networks: {
     development: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/", 0, 50);
      },       
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },

     rinkeby: {
      provider: function() {
        return new HDWalletProvider(privateKey, "https://rinkeby.infura.io/v3/730b8940a7a240159aa761903efaa618");
        // return new HDWalletProvider(privateKey, " https://kgrfelnmbrrr.usemoralis.com:2053/server");
      },  
      network_id: 4,
      gas: 10000000, 
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true, 
    },
  },

  compilers: {
    solc: {
      version: "0.5.16",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
}
