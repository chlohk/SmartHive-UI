import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Colony} from "../../settings/shared/colony.model";
import {Hive} from "../../settings/shared/hive.model";

@Component({
  selector: 'app-work-header',
  templateUrl: './work-header.component.html',
  styleUrls: ['./work-header.component.css']
})
export class WorkHeaderComponent implements OnInit {

  @Input() colonies: Colony[];

  currentlySelectedColonyId = '';
  currentlySelectedColony: Colony;
  currentlySelectedHiveId = '';

  @Output() currentlySelectedHive = new EventEmitter<Hive>();

  constructor() { }

  ngOnInit() {
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
    this.currentlySelectedHive.emit(currentlySelectedHive);
  }

}
