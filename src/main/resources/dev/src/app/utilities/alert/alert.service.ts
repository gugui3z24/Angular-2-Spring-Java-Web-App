import { Injectable } from '@angular/core';
import { AlertConfig } from './alert-config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public alertObservable = new BehaviorSubject<AlertConfig>(null);
  private timerInterval: any;

  constructor() { }

  public showAlert(config: AlertConfig): void {
    clearInterval(this.timerInterval);
    this.alertObservable.next(config);
    const timer = config.timer ? config.timer : 2000;
    this.timerInterval = setInterval(() => {
      this.closeAlert();
      clearInterval(this.timerInterval);
    }, timer);
  }

  public closeAlert(): void {
    this.alertObservable.next(null);
  }
}
