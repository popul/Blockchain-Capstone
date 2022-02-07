// migrating the appropriate contracts
// var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var SquareVerifier = artifacts.require("SquareVerifier.sol");

module.exports = function(deployer) {
  // deployer.deploy(SolnSquareVerifier);
  deployer.deploy(SquareVerifier);
};
