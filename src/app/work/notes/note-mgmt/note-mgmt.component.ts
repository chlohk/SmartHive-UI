import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hive} from "../../../settings/shared/hive.model";
import {Colony} from "../../../settings/shared/colony.model";
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";
import {NotesComponentEnum} from "../notes-component.enum";
import {NotesService} from "../notes.service";

@Component({
  selector: 'app-note-mgmt',
  templateUrl: './note-mgmt.component.html',
  styleUrls: ['./note-mgmt.component.css']
})
export class NoteMgmtComponent {
  @Output() isCountingDownToUpdateData = new EventEmitter<boolean>();
  @Input() currentlyChosenHive: Hive;
  @Input() currentlyChosenColony: Colony;
  @Input() mgmtComponentId: string;

  isActiveResolveStateUnresolved: boolean = true;
  notesComponentEnum = NotesComponentEnum;
  timerRunning;

  constructor(private modalService: JwModalService,
              private notesService: NotesService) {
  }

  radioBtnActiveResolveStateChange(isActiveResolveStateUnresolved: boolean) {
    this.notesService.newNoteElementSelected.next(null);
    this.isActiveResolveStateUnresolved = isActiveResolveStateUnresolved;
  }

  onCountDownChange(countDownState: boolean) {
    this.timerRunning = countDownState;
    this.isCountingDownToUpdateData.emit(countDownState);
  }

}
