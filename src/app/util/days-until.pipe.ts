import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysUntil',
  pure: false
})
export class DaysUntilPipe implements PipeTransform {
  transform(value: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    const dateFormatted = new Date(value).setHours(0,0,0,0);
    const todaysDateFormatted = new Date().setHours(0,0,0,0);
    return Math.round((
      dateFormatted - todaysDateFormatted)/(oneDay));
  }
}
