import {Colony} from "../../settings/shared/colony.model";
import {UtilService} from "../../util/util.service";
import {PlanElement} from "./plan-element/plan-element.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PlanningDropdown} from "./planning-dropdown/planning-dropdown-element/planning-dropdown.model";

@Injectable()
export class PlanningDataService {

  constructor(private httpClient: HttpClient){}

  addNewPlan(newPlan: PlanElement, hiveId: number) {
    return this.httpClient.post<Colony[]>(
      UtilService.backEndURL  + 'api/hive/' + hiveId + '/planning',
      newPlan).toPromise();
  }

  updatePlan(plan: PlanElement, hiveId: number) {
    return this.httpClient.put<Colony[]>(
      UtilService.backEndURL  + 'api/hive/' + hiveId + '/planning/' + plan.id,
      plan).toPromise();
  }

  getPlanningDropdownElements() {
    return this.httpClient.get<PlanningDropdown[]>(
      UtilService.backEndURL + 'api/planning-dropdown'
    )
  }

  createDropdownElement(newDropdonwElement: PlanningDropdown) {
    return this.httpClient.post<PlanningDropdown[]>(
      UtilService.backEndURL  + 'api/planning-dropdown',
      newDropdonwElement);
  }

  updateDropdownElement(element: PlanningDropdown) {
    return this.httpClient.put<PlanningDropdown[]>(
      UtilService.backEndURL  + 'api/planning-dropdown',
      element);
  }

  deleteDropdownElement(id: number) {
    return this.httpClient.delete<PlanningDropdown[]>(
      UtilService.backEndURL  + 'api/planning-dropdown/' + id);
  }
}
