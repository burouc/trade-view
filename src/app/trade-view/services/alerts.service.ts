import { Injectable } from '@angular/core';
import { AlertConfig } from '../models/alert-config.model';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AlertType } from '../models/alert-type.enum';

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
