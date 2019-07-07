import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";
import {MomStatusEnum} from "../mom-status.enum";
import {Hive} from "../../../settings/shared/hive.model";
import {ActionTimeEnum} from "../action-time.enum";
import {UtilService} from "../../../util/util.service";
import {MomAttributesService} from "../mom-attributes.service";
import {ColoniesService} from "../../../settings/shared/colonies.service";

@Component({
  selector: 'app-missing',
  templateUrl: './missing.component.html',
  styleUrls: ['./missing.component.css']
})
export class MissingComponent implements OnChanges {
  @Input() currentlyChosenHive: Hive;
  @Output() onChangeMomStatus = new EventEmitter<MomStatusEnum>();
  currentlyChosenHiveInitialData: Hive;

  momStatusEnum = MomStatusEnum;
  actionTimeEnum = ActionTimeEnum;

  momStatusSectionTimeText: string;
  momStatusInitialValueText: string = null;
  radioBtnMomStatusSelection: ActionTimeEnum;
  radioBtnStatusPastDateInputValue: number = null;

  controlFrameSectionTimeText: string;
  controlFrameInitialValueText: string = null;
  radioBtnControlFrameSelection: ActionTimeEnum;
  radioBtnControlFramePastDateInputValue: number = null;

  cocoonSectionTimeText: string;
  cocoonInitialValueText: string = null;
  radioBtnCocoonSelection: ActionTimeEnum;
  radioBtnCocoonPastDateInputValue: number = null;

  constructor(private modalService: JwModalService,
              private momAttributesService: MomAttributesService,
              private coloniesService: ColoniesService) { }

  ngOnChanges() {
    this.currentlyChosenHiveInitialData = this.coloniesService.getInitialHiveData(
      this.currentlyChosenHive
    );
    this.setMotherStatusSectionValuesCorrect();
    this.setControlFrameSectionValuesCorrect();
    this.setCocoonSectionValuesCorrect();
  }

  saveMotherStatusSectionValues(setToToday?: boolean) {
    if(setToToday) {
      this.radioBtnMomStatusSelection = ActionTimeEnum.TODAY;
    }
    if(this.radioBtnMomStatusSelection === ActionTimeEnum.TODAY) {
      this.currentlyChosenHive.momAttributes.statusStartingDate = new Date();
    } else if (this.radioBtnMomStatusSelection === ActionTimeEnum.PAST_DATE) {
      this.currentlyChosenHive.momAttributes.statusStartingDate =
        new Date(new Date().setHours(0,0,0,0) -
          +this.radioBtnStatusPastDateInputValue * 24 * 60 * 60 * 1000);
    } else if (this.radioBtnMomStatusSelection === ActionTimeEnum.INITIAL_DATE) {
      this.currentlyChosenHive.momAttributes.statusStartingDate =
        this.currentlyChosenHiveInitialData.momAttributes.statusStartingDate;
    }
    this.momAttributesService.onUpdateMomAttributes(this.currentlyChosenHive);
    this.modalService.close('mother-missing-edit');
    this.setMotherStatusSectionValuesCorrect();
  }

  setMotherStatusSectionValuesCorrect() {
    this.momStatusInitialValueText = null;
    const daysFromStatusBeginning = UtilService.getAbsoluteDaysBeforeTodaysDate(
      this.currentlyChosenHive.momAttributes.statusStartingDate);
    if(daysFromStatusBeginning == 0) {
      this.radioBtnMomStatusSelection = ActionTimeEnum.TODAY;
      this.momStatusSectionTimeText = 'täna';
      this.radioBtnStatusPastDateInputValue = null;
    } else if (daysFromStatusBeginning == 1) {
      this.radioBtnMomStatusSelection = ActionTimeEnum.PAST_DATE;
      this.momStatusSectionTimeText = '1 päev tagasi';
      this.radioBtnStatusPastDateInputValue = 1;
    } else {
      this.radioBtnMomStatusSelection = ActionTimeEnum.PAST_DATE;
      this.momStatusSectionTimeText = daysFromStatusBeginning + ' päeva tagasi';
      this.radioBtnStatusPastDateInputValue = daysFromStatusBeginning;
    }
    if(this.currentlyChosenHiveInitialData &&
      this.currentlyChosenHiveInitialData.momAttributes.momStatus === MomStatusEnum.MISSING) {
      const daysFromInitialStatusBeginning = UtilService.getAbsoluteDaysBeforeTodaysDate(
        this.currentlyChosenHiveInitialData.momAttributes.statusStartingDate
      );
      if (daysFromStatusBeginning != daysFromInitialStatusBeginning) {
        if(daysFromInitialStatusBeginning == 0) {
          return;
        } else if (daysFromInitialStatusBeginning == 1) {
          this.momStatusInitialValueText = daysFromInitialStatusBeginning + ' päev tagasi';
        } else {
          this.momStatusInitialValueText = daysFromInitialStatusBeginning + ' päeva tagasi';
        }
      }
    }
  }

  saveControlFrameSectionValues(setToToday?: boolean) {
    if(setToToday) {
      this.radioBtnControlFrameSelection = ActionTimeEnum.TODAY;
    }
    if(this.radioBtnControlFrameSelection === ActionTimeEnum.TODAY) {
      this.currentlyChosenHive.momAttributes.controlFrameStartDate = new Date();
    } else if (this.radioBtnControlFrameSelection === ActionTimeEnum.PAST_DATE) {
      this.currentlyChosenHive.momAttributes.controlFrameStartDate =
        new Date(new Date().setHours(0,0,0,0) -
          +this.radioBtnControlFramePastDateInputValue * 24 * 60 * 60 * 1000);
    } else if (this.radioBtnControlFrameSelection === ActionTimeEnum.INITIAL_DATE) {
      this.currentlyChosenHive.momAttributes.controlFrameStartDate =
        this.currentlyChosenHiveInitialData.momAttributes.controlFrameStartDate;
    } else if (this.radioBtnControlFrameSelection === ActionTimeEnum.NO_ACTION) {
      this.currentlyChosenHive.momAttributes.controlFrameStartDate = null;
    }
    this.momAttributesService.onUpdateMomAttributes(this.currentlyChosenHive);
    this.modalService.close('mother-control-frame-edit');
    this.setControlFrameSectionValuesCorrect();
  }

  setControlFrameSectionValuesCorrect() {
    this.controlFrameInitialValueText = null;
    if(this.currentlyChosenHive.momAttributes.controlFrameStartDate){
      const daysFromControlFrameBeginning = UtilService.getAbsoluteDaysBeforeTodaysDate(
        this.currentlyChosenHive.momAttributes.controlFrameStartDate);
      if(daysFromControlFrameBeginning == 0) {
        this.radioBtnControlFrameSelection = ActionTimeEnum.TODAY;
        this.controlFrameSectionTimeText = 'täna';
        this.radioBtnControlFramePastDateInputValue = null;
      } else if (daysFromControlFrameBeginning == 1) {
        this.radioBtnControlFrameSelection = ActionTimeEnum.PAST_DATE;
        this.controlFrameSectionTimeText = '1 päev tagasi';
        this.radioBtnControlFramePastDateInputValue = 1;
      } else {
        this.radioBtnControlFrameSelection = ActionTimeEnum.PAST_DATE;
        this.controlFrameSectionTimeText = daysFromControlFrameBeginning + ' päeva tagasi';
        this.radioBtnControlFramePastDateInputValue = daysFromControlFrameBeginning;
      }
    } else {
      this.radioBtnControlFrameSelection = ActionTimeEnum.NO_ACTION;
      this.controlFrameSectionTimeText = '';
      this.radioBtnControlFramePastDateInputValue = null;
    }

    if(this.currentlyChosenHiveInitialData &&
      this.currentlyChosenHiveInitialData.momAttributes.momStatus === MomStatusEnum.MISSING) {
      const daysFromInitialStatusBeginning = UtilService.getAbsoluteDaysBeforeTodaysDate(
        this.currentlyChosenHiveInitialData.momAttributes.controlFrameStartDate
      );
      if(daysFromInitialStatusBeginning == 0 ||
        !this.currentlyChosenHiveInitialData.momAttributes.controlFrameStartDate ||
        this.currentlyChosenHiveInitialData.momAttributes.controlFrameStartDate ==
        this.currentlyChosenHive.momAttributes.controlFrameStartDate) {
        return;
      } else if (daysFromInitialStatusBeginning == 1) {
        this.controlFrameInitialValueText = daysFromInitialStatusBeginning + ' päev tagasi';
      } else {
        this.controlFrameInitialValueText = daysFromInitialStatusBeginning + ' päeva tagasi';
      }
    }
  }


  saveCocoonSectionValues(setToToday?: boolean) {
    if(setToToday) {
      this.radioBtnCocoonSelection = ActionTimeEnum.TODAY;
    }
    if(this.radioBtnCocoonSelection === ActionTimeEnum.TODAY) {
      this.currentlyChosenHive.momAttributes.cocoonChosenDate = new Date();
    } else if (this.radioBtnCocoonSelection === ActionTimeEnum.PAST_DATE) {
      this.currentlyChosenHive.momAttributes.cocoonChosenDate =
        new Date(new Date().setHours(0,0,0,0) -
          +this.radioBtnCocoonPastDateInputValue * 24 * 60 * 60 * 1000);
    } else if (this.radioBtnCocoonSelection === ActionTimeEnum.INITIAL_DATE) {
      this.currentlyChosenHive.momAttributes.cocoonChosenDate =
        this.currentlyChosenHiveInitialData.momAttributes.cocoonChosenDate;
    } else if (this.radioBtnCocoonSelection === ActionTimeEnum.NO_ACTION) {
      this.currentlyChosenHive.momAttributes.cocoonChosenDate = null;
    }
    this.momAttributesService.onUpdateMomAttributes(this.currentlyChosenHive);
    this.modalService.close('mother-cocoon-edit');
    this.setCocoonSectionValuesCorrect();
  }

  setCocoonSectionValuesCorrect() {
    this.cocoonInitialValueText = null;
    if(this.currentlyChosenHive.momAttributes.cocoonChosenDate){
      const daysFromCocoonChosen = UtilService.getAbsoluteDaysBeforeTodaysDate(
        this.currentlyChosenHive.momAttributes.cocoonChosenDate);
      if(daysFromCocoonChosen == 0) {
        this.radioBtnCocoonSelection = ActionTimeEnum.TODAY;
        this.cocoonSectionTimeText = 'täna';
        this.radioBtnCocoonPastDateInputValue = null;
      } else if (daysFromCocoonChosen == 1) {
        this.radioBtnCocoonSelection = ActionTimeEnum.PAST_DATE;
        this.cocoonSectionTimeText = '1 päev tagasi';
        this.radioBtnCocoonPastDateInputValue = 1;
      } else {
        this.radioBtnCocoonSelection = ActionTimeEnum.PAST_DATE;
        this.cocoonSectionTimeText = daysFromCocoonChosen + ' päeva tagasi';
        this.radioBtnCocoonPastDateInputValue = daysFromCocoonChosen;
      }
    } else {
      this.radioBtnCocoonSelection = ActionTimeEnum.NO_ACTION;
      this.cocoonSectionTimeText = '';
      this.radioBtnCocoonPastDateInputValue = null;
    }

    if(this.currentlyChosenHiveInitialData &&
      this.currentlyChosenHiveInitialData.momAttributes.momStatus === MomStatusEnum.MISSING) {
      const daysFromInitialCocoonBeginning = UtilService.getAbsoluteDaysBeforeTodaysDate(
        this.currentlyChosenHiveInitialData.momAttributes.cocoonChosenDate
      );
      if(daysFromInitialCocoonBeginning == 0 ||
        !this.currentlyChosenHiveInitialData.momAttributes.cocoonChosenDate ||
          this.currentlyChosenHiveInitialData.momAttributes.cocoonChosenDate ==
          this.currentlyChosenHive.momAttributes.cocoonChosenDate) {
        return;
      } else if (daysFromInitialCocoonBeginning == 1) {
        this.cocoonInitialValueText = daysFromInitialCocoonBeginning + ' päev tagasi';
      } else {
        this.cocoonInitialValueText = daysFromInitialCocoonBeginning + ' päeva tagasi';
      }
    }
  }

  radioBtnMomStatusSelected(selectedActionTime: ActionTimeEnum) {
    this.radioBtnMomStatusSelection = selectedActionTime;
  }

  radioBtnControlFrameSelected(selectedActionTime: ActionTimeEnum) {
    this.radioBtnControlFrameSelection = selectedActionTime;
  }

  radioBtnCocoonSelected(selectedActionTime: ActionTimeEnum) {
    this.radioBtnCocoonSelection = selectedActionTime;
  }

  onChangeMotherStatusButtonClick(newMotherStatus?: MomStatusEnum) {
    this.modalService.close('mother-missing-edit');
    this.onChangeMomStatus.emit(newMotherStatus);
  }

  onOpenMomStatusSectionEditButton() {
    this.modalService.open('mother-missing-edit');
  }

  onCloseMomStatusSectionEditButton() {
    this.setMotherStatusSectionValuesCorrect();
    this.modalService.close('mother-missing-edit');
  }

  onOpenWhenControlFrameEditButton() {
    this.modalService.open('mother-control-frame-edit');
  }

  onCloseWhenControlFrameEditButton() {
    this.modalService.close('mother-control-frame-edit');
  }

  onOpenWhenCocoonEditButton() {
    this.modalService.open('mother-cocoon-edit');
  }

  onCloseWhenCocoonEditButton() {
    this.modalService.close('mother-cocoon-edit');
  }

}
