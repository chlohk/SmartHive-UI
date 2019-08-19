import { Pipe, PipeTransform } from '@angular/core';
import { MomStatusEnum } from './mom-status.enum';

@Pipe({
  name: 'motherStatusText',
  pure: false
})
export class MotherStatusTextPipe implements PipeTransform {
  transform(status: MomStatusEnum, returnClass?: boolean): string {

    switch (status) {
      case MomStatusEnum.FREAK: {
        return returnClass ? 'danger': 'Väärema';
      }
      case MomStatusEnum.HATCHED: {
        return returnClass ? '': 'Koorunud';
      }
      case MomStatusEnum.IN_CAGE: {
        return returnClass ? 'warning' : 'Puuriga tarus';
      }
      case MomStatusEnum.MISSING: {
        return returnClass ? 'warning' : 'Kadunud';
      }
      case MomStatusEnum.SEEN: {
        return returnClass ? '' : 'Nähtud';
      }
      case MomStatusEnum.UN_CAGED: {
        return returnClass ? '' : 'Puurist välja lastud';
      }
      case MomStatusEnum.UNKNOWN: {
        return returnClass ? 'warning' : 'Teadmata';
      }
      default: {
        return '';
      }
    }

  }
}
