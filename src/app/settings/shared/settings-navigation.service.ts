import {Subject} from "rxjs";

export class SettingsNavigationService {
  mainSettingsComponent = new Subject<string>();
  colonyDetailsComponent = new Subject<string>();
  chooseColonyWithIdAfterNavigation = new Subject<string>();

  currentlyLoadedColonyDetailsComponent = '';

  constructor() {
    this.colonyDetailsComponent.subscribe(
      loadedComponent => this.currentlyLoadedColonyDetailsComponent = loadedComponent
    )
  }
}
