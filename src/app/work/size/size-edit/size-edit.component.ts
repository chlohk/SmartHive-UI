import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Size } from '../size.model';
import { SizeService } from '../size.service';
import { Subscription } from 'rxjs';
import { ExecutorService, ProtectionState } from '../../../util/executor/executor.service';
import { ControlsProtectionIdEnum } from '../../../util/executor/controls-protection-id.enum';

@Component({
  selector: 'app-size-edit',
  templateUrl: './size-edit.component.html',
  styleUrls: ['./size-edit.component.css']
})
export class SizeEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() blockName: string;
  @Input() idOfCurrentHive: number;
  @Input() sizeLogs: Size[] = null;
  sizeLog: Size;
  subscriptions: Subscription[] = [];
  disableControls: boolean;

  constructor(private sizeService: SizeService,
              private executorService: ExecutorService) { }

  ngOnChanges() {
    if(this.sizeLogs) {
      if (this.blockName === 'current') {
        this.sizeLog = this.sizeLogs.length >= 1 ? this.sizeLogs[0] : null;
      }
      if (this.blockName === 'previous') {
        this.sizeLog = this.sizeLogs.length >= 2 ? this.sizeLogs[1] : null;
      }
      if (this.blockName === 'beforePrevious') {
        this.sizeLog = this.sizeLogs.length >= 3 ? this.sizeLogs[2] : null;
      }
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.executorService.getControlsProtection.subscribe(
        (ps: ProtectionState) => {
          if(!ps.disableControls) {
            this.disableControls = false;
            return;
          }
          this.disableControls = ps.omittedControlsId != ControlsProtectionIdEnum.SIZELOG
        }
      )
    );
  }


  onIncreaseMagazineSize() {
    if(this.sizeLog.hasMagazine === false) {
      this.sizeLog.magazineSize = 0;
      this.sizeLog.hasMagazine = true;
      this.callUpdate()
    } else if (this.sizeLog.hasMagazine === true && this.sizeLog.magazineSize <= 80) {
      this.sizeLog.magazineSize += 20;
      this.callUpdate()
    }
  }

  onDecreaseMagazineSize() {
    if(this.sizeLog.hasMagazine === true && this.sizeLog.magazineSize >= 20) {
      this.sizeLog.magazineSize -= 20;
      this.callUpdate()
    } else if(this.sizeLog.hasMagazine === true && this.sizeLog.magazineSize === 0) {
      this.sizeLog.hasMagazine = false;
      this.callUpdate()
    }
  }

  onIncreaseAddedNumOfFrames() {
    if(this.sizeLog.addedNumOfFrames <= 98 && this.sizeLog.totalNumOfFrames <= 98) {
      this.sizeLog.addedNumOfFrames += 1;
      this.sizeLog.totalNumOfFrames += 1;
      this.callUpdate();
      if(this.blockName === 'previous') {
        this.sizeLogs[0].totalNumOfFrames++;
      }
      if(this.blockName === 'beforePrevious') {
        this.sizeLogs[0].totalNumOfFrames++;
        this.sizeLogs[1].totalNumOfFrames++;
      }
    }
  }

  onDecreaseAddedNumOfFrames() {
    if(this.sizeLog.addedNumOfFrames >= 1 && this.sizeLog.totalNumOfFrames >= 1) {
      this.sizeLog.addedNumOfFrames -= 1;
      this.sizeLog.totalNumOfFrames -= 1;
      this.callUpdate();
      if(this.blockName === 'previous') {
        this.sizeLogs[0].totalNumOfFrames--;
      }
      if(this.blockName === 'beforePrevious') {
        this.sizeLogs[0].totalNumOfFrames--;
        this.sizeLogs[1].totalNumOfFrames--;
      }
    }
  }

  onIncreaseRemovedNumOfFrames() {
    if(this.sizeLog.removedNumOfFrames <=98 && this.sizeLog.totalNumOfFrames >= 1) {
      this.sizeLog.removedNumOfFrames += 1;
      this.sizeLog.totalNumOfFrames -= 1;
      this.callUpdate();
      if(this.blockName === 'previous') {
        this.sizeLogs[0].totalNumOfFrames--;
      }
      if(this.blockName === 'beforePrevious') {
        this.sizeLogs[0].totalNumOfFrames--;
        this.sizeLogs[1].totalNumOfFrames--;
      }
    }
  }

  onDecreaseRemovedNumOfFrames() {
    if(this.sizeLog.removedNumOfFrames >=1 && this.sizeLog.totalNumOfFrames <= 98) {
      this.sizeLog.removedNumOfFrames -= 1;
      this.sizeLog.totalNumOfFrames += 1;
      this.callUpdate();
      if(this.blockName === 'previous') {
        this.sizeLogs[0].totalNumOfFrames++;
      }
      if(this.blockName === 'beforePrevious') {
        this.sizeLogs[0].totalNumOfFrames++;
        this.sizeLogs[1].totalNumOfFrames++;
      }
    }
  }

  onDecreaseRemovedCocoons() {
    if(this.sizeLog.removedCocoons >=1) {
      this.sizeLog.removedCocoons -= 1;
      this.callUpdate()
    }
  }

  onIncreaseRemovedCocoons() {
    if(this.sizeLog.removedCocoons <=98) {
      this.sizeLog.removedCocoons += 1;
      this.callUpdate()
    }
  }

  callUpdate() {
    if (this.blockName === 'current') {
      this.executorService.exeWithTimer(
        this.sizeService.updateSizeData,
        [this.idOfCurrentHive, [this.sizeLog]],
        ControlsProtectionIdEnum.SIZELOG
      );
    }
    if (this.blockName === 'previous') {
      this.executorService.exeWithTimer(
        this.sizeService.updateSizeData,
        [this.idOfCurrentHive, [this.sizeLogs[0], this.sizeLog]],
        ControlsProtectionIdEnum.SIZELOG
      );
    }
    if (this.blockName === 'beforePrevious') {
      this.executorService.exeWithTimer(
        this.sizeService.updateSizeData,
        [this.idOfCurrentHive, [this.sizeLogs[0], this.sizeLogs[1], this.sizeLog]],
        ControlsProtectionIdEnum.SIZELOG
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (s: Subscription) => s.unsubscribe()
    );
  }

}
