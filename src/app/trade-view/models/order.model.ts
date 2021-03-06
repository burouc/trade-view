import { OrderType } from './order-type.enum';

export interface Order {
  baseAsset: string;
  quoteAsset: string;
  price: number;
  amount: number;
  type: OrderType;
}
