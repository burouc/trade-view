class OrderBook {
  constructor (baseAsset, quoteAsset) {
    this.baseAsset = baseAsset;
    this.quoteAsset = quoteAsset;

    this.combinedBuyOrders = [];
    this.combinedSellOrders = [];
  }

  setCombinedBuyOrders (combinedBuyOrders) {
    this.combinedBuyOrders = combinedBuyOrders;
  }

  setCombinedSellOrders (combinedSellOrders) {
    this.combinedSellOrders = combinedSellOrders;
  }

  getCombinedBuyOrders () {
    return this.combinedBuyOrders;
  }

  getCombinedSellOrders () {
    return this.combinedSellOrders;
  }

  applyOrder (order) {
    // TODO: Apply changes to orders
  }
}

module.exports = OrderBook;