import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Hive} from "../../settings/shared/hive.model";
import {SizeService} from "./size.service";
import {Size} from "./size.model";

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnChanges {
  @Input() currentlyChosenHive: Hive;
  @Output() isCountingDownToUpdateData = new EventEmitter<boolean>();
  isCountingDown = false;
  sizeLog: Size[];
  blockToEdit = 'current';
  sizeLogCurrent: Size = null;
  sizeLogPrevious: Size = null;
  sizeLogBeforePrevious: Size = null;

  constructor(private sizeService: SizeService) { }

  ngOnChanges() {
    this.sizeService.onGetSizeData(this.currentlyChosenHive.id).then(
      data => {
        this.sizeLog = data;
        this.sizeLogCurrent = this.sizeLog.length >= 1 ? this.sizeLog[0] : null;
        this.sizeLogPrevious = this.sizeLog.length >= 2 ? this.sizeLog[1] : null;
        this.sizeLogBeforePrevious = this.sizeLog.length >= 3 ? this.sizeLog[2] : null;
        console.log(this.sizeLog);
        console.log(this.sizeLog.length);
        console.log(this.sizeLogCurrent);
        console.log(this.sizeLogPrevious);
        console.log(this.sizeLogBeforePrevious);
      }
    );
  }

  chooseNewBlockToEdit(blockToEditNow: string) {
    this.blockToEdit = blockToEditNow;
  }

  notifyIfIsCountingDownToUpdateData(isCountingDownToUpdateData: boolean) {
    this.isCountingDownToUpdateData.emit(isCountingDownToUpdateData);
    this.isCountingDown = isCountingDownToUpdateData;
  }

}
