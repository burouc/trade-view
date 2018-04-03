import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderBookComponent, TradeViewComponent } from './components';
import { TradeViewService } from './services/trade-view.service';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [OrderBookComponent, TradeViewComponent, OrderFormComponent],
  exports: [OrderBookComponent, TradeViewComponent],
  providers: [TradeViewService]
})
export class TradeViewModule {
}
