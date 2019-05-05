export class UtilService {
  static backEndURL = 'http://localhost:8080/';
  // static backEndURL = 'http://18.188.231.219/';

  //ng build --prod --output-path docs



  static getDaysBeforeTodaysDate(date: Date) {
    const oneDay = 24 * 60 * 60 * 1000;
    const dateFormatted = new Date(date).setHours(0,0,0,0);
    const todaysDateFormatted = new Date().setHours(0,0,0,0);
    return Math.round(Math.abs((
      todaysDateFormatted - dateFormatted)/(oneDay)));
  }
}
