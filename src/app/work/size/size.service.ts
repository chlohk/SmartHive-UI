import { SpinnerService } from '../../util/spinner/spinner.service';
import { SizeDataService } from './size-data.service';
import { Size } from './size.model';
import { Injectable } from '@angular/core';
import { ColoniesService } from '../../settings/shared/colonies.service';
import { take } from 'rxjs/operators';

@Injectable()
export class SizeService {
  constructor(private sizeDataService: SizeDataService,
              private spinnerService: SpinnerService,
              private coloniesService: ColoniesService) {
  }

  private onUpdateSizeData(hiveIdThatIsUpdated: number, sizeLogToUpdate: Size) {
    return this.sizeDataService.onUpdateSizeLog(hiveIdThatIsUpdated, sizeLogToUpdate)
      .pipe(take(1))
      .subscribe(
        () => this.coloniesService.retrieveColonies()
    );
  }

  updateSizeData = (hiveIdThatIsUpdated: number, sizeLogsToUpdate: Size[]) => {
    sizeLogsToUpdate.forEach(
      (s: Size) => this.onUpdateSizeData(hiveIdThatIsUpdated, s)
    );
  }
}
