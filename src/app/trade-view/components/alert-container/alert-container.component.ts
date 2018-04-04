import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AlertsService } from '../../services/alerts.service';
import { AlertConfig, AlertType } from '../../models';

@Component({
  selector: 'app-alert-container',
  templateUrl: './alert-container.component.html'
})
export class AlertContainerComponent implements OnDestroy {
  public isAlertVisible = false;
  public alertType: AlertType;
  public text = '';

  private alertsSubscription: Subscription;


  public constructor(private alertsService: AlertsService) {
    this.initAlertsSubscription();
  }

  public ngOnDestroy() {
    if (this.alertsSubscription) {
      this.alertsSubscription.unsubscribe();
    }
  }

  public hideAlert(): void {
    this.isAlertVisible = false;
  }

  public initAlertsSubscription(): void {
    this.alertsSubscription = this
      .alertsService
      .currentAlertConfig$
      .subscribe((alertConfig: AlertConfig) => {
        this.alertType = alertConfig.type;
        this.text = alertConfig.text;
        this.isAlertVisible = true;
      });
  }
}
