import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderBookComponent, TradeViewComponent } from './components';
import { TradeViewService } from './services/trade-view.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OrderBookComponent, TradeViewComponent],
  exports: [OrderBookComponent, TradeViewComponent],
  providers: [TradeViewService]
})
export class TradeViewModule {
}
