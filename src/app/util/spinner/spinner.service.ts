import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';

export class SpinnerStatus {
  enabled: boolean;
  withWarning: boolean;

  constructor(enabled: boolean, withWarning: boolean) {
    this.enabled = enabled;
    this.withWarning = withWarning;
  }
}


@Injectable({providedIn: 'root'})
export class SpinnerService {
  private disablerSpinnerRunning: boolean;
  private requestSpinnerRunning: boolean;

  setSpinnerStatus = new Subject<boolean>();
  private spinnerStatusEmitter = new EventEmitter<SpinnerStatus>();
  getSpinnerStatus = this.spinnerStatusEmitter.asObservable();

  public enableDisablerSpinner() {
    this.disablerSpinnerRunning = true;
    this.spinnerStatusEmitter.emit(new SpinnerStatus(true, true));
    // console.log('spinner: started disabler');
  }

  public disableDisablerSpinner() {
    this.disablerSpinnerRunning = false;
    if (this.requestSpinnerRunning) {
      this.spinnerStatusEmitter.emit(new SpinnerStatus(true, false));
      // console.log('spinner: disabler -> request');
    } else {
      this.spinnerStatusEmitter.emit(new SpinnerStatus(false, false));
      // console.log('spinner: stopped');
    }
  }

  public enableRequestSpinner() {
    this.requestSpinnerRunning = true;
    this.decideIfStartRequestSpinner();
  }

  public disableRequestSpinner() {
    this.requestSpinnerRunning = false;
    this.decideIfStopRequestSpinner();
  }

  private decideIfStartRequestSpinner() {
    if (!this.disablerSpinnerRunning) {
      this.spinnerStatusEmitter.emit(new SpinnerStatus(true, false));
      // console.log('spinner: started request');
    }
  }

  private decideIfStopRequestSpinner() {
    if (!this.disablerSpinnerRunning) {
      this.spinnerStatusEmitter.emit(new SpinnerStatus(false, false));
      // console.log('spinner: stopped');
    }
  }

}
