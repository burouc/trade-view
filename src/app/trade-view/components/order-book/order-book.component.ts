import { Component, Input, OnInit } from '@angular/core';
import { OrderBookEntry } from '../../models';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html'
})
export class OrderBookComponent implements OnInit {
  @Input() public baseAsset = '';
  @Input() public quoteAsset = '';

  @Input() public orderBookEntries: Array<OrderBookEntry> = [];

  constructor() {
  }

  ngOnInit() {
  }

}
