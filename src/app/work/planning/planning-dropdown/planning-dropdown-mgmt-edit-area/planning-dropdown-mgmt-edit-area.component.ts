import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlanningService} from "../../planning.service";
import {PlanningDropdown} from "../planning-dropdown-element/planning-dropdown.model";

@Component({
  selector: 'app-planning-dropdown-mgmt-edit-area',
  templateUrl: './planning-dropdown-mgmt-edit-area.component.html',
  styleUrls: ['./planning-dropdown-mgmt-edit-area.component.css']
})
export class PlanningDropdownMgmtEditAreaComponent implements OnInit {
  @Output() isCountingDownToUpdateData = new EventEmitter<boolean>();

  private newPlanningDropdownElementSelectedSubscription: any;

  newDropdownElement: PlanningDropdown;
  activePlanningDropdownElement: PlanningDropdown;
  timerRunning = false;
  shouldRunAnotherRound = false;

  constructor(private planningService: PlanningService) {
  }

  ngOnInit() {
    this.initNewPlan();
    this.newPlanningDropdownElementSelectedSubscription=
      this.planningService.newPlanDropdownElementSelected.asObservable().subscribe(
        np => {
          if(!np) this.activePlanningDropdownElement = this.newDropdownElement;
          else {
            this.activePlanningDropdownElement = np;
          }
        }
      );
  }

  initNewPlan() {
    this.newDropdownElement = new PlanningDropdown();
    this.activePlanningDropdownElement = this.newDropdownElement
  }

  async onAddNewPlan() {
    this.timerRunning = true;
    this.isCountingDownToUpdateData.emit(true);
    await this.planningService.createDropdownElement(this.activePlanningDropdownElement).then(
      () => {
        this.timerRunning = false;
        this.isCountingDownToUpdateData.emit(false);
      }
    );
    this.initNewPlan();
  }

  startCountdownToUpdatePlanningElementAtBackend() {
    if (this.timerRunning) {
      this.shouldRunAnotherRound = true;
      // console.log('...must run one more time');
    } else {
      setTimeout(
        () => {
          this.timerRunning = false;
          if (this.shouldRunAnotherRound) {
            this.shouldRunAnotherRound = false;
            this.startCountdownToUpdatePlanningElementAtBackend();
            // console.log('...will run for a second time');
          } else {
            // console.log('-> send request')
            this.planningService.updateDropdownElement(this.activePlanningDropdownElement).then(
              () => {this.isCountingDownToUpdateData.emit(false)}
            );
          }
        }, 1200
      );
      this.timerRunning = true;
      this.isCountingDownToUpdateData.emit(true);
      // console.log('! started Timer');
    }
  }

  onInputChange(isWithoutDeadlineFlag?: boolean) {
    if (this.activePlanningDropdownElement.id) {
      this.startCountdownToUpdatePlanningElementAtBackend();
    }
  }



  ngOnDestroy(): void {
    this.newPlanningDropdownElementSelectedSubscription.unsubscribe()
  }
}
