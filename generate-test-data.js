const
  _ = require('lodash');

let
  startPrice = 0.083,
  minIncrement = 0.0000001,
  startBuyPrice = startPrice - minIncrement;

const
  buy = [],
  sell = [];

for (let i = 0; i < 20; i++) {
  const
    buyAmount = _.floor(_.random(0.15, 10, true), 6),
    sellAmount = _.floor(_.random(0.15, 10, true), 6),
    buyIncrement = _.random(1, 30) * minIncrement,
    sellIncrement = _.random(1, 30) * minIncrement;

  buy.push([startBuyPrice, buyAmount]);
  sell.push([startPrice, sellAmount]);

  startBuyPrice = _.floor(startBuyPrice - buyIncrement, 6);
  startPrice = _.floor(startPrice + sellIncrement, 6);
}

console.log(buy);
console.log(sell);