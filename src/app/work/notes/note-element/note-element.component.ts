import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Note } from './note.model';
import { Hive } from '../../../settings/shared/hive.model';
import { NotesService } from '../notes.service';
import { NotesComponentEnum } from '../notes-component.enum';
import { Subscription } from 'rxjs';
import { ExecutorService, ProtectionState } from '../../../util/executor/executor.service';

@Component({
  selector: 'app-note-element',
  templateUrl: './note-element.component.html',
  styleUrls: ['./note-element.component.css']
})
export class NoteElementComponent implements OnInit, OnDestroy {
  @Input() note: Note;
  @Input() currentlySelectedHive: Hive;
  @Input() notesComponentType: NotesComponentEnum;
  @Input() memorizedActiveElementId: number;
  subscriptions: Subscription[] = [];
  disableControls: boolean;
  active: boolean;
  showAsActiveTimeout: any;

  constructor(private notesService: NotesService,
              private excutorService: ExecutorService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.notesService.newNoteElementSelected.asObservable()
        .subscribe(() => {
          this.active = false;
        })
    );
    this.subscriptions.push(
      this.excutorService.getControlsProtection.subscribe(
        (ps: ProtectionState) => this.disableControls = ps.disableControls
      )
    );
    if (this.memorizedActiveElementId === this.note.id &&
      this.notesComponentType === NotesComponentEnum.NOTE_MANAGEMENT_ACTIVE) {
      this.active = true;
    }
  }

  onElementClick() {
    this.notesService.newNoteElementSelected.next(this.note);
    if (this.notesComponentType === NotesComponentEnum.WORK_DASHBOARD) {
      clearTimeout(this.showAsActiveTimeout);
      this.active = true;
      this.showAsActiveTimeout = setTimeout(() => {
        this.active = false;
      }, 2500);
    } else {
      this.active = true;
    }
  }

  onDeleteElement() {
    if (this.note.longTerm) {
      return;
    }

    this.notesService.newNoteElementSelected.next(null);
    this.note.dateDeleted = new Date();
    this.note.deleted = true;
    this.notesService.updateNote(this.note, this.currentlySelectedHive.id);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (s: Subscription) => s.unsubscribe()
    );
  }

}
