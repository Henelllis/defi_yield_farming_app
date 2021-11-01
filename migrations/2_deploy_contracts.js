const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(deployer, network, accounts) {
  //Deploy Mock Dai TOkens
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  //Deploy Dapp Token
  await deployer.deploy(DappToken);
  const dappToken = await DappToken.deployed();

  //Deploy Token Farm
  await deployer.deploy(TokenFarm, dappToken.address, daiToken.address);
  const tokenFarm = await TokenFarm.deployed();

  //Transfer all tokens to TokenFarm ( 1 million )
  await dappToken.transfer(tokenFarm.address, "1000000000000000000000000");
  // deployer.deploy(TokenFarm);
  await daiToken.transfer(accounts[1], "100000000000000000000");
};
