import {SpinnerService} from "../../util/spinner/spinner.service";
import {SizeDataService} from "./size-data.service";
import {Size} from "./size.model";
import {Injectable} from "@angular/core";

@Injectable()
export class SizeService {
  constructor(private sizeDataService: SizeDataService,
              private spinnerService: SpinnerService) {}

  async onGetSizeData(hiveId: number) {
    setTimeout(
      () => {
        this.spinnerService.setSpinnerStatus.next(true); },
      0
    );
    const sizeLog: Size[] = await this.sizeDataService.onGetSizeLogs(hiveId);
    setTimeout(
      () => {
        this.spinnerService.setSpinnerStatus.next(false); },
      0
    );
    return sizeLog;
  }

  onUpdateSizeData(hiveIdThatIsUpdated: number, sizeLogToUpdate: Size) {
    return this.sizeDataService.onUpdateSizeLog(hiveIdThatIsUpdated, sizeLogToUpdate);
  }
}
