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
  @Input() sizeLog: Size;
  @Output() isCountingDownToUpdateData = new EventEmitter<boolean>();
  timerRunning = false;
  shouldRunAnotherRound = false;

  constructor(private sizeService: SizeService) { }

  ngOnChanges() {
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
    }
  }

  onDecreaseAddedNumOfFrames() {
    if(this.sizeLog.addedNumOfFrames >= 1 && this.sizeLog.totalNumOfFrames >= 1) {
      this.sizeLog.addedNumOfFrames -= 1;
      this.sizeLog.totalNumOfFrames -= 1;
      this.startCountdownToUpdateSizelogAtBackend();
    }
  }

  onIncreaseRemovedNumOfFrames() {
    if(this.sizeLog.removedNumOfFrames <=98 && this.sizeLog.totalNumOfFrames >= 1) {
      this.sizeLog.removedNumOfFrames += 1;
      this.sizeLog.totalNumOfFrames -= 1;
      this.startCountdownToUpdateSizelogAtBackend();
    }
  }

  onDecreaseRemovedNumOfFrames() {
    if(this.sizeLog.removedNumOfFrames >=1 && this.sizeLog.totalNumOfFrames <= 98) {
      this.sizeLog.removedNumOfFrames -= 1;
      this.sizeLog.totalNumOfFrames += 1;
      this.startCountdownToUpdateSizelogAtBackend();
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

  async startCountdownToUpdateSizelogAtBackend() {
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
            this.sizeService.onUpdateSizeData(this.idOfCurrentHive, this.sizeLog);
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
