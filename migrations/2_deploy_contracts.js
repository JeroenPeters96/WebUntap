const TradeList = artifacts.require("./TradeList.sol");

module.exports = function (deployer) {
  deployer.deploy(TradeList);
};
