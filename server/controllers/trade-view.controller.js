const orderBookStoreServce = require('../services/order-book-store.service');

class TradeViewController {

  placeOrder (req, res) {
    const order = req.body;

    const
      baseAsset = order.baseAsset,
      quoteAsset = order.quoteAsset,
      orderBook = orderBookStoreServce.getOrderBook(baseAsset, quoteAsset);

    if (!order) {
      // Return error.
    }

    const {orders, fulfilledOrders} = orderBook.applyOrder(order);

    res.json({
      success: true,
      data: {
        orders,
        fulfilledOrders
      }
    });
  }
}

module.exports = new TradeViewController();
