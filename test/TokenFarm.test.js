const { assert } = require("chai");

const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("TokenFarm", (accounts) => {
  let daiToken;
  before(async () => {
    daiToken = await DaiToken.new();
  });

  describe("mock DAI Deployment", async () => {
    it("has a name", async () => {
      let daiToken = await DaiToken.new();
      const name = await daiToken.name();
      assert.equal(name, "Mock DAI Token");
    });
  });
});
