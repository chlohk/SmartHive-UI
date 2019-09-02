import { Component, Input, OnChanges } from '@angular/core';
import { Hive } from '../../settings/shared/hive.model';
import { Size } from './size.model';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent {
  @Input() currentlyChosenHive: Hive;
  blockToEdit = 'current';
  sizeLogCurrent: Size = null;
  sizeLogPrevious: Size = null;
  sizeLogBeforePrevious: Size = null;

  chooseNewBlockToEdit(blockToEditNow: string) {
    this.blockToEdit = blockToEditNow;
  }

  getColWidth(blockName: string) {
    return this.blockToEdit === blockName ? 'col-4' : 'col-3';
  }
}
