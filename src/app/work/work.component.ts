import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SpinnerService} from "../util/spinner/spinner.service";
import {Colony} from "../settings/shared/colony.model";
import {ColoniesService} from "../settings/shared/colonies.service";
import {MomStatusEnum} from "./mother/mom-status.enum";
import {Hive} from "../settings/shared/hive.model";
import {SettingsDataService} from "../settings/shared/settings-data.service";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  colonies: Colony[];
  currentlyChosenHive: Hive = null;
  //@Output() onChangeColony = new EventEmitter<MomStatusEnum>();

  constructor(private spinnerService: SpinnerService,
              private coloniesService: ColoniesService,
              private settingsDataService: SettingsDataService) { }

  ngOnInit() {
    // this.settingsDataService.onPostToLogin();

    this.coloniesService.coloniesChanged.subscribe(
      colonies => {
        this.colonies = colonies;}
    );
    this.coloniesService.getColoniesData();

    setTimeout(()=> {
      this.spinnerService.setSpinnerStatus.next(false);
    }, 0);
  }

  onHiveChange(hiveThatGotChosen: Hive) {
    this.currentlyChosenHive = hiveThatGotChosen;
  }


}
