import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Size } from '../size.model';

@Component({
  selector: 'app-size-view',
  templateUrl: './size-view.component.html',
  styleUrls: ['./size-view.component.css']
})
export class SizeViewComponent implements OnChanges {
  @Input() blockName: string;
  @Input() sizeLogs: Size[] = null;
  @Input() isCountingDownToUpdateData: boolean;
  @Output() editMEEEE = new EventEmitter<string>();
  sizeLog: Size;

  constructor() {
  }

  ngOnChanges() {
    if (this.sizeLogs) {
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

  chooseMyBlockToEdit() {
    this.editMEEEE.emit(this.blockName);
  }

}
