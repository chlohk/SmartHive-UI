import {Component, Input, OnInit} from '@angular/core';
import {PlanningDropdown} from "./planning-dropdown.model";
import {PlanningService} from "../../planning.service";
import {PlanningComponentEnum} from "../../planning-component.enum";

@Component({
  selector: 'app-planning-dropdown-element',
  templateUrl: './planning-dropdown-element.component.html',
  styleUrls: ['./planning-dropdown-element.component.css']
})
export class PlanningDropdownElementComponent implements OnInit{
  @Input() planningDropdown: PlanningDropdown;
  @Input() memorizedActiveDropdownElementId: number;
  inActive = true;

  private newPlanningDropdownElementSelectedSubscription: any;

  constructor(private planningService: PlanningService) {}

  ngOnInit(): void {
    this.newPlanningDropdownElementSelectedSubscription=
      this.planningService.newPlanDropdownElementSelected.asObservable().subscribe(
        () => {this.inActive = true}
      );

    if(this.memorizedActiveDropdownElementId === this.planningDropdown.id) {
      this.inActive = false;
    }
  }

  onElementClick() {
    this.planningService.newPlanDropdownElementSelected.next(this.planningDropdown);
    this.inActive = false;
  }

  ngOnDestroy(): void {
    this.newPlanningDropdownElementSelectedSubscription.unsubscribe()
  }

  onDeleteElement() {
    this.planningService.deleteDropdownElement(this.planningDropdown);
    this.planningService.newPlanDropdownElementSelected.next(undefined);
  }
}
