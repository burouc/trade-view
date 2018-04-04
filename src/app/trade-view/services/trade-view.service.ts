import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { OrderBookEntry } from '../models';

@Injectable()
export class TradeViewService {
  public isConnected$: Observable<boolean>;

  public buyOrderBook$: Observable<Array<OrderBookEntry>>;
  public sellOrderBook$: Observable<Array<OrderBookEntry>>;

  private isConnected: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public buyOrderBook: BehaviorSubject<Array<OrderBookEntry>> = new BehaviorSubject([]);
  public sellOrderBook: BehaviorSubject<Array<OrderBookEntry>> = new BehaviorSubject([]);

  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.isConnected$ = this.isConnected.asObservable();

    this.buyOrderBook$ = this.buyOrderBook.asObservable();
    this.sellOrderBook$ = this.sellOrderBook.asObservable();
  }

  public connectToSocket() {
    if (this.socket) {
      return;
    }

    this.socket = io(this.url);

    this.initOrderBookEventSubscriptions();

    this
      .socket
      .on('connect', () => {
        this.isConnected.next(true);
      });

    this
      .socket
      .on('disconnect', () => {
        this.isConnected.next(false);
      });
  }

  public emitOrderBookConfig(baseAsset: string, quoteAsset: string): void {
    this
      .socket
      .emit('orderBook', {baseAsset: baseAsset, quoteAsset: quoteAsset});
  }


  private initOrderBookEventSubscriptions() {
    this
      .socket
      .on('orderBook', (orderBookMessage: { buy: Array<[number, number]>, sell: Array<[number, number]> }) => {
        this.buyOrderBook.next(this.mapOrderBook(orderBookMessage.buy));
        this.sellOrderBook.next(this.mapOrderBook(orderBookMessage.sell));
      });
  }

  private mapOrderBook(orderBook: Array<[number, number]>): Array<OrderBookEntry> {
    return orderBook
      .map((orderBookEntry) => ({
        price: orderBookEntry[0],
        amount: orderBookEntry[1],
        volume: orderBookEntry[0] * orderBookEntry[1]
      }));
  }
}
