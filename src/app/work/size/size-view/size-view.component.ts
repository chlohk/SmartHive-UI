import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hive} from "../../../settings/shared/hive.model";
import {Size} from "../size.model";

@Component({
  selector: 'app-size-view',
  templateUrl: './size-view.component.html',
  styleUrls: ['./size-view.component.css']
})
export class SizeViewComponent implements OnInit {
  @Input() blockName: string;
  @Input() sizeLog: Size;
  @Input() isCountingDownToUpdateData: boolean;
  @Output() editMEEEE = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  chooseMyBlockToEdit() {
    this.editMEEEE.emit(this.blockName);
  }

}
