import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderBookComponent } from './components';
import { TradeViewComponent } from './components/trade-view/trade-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OrderBookComponent, TradeViewComponent],
  exports: [OrderBookComponent, TradeViewComponent]
})
export class TradeViewModule {
}
