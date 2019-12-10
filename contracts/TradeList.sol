pragma solidity ^0.5.0;

contract TradeList {
  uint tradeCount = 0;

  struct Trade {
    uint id;
    string cardId;
    uint count;
    string sender;
    string receiver;
    bool completed;
  }

  mapping(uint => Trade) public trades;


  event TradeCreated (
    uint id,
    string cardId,
    uint count,
    string sender,
    string receiver,
    bool completed
  );

  event TradeCompleted(
    uint id,
    bool completed
  );

  function createTrade(
    string memory _cardId,
    uint _count,
    string memory _sender,
    string memory _receiver) public {
   tradeCount ++;
    trades[tradeCount] = Trade(tradeCount, _cardId, _count, _sender, _receiver, false);
    emit TradeCreated(tradeCount, _cardId, _count, _sender, _receiver, false);
  }

  function toggleCompleted(uint _id) public {
    Trade memory _trade = trades[_id];
    _trade.completed = !_trade.completed;
    trades[_id] = _trade;
    emit TradeCompleted(_id,_trade.completed);
  }

  constructor() public {}

}
