import { Colony } from './colony.model';
import { Subject } from 'rxjs';
import { SettingsDataService } from './settings-data.service';
import { Injectable } from '@angular/core';
import { SettingsNavigationService } from './settings-navigation.service';
import { SpinnerService } from '../../util/spinner/spinner.service';
import { Hive } from './hive.model';
import * as cloneDeep from 'lodash/cloneDeep';
import { take } from 'rxjs/operators';
import { LoadingService } from '../../util/loading/loading.service';

@Injectable()
export class ColoniesService {
  private colonyHiveSelectionMade = new Subject<{ colonyId: number, hiveId?: number }>();
  private initialColoniesData: Colony[];
  private colonies: Colony[];
  private isInitialColoniesDataSet = false;
  private coloniesDataRetrieved = new Subject<Colony[]>();
  coloniesDataRetrieved$ = this.coloniesDataRetrieved.asObservable();
  colonyHiveSelectionChanged$ = this.colonyHiveSelectionMade.asObservable();

  constructor(private settingsDataService: SettingsDataService,
              private settingsNavigationService: SettingsNavigationService,
              private spinnerService: SpinnerService,
              private loadingService: LoadingService) {
  }

  getColonyById(id: number): Colony {
    return this.colonies.find(
      colony => colony.id === id
    );
  }

  notifyColonyHiveSelection(colonyId: number, hiveId?: number) {
    if (hiveId) {
      this.colonyHiveSelectionMade.next({colonyId, hiveId});
    } else {
      this.colonyHiveSelectionMade.next({colonyId});
    }
  }

  getColonies() {
    return this.colonies;
  }

  //For mother component to be able to show previous values that can be reversed after being changed
  getInitialColoniesData() {
    return this.initialColoniesData;
  }

  async addNewColony(newColonyName: string) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.settingsDataService.onAddNewColony(newColonyName);
    await this.retrieveColonies();
    this.settingsNavigationService.mainSettingsComponent.next('colonyDetails');
    let colonyWithLargestId = this.colonies[0];
    for (let colony of this.colonies) {
      if (colony.id > colonyWithLargestId.id) {
        colonyWithLargestId = colony;
      }
    }
    this.settingsNavigationService.chooseColonyWithIdAfterNavigation
      .next(colonyWithLargestId.id.toString());
    this.spinnerService.setSpinnerStatus.next(false);
  }

  async editColony(colonyToEdit: Colony, newColonyName: string) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.settingsDataService.onEditColony(colonyToEdit, newColonyName);
    await this.retrieveColonies();
    this.settingsNavigationService.colonyDetailsComponent.next('');
    this.spinnerService.setSpinnerStatus.next(false);
  }

  async deleteColony(colonyToDelete: Colony) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.settingsDataService.onDeleteColony(colonyToDelete);
    await this.retrieveColonies();
    this.settingsNavigationService.colonyDetailsComponent.next('');
    this.settingsNavigationService.mainSettingsComponent.next('');
    this.settingsNavigationService.chooseColonyWithIdAfterNavigation
      .next('');
    this.spinnerService.setSpinnerStatus.next(false);
  }

  retrieveColonies() {
    this.loadingService.start();
    this.settingsDataService.onGetColoniesData()
      .pipe(take(1))
      .subscribe(
        colonies => {
          this.colonies = colonies;

          //TODO! Move sorting to backend
          this.colonies.sort(
            (a: Colony, b: Colony) => ('' + a.name).localeCompare(b.name)
          );
          for (let colony of this.colonies) {
            colony.hives.sort(
              (a: Hive, b: Hive) => a.number - b.number
            );
          }

          if (!this.isInitialColoniesDataSet) {
            this.initialColoniesData = cloneDeep(this.colonies);
            this.isInitialColoniesDataSet = true;
          }

          this.coloniesDataRetrieved.next(this.colonies);
          this.spinnerService.setSpinnerStatus.next(false);
          this.loadingService.stop();
        }
      );
  }

  async addNewHive(number: number, colonyIdHiveBelongsTo: string, description?: string) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.settingsDataService.onAddNewHive(number, colonyIdHiveBelongsTo, description);
    await this.retrieveColonies();
    this.settingsNavigationService.colonyDetailsComponent.next('');
    this.spinnerService.setSpinnerStatus.next(false);
  }

  async updateHiveData(id: number, number: number, colonyIdHiveBelongsTo: string, description?: string) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.settingsDataService.onUpdateHiveData(id, number, colonyIdHiveBelongsTo, description);
    await this.retrieveColonies();
    this.settingsNavigationService.colonyDetailsComponent.next('');
    this.spinnerService.setSpinnerStatus.next(false);
  }

  async deleteHive(id: number) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.settingsDataService.onDeleteHive(id);
    await this.retrieveColonies();
    this.settingsNavigationService.colonyDetailsComponent.next('');
    this.spinnerService.setSpinnerStatus.next(false);
  }

  getInitialHiveData(hiveThatsInitialInfoIWant: Hive) {
    const initialColoniesData = this.getInitialColoniesData();
    for (let colony of initialColoniesData) {
      let foundHive = colony.hives.find(
        initialHive => hiveThatsInitialInfoIWant.id === initialHive.id
      );
      if (foundHive) {
        return foundHive;
      }
    }
  }
}
