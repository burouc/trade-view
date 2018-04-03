class OrderBookUtils {
  static formatPairKey (baseAsset, quoteAsset) {
    return `${baseAsset}-${quoteAsset}`;
  }

  /**
   * Formats order book object for sending client.
   * @param orderBook
   * @returns {{buy: *, sell: *, time: number}}
   */
  static formatOrderBook (orderBook) {
    return {
      buy: orderBook.getCombinedBuyOrders(),
      sell: orderBook.getCombinedSellOrders(),
      time: Date.now()
    };
  }
}

module.exports = OrderBookUtils;