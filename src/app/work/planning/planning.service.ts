import {Subject} from "rxjs";
import {PlanElement} from "./plan-element/plan-element.model";
import {EventEmitter, Injectable} from "@angular/core";
import {SpinnerService} from "../../util/spinner/spinner.service";
import {PlanningDataService} from "./planning-data.service";
import {ColoniesService} from "../../settings/shared/colonies.service";
import {PlanningDropdown} from "./planning-dropdown/planning-dropdown-element/planning-dropdown.model";
import { take } from 'rxjs/operators';
import { Colony } from '../../settings/shared/colony.model';
import { UtilService } from '../../util/util.service';

@Injectable({providedIn: 'root'})
export class PlanningService {
  newPlanElementSelected: Subject<PlanElement> = new Subject<PlanElement>();
  newPlanDropdownElementSelected: Subject<PlanningDropdown> = new Subject<PlanningDropdown>();
  showPlanningWindow = new EventEmitter<boolean>();
  planningDropDown: PlanningDropdown[];

  constructor(private spinnerService: SpinnerService,
              private planningDataService: PlanningDataService,
              private coloniesService: ColoniesService) { }

  addNewPlan(newPlan: PlanElement, hiveId: number) {
    this.spinnerService.setSpinnerStatus.next(true);
    this.planningDataService.addNewPlan(newPlan, hiveId)
      .pipe(take(1))
      .subscribe(
      () => this.coloniesService.retrieveColonies()
    );

  }

  updatePlan(plan: PlanElement, hiveId: number) {
    this.spinnerService.setSpinnerStatus.next(true);
    this.planningDataService.updatePlan(plan, hiveId)
      .pipe(take(1))
      .subscribe(
        () => this.coloniesService.retrieveColonies()
      );
  }

  //TODO! vaata üle, et mis asja see tagastab ja milleks-kuidas seda kasutatatakse
  getDropdownElements() {
    this.planningDataService.getPlanningDropdownElements()
      .pipe(take(1))
      .subscribe(
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
