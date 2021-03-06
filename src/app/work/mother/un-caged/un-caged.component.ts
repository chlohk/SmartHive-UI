import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";
import {MomStatusEnum} from "../mom-status.enum";
import {Hive} from "../../../settings/shared/hive.model";
import {MarkedStatusEnum} from "../marked-status.enum";
import {ActionTimeEnum} from "../action-time.enum";
import {UtilService} from "../../../util/util.service";
import {MomAttributesService} from "../mom-attributes.service";
import {ColoniesService} from "../../../settings/shared/colonies.service";
import { ExecutorService } from '../../../util/executor/executor.service';
import { ControlsProtectionIdEnum } from '../../../util/executor/controls-protection-id.enum';

@Component({
  selector: 'app-un-caged',
  templateUrl: './un-caged.component.html',
  styleUrls: ['./un-caged.component.css']
})
export class UnCagedComponent implements OnChanges {
  @Input() currentlyChosenHive: Hive;
  @Output() onChangeMomStatus = new EventEmitter<MomStatusEnum>();
  currentlyChosenHiveInitialData: Hive;

  momStatusEnum = MomStatusEnum;
  markedStatusEnum = MarkedStatusEnum;
  actionTimeEnum = ActionTimeEnum;

  momStatusSectionTimeText: string;
  momStatusInitialValueText: string = null;
  radioBtnMomStatusSelection: ActionTimeEnum;
  radioBtnStatusPastDateInputValue: number = null;

  layingEggsSectionTimeText: string;
  layingEggsInitialValueText: string = null;
  radioBtnLayingEggsSelection: ActionTimeEnum;
  radioBtnLayingEggsPastDateInputValue: number = null;

  markedSectionAdditionlInfoText: string;
  radioBtnMarkedTimeSelection: ActionTimeEnum;
  radioBtnMarkedStatusSelection: MarkedStatusEnum;
  markedTimeMonthValue: string = '';
  markedTimeYearValue: string = '';

  radioBtnBirthdayTimeSelection: ActionTimeEnum;
  birthdayTimeMonthValue: string = '';
  birthdayTimeYearValue: string = '';

  constructor(private modalService: JwModalService,
              private momAttributesService: MomAttributesService,
              private coloniesService: ColoniesService,
              private executorService: ExecutorService) { }

  ngOnChanges() {
    this.currentlyChosenHiveInitialData = this.coloniesService.getInitialHiveData(
      this.currentlyChosenHive
    );
    this.setMotherStatusSectionValuesCorrect();
    this.setLayingEggsSectionValuesCorrect();
    this.setMarkedSectionValuesCorrect();
    this.setBirthdaySectionValuesCorrect();
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
      this.currentlyChosenHiveInitialData.momAttributes.momStatus === MomStatusEnum.UN_CAGED) {
      const daysFromInitialStatusBeginning = UtilService.getAbsoluteDaysBeforeTodaysDate(
        this.currentlyChosenHiveInitialData.momAttributes.statusStartingDate
      );
      if(daysFromInitialStatusBeginning == 0) {
        return;
      } else if (daysFromInitialStatusBeginning == 1) {
        this.momStatusInitialValueText = daysFromInitialStatusBeginning + ' päev tagasi';
      } else {
        this.momStatusInitialValueText = daysFromInitialStatusBeginning + ' päeva tagasi';
      }
    }
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
    this.executorService.exeWithTimer(
      this.momAttributesService.onUpdateMomAttributes,
      [this.currentlyChosenHive],
      ControlsProtectionIdEnum.MOM
    );
    this.setMotherStatusSectionValuesCorrect();
  }

  setLayingEggsSectionValuesCorrect() {
    this.layingEggsInitialValueText = null;
    if(this.currentlyChosenHive.momAttributes.isLayingEggs){
      const daysFromLayingEggsBeginning = UtilService.getAbsoluteDaysBeforeTodaysDate(
        this.currentlyChosenHive.momAttributes.eggsLastSeen);
      if(daysFromLayingEggsBeginning == 0) {
        this.radioBtnLayingEggsSelection = ActionTimeEnum.TODAY;
        this.layingEggsSectionTimeText = 'täna';
        this.radioBtnLayingEggsPastDateInputValue = null;
      } else if (daysFromLayingEggsBeginning == 1) {
        this.radioBtnLayingEggsSelection = ActionTimeEnum.PAST_DATE;
        this.layingEggsSectionTimeText = '1 päev tagasi';
        this.radioBtnLayingEggsPastDateInputValue = 1;
      } else {
        this.radioBtnLayingEggsSelection = ActionTimeEnum.PAST_DATE;
        this.layingEggsSectionTimeText = daysFromLayingEggsBeginning + ' päeva tagasi';
        this.radioBtnLayingEggsPastDateInputValue = daysFromLayingEggsBeginning;
      }
    } else {
      this.radioBtnLayingEggsSelection = ActionTimeEnum.NO_ACTION;
      this.layingEggsSectionTimeText = '';
      this.radioBtnLayingEggsPastDateInputValue = null;
    }

    if(this.currentlyChosenHiveInitialData &&
      this.currentlyChosenHiveInitialData.momAttributes.momStatus === MomStatusEnum.UN_CAGED) {
      const daysFromInitialStatusBeginning = UtilService.getAbsoluteDaysBeforeTodaysDate(
        this.currentlyChosenHiveInitialData.momAttributes.eggsLastSeen
      );
      if(daysFromInitialStatusBeginning == 0 ||
        !this.currentlyChosenHiveInitialData.momAttributes.isLayingEggs) {
        return;
      } else if (daysFromInitialStatusBeginning == 1) {
        this.layingEggsInitialValueText = daysFromInitialStatusBeginning + ' päev tagasi';
      } else {
        this.layingEggsInitialValueText = daysFromInitialStatusBeginning + ' päeva tagasi';
      }
    }
  }

  saveLayingEggsSectionValues(setToToday?: boolean) {
    if(setToToday) {
      this.radioBtnLayingEggsSelection = ActionTimeEnum.TODAY;
    }
    if(this.radioBtnLayingEggsSelection === ActionTimeEnum.TODAY) {
      this.currentlyChosenHive.momAttributes.isLayingEggs = true;
      this.currentlyChosenHive.momAttributes.eggsLastSeen = new Date();
    } else if (this.radioBtnLayingEggsSelection === ActionTimeEnum.PAST_DATE) {
      this.currentlyChosenHive.momAttributes.isLayingEggs = true;
      this.currentlyChosenHive.momAttributes.eggsLastSeen =
        new Date(new Date().setHours(0,0,0,0) -
          +this.radioBtnLayingEggsPastDateInputValue * 24 * 60 * 60 * 1000);
    } else if (this.radioBtnLayingEggsSelection === ActionTimeEnum.INITIAL_DATE) {
      this.currentlyChosenHive.momAttributes.isLayingEggs = true;
      this.currentlyChosenHive.momAttributes.eggsLastSeen =
        this.currentlyChosenHiveInitialData.momAttributes.eggsLastSeen;
    } else if (this.radioBtnLayingEggsSelection === ActionTimeEnum.NO_ACTION) {
      this.currentlyChosenHive.momAttributes.isLayingEggs = false;
      this.currentlyChosenHive.momAttributes.eggsLastSeen = null;
    }
    this.executorService.exeWithTimer(
      this.momAttributesService.onUpdateMomAttributes,
      [this.currentlyChosenHive],
      ControlsProtectionIdEnum.MOM
    );
    this.setLayingEggsSectionValuesCorrect();
  }

  setMarkedSectionValuesCorrect() {
    this.markedSectionAdditionlInfoText = this.currentlyChosenHive.momAttributes.markedDescription;
    if(this.currentlyChosenHive.momAttributes.markedStatus == MarkedStatusEnum.MARKED){
      this.radioBtnMarkedStatusSelection = MarkedStatusEnum.MARKED;
    } else if (this.currentlyChosenHive.momAttributes.markedStatus == MarkedStatusEnum.ATTENTION){
      this.radioBtnMarkedStatusSelection = MarkedStatusEnum.ATTENTION;
    } else if (this.currentlyChosenHive.momAttributes.markedStatus == MarkedStatusEnum.UNMARKED){
      this.radioBtnMarkedStatusSelection = MarkedStatusEnum.UNMARKED;
      this.radioBtnMarkedTimeSelection = ActionTimeEnum.UNKNOWN;
    }
    if(this.currentlyChosenHive.momAttributes.markedDate) {
      this.radioBtnMarkedTimeSelection = ActionTimeEnum.PAST_DATE;
      const markedDate = new Date(this.currentlyChosenHive.momAttributes.markedDate);
      this.markedTimeYearValue = markedDate.getFullYear().toString();
      if(this.currentlyChosenHive.momAttributes.isMarkedDateMonthSet) {
        this.markedTimeMonthValue = markedDate.getMonth().toString();
      } else {
        this.markedTimeMonthValue = '';
      }
    } else {
      this.radioBtnMarkedTimeSelection = ActionTimeEnum.UNKNOWN;
      this.markedTimeMonthValue = '';
      this.markedTimeYearValue = '';
    }
  }

  saveMarkedSectionValues() {
    if(this.radioBtnMarkedStatusSelection === MarkedStatusEnum.MARKED) {
      this.currentlyChosenHive.momAttributes.markedStatus = MarkedStatusEnum.MARKED;
      this.currentlyChosenHive.momAttributes.markedDescription = this.markedSectionAdditionlInfoText;
      if(this.radioBtnMarkedTimeSelection === ActionTimeEnum.UNKNOWN) {
        this.currentlyChosenHive.momAttributes.markedDate = null;
      } else if (this.radioBtnMarkedTimeSelection === ActionTimeEnum.PAST_DATE) {
        this.currentlyChosenHive.momAttributes.markedDate = new Date();
        this.currentlyChosenHive.momAttributes.markedDate.setFullYear(+this.markedTimeYearValue);
        if(this.markedTimeMonthValue === '') {
          this.currentlyChosenHive.momAttributes.isMarkedDateMonthSet = false;
        } else {
          this.currentlyChosenHive.momAttributes.isMarkedDateMonthSet = true;
          this.currentlyChosenHive.momAttributes.markedDate.setMonth(+this.markedTimeMonthValue);
        }
      }
    } else if (this.radioBtnMarkedStatusSelection === MarkedStatusEnum.ATTENTION) {
      this.currentlyChosenHive.momAttributes.markedStatus = MarkedStatusEnum.ATTENTION;
      this.currentlyChosenHive.momAttributes.markedDescription = this.markedSectionAdditionlInfoText;
      if(this.radioBtnMarkedTimeSelection === ActionTimeEnum.UNKNOWN) {
        this.currentlyChosenHive.momAttributes.markedDate = null;
      } else if (this.radioBtnMarkedTimeSelection === ActionTimeEnum.PAST_DATE) {
        this.currentlyChosenHive.momAttributes.markedDate = new Date();
        this.currentlyChosenHive.momAttributes.markedDate.setFullYear(+this.markedTimeYearValue);
        if(this.markedTimeMonthValue === '') {
          this.currentlyChosenHive.momAttributes.isMarkedDateMonthSet = false;
        } else {
          this.currentlyChosenHive.momAttributes.isMarkedDateMonthSet = true;
          this.currentlyChosenHive.momAttributes.markedDate.setMonth(+this.markedTimeMonthValue);
        }
      }
    } else if (this.radioBtnMarkedStatusSelection === MarkedStatusEnum.UNMARKED) {
      this.currentlyChosenHive.momAttributes.markedStatus = MarkedStatusEnum.UNMARKED;
      this.currentlyChosenHive.momAttributes.markedDescription = '';
      this.currentlyChosenHive.momAttributes.markedDate = null;
      this.currentlyChosenHive.momAttributes.isMarkedDateMonthSet = false;
    }
    this.executorService.exeWithTimer(
      this.momAttributesService.onUpdateMomAttributes,
      [this.currentlyChosenHive],
      ControlsProtectionIdEnum.MOM
    );
    this.setMarkedSectionValuesCorrect();
  }

  setBirthdaySectionValuesCorrect() {
    if(this.currentlyChosenHive.momAttributes.birthday) {
      this.radioBtnBirthdayTimeSelection = ActionTimeEnum.PAST_DATE;
      const birthday = new Date(this.currentlyChosenHive.momAttributes.birthday);
      this.birthdayTimeYearValue = birthday.getFullYear().toString();
      if(this.currentlyChosenHive.momAttributes.isBirthdayDateMonthSet) {
        this.birthdayTimeMonthValue = birthday.getMonth().toString();
      } else {
        this.birthdayTimeMonthValue = '';
      }
    } else {
      this.radioBtnBirthdayTimeSelection = ActionTimeEnum.UNKNOWN;
      this.birthdayTimeMonthValue = '';
      this.birthdayTimeYearValue = '';
    }
  }

  saveBirthdaySectionValues() {
    if(this.radioBtnBirthdayTimeSelection === ActionTimeEnum.UNKNOWN) {
      this.currentlyChosenHive.momAttributes.birthday = null;
      this.currentlyChosenHive.momAttributes.isMarkedDateMonthSet = false;
    } else if (this.radioBtnBirthdayTimeSelection === ActionTimeEnum.PAST_DATE) {
      this.currentlyChosenHive.momAttributes.birthday = new Date();
      this.currentlyChosenHive.momAttributes.birthday.setFullYear(+this.birthdayTimeYearValue);
      if(!this.birthdayTimeMonthValue) {
        this.currentlyChosenHive.momAttributes.isBirthdayDateMonthSet = false;
      } else {
        this.currentlyChosenHive.momAttributes.isBirthdayDateMonthSet = true;
        this.currentlyChosenHive.momAttributes.birthday.setMonth(+this.birthdayTimeMonthValue);
      }
    }
    this.executorService.exeWithTimer(
      this.momAttributesService.onUpdateMomAttributes,
      [this.currentlyChosenHive],
      ControlsProtectionIdEnum.MOM
    );
    this.setBirthdaySectionValuesCorrect();
  }

  radioBtnMomStatusSelected(selectedActionTime: ActionTimeEnum) {
    this.radioBtnMomStatusSelection = selectedActionTime;
    this.saveMotherStatusSectionValues();
  }

  radioBtnLayingEggsSelected(selectedActionTime: ActionTimeEnum) {
    this.radioBtnLayingEggsSelection = selectedActionTime;
    this.saveLayingEggsSectionValues();
  }

  radioBtnMarkedStatusSelected(markedStatusSelected: MarkedStatusEnum) {
    this.radioBtnMarkedStatusSelection = markedStatusSelected;
    if(markedStatusSelected === MarkedStatusEnum.UNMARKED) {
      this.radioBtnMarkedTimeSelection = ActionTimeEnum.UNKNOWN
      this.markedSectionAdditionlInfoText = '';
    }
    this.saveMarkedSectionValues()
  }

  radioBtnMarkedTimeSelected(selectedActionTime: ActionTimeEnum) {
    if (selectedActionTime === ActionTimeEnum.PAST_DATE && !this.markedTimeYearValue) {
      this.markedTimeYearValue = '2019'
    }
    this.radioBtnMarkedTimeSelection = selectedActionTime;
    this.saveMarkedSectionValues();

  }

  radioBtnBirthdayTimeSelected(selectedActionTime: ActionTimeEnum) {
    if (selectedActionTime === ActionTimeEnum.PAST_DATE && !this.birthdayTimeYearValue) {
      this.birthdayTimeYearValue = '2019'
    }
    this.radioBtnBirthdayTimeSelection = selectedActionTime;
    this.saveBirthdaySectionValues();
  }

  onChangeMotherStatusButtonClick(newMotherStatus?: MomStatusEnum) {
    this.modalService.close('mother-un-caged-edit');
    this.modalService.close('mother-birthday-edit');
    this.onChangeMomStatus.emit(newMotherStatus);
  }

  onOpenMomStatusSectionEditButton() {
    this.modalService.open('mother-un-caged-edit');
  }

  onCloseMomStatusSectionEditButton() {
    this.setMotherStatusSectionValuesCorrect();
    this.modalService.close('mother-un-caged-edit');
  }

  onOpenWhenSeenMotherLayingEggsEditButton() {
    this.modalService.open('mother-laying-eggs-edit');
  }

  onCloseWhenSeenMotherLayingEggsEditButton() {
    this.modalService.close('mother-laying-eggs-edit');
  }

  onOpenWhenMotherMarkedEditButton() {
    this.modalService.open('mother-marked-edit')
  }

  onCloseWhenMotherMarkedEditButton() {
    this.modalService.close('mother-marked-edit')
  }

  onOpenWhenMotherBirthdayEditButton() {
    this.modalService.open('mother-birthday-edit')
  }

  onCloseWhenMotherBirthdayEditButton() {
    this.modalService.close('mother-birthday-edit')
  }

}
