import { Component, OnInit } from '@angular/core';
import { OrderBookEntry } from '../../models';

@Component({
  selector: 'app-trade-view',
  templateUrl: './trade-view.component.html'
})
export class TradeViewComponent implements OnInit {
  public baseAsset = 'ETH';
  public quoteAsset = 'BTC';

  // TODO: This is mock data, it should be fetched from BE.
  public buyOrderBookEntries: Array<OrderBookEntry> = [
    {
      price: 0.1,
      amount: 2,
      volume: 0.2
    },
    {
      price: 0.05,
      amount: 3,
      volume: 0.15
    }
  ];
  public sellOrderBookEntries: Array<OrderBookEntry> = [
    {
      price: 0.15,
      amount: 2,
      volume: 0.3
    },
    {
      price: 0.2,
      amount: 10,
      volume: 2
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
