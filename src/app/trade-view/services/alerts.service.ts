import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AlertConfig, AlertType } from '../models';

@Injectable()
export class AlertsService {

  public currentAlertConfig$: Observable<AlertConfig>;

  private currentAlertConfig: Subject<AlertConfig> = new Subject();

  constructor() {
    this.currentAlertConfig$ = this.currentAlertConfig.asObservable();
  }

  showErrorMessage(text: string) {
    this.currentAlertConfig.next({
      text,
      type: AlertType.Danger
    });
  }

  showSuccessMessage(text: string) {

    this.currentAlertConfig.next({
      text,
      type: AlertType.Success
    });
  }

}
