import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";
import {MomStatusEnum} from "../mom-status.enum";
import {Hive} from "../../../settings/shared/hive.model";
import {ActionTimeEnum} from "../action-time.enum";
import {UtilService} from "../../../util/util.service";
import {MomAttributesService} from "../mom-attributes.service";
import {ColoniesService} from "../../../settings/shared/colonies.service";
import {Log} from "../log.model";

@Component({
  selector: 'app-freak',
  templateUrl: './freak.component.html',
  styleUrls: ['./freak.component.css']
})
export class FreakComponent implements OnChanges {
  @Input() currentlyChosenHive: Hive;
  @Output() onChangeMomStatus = new EventEmitter<MomStatusEnum>();
  currentlyChosenHiveInitialData: Hive;
  textareaValue= '';
  textareaOnEntryEditValue: string = 'blablabla';

  logEntryThatIsBeingEdited: Log = new Log("blablabla");

  momStatusEnum = MomStatusEnum;
  actionTimeEnum = ActionTimeEnum;

  momStatusSectionTimeText: string;
  momStatusInitialValueText: string = null;
  radioBtnMomStatusSelection: ActionTimeEnum;
  radioBtnStatusPastDateInputValue: number = null;

  constructor(private modalService: JwModalService,
              private momAttributesService: MomAttributesService,
              private coloniesService: ColoniesService) { }

  ngOnChanges() {
    this.currentlyChosenHiveInitialData = this.coloniesService.getInitialHiveData(
      this.currentlyChosenHive
    );
    this.setMotherStatusSectionValuesCorrect();
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
    this.modalService.close('mother-freak-edit');
    this.setMotherStatusSectionValuesCorrect();
  }

  setMotherStatusSectionValuesCorrect() {
    this.momStatusInitialValueText = null;
    const daysFromStatusBeginning = UtilService.getDaysBeforeTodaysDate(
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
      this.currentlyChosenHiveInitialData.momAttributes.momStatus === MomStatusEnum.FREAK) {
      const daysFromInitialStatusBeginning = UtilService.getDaysBeforeTodaysDate(
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

  radioBtnMomStatusSelected(selectedActionTime: ActionTimeEnum) {
    this.radioBtnMomStatusSelection = selectedActionTime;
  }

  onChangeMotherStatusButtonClick(newMotherStatus?: MomStatusEnum) {
    this.modalService.close('mother-freak-edit');
    this.onChangeMomStatus.emit(newMotherStatus);
  }

  onOpenMomStatusSectionEditButton() {
    this.modalService.open('mother-freak-edit');
  }

  onCloseMomStatusSectionEditButton() {
    this.setMotherStatusSectionValuesCorrect();
    this.modalService.close('mother-freak-edit');
  }

  onOpenFreakLogEntryButton(logEntryToBeEdited: Log) {
    this.logEntryThatIsBeingEdited = logEntryToBeEdited;
    this.textareaOnEntryEditValue = logEntryToBeEdited.text;
    this.modalService.open('mother-freak-log-entry-edit');
  }

  onCloseFreakLogEntryButton() {
    this.modalService.close('mother-freak-log-entry-edit')
  }

  onOpenFreakMotherLogEditButton() {
    this.modalService.open('mother-freak-log-edit')
  }

  onCloseFreakMotherLogEditButton() {
    this.modalService.close('mother-freak-log-edit')
  }

  deleteLogEntry(logEntryToDelete: Log) {
    this.momAttributesService.onDeleteFreakLogEntry(logEntryToDelete);
    this.modalService.close('mother-freak-log-entry-edit')
  }

  saveNewLogEntry() {
    this.momAttributesService.onSaveNewFreakLogEntry(this.currentlyChosenHive, this.textareaValue);
    this.textareaValue = '';
  }

  updateLogEntry(logEntryToUpdate: Log, newlogEntryText: string) {
    this.momAttributesService.onUpdateFreakLogEntry(logEntryToUpdate, newlogEntryText);
    this.modalService.close('mother-freak-log-entry-edit')
  }

}
