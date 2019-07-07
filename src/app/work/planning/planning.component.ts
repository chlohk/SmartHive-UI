import {Component, Input, OnChanges, OnInit, Output} from '@angular/core';
import {PlanElement} from "./plan-element/plan-element.model";
import {Hive} from "../../settings/shared/hive.model";
import {PlanningComponentEnum} from "./planning-component.enum";
import {PlanningService} from "./planning.service";

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit, OnChanges {
  @Input() currentlyChosenHive: Hive;
  @Input() planningComponentType: PlanningComponentEnum;
  planningComponentEnum = PlanningComponentEnum;
  document;
  MIN_NO_OF_PLANS_WHEN_SECOND_BUTTON_ADDED = 3;
  memorizedActivePlanElementId: number;


  private newPlanElementSelectedSubscription: any;

  unResolvedPlans: PlanElement[] =
    [
      {
        id: 8,
        deadline: null,
        text: 'ole tubli',
        dropDownElementId: null,
        withoutDeadline: true,
        dropDown: false,
        resolvedDate: null,
        resolved: false
      },
      {
        id: 2,
        deadline: new Date(2019, 4, 30),
        text: 'puhasta taru ja pane sööki ja paranda lennulaud ja teed veel sada muud asja',
        dropDownElementId: null,
        withoutDeadline: false,
        dropDown: false,
        resolvedDate: null,
        resolved: false
      },
      {
        id: 7,
        deadline: new Date(2019, 4, 30),
        text: null,
        dropDownElementId: 3,
        withoutDeadline: false,
        dropDown: true,
        resolvedDate: null,
        resolved: false
      },
      {
        id: 3,
        deadline: new Date(2019, 4, 31),
        text: 'pane sööki',
        dropDownElementId: null,
        withoutDeadline: false,
        dropDown: false,
        resolvedDate: null,
        resolved: false
      }
    ];

  resolvedPlans: PlanElement[] =
    [
      {
        id: 1,
        deadline: new Date(2019, 6, 4),
        text: null,
        dropDownElementId: 13,
        withoutDeadline: false,
        dropDown: true,
        resolvedDate: new Date(2019, 5, 20),
        resolved: true
      },
      {
        id: 4,
        deadline: new Date(2019, 4, 3),
        dropDownElementId: 2,
        text: null,
        withoutDeadline: false,
        dropDown: true,
        resolvedDate: new Date(2019, 5, 1),
        resolved: true
      },
      {
        id: 5,
        deadline: new Date(2019, 4, 1),
        text: 'vaata, kas kõik toimib',
        dropDownElementId: null,
        withoutDeadline: true,
        dropDown: false,
        resolvedDate: new Date(2019, 5, 1),
        resolved: true
      },
    ];

  constructor(private planningService: PlanningService) {
  }

  ngOnInit() {
    this.document = document;
    this.newPlanElementSelectedSubscription =
      this.planningService.newPlanElementSelected.asObservable().subscribe(
        np => {
          if(!np) this.memorizedActivePlanElementId = undefined;
          else {
            this.memorizedActivePlanElementId = np.id;
          }
        }
      );
  }

  ngOnChanges() {
     // this.currentlyChosenHive.unresolvedPlanElements = this.unresolvedPlanElements;
     // this.currentlyChosenHive.resolvedPlanElements = this.resolvedPlanElements;
    setTimeout(
      () => document.getElementById('planningScrollArea').scrollTop = Number.MAX_SAFE_INTEGER,
      0);
  }

  onOpenPlanning() {
    this.planningService.newPlanElementSelected.next(null);
    this.planningService.showPlanningWindow.emit(true);
  }

  getHeight() {
    if (this.planningComponentType === PlanningComponentEnum.WORK_DASHBOARD) {
      return 'planning-section-height-for-work-dashboard';
    } else {
      return 'planning-section-height-for-planning-modal';
    }
  }

  getRelevantPlansList() {
    if(this.planningComponentType === PlanningComponentEnum.WORK_DASHBOARD) {
      return this.currentlyChosenHive.unresolvedPlanElements
    }
    if(this.planningComponentType === PlanningComponentEnum.PLANNING_MANAGEMENT_UNRESOLVED) {
      return this.currentlyChosenHive.unresolvedPlanElements
    }
    if(this.planningComponentType === PlanningComponentEnum.PLANNING_MANAGEMENT_RESOLVED) {
      return this.currentlyChosenHive.resolvedPlanElements
    }
  }

  ngOnDestroy(): void {
    this.newPlanElementSelectedSubscription.unsubscribe()
  }
}
