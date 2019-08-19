import { Pipe, PipeTransform } from '@angular/core';
import { UtilService } from '../../../util/util.service';
import { PlanElement } from './plan-element.model';

@Pipe({
  name: 'deadlineText',
  pure: false
})
export class DeadlineTextPipe implements PipeTransform {
  transform(plan: PlanElement): string {
    if (!plan) {
      return '';
    }

    const daysToDeadline = UtilService.getDaysBeforeTodaysDate(plan.deadline);
    if (plan.withoutDeadline) {
      return 'tähtajatu';
    } else if (daysToDeadline < -1) {
      return Math.abs(daysToDeadline) + ' päeva pärast';
    } else if (daysToDeadline === -1) {
      return 'homme';
    } else if (daysToDeadline === 0) {
      return 'täna';
    } else {
      return daysToDeadline + ' päeva üle';
    }
  }
}
