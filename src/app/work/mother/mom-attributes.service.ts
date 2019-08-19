import {Injectable} from "@angular/core";
import {MomDataService} from "./mom-data.service";
import {MomStatusEnum} from "./mom-status.enum";
import {Hive} from "../../settings/shared/hive.model";
import {SpinnerService} from "../../util/spinner/spinner.service";
import {ColoniesService} from "../../settings/shared/colonies.service";
import {MarkedStatusEnum} from "./marked-status.enum";
import {Log} from "./log.model";

@Injectable()
export class MomAttributesService {

  constructor(private momDataService: MomDataService,
              private spinnerService: SpinnerService,
              private coloniesService: ColoniesService) {}

  async onUpdateMomStatus(hive: Hive, newMomStatus: MomStatusEnum) {
    this.spinnerService.setSpinnerStatus.next(true);
    MomAttributesService.setAppropriateAttributesAfterStatusChangeBecauseOfNewStatus(hive, newMomStatus);
    await this.momDataService.onEditMomAttributes(hive);
    this.spinnerService.setSpinnerStatus.next(false);
  }

  async onUpdateMomAttributes(hive: Hive) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.momDataService.onEditMomAttributes(hive);
    this.spinnerService.setSpinnerStatus.next(false);
  }

  async onDeleteFreakLogEntry(logEntryToDelete: Log) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.momDataService.onDeleteFreakLogEntry(logEntryToDelete);
    await this.coloniesService.retrieveColonies();
    this.spinnerService.setSpinnerStatus.next(false);
  }

  async onSaveNewFreakLogEntry(hive: Hive, logEntryText: string) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.momDataService.onSaveNewFreakLogEntry(hive, logEntryText);
    await this.coloniesService.retrieveColonies();
    this.spinnerService.setSpinnerStatus.next(false);
  }

  async onUpdateFreakLogEntry(logEntryToUpdate: Log, newlogEntryText: string) {
    this.spinnerService.setSpinnerStatus.next(true);
    await this.momDataService.onUpdateFreakLogEntry(logEntryToUpdate, newlogEntryText);
    await this.coloniesService.retrieveColonies();
    this.spinnerService.setSpinnerStatus.next(false);
  }

  static setAppropriateAttributesAfterStatusChangeBecauseOfNewStatus(hive: Hive, newMomStatus: MomStatusEnum) {
    switch(newMomStatus) {
      case MomStatusEnum.FREAK: {
        if(hive.momAttributes.momStatus === MomStatusEnum.FREAK) {
          return;
        }
        hive.momAttributes.momStatus = MomStatusEnum.FREAK;
        hive.momAttributes.statusStartingDate = new Date();

        hive.momAttributes.isLayingEggs = false;
        hive.momAttributes.eggsLastSeen = null;

        hive.momAttributes.markedStatus = MarkedStatusEnum.UNMARKED;
        hive.momAttributes.markedDate = null;
        hive.momAttributes.markedDescription = '';

        hive.momAttributes.isBirthDayDateMonthSet = false;
        hive.momAttributes.birthday = null;

        hive.momAttributes.hasControlFrame = false;
        hive.momAttributes.controlFrameStartDate = null;

        hive.momAttributes.isCocoonChosen = false;
        hive.momAttributes.cocoonChosenDate = null;

        break;
      }
      case MomStatusEnum.UNKNOWN: {
        switch(hive.momAttributes.momStatus) {
          case MomStatusEnum.MISSING:
          case MomStatusEnum.UNKNOWN: {
            hive.momAttributes.momStatus = MomStatusEnum.UNKNOWN;
            return;
          }
          default: {
            hive.momAttributes.momStatus = MomStatusEnum.UNKNOWN;
            hive.momAttributes.statusStartingDate = new Date();

            hive.momAttributes.isLayingEggs = false;
            hive.momAttributes.eggsLastSeen = null;

            hive.momAttributes.markedStatus = MarkedStatusEnum.UNMARKED;
            hive.momAttributes.markedDate = null;
            hive.momAttributes.markedDescription = '';

            hive.momAttributes.isBirthDayDateMonthSet = false;
            hive.momAttributes.birthday = null;

            hive.momAttributes.hasControlFrame = false;
            hive.momAttributes.controlFrameStartDate = null;

            hive.momAttributes.isCocoonChosen = false;
            hive.momAttributes.cocoonChosenDate = null;
            break;
          }
        }
        break;
      }
      case MomStatusEnum.MISSING: {
        switch(hive.momAttributes.momStatus) {
          case MomStatusEnum.MISSING:
          case MomStatusEnum.UNKNOWN: {
            hive.momAttributes.momStatus = MomStatusEnum.MISSING;
            return;
          }
          default: {
            hive.momAttributes.momStatus = MomStatusEnum.MISSING;
            hive.momAttributes.statusStartingDate = new Date();

            hive.momAttributes.isLayingEggs = false;
            hive.momAttributes.eggsLastSeen = null;

            hive.momAttributes.markedStatus = MarkedStatusEnum.UNMARKED;
            hive.momAttributes.markedDate = null;
            hive.momAttributes.markedDescription = '';

            hive.momAttributes.isBirthDayDateMonthSet = false;
            hive.momAttributes.birthday = null;

            hive.momAttributes.hasControlFrame = false;
            hive.momAttributes.controlFrameStartDate = null;

            hive.momAttributes.isCocoonChosen = false;
            hive.momAttributes.cocoonChosenDate = null;
            break;
          }
        }
        break;
      }
      case MomStatusEnum.IN_CAGE: {
        switch(hive.momAttributes.momStatus) {
          case MomStatusEnum.IN_CAGE: {
            return;
          }
          default: {
            hive.momAttributes.momStatus = MomStatusEnum.IN_CAGE;
            hive.momAttributes.statusStartingDate = new Date();

            hive.momAttributes.isLayingEggs = false;
            hive.momAttributes.eggsLastSeen = null;

            hive.momAttributes.markedStatus = MarkedStatusEnum.UNMARKED;
            hive.momAttributes.markedDate = null;
            hive.momAttributes.markedDescription = '';

            hive.momAttributes.isBirthDayDateMonthSet = true;
            hive.momAttributes.birthday = new Date();

            hive.momAttributes.hasControlFrame = false;
            hive.momAttributes.controlFrameStartDate = null;

            hive.momAttributes.isCocoonChosen = false;
            hive.momAttributes.cocoonChosenDate = null;
            break;
          }
        }
        break;
      }
      case MomStatusEnum.UN_CAGED: {
        switch(hive.momAttributes.momStatus) {
          case MomStatusEnum.SEEN:
          case MomStatusEnum.UN_CAGED: {
            hive.momAttributes.momStatus = MomStatusEnum.UN_CAGED;
            return;
          }
          case MomStatusEnum.IN_CAGE: {
            hive.momAttributes.momStatus = MomStatusEnum.UN_CAGED;
            hive.momAttributes.statusStartingDate = new Date();

            hive.momAttributes.isLayingEggs = false;
            hive.momAttributes.eggsLastSeen = null;

            hive.momAttributes.hasControlFrame = false;
            hive.momAttributes.controlFrameStartDate = null;

            hive.momAttributes.isCocoonChosen = false;
            hive.momAttributes.cocoonChosenDate = null;
            break;
          }
          default: {
            hive.momAttributes.momStatus = MomStatusEnum.UN_CAGED;
            hive.momAttributes.statusStartingDate = new Date();

            hive.momAttributes.isLayingEggs = false;
            hive.momAttributes.eggsLastSeen = null;

            hive.momAttributes.markedStatus = MarkedStatusEnum.UNMARKED;
            hive.momAttributes.markedDate = null;
            hive.momAttributes.markedDescription = '';

            hive.momAttributes.isBirthDayDateMonthSet = true;
            hive.momAttributes.birthday = new Date();

            hive.momAttributes.hasControlFrame = false;
            hive.momAttributes.controlFrameStartDate = null;

            hive.momAttributes.isCocoonChosen = false;
            hive.momAttributes.cocoonChosenDate = null;
            break;
          }
        }
        break;
      }
      case MomStatusEnum.HATCHED: {
        switch(hive.momAttributes.momStatus) {
          case MomStatusEnum.SEEN:
          case MomStatusEnum.HATCHED: {
            hive.momAttributes.momStatus = MomStatusEnum.HATCHED;
            return;
          }
          default: {
            hive.momAttributes.momStatus = MomStatusEnum.HATCHED;
            hive.momAttributes.statusStartingDate = new Date();

            hive.momAttributes.isLayingEggs = false;
            hive.momAttributes.eggsLastSeen = null;

            hive.momAttributes.markedStatus = MarkedStatusEnum.UNMARKED;
            hive.momAttributes.markedDate = null;
            hive.momAttributes.markedDescription = '';

            hive.momAttributes.isBirthDayDateMonthSet = true;
            hive.momAttributes.birthday = new Date();

            hive.momAttributes.hasControlFrame = false;
            hive.momAttributes.controlFrameStartDate = null;

            hive.momAttributes.isCocoonChosen = false;
            hive.momAttributes.cocoonChosenDate = null;
            break;
          }
        }
        break;
      }
      case MomStatusEnum.SEEN: {
        switch(hive.momAttributes.momStatus) {
          case MomStatusEnum.SEEN: {
            return;
          }
          case  MomStatusEnum.IN_CAGE:
          case MomStatusEnum.UN_CAGED:
          case MomStatusEnum.HATCHED: {
            hive.momAttributes.momStatus = MomStatusEnum.SEEN;
            hive.momAttributes.statusStartingDate = new Date();
            break;
          }
          default: {
            hive.momAttributes.momStatus = MomStatusEnum.SEEN;
            hive.momAttributes.statusStartingDate = new Date();

            hive.momAttributes.isLayingEggs = false;
            hive.momAttributes.eggsLastSeen = null;

            hive.momAttributes.markedStatus = MarkedStatusEnum.UNMARKED;
            hive.momAttributes.markedDate = null;
            hive.momAttributes.markedDescription = '';

            hive.momAttributes.isBirthDayDateMonthSet = true;
            hive.momAttributes.birthday = new Date();

            hive.momAttributes.hasControlFrame = false;
            hive.momAttributes.controlFrameStartDate = null;

            hive.momAttributes.isCocoonChosen = false;
            hive.momAttributes.cocoonChosenDate = null;
            break;
          }
        }
        break;
      }

    }
  }
}
