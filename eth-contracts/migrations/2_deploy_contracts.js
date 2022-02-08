// migrating the appropriate contracts
const SquareVerifier = artifacts.require("SquareVerifier");
const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const Ownable= artifacts.require("Ownable");
const Pausable= artifacts.require("Pausable");

module.exports = async function(deployer) {
  await deployer.deploy(SquareVerifier);
  await deployer.deploy(SolnSquareVerifier);
  await deployer.deploy(Ownable);
  await deployer.deploy(Pausable);

  const squareVerifier = await SquareVerifier.deployed();
  const solnSquareVerifier = await SolnSquareVerifier.deployed();

  solnSquareVerifier.setSquareVerifierContract(squareVerifier.address);
};
