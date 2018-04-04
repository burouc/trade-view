import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Order } from '../models';

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
