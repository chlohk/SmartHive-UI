import {Component, OnInit} from '@angular/core';
import {UtilService} from "../../../util/util.service";
import {PlanningService} from "../planning.service";

@Component({
  selector: 'app-planning-dropdown',
  templateUrl: './planning-dropdown.component.html',
  styleUrls: ['./planning-dropdown.component.css']
})
export class PlanningDropdownComponent implements OnInit{
  document;

  newPlanDropdownElementSelecteddSubscription: any;
  memorizedActivePlanDropdownElementId: number

  constructor(private planningService: PlanningService) {
  }

  ngOnInit(): void {
    this.newPlanDropdownElementSelecteddSubscription =
      this.planningService.newPlanDropdownElementSelected.asObservable().subscribe(
        np => {
          if(!np) this.memorizedActivePlanDropdownElementId = undefined;
          else {
            this.memorizedActivePlanDropdownElementId = np.id;
          }
        }
      );
  }

  ngOnChanges() {
    setTimeout(
      () => document.getElementById('planningDropdownScrollArea').scrollTop = Number.MAX_SAFE_INTEGER,
      0);
  }


  ngOnDestroy(): void {
    this.newPlanDropdownElementSelecteddSubscription.unsubscribe()
  }

}
