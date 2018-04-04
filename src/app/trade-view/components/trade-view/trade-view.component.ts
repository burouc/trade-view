import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { OrderBookEntry, OrderType } from '../../models';
import { TradeViewApiService, TradeViewService } from '../../services';
import { Order } from '../../models/order.model';
import { OrderFormValues } from '../../models/order-form-values.model';
import { AlertsService } from '../../services/alerts.service';

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

  public isSocketConnected = false;
  public isOrderPlacementInProgress = false;

  constructor(private tradeViewService: TradeViewService,
              private tradeViewApiService: TradeViewApiService,
              private alertsService: AlertsService) {
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
        }

        this.isSocketConnected = isConnected;
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
        this.alertsService.showSuccessMessage('Order placed successfully!');
      })
      .catch((err) => {
        this.alertsService.showErrorMessage(`Couldn't place order!`);
      });
  }
}
