import { Component, Input, OnInit } from '@angular/core';
import { Note } from './note.model';
import { Hive } from '../../../settings/shared/hive.model';
import { NotesService } from '../notes.service';
import { NotesComponentEnum } from '../notes-component.enum';

@Component({
  selector: 'app-note-element',
  templateUrl: './note-element.component.html',
  styleUrls: ['./note-element.component.css']
})
export class NoteElementComponent implements OnInit {
  private newElementSelectedSubscription: any;
  @Input() note: Note;
  @Input() currentlySelectedHive: Hive;
  @Input() notesComponentType: NotesComponentEnum;
  @Input() memorizedActiveElementId: number;
  active: boolean;
  showAsActiveTimeout: any;
  notesComponentEnum = NotesComponentEnum;

  constructor(private notesService: NotesService) {
  }

  ngOnInit() {
    this.newElementSelectedSubscription =
      this.notesService.newNoteElementSelected.asObservable()
        .subscribe(() => {
          this.active = false;
        });
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
    if(this.note.longTerm) {
      return;
    }

    this.notesService.newNoteElementSelected.next(null);
    this.note.dateDeleted = new Date();
    this.note.deleted = true;
    this.notesService.updateNote(this.note, this.currentlySelectedHive.id);
  }

  ngOnDestroy(): void {
    this.newElementSelectedSubscription.unsubscribe();
  }

}
