import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Order, OrderType } from '../../models';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html'
})
export class OrderFormComponent implements OnInit {
  @Input() orderType: OrderType;

  @Input() baseAsset: string;
  @Input() quoteAsset: string;

  @Input() suggestedPrice = 0;

  @Output() placeOrder: EventEmitter<Order> = new EventEmitter();

  public orderForm: FormGroup;

  private numberRegex = /^-?\d*\.?\d*$/;

  constructor(private formBuilder: FormBuilder) {
    this.orderForm = this
      .formBuilder
      .group({
        price: [0, [Validators.required, Validators.pattern(this.numberRegex), Validators.min(0.000001)]],
        amount: [0, [Validators.required, Validators.pattern(this.numberRegex), Validators.min(0.001)]]
      });
  }

  public ngOnInit() {
  }

  public get title(): string {
    return this.orderType === OrderType.Buy
      ? `Buy ${this.baseAsset}`
      : `Sell ${this.baseAsset}`;
  }

  public get buttonClasses(): Array<string> {
    return this.orderType === OrderType.Buy
      ? ['btn-success']
      : ['btn-danger'];
  }

  public get buttonText(): string {
    return this.orderType === OrderType.Buy
      ? 'BUY'
      : 'SELL';
  }

  public submit(): void {
    if (this.orderForm.invalid) {
      return;
    }

    // TODO: Emit place order.
  }
}
