import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Colony} from "../../shared/colony.model";
import {ColoniesService} from "../../shared/colonies.service";
import {SettingsNavigationService} from "../../shared/settings-navigation.service";
import {Hive} from "../../shared/hive.model";
import {SpinnerService} from "../../../util/spinner/spinner.service";
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";

@Component({
  selector: 'app-edit-hive',
  templateUrl: './edit-hive.component.html',
  styleUrls: ['./edit-hive.component.css']
})
export class EditHiveComponent implements OnInit, OnChanges {
  newHiveDescription = '';
  colonyIdToWhichHiveWillBelong = '';
  newHiveNumber: number = null;
  newHiveId: number;
  colonies: Colony[];
  warningHiveNumberExists = false;
  warningMustIncludeVerifyText = false;
  colonyToWhichItBelongsNow: Colony;
  @Input() currentlySelectedHive: Hive;
  @Input() currentlySelectedColonyId = '';

  constructor(private coloniesService: ColoniesService,
              private settingsNavigationService: SettingsNavigationService,
              private modalService: JwModalService) { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.colonies = this.coloniesService.getAllColonies();
    this.colonyIdToWhichHiveWillBelong = this.currentlySelectedColonyId;
    this.newHiveDescription = this.currentlySelectedHive.description;
    this.newHiveNumber = this.currentlySelectedHive.number;
    this.newHiveId = this.currentlySelectedHive.id;
    this.colonyToWhichItBelongsNow = this.colonies.find(
      colony => colony.id === +this.currentlySelectedColonyId
    );
  }

  cancelAddingNewHive() {
    this.settingsNavigationService.colonyDetailsComponent.next('');
  }

  checkIfHiveNumberWouldBeADuplicate(id: number, number: number, colonyIdHiveBelongsTo: string) {
    const colonyHiveWouldBelongTo = this.colonies.find(
      colony => colony.id === +colonyIdHiveBelongsTo
    );
    const hiveWithTheSameNumber = colonyHiveWouldBelongTo.hives.find(
      hive => number === hive.number
    );
    if(hiveWithTheSameNumber) {
      if(hiveWithTheSameNumber.id === id) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  updateHiveData(id: number, number: number, colonyIdHiveBelongsTo: string, description?: string) {
    if(this.checkIfHiveNumberWouldBeADuplicate(id, number, colonyIdHiveBelongsTo)) {
      this.warningHiveNumberExists = true;
      return;
    }
    this.coloniesService.updateHiveData(id, number, colonyIdHiveBelongsTo, description)
  }

  openVerifyDeleteHiveModal() {

    this.warningMustIncludeVerifyText = false;
    this.modalService.open('delete-hive');

  }

  cancelDeleteHive() {
    this.modalService.close('delete-hive');
  }

  onDeleteHive(verifyDeleteText, id) {
    if(verifyDeleteText === 'Ok') {
      this.modalService.close('delete-hive');
      this.coloniesService.deleteHive(id);
    } else {
      this.warningMustIncludeVerifyText = true;
    }
  }

}
