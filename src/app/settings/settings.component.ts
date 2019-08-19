import { Component, OnInit, ViewChild } from '@angular/core';
import { Colony } from './shared/colony.model';
import { ColoniesService } from './shared/colonies.service';
import { SpinnerService } from '../util/spinner/spinner.service';
import { SettingsNavigationService } from './shared/settings-navigation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currentlySelectedColonyId = '';
  colonies: Colony[];
  loadedComponent = '';
  @ViewChild('selectField') selectField;

  constructor(private settingsNavigationService: SettingsNavigationService,
              private coloniesService: ColoniesService,
              private spinnerService: SpinnerService) {
  }

  async ngOnInit() {
    this.settingsNavigationService.mainSettingsComponent.subscribe(
      loadedComponent => this.loadedComponent = loadedComponent
    );
    this.settingsNavigationService.chooseColonyWithIdAfterNavigation.subscribe(
      id => this.currentlySelectedColonyId = id
    );

    this.coloniesService.coloniesDataRetrieved$.subscribe(
      colonies => this.colonies = colonies
    );
    this.coloniesService.retrieveColonies();

    setTimeout(() => {
      this.spinnerService.setSpinnerStatus.next(false);
    }, 0);
  }

  onNewColonyButtonClick() {
    this.settingsNavigationService.colonyDetailsComponent.next('');
    this.currentlySelectedColonyId = '';
    if (this.loadedComponent === 'newColony') {
      this.loadedComponent = '';
    } else {
      this.loadedComponent = 'newColony';
    }
  }

  onEditColonyButtonClick() {
    if (this.settingsNavigationService.currentlyLoadedColonyDetailsComponent === 'editColony') {
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
    this.exitFullScreen(document);
  }

  exitFullScreen(element) {
    var requestMethod = element.exitFullscreen ||
      element.mozCancelFullScreen ||
      element.webkitExitFullscreen ||
      element.msExitFullscreen;
    if (requestMethod) {
      requestMethod.call(element);
    } else {
      console.log('Oops. Request method false.');
    }
  }
}
