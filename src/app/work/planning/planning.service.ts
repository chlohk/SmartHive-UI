import { Subject } from 'rxjs';
import { PlanElement } from './plan-element/plan-element.model';
import { EventEmitter, Injectable } from '@angular/core';
import { SpinnerService } from '../../util/spinner/spinner.service';
import { PlanningDataService } from './planning-data.service';
import { ColoniesService } from '../../settings/shared/colonies.service';
import { PlanningDropdown } from './planning-dropdown/planning-dropdown-element/planning-dropdown.model';
import { finalize, last, take, tap } from 'rxjs/operators';
import { ExecutorService } from '../../util/executor/executor.service';
import { ControlsProtectionIdEnum } from '../../util/executor/controls-protection-id.enum';

@Injectable({providedIn: 'root'})
export class PlanningService {
  newPlanElementSelected: Subject<PlanElement> = new Subject<PlanElement>();
  newPlanDropdownElementSelected: Subject<PlanningDropdown> = new Subject<PlanningDropdown>();
  showPlanningWindow = new EventEmitter<boolean>();
  planningDropDown: PlanningDropdown[];

  constructor(private spinnerService: SpinnerService,
              private planningDataService: PlanningDataService,
              private coloniesService: ColoniesService,
              private executorService: ExecutorService) {
  }

  sortPlanningDropdownByOrder() {
    this.planningDropDown.sort((a, b) => b.orderNumber - a.orderNumber);
  }


  increaseElementOrderNumber(elementIdToMove: number) {
    const elementMoved = this.planningDropDown.find( e => e.id === elementIdToMove);
    if (elementMoved.orderNumber == this.planningDropDown.length) {
      return;
    }

    this.planningDropDown.find(p => p.orderNumber == elementMoved.orderNumber + 1).orderNumber--;
    this.planningDropDown.find(p => p.id == elementMoved.id).orderNumber++;
    this.sortPlanningDropdownByOrder();
    this.executorService.exeWithTimer(
      this.updateAllDropdownElements,
      [this.planningDropDown],
      ControlsProtectionIdEnum.PLANNING_DROPDOWN_ORDERING
    );
  }


  decreaseElementOrderNumber(elementIdToMove: number) {
    const elementMoved = this.planningDropDown.find( e => e.id === elementIdToMove);
    if (elementMoved.orderNumber == 1) {
      return;
    }

    this.planningDropDown.find(p => p.orderNumber == elementMoved.orderNumber - 1).orderNumber++;
    this.planningDropDown.find(p => p.id == elementMoved.id).orderNumber--;
    this.sortPlanningDropdownByOrder();
    this.executorService.exeWithTimer(
      this.updateAllDropdownElements,
      [this.planningDropDown],
      ControlsProtectionIdEnum.PLANNING_DROPDOWN_ORDERING
    );
  }

  addNewPlan(newPlan: PlanElement, hiveId: number) {
    this.spinnerService.setSpinnerStatus.next(true);
    this.planningDataService.addNewPlan(newPlan, hiveId)
      .pipe(take(1))
      .subscribe(
        () => this.coloniesService.retrieveColonies()
      );

  }

  updatePlan = (plan: PlanElement, hiveId: number) => {
    this.planningDataService.updatePlan(plan, hiveId)
      .pipe(take(1))
      .subscribe(
        () => this.coloniesService.retrieveColonies()
      );
  };

  //TODO! vaata üle, et mis asja see tagastab ja milleks-kuidas seda kasutatatakse
  getDropdownElements() {
    this.planningDataService.getPlanningDropdownElements()
      .pipe(take(1))
      .subscribe(
        data => {
          if (data.length === 0) {
            this.planningDropDown = undefined;
          } else {
            this.planningDropDown = data;
            this.sortPlanningDropdownByOrder();
          }
        }
      );
  }

  createDropdownElement(newDropdownElement: PlanningDropdown) {
    return this.planningDataService.createDropdownElement(newDropdownElement)
      .pipe(tap(
          data => {
            if (data.length === 0) {
              this.planningDropDown = undefined;
            } else {
              this.planningDropDown = data;
              this.sortPlanningDropdownByOrder();
            }
          }
        ));
  }

  updateDropdownElement = (element: PlanningDropdown) => {
    this.spinnerService.setSpinnerStatus.next(true);
    this.planningDataService.updateDropdownElement(element).subscribe(
      data => {
        if (data.length === 0) {
          this.planningDropDown = undefined;
        } else {
          this.planningDropDown = data;
          this.sortPlanningDropdownByOrder();
        }
      }
    );
    this.spinnerService.setSpinnerStatus.next(false);
  };

  updateAllDropdownElements = () => {
    this.planningDataService.updateAllDropdownElements(this.planningDropDown).subscribe(
      data => {
        if (data.length === 0) {
          this.planningDropDown = undefined;
        } else {
          this.planningDropDown = data;
          this.sortPlanningDropdownByOrder();
        }
      }
    );
  };

  deleteDropdownElement(newDropdownElement: PlanningDropdown) {
    this.spinnerService.setSpinnerStatus.next(true);
    this.planningDataService.deleteDropdownElement(newDropdownElement.id).subscribe(
      data => {
        if (data.length === 0) {
          this.planningDropDown = undefined;
        } else {
          this.planningDropDown = data;
          this.sortPlanningDropdownByOrder();
        }
        this.spinnerService.setSpinnerStatus.next(false);
      }
    );
  }

}
