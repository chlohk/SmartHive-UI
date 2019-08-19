import { Pipe, PipeTransform } from '@angular/core';
import { UtilService } from '../../../util/util.service';
import { PlanElement } from './plan-element.model';

@Pipe({
  name: 'deadlineClass',
  pure: false
})
export class DeadlineClassPipe implements PipeTransform {
  transform(plan: PlanElement): string {
    if (!plan) {
      return '';
    }

    const daysToDeadline = UtilService.getDaysBeforeTodaysDate(plan.deadline);
    if (plan.withoutDeadline) {
      return ''
    } else if (daysToDeadline < -1) {
      return 'normal'
    } else if (daysToDeadline < 3) {
      return 'warning'
    } else {
      return 'danger'
    }
  }
}
