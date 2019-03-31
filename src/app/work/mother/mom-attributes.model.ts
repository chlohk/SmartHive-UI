import {MomStatusEnum} from "./mom-status.enum";
import {MarkedStatusEnum} from "./marked-status.enum";

export class MomAttributes {
  momStatus: MomStatusEnum;
  statusStartingDate: Date;

  isLayingEggs: boolean;
  eggsLastSeen: Date;

  markedStatus: MarkedStatusEnum;
  markedDate: Date;
  markedDescription: string;
  isMarkedDateMonthSet: boolean;

  isBirthDayDateMonthSet: boolean;
  birthday: Date;

  hasControlFrame: boolean;
  controlFrameStartDate: Date;

  isCocoonChosen: boolean;
  cocoonChosenDate: Date;

  freakLog: any;
}
