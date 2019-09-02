import { Component, Input, OnInit } from '@angular/core';
import { PlanningDropdown } from './planning-dropdown.model';
import { PlanningService } from '../../planning.service';
import { Subscription } from 'rxjs';
import { ExecutorService, ProtectionState } from '../../../../util/executor/executor.service';
import { ControlsProtectionIdEnum } from '../../../../util/executor/controls-protection-id.enum';

@Component({
  selector: 'app-planning-dropdown-element',
  templateUrl: './planning-dropdown-element.component.html',
  styleUrls: ['./planning-dropdown-element.component.css']
})
export class PlanningDropdownElementComponent implements OnInit {
  @Input() planningDropdown: PlanningDropdown;
  @Input() memorizedActiveDropdownElementId: number;
  inActive = true;
  allControlsDisabled : boolean;
  trashControlsDisabled: boolean;

  private subscriptions: Subscription[] = [];

  constructor(private planningService: PlanningService,
              private executorService: ExecutorService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.planningService.newPlanDropdownElementSelected.asObservable().subscribe(
        () => {
          this.inActive = true;
        }
      )


    );
    this.subscriptions.push(
      this.executorService.getControlsProtection.subscribe(
        (ps: ProtectionState) => {
          if(!ps.disableControls) {
            this.trashControlsDisabled = false;
            this.allControlsDisabled = ps.disableControls;
            return;
          }
          this.allControlsDisabled = ps.omittedControlsId != ControlsProtectionIdEnum.PLANNING_DROPDOWN_ORDERING
          this.trashControlsDisabled = ps.disableControls;
        }
      )
    );

    if (this.memorizedActiveDropdownElementId === this.planningDropdown.id) {
      this.inActive = false;
    }
  }

  onElementClick() {
    this.planningService.newPlanDropdownElementSelected.next(this.planningDropdown);
    this.inActive = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (s: Subscription) => s.unsubscribe()
    );
  }

  onDeleteElement() {
    this.planningService.deleteDropdownElement(this.planningDropdown);
    this.planningService.newPlanDropdownElementSelected.next(undefined);
  }
}
