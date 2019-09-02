import { Component, OnInit } from '@angular/core';
import { PlanningService } from '../../planning.service';
import { PlanningDropdown } from '../planning-dropdown-element/planning-dropdown.model';
import { Subscription } from 'rxjs';
import { ExecutorService, ProtectionState } from '../../../../util/executor/executor.service';
import { ControlsProtectionIdEnum } from '../../../../util/executor/controls-protection-id.enum';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-planning-dropdown-mgmt-edit-area',
  templateUrl: './planning-dropdown-mgmt-edit-area.component.html',
  styleUrls: ['./planning-dropdown-mgmt-edit-area.component.css']
})
export class PlanningDropdownMgmtEditAreaComponent implements OnInit {

  subscriptions: Subscription[] = [];
  newDropdownElement: PlanningDropdown;
  activePlanningDropdownElement: PlanningDropdown;
  DEFAULT_DAYS_TO_DEADLINE = 3;
  editControlsDisabled: boolean;
  allControlsDisabled: boolean;

  constructor(private planningService: PlanningService,
              private executorService: ExecutorService) {
  }

  ngOnInit() {
    this.initNewPlan();
    this.subscriptions.push(
      this.planningService.newPlanDropdownElementSelected.asObservable().subscribe(
        np => {
          if (!np) this.activePlanningDropdownElement = this.newDropdownElement;
          else {
            this.activePlanningDropdownElement = np;
          }
        }
      ));
    this.subscriptions.push(
      this.executorService.getControlsProtection.subscribe(
        (ps: ProtectionState) => {
          if (!ps.disableControls) {
            this.editControlsDisabled = false;
            this.allControlsDisabled = false;
            return;
          }
          this.allControlsDisabled = true;
          this.editControlsDisabled = ps.omittedControlsId !== ControlsProtectionIdEnum.PLANNING_DROPDOWN_SINGLE_ELEMENT;
        }
      )
    );

  }

  initNewPlan() {
    this.newDropdownElement = new PlanningDropdown();
    this.newDropdownElement.deadline = this.DEFAULT_DAYS_TO_DEADLINE;
    this.newDropdownElement.orderNumber = this.planningService.planningDropDown ?
      this.planningService.planningDropDown.length + 1
      : 1;
    this.activePlanningDropdownElement = this.newDropdownElement;
  }

  onAddNewPlan() {
    this.planningService.createDropdownElement(this.activePlanningDropdownElement)
      .pipe(take(1))
      .subscribe(
        () => setTimeout( () => this.initNewPlan(), 0)
      );
  }

  onInputChange(isWithoutDeadlineFlag?: boolean) {
    if (isWithoutDeadlineFlag) {
      this.activePlanningDropdownElement.deadline = this.DEFAULT_DAYS_TO_DEADLINE;
    }
    if (this.activePlanningDropdownElement.id) {
      this.executorService.exeWithTimer(
        this.planningService.updateDropdownElement,
        [this.activePlanningDropdownElement],
        ControlsProtectionIdEnum.PLANNING_DROPDOWN_SINGLE_ELEMENT);
    }
  }

  modifyDeadlineBy(days: number) {
    this.setDeadline(this.activePlanningDropdownElement.deadline + days);
  }

  setDeadline(days: number) {
    if (!days) {
      this.activePlanningDropdownElement.deadline = 0;
    } else {
      this.activePlanningDropdownElement.deadline = days;
    }
    this.onInputChange();
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(
      sub => sub.unsubscribe()
    );
  }
}
