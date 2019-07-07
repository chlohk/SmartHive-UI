import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";
import {Hive} from "../../../settings/shared/hive.model";
import {PlanningMgmtWindowEnum} from "./planning-mgmt-window.enum";
import {PlanningComponentEnum} from "../planning-component.enum";
import {PlanningService} from "../planning.service";
import {Colony} from "../../../settings/shared/colony.model";

@Component({
  selector: 'app-planning-mgmt',
  templateUrl: './planning-mgmt.component.html',
  styleUrls: ['./planning-mgmt.component.css']
})
export class PlanningMgmtComponent implements OnInit {
  @Output() isCountingDownToUpdateData = new EventEmitter<boolean>();
  @Input() currentlyChosenHive: Hive;
  @Input() currentlyChosenColony: Colony;

  activeWindow: PlanningMgmtWindowEnum = PlanningMgmtWindowEnum.PLANNING;
  planningMgmtWindowEnum = PlanningMgmtWindowEnum;
  isActiveResolveStateUnresolved: boolean = true;
  planningComponentEnum = PlanningComponentEnum;
  timerRunning;

  constructor(private modalService: JwModalService,
              private planningService: PlanningService) {
  }

  ngOnInit() {
    this.planningService.showPlanningWindow.subscribe(
      show => {
        if (show) {
          this.modalService.open('planning');
          this.activeWindow = PlanningMgmtWindowEnum.PLANNING;
        } else {
          this.modalService.close('planning');
        }
      }
    );
  }

  radioBtnActiveResolveStateChange(isActiveResolveStateUnresolved: boolean) {
    this.planningService.newPlanElementSelected.next(null);
    this.isActiveResolveStateUnresolved = isActiveResolveStateUnresolved;
  }

  onCountDownChange(countDownState: boolean) {
    this.timerRunning = countDownState;
    this.isCountingDownToUpdateData.emit(countDownState)
  }

}
