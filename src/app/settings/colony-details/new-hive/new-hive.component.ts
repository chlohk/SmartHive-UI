import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Colony} from "../../shared/colony.model";
import {ColoniesService} from "../../shared/colonies.service";
import {SettingsNavigationService} from "../../shared/settings-navigation.service";
import {Hive} from "../../shared/hive.model";

@Component({
  selector: 'app-new-hive',
  templateUrl: './new-hive.component.html',
  styleUrls: ['./new-hive.component.css']
})
export class NewHiveComponent implements OnInit {
  newHiveDescription = '-';
  newHiveNumber: number = null;
  colonies: Colony[];
  warningHiveNumberExists = false;
  currentlySelectedColony: Colony;
  @Input() currentlySelectedColonyId = '';

  constructor(private coloniesService: ColoniesService,
              private settingsNavigationService: SettingsNavigationService) { }

  ngOnInit() {
    this.colonies = this.coloniesService.getColonies();
    this.currentlySelectedColony = this.coloniesService.getColonyById(+this.currentlySelectedColonyId);
    this.newHiveNumber = this.newHiveNumberSuggestion();
  }

  cancelAddingNewHive() {
    this.settingsNavigationService.colonyDetailsComponent.next('');
  }

  addNewHive(number: number, colonyIdHiveBelongsTo: string, description?: string) {
    const colonyHiveWouldBelongTo = this.colonies.find(
      colony => colony.id === +colonyIdHiveBelongsTo
    );
    const hiveWithTheSameNumber = colonyHiveWouldBelongTo.hives.find(
      hive => number === hive.number
    );
    if(hiveWithTheSameNumber) {
      this.warningHiveNumberExists = true;
      return;
    }
    this.coloniesService.addNewHive(number, colonyIdHiveBelongsTo, description)
  }

  newHiveNumberSuggestion(): number {
    for(let i = 1; i <= 999; i++) {
      if(this.currentlySelectedColony.hives.find((hive) => hive.number === i)) {
       continue;
      } else {
        return i;
      }
    }
  }

}
