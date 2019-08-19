import {Injectable} from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class UtilService {

  private overview = new Subject<boolean>();
  public overview$ = this.overview.asObservable();

  constructor() {

  }

  showOverviewWindow(status: boolean) {
    this.overview.next(status);
  }


  // static backEndURL = 'http://localhost:8080/tarmo/';
  // static planningDropdown = null;
  // static planningDropdown = this.p
  //
  // : PlanningDropdown[] = [
  // {
  //   id: 1,
  //   text: 'vaata peret',
  //   orderNumber: 1
  // },
  // {
  //   id: 2,
  //   text: 'võta mett',
  //   orderNumber: 2
  // },
  // {
  //   id: 3,
  //   text: 'otsi kuppe',
  //   orderNumber: 3
  // },
  // {
  //   id: 4,
  //   text: 'laienda peret',
  //   orderNumber: 4
  // },
  // ];

  static backEndURL = '';
  //
  // ng build --prod --output-path docs


  static getAbsoluteDaysBeforeTodaysDate(date: Date) {
    const oneDay = 24 * 60 * 60 * 1000;
    const dateFormatted = new Date(date).setHours(0, 0, 0, 0);
    const todaysDateFormatted = new Date().setHours(0, 0, 0, 0);
    return Math.round(Math.abs((
      todaysDateFormatted - dateFormatted) / (oneDay)));
  }

  static getDaysBeforeTodaysDate(date: Date) {
    const oneDay = 24 * 60 * 60 * 1000;
    const dateFormatted = new Date(date).setHours(0, 0, 0, 0);
    const todaysDateFormatted = new Date().setHours(0, 0, 0, 0);
    return Math.round((
      todaysDateFormatted - dateFormatted) / (oneDay));
  }
}
