const OrderBookUtils = require('../utils/order-book.utils');

class OrderBookStore {
  constructor () {
    this.orderBooks = {};
  }

  setOrderBook (baseAsset, quoteAsset, orderBook) {
    const pairKey = OrderBookUtils.formatPairKey(baseAsset, quoteAsset);

    this.orderBooks[pairKey] = orderBook;
  }

  getOrderBook (baseAsset, quoteAsset) {
    const pairKey = OrderBookUtils.formatPairKey(baseAsset, quoteAsset);

    return this.orderBooks[pairKey];
  }
}

module.exports = new OrderBookStore();