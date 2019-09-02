import { EventEmitter, Injectable } from '@angular/core';
import { SpinnerService } from '../spinner/spinner.service';
import { ControlsProtectionIdEnum } from './controls-protection-id.enum';

export class ProtectionState {
  disableControls: boolean;
  omittedControlsId: ControlsProtectionIdEnum;

  constructor(isUpdating: boolean, omittedControlsId: ControlsProtectionIdEnum) {
    this.disableControls = isUpdating;
    this.omittedControlsId = omittedControlsId;
  }
}

@Injectable({providedIn: 'root'})
export class ExecutorService {

  constructor(private spinnerService: SpinnerService) {
  }

  private timerRunning: boolean;
  private shouldRunAnotherRound: boolean;
  private controlsProtection = new EventEmitter<ProtectionState>();
  getControlsProtection = this.controlsProtection.asObservable();


  public exeWithTimer(executable: Function, params: any[], id: ControlsProtectionIdEnum) {
    if (this.timerRunning) {
      this.shouldRunAnotherRound = true;
      // console.log('...must run one more time');
    } else {
      setTimeout(
        () => {
          this.timerRunning = false;
          if (this.shouldRunAnotherRound) {
            this.shouldRunAnotherRound = false;
            this.exeWithTimer(executable, params, id);
            // console.log('...will run for a second time');
          } else {
            // console.log('-> execute')
            this.enableControls(id);
            this.execute(executable, params);
          }
        }, 1200
      );
      this.timerRunning = true;
      this.disableControls(id);
      // console.log('! started Timer');
    }
  }

  private disableControls(id: number) {
    this.spinnerService.enableDisablerSpinner();
    this.controlsProtection.emit(new ProtectionState(true, id));
  }

  private enableControls(id: number) {
    this.spinnerService.disableDisablerSpinner();
    this.controlsProtection.emit(new ProtectionState(false, id));
  }

  private execute(executable: Function, params: any[]) {
    if (params.length === 1) {
      executable(params[0]);
    }
    if (params.length === 2) {
      executable(params[0], params[1]);
    }
  }
}
