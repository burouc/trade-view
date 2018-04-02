import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TradeViewModule } from './trade-view/trade-view.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TradeViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
