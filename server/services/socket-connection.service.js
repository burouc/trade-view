const
  orderBookStoreService = require('./order-book-store.service'),
  OrderBookUtils = require('../utils/order-book.utils');

class SocketConnectionService {
  constructor (io, client) {
    this.io = io;
    this.client = client;

    this.initListeners();
  }

  initListeners () {
    this
      .client
      .on('orderBook', (orderBookConfig) => {
        this.sendOrderBook(orderBookConfig);
      });
  }

  sendOrderBook (orderBookConfig) {
    const
      baseAsset = orderBookConfig.baseAsset,
      quoteAsset = orderBookConfig.quoteAsset,
      orderBook = orderBookStoreService.getOrderBook(baseAsset, quoteAsset);

    if (!orderBook) {
      return;
    }

    this
      .client
      .emit('orderBook', OrderBookUtils.formatOrderBook(orderBook));
  }

}

module.exports = SocketConnectionService;