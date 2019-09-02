import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlanElement } from '../../plan-element/plan-element.model';
import { PlanningService } from '../../planning.service';
import { Hive } from '../../../../settings/shared/hive.model';
import { UtilService } from '../../../../util/util.service';
import { Subscription } from 'rxjs';
import { ExecutorService, ProtectionState } from '../../../../util/executor/executor.service';
import { ControlsProtectionIdEnum } from '../../../../util/executor/controls-protection-id.enum';

@Component({
  selector: 'app-planning-mgmt-edit-area',
  templateUrl: './planning-mgmt-edit-area.component.html',
  styleUrls: ['./planning-mgmt-edit-area.component.css']
})
export class PlanningMgmtEditAreaComponent implements OnInit {
  @Output() callDropdownMgmt = new EventEmitter();
  @Output() isCountingDownToUpdateData = new EventEmitter<boolean>();
  @Input() isActiveResolveStateUnresolved: boolean;
  @Input() currentlyChosenHive: Hive;

  subscriptions: Subscription[] = [];
  editControlsDisabled: boolean;
  allControlsDisabled: boolean;

  readonly DEFAULT_DAYS_TO_DEADLINE = 3;

  newPlan: PlanElement;
  activePlanningElement: PlanElement;

  constructor(private planningService: PlanningService,
              private executorService: ExecutorService) {
  }

  ngOnInit() {
    this.initNewPlan();
    this.subscriptions.push(
      this.planningService.newPlanElementSelected.asObservable().subscribe(
        np => {
          if (!np) this.activePlanningElement = this.newPlan;
          else {
            this.activePlanningElement = np;
          }
          this.setDaysToDealine();
        }
      )
    );
    this.subscriptions.push(
      this.executorService.getControlsProtection.subscribe(
        (ps: ProtectionState) => {
          if(!ps.disableControls) {
            this.editControlsDisabled = false;
            this.allControlsDisabled = false;
            return;
          }
          this.editControlsDisabled = ps.omittedControlsId != ControlsProtectionIdEnum.PLANNING_ELEMENT;
          this.allControlsDisabled = true;
        }
      )
    );
  }

  setDaysToDealine() {
    this.activePlanningElement.daysToDeadline = -UtilService.getDaysBeforeTodaysDate(this.activePlanningElement.deadline);
  }

  radioBtnActivePlanInputTypeChange(isDropDown: boolean) {
    this.onInputChange();
    this.activePlanningElement.dropDown = isDropDown;
    if (isDropDown) {
      this.activePlanningElement.dropDownElementId = this.planningService.planningDropDown
        ? this.planningService.planningDropDown[0].id
        : undefined;
      this.daysToActivePlanDeadline(this.planningService.planningDropDown
        ? this.planningService.planningDropDown[0].deadline
        : this.DEFAULT_DAYS_TO_DEADLINE);
    } else {
      this.daysToActivePlanDeadline(this.DEFAULT_DAYS_TO_DEADLINE);
    }
  }

  initNewPlan() {
    this.newPlan = new PlanElement();
    const millisecondsInOneDay = 24 * 60 * 60 * 1000;
    if (this.planningService.planningDropDown && this.planningService.planningDropDown.length > 0) {
      this.newPlan.dropDown = true;
      this.newPlan.dropDownElementId = this.planningService.planningDropDown[0].id;
      this.newPlan.withoutDeadline = this.planningService.planningDropDown[0].withoutDeadline;
      this.newPlan.deadline = this.newPlan.withoutDeadline
        ? undefined
        : this.newPlan.deadline = new Date(new Date().setHours(0, 0, 0, 0) +
          this.planningService.planningDropDown[0].deadline * millisecondsInOneDay);
      this.activePlanningElement = this.newPlan;
      this.setDaysToDealine();
      return;
    }

    this.newPlan.dropDown = false;
    this.newPlan.deadline = new Date(new Date().setHours(0, 0, 0, 0) +
      +this.DEFAULT_DAYS_TO_DEADLINE * millisecondsInOneDay);
    this.activePlanningElement = this.newPlan;
    this.setDaysToDealine();
  }

  onAddNewPlan() {
    this.planningService.addNewPlan(this.newPlan, this.currentlyChosenHive.id);
    this.initNewPlan();
  }

  addDaysToActivePlanDeadline(days: number) {
    if (this.activePlanningElement.id) {
      this.executorService.exeWithTimer(
        this.planningService.updatePlan,
      [this.activePlanningElement, this.currentlyChosenHive.id],
        ControlsProtectionIdEnum.PLANNING_ELEMENT
      );
      this.activePlanningElement.deadline = new Date(
        this.activePlanningElement.deadline
      );
    }
    const millisecondsInOneDay = 24 * 60 * 60 * 1000;

    this.activePlanningElement.deadline.setMilliseconds(
      this.activePlanningElement.deadline.getMilliseconds() +
      days * millisecondsInOneDay
    );
    this.setDaysToDealine();
  }

  daysToActivePlanDeadline(days: number) {
    if (this.activePlanningElement.id) {
      this.executorService.exeWithTimer(
        this.planningService.updatePlan,
        [this.activePlanningElement, this.currentlyChosenHive.id],
        ControlsProtectionIdEnum.PLANNING_ELEMENT
      );
      this.activePlanningElement.deadline = new Date(
        this.activePlanningElement.deadline
      );
    }
    const millisecondsInOneDay = 24 * 60 * 60 * 1000;
    const todayInMS = new Date().setHours(0, 0, 0, 0);

    this.activePlanningElement.deadline = new Date(
      new Date().setHours(0, 0, 0, 0) + days * millisecondsInOneDay);
    this.setDaysToDealine();
  }

  setStandardPlanDeadline(dropDownElementId: number) {
    const selectedElement = this.planningService.planningDropDown.find(e => e.id == dropDownElementId);
    this.activePlanningElement.withoutDeadline = selectedElement.withoutDeadline;
    this.daysToActivePlanDeadline(selectedElement.deadline);
  }

  onInputChange(isWithoutDeadlineFlag?: boolean) {
    if (isWithoutDeadlineFlag) {
      const millisecondsInOneDay = 24 * 60 * 60 * 1000;
      this.activePlanningElement.deadline = new Date(new Date().setHours(0, 0, 0, 0) +
        +this.DEFAULT_DAYS_TO_DEADLINE * millisecondsInOneDay);
    }
    if (this.activePlanningElement.id) {
      this.executorService.exeWithTimer(
        this.planningService.updatePlan,
        [this.activePlanningElement, this.currentlyChosenHive.id],
        ControlsProtectionIdEnum.PLANNING_ELEMENT
      );
    }
  }

  onUnResolveElement() {
    this.activePlanningElement.resolved = false;
    this.activePlanningElement.resolvedDate = undefined;
    const millisecondsInOneDay = 24 * 60 * 60 * 1000;
    this.activePlanningElement.deadline = new Date(new Date().setHours(0, 0, 0, 0) +
      +this.DEFAULT_DAYS_TO_DEADLINE * millisecondsInOneDay);
    this.executorService.exeWithTimer(
      this.planningService.updatePlan,
      [this.activePlanningElement, this.currentlyChosenHive.id],
      ControlsProtectionIdEnum.PLANNING_ELEMENT
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (s: Subscription) => s.unsubscribe()
    );
  }
}
