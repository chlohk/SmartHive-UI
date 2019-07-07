import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Colony} from "../../settings/shared/colony.model";
import {Hive} from "../../settings/shared/hive.model";

@Component({
  selector: 'app-work-header',
  templateUrl: './work-header.component.html',
  styleUrls: ['./work-header.component.css']
})
export class WorkHeaderComponent implements OnChanges {

  @Input() colonies: Colony[];
  @Input() isCountingDownToUpdateData: boolean;

  currentlySelectedColonyId = '';
  currentlySelectedColony: Colony;
  currentlySelectedHiveId = '';

  @Output() announceSelectedHive = new EventEmitter<Hive>();
  @Output() announceSelectedColony = new EventEmitter<Colony>();

  constructor() { }

  ngOnChanges() {
    if(this.currentlySelectedColonyId && this.currentlySelectedHiveId) {
      this.renewHiveDataAcrossWorkComponent();
    }
  }

  onColonyChange() {
    this.currentlySelectedHiveId = '';
    this.currentlySelectedColony = this.colonies.find(
      (colony) => colony.id === +this.currentlySelectedColonyId
    );
    this.onHiveChange();
  }

  onHiveChange() {
    const currentlySelectedHive = this.currentlySelectedColony.hives.find(
      hive => hive.id === +this.currentlySelectedHiveId
    );
    this.announceSelectedHive.emit(currentlySelectedHive);
    this.announceSelectedColony.emit(this.currentlySelectedColony);
  }

  renewHiveDataAcrossWorkComponent() {
    const hiveId = this.currentlySelectedHiveId;
    this.onColonyChange();
    this.currentlySelectedHiveId = hiveId;
    this.onHiveChange();
  }
}
