import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilService} from "../../../../util/util.service";
import {PlanElement} from "../../plan-element/plan-element.model";
import {PlanningService} from "../../planning.service";
import {Hive} from "../../../../settings/shared/hive.model";

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

  readonly DEFAULT_DAYS_TO_DEADLINE = 3;

  private newPlanElementSelectedSubscription: any;

  newPlan: PlanElement;
  utilService = UtilService;
  activePlanningElement: PlanElement;
  timerRunning = false;
  shouldRunAnotherRound = false;

  constructor(private planningService: PlanningService) { }

  ngOnInit() {
    this.initNewPlan();
    this.newPlanElementSelectedSubscription =
      this.planningService.newPlanElementSelected.asObservable().subscribe(
        np => {
          if(!np) this.activePlanningElement = this.newPlan;
          else {
            this.activePlanningElement = np;
          }
        }
      );
  }

  radioBtnActivePlanInputTypeChange(isDropDown: boolean) {
    this.onInputChange();
    this.activePlanningElement.dropDown = isDropDown;
  }

  initNewPlan() {
    this.newPlan = new PlanElement();
    if(this.planningService.planningDropDown && this.planningService.planningDropDown.length > 0) {
      this.newPlan.dropDown = true;
      this.newPlan.dropDownElementId = this.planningService.planningDropDown[0].id;
    } else {
      this.newPlan.dropDown = false;
    }

    const millisecondsInOneDay = 24 * 60 * 60 * 1000;
    this.newPlan.deadline = new Date(new Date().setHours(0,0,0,0) +
      +this.DEFAULT_DAYS_TO_DEADLINE * millisecondsInOneDay);
    this.activePlanningElement = this.newPlan
  }

  onAddNewPlan() {
    this.planningService.addNewPlan(this.newPlan, this.currentlyChosenHive.id);
    this.initNewPlan();
  }

  addDaysToActivePlanDeadline(days: number) {
    if(this.activePlanningElement.id) {
      this.startCountdownToUpdatePlanningElementAtBackend()
      this.activePlanningElement.deadline = new Date(
       this.activePlanningElement.deadline
      );
    }
    const millisecondsInOneDay = 24 * 60 * 60 * 1000;

    this.activePlanningElement.deadline.setMilliseconds(
      this.activePlanningElement.deadline.getMilliseconds() +
      days * millisecondsInOneDay
    );
  }

  startCountdownToUpdatePlanningElementAtBackend() {
    if(this.timerRunning) {
      this.shouldRunAnotherRound = true;
      // console.log('...must run one more time');
    } else {
      setTimeout(
        () => {
          this.timerRunning = false;
          if(this.shouldRunAnotherRound) {
            this.shouldRunAnotherRound = false;
            this.startCountdownToUpdatePlanningElementAtBackend();
            // console.log('...will run for a second time');
          } else {
            // console.log('-> send request')
            this.planningService.updatePlan(this.activePlanningElement, this.currentlyChosenHive.id)
            this.isCountingDownToUpdateData.emit(false);
          }
        }, 1200
      );
      this.timerRunning = true;
      this.isCountingDownToUpdateData.emit(true);
      // console.log('! started Timer');
    }
  }

  onInputChange(isWithoutDeadlineFlag?: boolean) {
    if(isWithoutDeadlineFlag) {
      const millisecondsInOneDay = 24 * 60 * 60 * 1000;
      this.activePlanningElement.deadline = new Date(new Date().setHours(0,0,0,0) +
        +this.DEFAULT_DAYS_TO_DEADLINE * millisecondsInOneDay);
    }
    if(this.activePlanningElement.id) {
      this.startCountdownToUpdatePlanningElementAtBackend();
    }
  }

  onUnResolveElement() {
    this.activePlanningElement.resolved = false;
    this.activePlanningElement.resolvedDate = undefined;
    const millisecondsInOneDay = 24 * 60 * 60 * 1000;
    this.activePlanningElement.deadline = new Date(new Date().setHours(0,0,0,0) +
      +this.DEFAULT_DAYS_TO_DEADLINE * millisecondsInOneDay);
    this.startCountdownToUpdatePlanningElementAtBackend()
  }

  ngOnDestroy(): void {
    this.newPlanElementSelectedSubscription.unsubscribe()
  }
}
