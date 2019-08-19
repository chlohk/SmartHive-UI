import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Hive } from '../../settings/shared/hive.model';
import { PlanningComponentEnum } from './planning-component.enum';
import { PlanningService } from './planning.service';
import { JwModalService } from '../../util/jw-modal/jw-modal.service';

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

  constructor(private planningService: PlanningService,
              private modalService: JwModalService) {
  }

  ngOnInit() {
    this.document = document;
    this.newPlanElementSelectedSubscription =
      this.planningService.newPlanElementSelected.asObservable().subscribe(
        np => {
          if (!np) this.memorizedActivePlanElementId = undefined;
          else {
            this.memorizedActivePlanElementId = np.id;
          }
        }
      );
  }

  ngOnChanges() {
    setTimeout(
      () => document.getElementById('planningScrollArea').scrollTop = Number.MAX_SAFE_INTEGER,
      0);

  }

  onOpenPlanning() {
    this.planningService.newPlanElementSelected.next(null);
    this.modalService.open('work-planning');
  }

  getHeight() {
    if (this.planningComponentType === PlanningComponentEnum.WORK_DASHBOARD) {
      return 'planning-section-height-for-work-dashboard';
    } else {
      return 'planning-section-height-for-planning-modal';
    }
  }

  getRelevantPlansList() {
    if (this.planningComponentType === PlanningComponentEnum.WORK_DASHBOARD) {
      return this.currentlyChosenHive.unresolvedPlanElements;
    }
    if (this.planningComponentType === PlanningComponentEnum.PLANNING_MANAGEMENT_UNRESOLVED) {
      return this.currentlyChosenHive.unresolvedPlanElements;
    }
    if (this.planningComponentType === PlanningComponentEnum.PLANNING_MANAGEMENT_RESOLVED) {
      return this.currentlyChosenHive.resolvedPlanElements;
    }
  }

  ngOnDestroy(): void {
    this.newPlanElementSelectedSubscription.unsubscribe();
  }
}
