import { Pipe, PipeTransform } from '@angular/core';
import { PlanElement } from './plan-element.model';
import { PlanningService } from '../planning.service';

@Pipe({
  name: 'planText',
  pure: false
})
export class PlanTextPipe implements PipeTransform {
  ELEMENT_DELETED_FROM_DROPDOWN = 'element rippmenüüst kustutatud';

  constructor(private planningService: PlanningService){}

  transform(plan: PlanElement): string {
    if (!plan) {
      return '';
    }

    if (plan.dropDown) {
      if (!this.planningService.planningDropDown) {
        return this.ELEMENT_DELETED_FROM_DROPDOWN;
      }
      let dropDownElement = this.planningService.planningDropDown.find(e => e.id == plan.dropDownElementId);
      if (dropDownElement) {
        return dropDownElement.text;
      } else {
        return this.ELEMENT_DELETED_FROM_DROPDOWN;
      }
    } else {
      return plan.text
    }
  }
}
