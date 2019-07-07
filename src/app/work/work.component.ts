import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "../util/spinner/spinner.service";
import {Colony} from "../settings/shared/colony.model";
import {ColoniesService} from "../settings/shared/colonies.service";
import {Hive} from "../settings/shared/hive.model";
import {PlanningComponentEnum} from "./planning/planning-component.enum";
import {PlanningService} from "./planning/planning.service";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  colonies: Colony[];
  currentlyChosenHive: Hive = null;
  currentlyChosenColony: Colony = null;
  isCountingDownToUpdateData = false;
  planningComponentEnum = PlanningComponentEnum;

  //@Output() onChangeColony = new EventEmitter<MomStatusEnum>();

  constructor(private spinnerService: SpinnerService,
              private coloniesService: ColoniesService,
              private planningService: PlanningService) {
  }

  ngOnInit() {
    // this.settingsDataService.onPostToLogin();

    this.coloniesService.coloniesChanged.subscribe(
      colonies => {
        this.colonies = colonies;
      }
    );
    this.coloniesService.getColoniesData();
    this.planningService.getDropdownElements();

    setTimeout(() => {
      this.spinnerService.setSpinnerStatus.next(false);
    }, 0);
  }

  onColonyChange(colonyThatGotChosen: Colony) {
    this.currentlyChosenColony = colonyThatGotChosen;
  }

  onHiveChange(hiveThatGotChosen: Hive) {
    this.currentlyChosenHive = hiveThatGotChosen;
  }

  notifyIfIsCountingDownToUpdateData(isCountingDownToUpdateData: boolean) {
    this.isCountingDownToUpdateData = isCountingDownToUpdateData;
  }

}
