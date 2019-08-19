import {MomStatusEnum} from "./mom-status.enum";
import {MarkedStatusEnum} from "./marked-status.enum";
import {Log} from "./log.model";

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

  //TODO! add the boolean to the backend
  hasControlFrame: boolean;
  controlFrameStartDate: Date;

  //TODO! add the boolean to the backend
  isCocoonChosen: boolean;
  cocoonChosenDate: Date;

  freakLog: Log[];
}
