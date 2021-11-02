const { assert } = require("chai");

const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

require("chai")
  .use(require("chai-as-promised"))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}
// contract("TokenFarm", (accounts) => {
contract("TokenFarm", ([owner, investor]) => {
  let daiToken, dappToken, tokenFarm;

  before(async () => {
    //Load Contracts
    daiToken = await DaiToken.new();
    dappToken = await DappToken.new();
    tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address);
    //Transfer all Dapp Tokens to farm ( 1 million )
    await dappToken.transfer(tokenFarm.address, tokens("1000000"));
    //send tokens to investor
    await daiToken.transfer(investor, tokens("100"), { from: owner });
    // await daiToken.transfer(accounts[1], tokens("100"), { from: accounts[0] });
  });

  describe("mock DAI Deployment", async () => {
    it("has a name", async () => {
      const name = await daiToken.name();
      assert.equal(name, "Mock DAI Token");
    });
  });

  describe("Dapp Token Deployment", async () => {
    it("has a name", async () => {
      const name = await dappToken.name();
      assert.equal(name, "DApp Token");
    });
  });

  describe("TokenFarm Deployment", async () => {
    it("has a name", async () => {
      const name = await tokenFarm.name();
      assert.equal(name, "Dapp Token Farm");
    });

    it("contracts has tokens", async () => {
      let balance = await dappToken.balanceOf(tokenFarm.address);

      assert.equal(balance.toString(), tokens("1000000"));
    });
  });

  describe.only("Farming Tokens", async () => {
    it("rewards investors for staking mDai tokens", async () => {
      let result;

      //check investor balance before staking
      result = await daiToken.balanceOf(investor);

      assert.equal(
        result.toString(),
        tokens("100"),
        "Investor mock dai wallet balance correct before staking"
      );

      //Stake mock dai tokens
      await daiToken.approve(tokenFarm.address, tokens("100"), {
        from: investor,
      });
      await tokenFarm.stakeTokens(tokens("100"), { from: investor });

      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("0"),
        "Investor mock dai wallet balance correct after staking"
      );

      result = await tokenFarm.stakingBalance(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "investor staking balance correct after staking"
      );

      result = await tokenFarm.isStaking(investor);

      assert.equal(
        result.toString(),
        "true",
        "investor staking status correct after staking"
      );
    });
  });
});
