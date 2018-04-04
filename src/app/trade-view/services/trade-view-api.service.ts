import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TradeViewApiService {

  private url = 'api/trade-view';

  constructor(private httpClient: HttpClient) {
  }

  public placeOrder(order: Order): Promise<object> {
    return this
      .httpClient
      .post(`${this.url}/place-order`, order)
      .toPromise();
  }
}
