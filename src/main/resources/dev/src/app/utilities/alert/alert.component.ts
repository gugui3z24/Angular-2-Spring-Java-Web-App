import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertConfig } from './alert-config';
import { AlertService } from './alert.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  public alert: AlertConfig;
  private destroy = new Subject<void>();

  constructor(protected alertService: AlertService) { }

  ngOnInit() {
    this.alertService.alertObservable.pipe(takeUntil(this.destroy)).subscribe((config: AlertConfig) => {
      this.alert = config;
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  public closeAlert(): void {
    this.alert = null;
    this.alertService.closeAlert();
  }

}
