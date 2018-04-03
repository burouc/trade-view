const
  orderBookStoreService = require('./order-book-store.service'),
  mockOrderBookData = require('../mock-data/order-book-mock-data'),
  OrderBook = require('../models/order-book.model');

class MockDataService {

  static fillOrderBookStore () {
    const
      baseAsset = 'ETH',
      quoteAsset = 'BTC',
      ethBtcOrderBook = new OrderBook(baseAsset, quoteAsset);

    ethBtcOrderBook.setCombinedBuyOrders(mockOrderBookData.buy);
    ethBtcOrderBook.setCombinedSellOrders(mockOrderBookData.sell);

    orderBookStoreService.setOrderBook(baseAsset, quoteAsset, ethBtcOrderBook);
  }
}

module.exports = MockDataService;