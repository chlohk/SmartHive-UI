import {Subject} from "rxjs";

export class SpinnerService {
  setSpinnerStatus = new Subject<boolean>();
}
