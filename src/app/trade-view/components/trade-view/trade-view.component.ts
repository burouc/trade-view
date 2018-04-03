import { Component, OnInit } from '@angular/core';
import { OrderBookEntry } from '../../models';
import { TradeViewService } from '../../services/trade-view.service';
import { Observable } from 'rxjs/Observable';
import { OrderType } from '../../models/order-type.enum';

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

  constructor(private tradeViewService: TradeViewService) {
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

}
