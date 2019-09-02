import { Pipe, PipeTransform } from '@angular/core';
import { MomAttributes } from '../mother/mom-attributes.model';
import { MomStatusEnum } from '../mother/mom-status.enum';
import { UtilService } from '../../util/util.service';
import { MarkedStatusEnum } from '../mother/marked-status.enum';

@Pipe({
  name: 'motherStatusCell',
  pure: false
})
export class MotherStatusCellPipe implements PipeTransform {
  monthNames = ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni",
    "Juuli", "August", "September", "Oktoober", "November", "Detsember"
  ];

  transform(attributes: MomAttributes, getClass?: boolean): string {
    if (!attributes) {
      return '';
    }

    switch (attributes.momStatus) {
      case MomStatusEnum.FREAK: {
        if(UtilService.getAbsoluteDaysBeforeTodaysDate(attributes.statusStartingDate) > 1) {
          return getClass ? '' : 'väärema alates: <br>' +
            UtilService.getAbsoluteDaysBeforeTodaysDate(attributes.statusStartingDate)
            + ' päeva tagasi';
        }
        if(UtilService.getAbsoluteDaysBeforeTodaysDate(attributes.statusStartingDate) == 1) {
          return getClass ? '' : 'väärema alates eilsest';
        }
        return getClass ? '' : 'väärema alates tänasest';
      }
      case MomStatusEnum.MISSING:
      case MomStatusEnum.UNKNOWN: {
        if(!attributes.controlFrameStartDate) {
          return getClass ? 'danger' : 'Kontrollraam puudu!'
        }

        let controlframeText = 'Kontrollraam valitud:<br>' + UtilService.getAbsoluteDaysBeforeTodaysDate(attributes.controlFrameStartDate) + ' päeva tagasi <br>';
        let cocoonText: string;
        if(!attributes.cocoonChosenDate) {
          cocoonText = '<b>Kupp valimata!</b>';
          return getClass ? 'warning' : controlframeText + cocoonText;
        }

        cocoonText = 'Kupp valitud ' + UtilService.getAbsoluteDaysBeforeTodaysDate(attributes.cocoonChosenDate) + ' päeva tagasi';
        return getClass ? '' : controlframeText + cocoonText;
      }
      case MomStatusEnum.UN_CAGED:
      case MomStatusEnum.HATCHED:
      case MomStatusEnum.SEEN: {
        let returnText: string;
        if(!attributes.isLayingEggs) {
          if(getClass) {
            return 'warning'
          }
          if(attributes.momStatus === MomStatusEnum.HATCHED) {
            returnText = 'Koorunud: ' + UtilService.getAbsoluteDaysBeforeTodaysDate(attributes.statusStartingDate) + ' päeva tagasi';
          } else if (attributes.momStatus === MomStatusEnum.UN_CAGED) {
            returnText = 'Puurist välja lastud: ' + UtilService.getAbsoluteDaysBeforeTodaysDate(attributes.statusStartingDate) + ' päeva tagasi';
          } else if (attributes.momStatus === MomStatusEnum.SEEN) {
            returnText = 'Ema nähtud: ' + UtilService.getAbsoluteDaysBeforeTodaysDate(attributes.statusStartingDate) + ' päeva tagasi';
          }
          returnText = returnText + '<br><b>Mune pole nähtud!</b>';
        } else {
          returnText = 'Mune nähtud ' + UtilService.getAbsoluteDaysBeforeTodaysDate(attributes.eggsLastSeen) + ' päeva tagasi';
        }

        if(attributes.markedDate) {
          const markedDate = new Date(attributes.markedDate);
          if(attributes.isMarkedDateMonthSet) {
            returnText = returnText + '<br>Märgistatud: ' + this.monthNames[markedDate.getMonth()] + ' ' + markedDate.getFullYear();
          } else {
            returnText = returnText + '<br>Märgistatud: ' + markedDate.getFullYear();
          }
        }
        if(attributes.markedStatus === MarkedStatusEnum.MARKED && attributes.markedDescription) {
          returnText = returnText + '<br>Märgistus: ' + attributes.markedDescription
        } else if (attributes.markedStatus === MarkedStatusEnum.ATTENTION) {
          if(getClass) {
            return 'warning';
          }
          returnText = returnText + '<br><b>Probleemne märgistus</b>';
          if(attributes.markedDescription) {
            returnText = returnText + ': ' + attributes.markedDescription
          }
        } else if (attributes.markedStatus === MarkedStatusEnum.UNMARKED) {
          if(getClass) return 'warning';
          returnText = returnText + '<br><b>Märgistus puudub!</b>'
        }

        if(attributes.birthday) {
          const birthDay = new Date(attributes.birthday);
          if(attributes.isBirthdayDateMonthSet) {
            returnText = returnText + '<br>Koorunud: ' + this.monthNames[birthDay.getMonth()] + ' ' + birthDay.getFullYear();
          } else {
            returnText = returnText + '<br>Koorunud: ' + birthDay.getFullYear();
          }
        }

        return getClass ? '' : returnText;


      }
      case MomStatusEnum.IN_CAGE: {
        let returnText: string;
        returnText = 'Puuriga tarru pandud: ' + UtilService.getAbsoluteDaysBeforeTodaysDate(attributes.statusStartingDate) + ' päeva tagasi';

        if(attributes.markedDate) {
          const markedDate = new Date(attributes.markedDate);
          if(attributes.isMarkedDateMonthSet) {
            returnText = returnText + '<br>Märgistatud: ' + this.monthNames[markedDate.getMonth()] + ' ' + markedDate.getFullYear();
          } else {
            returnText = returnText + '<br>Märgistatud: ' + markedDate.getFullYear();
          }
        }
        if(attributes.markedStatus === MarkedStatusEnum.MARKED && attributes.markedDescription) {
          returnText = returnText + '<br>Märgistus: ' + attributes.markedDescription
        } else if (attributes.markedStatus === MarkedStatusEnum.ATTENTION) {
          if(getClass) {
            return 'warning';
          }
          returnText = returnText + '<br><b>Probleemne märgistus</b>';
          if(attributes.markedDescription) {
            returnText = returnText + ': ' + attributes.markedDescription
          }
        } else if (attributes.markedStatus === MarkedStatusEnum.UNMARKED) {
          if(getClass) return 'warning';
          returnText = returnText + '<br><b>Märgistus puudub!</b>'
        }

        if(attributes.birthday) {
          const birthDay = new Date(attributes.birthday);
          if(attributes.isBirthdayDateMonthSet) {
            returnText = returnText + '<br>Koorunud: ' + this.monthNames[birthDay.getMonth()] + ' ' + birthDay.getFullYear();
          } else {
            returnText = returnText + '<br>Koorunud: ' + birthDay.getFullYear();
          }
        }

        return getClass ? '' : returnText;


      }
      default: {
        return '';
      }
    }
  }
}
