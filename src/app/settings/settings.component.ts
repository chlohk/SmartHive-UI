import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Colony} from "./shared/colony.model";
import {ColoniesService} from "./shared/colonies.service";
import {SettingsDataService} from "./shared/settings-data.service";
import {SpinnerService} from "../util/spinner/spinner.service";
import {SettingsNavigationService} from "./shared/settings-navigation.service";
import {JwModalService} from "../util/jw-modal/jw-modal.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  currentlySelectedColonyId = '';
  colonies: Colony[];
  loadedComponent = '';
  @ViewChild('selectField') selectField;

  constructor(private settingsNavigationService: SettingsNavigationService,
              private coloniesService: ColoniesService,
              private spinnerService: SpinnerService) { }

  async ngOnInit() {
    this.settingsNavigationService.mainSettingsComponent.subscribe(
      loadedComponent => this.loadedComponent = loadedComponent
    );
    this.settingsNavigationService.chooseColonyWithIdAfterNavigation.subscribe(
      id => this.currentlySelectedColonyId = id
    );

    this.coloniesService.coloniesChanged.subscribe(
      colonies => this.colonies = colonies
    );
    this.coloniesService.getColoniesData();

     setTimeout(()=> {
       this.spinnerService.setSpinnerStatus.next(false);
     }, 0);
  }

  onNewColonyButtonClick() {
    this.settingsNavigationService.colonyDetailsComponent.next('');
    this.currentlySelectedColonyId = '';
    if(this.loadedComponent === 'newColony') {
      this.loadedComponent = '';
    } else {
      this.loadedComponent = 'newColony';
    }
  }

  onEditColonyButtonClick() {
    if(this.settingsNavigationService.currentlyLoadedColonyDetailsComponent === 'editColony') {
      this.settingsNavigationService.colonyDetailsComponent.next('');
    } else {
      this.settingsNavigationService.colonyDetailsComponent.next('editColony');
    }
  }

  onChange() {
    this.settingsNavigationService.mainSettingsComponent.next('colonyDetails');
    this.settingsNavigationService.colonyDetailsComponent.next('');
  }

  closeApp() {
    window.close();
  }
}
