import { SpinnerService } from '../../util/spinner/spinner.service';
import { SizeDataService } from './size-data.service';
import { Size } from './size.model';
import { Injectable } from '@angular/core';
import { ColoniesService } from '../../settings/shared/colonies.service';

@Injectable()
export class SizeService {
  constructor(private sizeDataService: SizeDataService,
              private spinnerService: SpinnerService,
              private coloniesService: ColoniesService) {
  }

  onUpdateSizeData(hiveIdThatIsUpdated: number, sizeLogToUpdate: Size) {
    return this.sizeDataService.onUpdateSizeLog(hiveIdThatIsUpdated, sizeLogToUpdate).then(
      () => this.coloniesService.retrieveColonies()
    );
  }
}
