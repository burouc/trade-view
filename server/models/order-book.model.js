const
  _ = require('lodash'),
  OrderType = require('../models/order-type.enum'),
  EventEmitter = require('events');

class OrderBook extends EventEmitter {
  constructor (baseAsset, quoteAsset) {
    super();

    this.baseAsset = baseAsset;
    this.quoteAsset = quoteAsset;

    this.combinedBuyOrders = [];
    this.combinedSellOrders = [];

    this.precision = 6;

    // This is used for generating order ids, each time an order is added we increment it
    this.orderIdSeed = 0;
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
    const
      type = order.type,
      price = order.price,
      amount = order.amount,
      applyOrderResult = type === OrderType.Buy
        ? this.applyBuyOrder(price, amount)
        : this.applySellOrder(price, amount);

    this.emitChanges();

    return applyOrderResult;
  }

  /**
   * Decreases amounts of the sellOrderBook entries until all amount is used
   * or the price is bigger than the one passed to the function.
   *
   * @param price
   * @param amount
   * @returns {{orders: Array, remainingAmount: *, fulfilledOrders: Array}}
   */
  applyBuyOrder (price, amount) {
    const
      orders = [],
      fulfilledOrders = [],
      deleteEntriesOnIndexes = [];

    let
      remainingTotal = _.floor(amount * price, this.precision),
      remainingAmount = amount;

    for (let i = 0; i < this.combinedSellOrders.length; i++) {
      const
        sellOrderBookEntry = this.combinedSellOrders[i],
        entryPrice = sellOrderBookEntry[0],
        entryAmount = sellOrderBookEntry[1];

      if (price < entryPrice) {
        break;
      }

      if (entryAmount * entryPrice <= remainingTotal) {
        fulfilledOrders
          .push(this.createFulfilledOrder(entryPrice, entryAmount));

        remainingTotal -= _.floor(entryAmount * entryPrice, this.precision);
        deleteEntriesOnIndexes.push(i);
      }
      else {
        const highestPossibleAmount = _
          .floor(
            remainingTotal / entryPrice,
            this.precision
          );

        fulfilledOrders
          .push(this.createFulfilledOrder(entryPrice, highestPossibleAmount));

        sellOrderBookEntry[1] -= highestPossibleAmount;
        remainingTotal = 0;
      }

      if (remainingTotal < Math.pow(10, -this.precision)) {
        // NOTE: Probably better to return this to user.
        remainingTotal = 0;
        break;
      }
    }

    if (remainingTotal > 0) {
      remainingAmount = fulfilledOrders.length
        ? _.floor(remainingTotal / price)
        : remainingAmount;

      orders.push(
        this.addOrderToOrderBook(price, remainingAmount, OrderType.Buy));
    }
    else {
      remainingAmount = 0;
    }

    if (deleteEntriesOnIndexes.length) {
      this.deleteEntries(deleteEntriesOnIndexes, OrderType.Sell);
    }

    return {
      orders,
      remainingAmount,
      fulfilledOrders
    };
  }

  /**
   * Decreases amounts of the buyOrderBook entries until all amount is used
   * or the price is smaller than the one passed to the function.
   *
   * @param price
   * @param amount
   * @returns {{orders: Array, remainingAmount: *, fulfilledOrders: Array}}
   */
  applySellOrder (price, amount) {
    const
      orders = [],
      fulfilledOrders = [],
      deleteEntriesOnIndexes = [];

    let
      remainingTotal = _.floor(amount * price, this.precision),
      remainingAmount = amount;

    for (let i = 0; i < this.combinedBuyOrders.length; i++) {
      const
        sellOrderBookEntry = this.combinedBuyOrders[i],
        entryPrice = sellOrderBookEntry[0],
        entryAmount = sellOrderBookEntry[1];

      if (price > entryPrice) {
        break;
      }

      if (entryAmount * entryPrice <= remainingTotal) {
        fulfilledOrders
          .push(this.createFulfilledOrder(entryPrice, entryAmount));

        remainingTotal -= _.floor(entryAmount * entryPrice, this.precision);
        deleteEntriesOnIndexes.push(i);
      }
      else {
        const highestPossibleAmount = _
          .floor(
            remainingTotal / entryPrice,
            this.precision
          );

        fulfilledOrders
          .push(this.createFulfilledOrder(entryPrice, highestPossibleAmount));

        sellOrderBookEntry[1] -= highestPossibleAmount;
        remainingTotal = 0;
      }

      if (remainingTotal < Math.pow(10, -this.precision)) {
        // NOTE: Probably better to return this to user.
        remainingTotal = 0;
        break;
      }
    }

    if (remainingTotal > 0) {
      remainingAmount = fulfilledOrders.length
        ? _.floor(remainingTotal / price)
        : remainingAmount;

      orders.push(
        this.addOrderToOrderBook(price, remainingAmount, OrderType.Sell));
    }
    else {
      remainingAmount = 0;
    }

    if (deleteEntriesOnIndexes.length) {
      this.deleteEntries(deleteEntriesOnIndexes, OrderType.Buy);
    }

    return {
      orders,
      remainingAmount,
      fulfilledOrders
    };
  }

  addOrderToOrderBook (price, amount, type) {
    let prevPrice;

    if (type === OrderType.Sell) {
      for (let i = 0; i < this.combinedSellOrders.length; i++) {
        const orderBookEntry = this.combinedSellOrders[i],
          currentEntryPrice = orderBookEntry[0];

        if (i === 0) {
          if (price < currentEntryPrice) {
            this.combinedSellOrders.splice(i, 0, [price, amount]);
            break;
          }

          prevPrice = currentEntryPrice;
        }

        if (currentEntryPrice === price) {
          orderBookEntry[1] += amount;
          break;
        }

        if (prevPrice < price && price < currentEntryPrice) {
          this.combinedSellOrders.splice(i, 0, [price, amount]);

          break;
        }

        if (i === this.combinedSellOrders.length - 1) {
          this.combinedSellOrders.push([price, amount]);
        }
      }
    }
    else {
      for (let i = 0; i < this.combinedBuyOrders.length; i++) {
        const orderBookEntry = this.combinedBuyOrders[i],
          currentEntryPrice = orderBookEntry[0];

        if (i === 0) {
          if (price > currentEntryPrice) {
            this.combinedBuyOrders.splice(i, 0, [price, amount]);
            break;
          }

          prevPrice = currentEntryPrice;
        }

        if (currentEntryPrice === price) {
          orderBookEntry[1] += amount;
          break;
        }

        if (prevPrice > price && price > currentEntryPrice) {
          this.combinedBuyOrders.splice(i, 0, [price, amount]);

          break;
        }

        if (i === this.combinedBuyOrders.length - 1) {
          this.combinedBuyOrders.push([price, amount]);
        }
      }
    }

    return {
      price,
      amount,
      type,
      baseAsset: this.baseAsset,
      quoteAsset: this.quoteAsset,
      id: this.generateOrderId(),
      createdAt: Date.now(),
      fulfilled: false
    };
  }

  createFulfilledOrder (price, amount, type) {
    return {
      price,
      amount,
      type,
      baseAsset: this.baseAsset,
      quoteAsset: this.quoteAsset,
      id: this.generateOrderId(),
      createdAt: Date.now(),
      fulfilledAt: Date.now(),
      fulfilled: true
    };
  }

  deleteEntries (indexes, type) {
    const reverseIndexes = _.sortBy(indexes).reverse();

    for (const index of reverseIndexes) {
      if (type === OrderType.Buy) {
        this.combinedBuyOrders.splice(index, 1);
      }
      else {
        this.combinedSellOrders.splice(index, 1);
      }
    }
  }

  emitChanges () {
    this.emit('changed');
  }

  generateOrderId () {
    return this.orderIdSeed++;
  }
}

module.exports = OrderBook;