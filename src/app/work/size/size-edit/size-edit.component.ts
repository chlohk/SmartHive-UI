import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {SizeDataService} from "../size-data.service";
import {Size} from "../size.model";
import {SizeService} from "../size.service";

@Component({
  selector: 'app-size-edit',
  templateUrl: './size-edit.component.html',
  styleUrls: ['./size-edit.component.css']
})
export class SizeEditComponent implements OnChanges {
  @Input() blockName: string;
  @Input() idOfCurrentHive: number;
  @Input() sizeLogs: Size[] = null;
  @Output() isCountingDownToUpdateData = new EventEmitter<boolean>();
  sizeLog: Size;
  timerRunning = false;
  shouldRunAnotherRound = false;

  constructor(private sizeService: SizeService) { }
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


  onIncreaseMagazineSize() {
    if(this.sizeLog.hasMagazine === false) {
      this.sizeLog.magazineSize = 0;
      this.sizeLog.hasMagazine = true;
      this.startCountdownToUpdateSizelogAtBackend();
    } else if (this.sizeLog.hasMagazine === true && this.sizeLog.magazineSize <= 80) {
      this.sizeLog.magazineSize += 20;
      this.startCountdownToUpdateSizelogAtBackend();
    }
  }

  onDecreaseMagazineSize() {
    if(this.sizeLog.hasMagazine === true && this.sizeLog.magazineSize >= 20) {
      this.sizeLog.magazineSize -= 20;
      this.startCountdownToUpdateSizelogAtBackend();
    } else if(this.sizeLog.hasMagazine === true && this.sizeLog.magazineSize === 0) {
      this.sizeLog.hasMagazine = false;
      this.startCountdownToUpdateSizelogAtBackend();
    }
  }

  onIncreaseAddedNumOfFrames() {
    if(this.sizeLog.addedNumOfFrames <= 98 && this.sizeLog.totalNumOfFrames <= 98) {
      this.sizeLog.addedNumOfFrames += 1;
      this.sizeLog.totalNumOfFrames += 1;
      this.startCountdownToUpdateSizelogAtBackend();
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
      this.startCountdownToUpdateSizelogAtBackend();
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
      this.startCountdownToUpdateSizelogAtBackend();
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
      this.startCountdownToUpdateSizelogAtBackend();
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
      this.startCountdownToUpdateSizelogAtBackend();
    }
  }

  onIncreaseRemovedCocoons() {
    if(this.sizeLog.removedCocoons <=98) {
      this.sizeLog.removedCocoons += 1;
      this.startCountdownToUpdateSizelogAtBackend();
    }
  }

  startCountdownToUpdateSizelogAtBackend() {
    if(this.timerRunning) {
      this.shouldRunAnotherRound = true;
      // console.log('...must run one more time');
    } else {
      setTimeout(
        () => {
          this.timerRunning = false;
          if(this.shouldRunAnotherRound) {
            this.shouldRunAnotherRound = false;
            this.startCountdownToUpdateSizelogAtBackend();
            // console.log('...will run for a second time');
          } else {
            // console.log('-> send request')
            if (this.blockName === 'current') {
              this.sizeService.onUpdateSizeData(this.idOfCurrentHive, this.sizeLog);
            }
            if (this.blockName === 'previous') {
              this.sizeService.onUpdateSizeData(this.idOfCurrentHive, this.sizeLogs[0]);
              this.sizeService.onUpdateSizeData(this.idOfCurrentHive, this.sizeLog);
            }
            if (this.blockName === 'beforePrevious') {
              this.sizeService.onUpdateSizeData(this.idOfCurrentHive, this.sizeLogs[0]);
              this.sizeService.onUpdateSizeData(this.idOfCurrentHive, this.sizeLogs[1]);
              this.sizeService.onUpdateSizeData(this.idOfCurrentHive, this.sizeLog);
            }
            this.isCountingDownToUpdateData.emit(false);
          }
        }, 1200
      );
      this.timerRunning = true;
      this.isCountingDownToUpdateData.emit(true);
      // console.log('! started Timer');
    }
  }


}
