import {Injectable} from "@angular/core";

@Injectable()
export class UtilService {

  constructor() {

  }


  static backEndURL = 'http://localhost:8080/';
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

  // static backEndURL = 'http://18.188.231.219/';
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
