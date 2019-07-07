import {Subject} from "rxjs";
import {PlanElement} from "./plan-element/plan-element.model";
import {EventEmitter, Injectable} from "@angular/core";
import {SpinnerService} from "../../util/spinner/spinner.service";
import {PlanningDataService} from "./planning-data.service";
import {ColoniesService} from "../../settings/shared/colonies.service";
import {PlanningDropdown} from "./planning-dropdown/planning-dropdown-element/planning-dropdown.model";

@Injectable()
export class PlanningService {
  newPlanElementSelected: Subject<PlanElement> = new Subject<PlanElement>();
  newPlanDropdownElementSelected: Subject<PlanningDropdown> = new Subject<PlanningDropdown>();
  showPlanningWindow = new EventEmitter<boolean>();
  planningDropDown: PlanningDropdown[];

  constructor(private spinnerService: SpinnerService,
              private planningDataService: PlanningDataService,
              private coloniesService: ColoniesService) { }

  async addNewPlan(newPlan: PlanElement, hiveId: number) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.planningDataService.addNewPlan(newPlan, hiveId);
    await this.coloniesService.getColoniesData();
    this.spinnerService.setSpinnerStatus.next(false);
  }

  async updatePlan(plan: PlanElement, hiveId: number) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.planningDataService.updatePlan(plan, hiveId);
    await this.coloniesService.getColoniesData();
    this.spinnerService.setSpinnerStatus.next(false);
  }

  getDropdownElements() {
    this.planningDataService.getPlanningDropdownElements().subscribe(
      data => {
          if(data.length === 0) {
            this.planningDropDown = undefined;
          } else {
            this.planningDropDown = data

          }
        }
    );
  }

  async createDropdownElement(newDropdownElement: PlanningDropdown) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.planningDataService.createDropdownElement(newDropdownElement).subscribe(
      data => {
        if(data.length === 0) {
          this.planningDropDown = undefined;
        } else {
          this.planningDropDown = data
        }
      }
    );
    this.spinnerService.setSpinnerStatus.next(false);
  }

  async updateDropdownElement(element: PlanningDropdown) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.planningDataService.createDropdownElement(element).subscribe(
      data => {
        if(data.length === 0) {
          this.planningDropDown = undefined;
        } else {
          this.planningDropDown = data
        }
      }
    );
    this.spinnerService.setSpinnerStatus.next(false);
  }

  async deleteDropdownElement(newDropdownElement: PlanningDropdown) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.planningDataService.deleteDropdownElement(newDropdownElement.id).subscribe(
      data => {
        if(data.length === 0) {
          this.planningDropDown = undefined;
        } else {
          this.planningDropDown = data
        }
      }
    );
    this.spinnerService.setSpinnerStatus.next(false);
  }

}
