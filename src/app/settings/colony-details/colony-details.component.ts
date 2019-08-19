import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {SettingsNavigationService} from "../shared/settings-navigation.service";
import {Colony} from "../shared/colony.model";
import {ColoniesService} from "../shared/colonies.service";
import {Hive} from "../shared/hive.model";

@Component({
  selector: 'app-colony-details',
  templateUrl: './colony-details.component.html',
  styleUrls: ['./colony-details.component.css']
})
export class ColonyDetailsComponent implements OnInit, OnChanges {
  loadedComponent = '';
  currentlySelectedColony: Colony;
  currentlySelectedHive: Hive;

  @Input() currentlySelectedColonyId = '';

  constructor(private settingsNavigationService: SettingsNavigationService,
              private coloniesService: ColoniesService) { }

  ngOnInit() {
    this.settingsNavigationService.colonyDetailsComponent.subscribe(
      loadedComponent => this.loadedComponent = loadedComponent
    );
    this.coloniesService.coloniesDataRetrieved$.subscribe(
      () => this.currentlySelectedColony = this.coloniesService.getColonyById(
        +this.currentlySelectedColonyId)
    );
  }

  ngOnChanges(): void {
    this.currentlySelectedColony = this.coloniesService.getColonyById(
      +this.currentlySelectedColonyId);
  }

  onNewHiveButtonClick() {
    if(this.settingsNavigationService.currentlyLoadedColonyDetailsComponent === 'newHive') {
      this.settingsNavigationService.colonyDetailsComponent.next('');
    } else {
      this.settingsNavigationService.colonyDetailsComponent.next('newHive');
    }
  }

  onEditHiveButtonClick(currentlySelectedHive: Hive) {
    if(this.settingsNavigationService.currentlyLoadedColonyDetailsComponent === 'editHive'
        && this.currentlySelectedHive === currentlySelectedHive) {
      this.settingsNavigationService.colonyDetailsComponent.next('');
      this.currentlySelectedHive = null;
    } else {
      this.settingsNavigationService.colonyDetailsComponent.next('editHive');
      this.currentlySelectedHive = currentlySelectedHive;
    }
  }
}
