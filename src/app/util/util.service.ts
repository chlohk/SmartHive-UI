export class UtilService {
  static getDaysBeforeTodaysDate(date: Date) {
    const oneDay = 24 * 60 * 60 * 1000;
    const dateFormatted = new Date(date).setHours(0,0,0,0);
    const todaysDateFormatted = new Date().setHours(0,0,0,0);
    return Math.round(Math.abs((
      todaysDateFormatted - dateFormatted)/(oneDay)));
  }
}
