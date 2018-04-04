import { AlertType } from './alert-type.enum';

export interface AlertConfig {
  type: AlertType;
  text: string;
}
