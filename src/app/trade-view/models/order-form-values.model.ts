import { OrderType } from './order-type.enum';

export interface OrderFormValues {
  price: number;
  amount: number;
  type: OrderType;
}
