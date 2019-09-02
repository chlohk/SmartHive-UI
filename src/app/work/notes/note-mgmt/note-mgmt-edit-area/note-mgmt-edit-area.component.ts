import { Component, Input, OnInit } from '@angular/core';
import { Hive } from '../../../../settings/shared/hive.model';
import { Note } from '../../note-element/note.model';
import { NotesService } from '../../notes.service';
import { ColoniesService } from '../../../../settings/shared/colonies.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ExecutorService, ProtectionState } from '../../../../util/executor/executor.service';
import { ControlsProtectionIdEnum } from '../../../../util/executor/controls-protection-id.enum';

@Component({
  selector: 'app-note-mgmt-edit-area',
  templateUrl: './note-mgmt-edit-area.component.html',
  styleUrls: ['./note-mgmt-edit-area.component.css']
})
export class NoteMgmtEditAreaComponent implements OnInit {
  @Input() isActiveResolveStateUnresolved: boolean;
  @Input() currentlyChosenHive: Hive;

  subscriptions: Subscription[] = [];
  newNote: Note;
  activeNoteElement: Note;
  disableEditControls: boolean;
  disableAllControls: boolean;

  constructor(private notesService: NotesService,
              private coloniesService: ColoniesService,
              private executorService: ExecutorService) {
  }

  ngOnInit() {
    this.initNewNote();
    this.activeNoteElement = this.newNote;
    this.subscriptions.push(
      this.notesService.newNoteElementSelected.asObservable()
        .subscribe(
          ne => {
            if (!ne) this.activeNoteElement = this.newNote;
            else {
              this.activeNoteElement = ne;
            }
          }
        )
    );
    this.subscriptions.push(
      this.executorService.getControlsProtection.subscribe(
        (ps: ProtectionState) => {
          if (!ps.disableControls) {
            this.disableEditControls = false;
            this.disableAllControls = false;
            return;
          }
          this.disableAllControls = true;
          this.disableEditControls = ps.omittedControlsId != ControlsProtectionIdEnum.NOTE_ELEMENT;
        }
      )
    );
  }

  initNewNote() {
    this.newNote = new Note();
    this.newNote.deleted = false;
    this.newNote.longTerm = false;
    this.newNote.orderNumber =
      this.currentlyChosenHive.allActiveNotes
        ? this.currentlyChosenHive.allActiveNotes.length + 1
        : 1;
    this.newNote.dateAdded = new Date();
    this.newNote.hasWarning = false;
  }

  onAddNewNote() {
    this.notesService.addNewNote(this.newNote, this.currentlyChosenHive.id);
    this.coloniesService.coloniesDataRetrieved$
      .pipe(take(1))
      .subscribe(() => {
        setTimeout(() => {
          this.initNewNote();
          this.activeNoteElement = this.newNote;
        }, 0);
      });
  }

  onInputChange() {
    if (this.activeNoteElement.id) {
      this.activeNoteElement.lastModified = new Date();
      this.callUpdate();
    }
  }

  callUpdate() {
    this.activeNoteElement.lastModified = new Date();
    this.executorService.exeWithTimer(
      this.notesService.updateNote,
      [this.activeNoteElement, this.currentlyChosenHive.id],
      ControlsProtectionIdEnum.NOTE_ELEMENT);
  }

  onActivateElement() {
    this.activeNoteElement.deleted = false;
    this.activeNoteElement.dateDeleted = undefined;
    this.newNote.orderNumber = this.currentlyChosenHive.allActiveNotes
      ? this.currentlyChosenHive.allActiveNotes.length + 1
      : 0;
    this.callUpdate();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (s: Subscription) => s.unsubscribe()
    );
  }
}
