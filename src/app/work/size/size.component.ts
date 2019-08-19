import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Hive } from '../../settings/shared/hive.model';
import { Size } from './size.model';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnChanges {
  @Input() currentlyChosenHive: Hive;
  @Output() isCountingDownToUpdateData = new EventEmitter<boolean>();
  isCountingDown = false;
  blockToEdit = 'current';
  sizeLogCurrent: Size = null;
  sizeLogPrevious: Size = null;
  sizeLogBeforePrevious: Size = null;

  constructor() {
  }

  ngOnChanges() {
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
