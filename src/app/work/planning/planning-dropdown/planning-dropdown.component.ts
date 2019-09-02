import { Component, OnInit } from '@angular/core';
import { PlanningService } from '../planning.service';
import { ExecutorService, ProtectionState } from '../../../util/executor/executor.service';
import { Subscription } from 'rxjs';
import { ControlsProtectionIdEnum } from '../../../util/executor/controls-protection-id.enum';

@Component({
  selector: 'app-planning-dropdown',
  templateUrl: './planning-dropdown.component.html',
  styleUrls: ['./planning-dropdown.component.css']
})
export class PlanningDropdownComponent implements OnInit {
  document;
  subscriptions: Subscription[] = [];
  controlsDisabled: boolean;

  memorizedActivePlanDropdownElementId: number;

  constructor(private planningService: PlanningService,
              private executorService: ExecutorService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.planningService.newPlanDropdownElementSelected.asObservable().subscribe(
        np => {
          if (!np) {
            this.memorizedActivePlanDropdownElementId = undefined;
          } else {
            this.memorizedActivePlanDropdownElementId = np.id;
          }
        }
      )
    );

    this.subscriptions.push(
      this.executorService.getControlsProtection.subscribe(
        (ps: ProtectionState) => {
          console.log(ps);
          console.log(this.memorizedActivePlanDropdownElementId);
          if(!ps.disableControls) {
            this.controlsDisabled = false;
            return;
          }
          this.controlsDisabled = ps.omittedControlsId != ControlsProtectionIdEnum.PLANNING_DROPDOWN_ORDERING;
        }
      )
    );
  }

  ngOnChanges() {
    setTimeout(
      () => document.getElementById('planningDropdownScrollArea').scrollTop = Number.MAX_SAFE_INTEGER,
      0);
  }

  increaseElementOrderPlacement = () => {
    this.planningService.increaseElementOrderNumber(this.memorizedActivePlanDropdownElementId);
  };

  decreaseElementOrderPlacement() {
    this.planningService.decreaseElementOrderNumber(this.memorizedActivePlanDropdownElementId);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (s: Subscription) => s.unsubscribe()
    );
  }

}
