import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { OrderBookEntry, OrderType } from '../../models';
import { TradeViewApiService, TradeViewService } from '../../services';
import { Order } from '../../models/order.model';
import { OrderFormValues } from '../../models/order-form-values.model';

@Component({
  selector: 'app-trade-view',
  templateUrl: './trade-view.component.html'
})
export class TradeViewComponent implements OnInit {
  public baseAsset = 'ETH';
  public quoteAsset = 'BTC';

  public buyOrderBook$: Observable<Array<OrderBookEntry>>;
  public sellOrderBook$: Observable<Array<OrderBookEntry>>;

  public orderType: typeof OrderType = OrderType;

  constructor(private tradeViewService: TradeViewService,
              private tradeViewApiService: TradeViewApiService) {
    this.buyOrderBook$ = this.tradeViewService.buyOrderBook$;
    this.sellOrderBook$ = this.tradeViewService.sellOrderBook$;
  }

  ngOnInit() {
    this
      .tradeViewService
      .isConnected$
      .subscribe((isConnected: boolean) => {
        if (isConnected) {
          this.tradeViewService.emitOrderBookConfig(this.baseAsset, this.quoteAsset);
        } else {
          // TODO: Add indication that socket is disconnected
        }
      });
    this.tradeViewService.connectToSocket();
  }

  public onPlaceOrder(orderFormValues: OrderFormValues, orderType: OrderType): void {
    const order: Order = {
      price: orderFormValues.price,
      amount: orderFormValues.amount,
      type: orderType,
      baseAsset: this.baseAsset,
      quoteAsset: this.quoteAsset
    };

    this
      .tradeViewApiService
      .placeOrder(order)
      .then((orderResult) => {
        // TODO: Show success message.
      })
      .catch((err) => {
        // TODO: Show error message.
      });
  }
}
