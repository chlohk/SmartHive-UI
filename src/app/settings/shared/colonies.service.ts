import {Colony} from "./colony.model";
import {Subject} from "rxjs";
import {SettingsDataService} from "./settings-data.service";
import {Injectable} from "@angular/core";
import {SettingsNavigationService} from "./settings-navigation.service";
import {SpinnerService} from "../../util/spinner/spinner.service";
import {Hive} from "./hive.model";

@Injectable()
export class ColoniesService {
  coloniesChanged = new Subject<Colony[]>();
  private colonies: Colony[];

  constructor(private settingsDataService: SettingsDataService,
              private settingsNavigationService: SettingsNavigationService,
              private spinnerService: SpinnerService) {}

  getColonyById(id: number): Colony {
    return this.colonies.find(
      colony => colony.id === id
    );
  }

  getAllColonies() {
    return this.colonies;
  }

  async addNewColony(newColonyName: string) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.settingsDataService.onAddNewColony(newColonyName);
    await this.getColoniesData();
    this.settingsNavigationService.mainSettingsComponent.next('colonyDetails');
    let colonyWithLargestId = this.colonies[0];
    for (let colony of this.colonies) {
      if(colony.id > colonyWithLargestId.id) {
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
    await this.getColoniesData();
    this.settingsNavigationService.colonyDetailsComponent.next('');
    this.spinnerService.setSpinnerStatus.next(false);
  }

  async deleteColony(colonyToDelete: Colony) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.settingsDataService.onDeleteColony(colonyToDelete);
    await this.getColoniesData();
    this.settingsNavigationService.colonyDetailsComponent.next('');
    this.settingsNavigationService.mainSettingsComponent.next('');
    this.settingsNavigationService.chooseColonyWithIdAfterNavigation
      .next('');
    this.spinnerService.setSpinnerStatus.next(false);
  }

  async getColoniesData() {
    this.colonies = await this.settingsDataService.onGetColoniesData();
    this.colonies.sort(
      (a: Colony, b: Colony) => ('' + a.name).localeCompare(b.name)
    );
    for (let colony of this.colonies) {
      colony.hives.sort(
        (a: Hive, b: Hive) => a.number - b.number
      )
    }
    this.coloniesChanged.next(this.colonies);
  }

  async addNewHive(number: number, colonyIdHiveBelongsTo: string, description?: string) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.settingsDataService.onAddNewHive(number, colonyIdHiveBelongsTo, description);
    await this.getColoniesData();
    this.settingsNavigationService.colonyDetailsComponent.next('');
    this.spinnerService.setSpinnerStatus.next(false);
  }

  async updateHiveData(id: number, number: number, colonyIdHiveBelongsTo: string, description?: string) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.settingsDataService.onUpdateHiveData(id, number, colonyIdHiveBelongsTo, description);
    await this.getColoniesData();
    this.settingsNavigationService.colonyDetailsComponent.next('');
    this.spinnerService.setSpinnerStatus.next(false);
  }

  async deleteHive (id: number) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.settingsDataService.onDeleteHive(id);
    await this.getColoniesData();
    this.settingsNavigationService.colonyDetailsComponent.next('');
    this.spinnerService.setSpinnerStatus.next(false);
  }
}
