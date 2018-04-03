import { OrderType } from './order-type.enum';

export interface Order {
  price: number;
  amount: number;
  type: OrderType;
}
