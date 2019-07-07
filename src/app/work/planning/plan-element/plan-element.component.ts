import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PlanElement} from "./plan-element.model";
import {UtilService} from "../../../util/util.service";
import {PlanningComponentEnum} from "../planning-component.enum";
import {PlanningService} from "../planning.service";
import {Hive} from "../../../settings/shared/hive.model";

@Component({
  selector: 'app-plan-element',
  templateUrl: './plan-element.component.html',
  styleUrls: ['./plan-element.component.css']
})
export class PlanElementComponent implements OnInit, OnDestroy {
  private newElementSelectedSubscription: any;
  @Input() plan: PlanElement;
  @Input() currentlyChosenHive: Hive;
  @Input() planningComponentType: PlanningComponentEnum;
  @Input() memorizedActiveElementId: number;
  showAsActiveTimeout: any;
  planningComponentEnum = PlanningComponentEnum;
  deadlineText: string;
  daysToDeadline: number;
  inActive = true;
  ELEMENT_DELETED_FROM_DROPDOWN = 'element rippmenüüst kustutatud';

  constructor(private planningService: PlanningService) {
  }

  ngOnInit() {
    this.setDeadlineText();
    this.newElementSelectedSubscription =
      this.planningService.newPlanElementSelected.asObservable().subscribe(
        () => this.inActive = true
      );
    if(this.memorizedActiveElementId === this.plan.id &&
        this.planningComponentType === PlanningComponentEnum.PLANNING_MANAGEMENT_UNRESOLVED) {
      this.inActive = false;
    }
  }

  setDeadlineText() {
    this.daysToDeadline = UtilService.getDaysBeforeTodaysDate(this.plan.deadline);
    if (this.plan.withoutDeadline) {
      this.deadlineText = 'tähtajatu';
    } else if (this.daysToDeadline < -1) {
      this.deadlineText = Math.abs(this.daysToDeadline) + ' päeva pärast';
    } else if (this.daysToDeadline === -1) {
      this.deadlineText = 'homme';
    } else if (this.daysToDeadline === 0) {
      this.deadlineText = 'täna';
    } else {
      this.deadlineText = this.daysToDeadline + ' päeva üle';
    }
  }

  getColor() {
    if (this.plan.withoutDeadline) {
      return 'without-deadline'
    } else if (this.daysToDeadline < -1) {
      return 'normal'
    } else if (this.daysToDeadline < 3) {
      return 'warning'
    } else {
      return 'danger'
    }
  }

  onElementClick() {
    this.planningService.newPlanElementSelected.next(this.plan);
    if (this.planningComponentType === PlanningComponentEnum.WORK_DASHBOARD) {
      clearTimeout(this.showAsActiveTimeout);
      this.inActive = false;
      this.showAsActiveTimeout = setTimeout(() => {
        this.inActive = true
      }, 2500);
    } else {
      this.inActive = false;
    }

  }

  getText() {
    if (this.plan.dropDown) {
      if (!this.planningService.planningDropDown) {
        return this.ELEMENT_DELETED_FROM_DROPDOWN;
      }
      let dropDownElement = this.planningService.planningDropDown.find(e => e.id == this.plan.dropDownElementId);
      if (dropDownElement) {
        return dropDownElement.text;
      } else {
        return this.ELEMENT_DELETED_FROM_DROPDOWN;
      }
    } else {
      return this.plan.text
    }
  }

  onResolveElement() {
    this.planningService.newPlanElementSelected.next(null);
    this.plan.resolvedDate = new Date();
    this.plan.resolved = true;
    this.planningService.updatePlan(this.plan, this.currentlyChosenHive.id);

  }

  ngOnDestroy(): void {
    this.newElementSelectedSubscription.unsubscribe()
  }
}
