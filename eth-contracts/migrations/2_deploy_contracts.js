// migrating the appropriate contracts
const SquareVerifier = artifacts.require("SquareVerifier");
const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const ERC721Mintable = artifacts.require("ERC721Mintable");

module.exports = async function(deployer) {
  await deployer.deploy(SquareVerifier);
  await deployer.deploy(ERC721Mintable, "EthLand", "ETL");
  await deployer.deploy(SolnSquareVerifier, "EthLand", "ETL");

  const squareVerifier = await SquareVerifier.deployed();
  const solnSquareVerifier = await SolnSquareVerifier.deployed();

  solnSquareVerifier.setSquareVerifierContract(squareVerifier.address);
};
