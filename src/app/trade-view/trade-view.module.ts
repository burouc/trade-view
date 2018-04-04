import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { OrderBookComponent, TradeViewComponent } from './components';
import { TradeViewService } from './services/trade-view.service';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TradeViewApiService } from './services/trade-view-api.service';
import { AlertContainerComponent } from './components/alert-container/alert-container.component';
import { AlertsService } from './services/alerts.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [OrderBookComponent, TradeViewComponent, OrderFormComponent, AlertContainerComponent],
  exports: [OrderBookComponent, TradeViewComponent],
  providers: [TradeViewService, TradeViewApiService, AlertsService]
})
export class TradeViewModule {
}
