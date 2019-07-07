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
  sizeLogs: Size[];
  blockToEdit = 'current';
  sizeLogCurrent: Size = null;
  sizeLogPrevious: Size = null;
  sizeLogBeforePrevious: Size = null;

  constructor(private sizeService: SizeService) { }

  ngOnChanges() {
    this.sizeService.onGetSizeData(this.currentlyChosenHive.id).then(
      data => {
        this.sizeLogs = data;
      }
    );
    this.blockToEdit = 'current';
  }

  chooseNewBlockToEdit(blockToEditNow: string) {
    this.blockToEdit = blockToEditNow;
  }

  notifyIfIsCountingDownToUpdateData(isCountingDownToUpdateData: boolean) {
    this.isCountingDownToUpdateData.emit(isCountingDownToUpdateData);
    this.isCountingDown = isCountingDownToUpdateData;
  }

  getColWidth(blockName: string) {
    return this.blockToEdit === blockName ? 'col-4' : 'col-3';
  }

}
