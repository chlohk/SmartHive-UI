import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hive } from '../../../../settings/shared/hive.model';
import { Note } from '../../note-element/note.model';
import { NotesService } from '../../notes.service';
import { ColoniesService } from '../../../../settings/shared/colonies.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-note-mgmt-edit-area',
  templateUrl: './note-mgmt-edit-area.component.html',
  styleUrls: ['./note-mgmt-edit-area.component.css']
})
export class NoteMgmtEditAreaComponent implements OnInit {
  @Output() isCountingDownToUpdateData = new EventEmitter<boolean>();
  @Input() isActiveResolveStateUnresolved: boolean;
  @Input() currentlyChosenHive: Hive;

  private newNoteElementSelectedSubscription: any;

  newNote: Note;
  activeNoteElement: Note;
  timerRunning = false;
  shouldRunAnotherRound = false;

  constructor(private notesService: NotesService,
              private coloniesService: ColoniesService) {
  }

  ngOnInit() {
    this.initNewNote();
    this.activeNoteElement = this.newNote;
    this.newNoteElementSelectedSubscription =
      this.notesService.newNoteElementSelected.asObservable()
        .subscribe(
          ne => {
            if (!ne) this.activeNoteElement = this.newNote;
            else {
              this.activeNoteElement = ne;
            }
          }
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
        setTimeout(()=>{
          this.initNewNote();
          this.activeNoteElement = this.newNote;
        }, 0);
      });
  }

  startCountdownToUpdatePlanningElementAtBackend() {
    if (this.timerRunning) {
      this.shouldRunAnotherRound = true;
      // console.log('...must run one more time');
    } else {
      setTimeout(
        () => {
          this.timerRunning = false;
          if (this.shouldRunAnotherRound) {
            this.shouldRunAnotherRound = false;
            this.startCountdownToUpdatePlanningElementAtBackend();
            // console.log('...will run for a second time');
          } else {
            // console.log('-> send request')
            this.activeNoteElement.lastModified = new Date();
            this.notesService.updateNote(this.activeNoteElement, this.currentlyChosenHive.id);
            this.isCountingDownToUpdateData.emit(false);
          }
        }, 1200
      );
      this.timerRunning = true;
      this.isCountingDownToUpdateData.emit(true);
      // console.log('! started Timer');
    }
  }

  onInputChange() {
    if (this.activeNoteElement.id) {
      this.startCountdownToUpdatePlanningElementAtBackend();
    }
  }

  onActivateElement() {
    this.activeNoteElement.deleted = false;
    this.activeNoteElement.dateDeleted = undefined;
    this.newNote.orderNumber = this.currentlyChosenHive.allActiveNotes
      ? this.currentlyChosenHive.allActiveNotes.length + 1
      : 0;
    this.startCountdownToUpdatePlanningElementAtBackend();
  }

  ngOnDestroy(): void {
    this.newNoteElementSelectedSubscription.unsubscribe();
  }
}
