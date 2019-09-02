import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpinnerService } from '../../util/spinner/spinner.service';
import { ColoniesService } from '../../settings/shared/colonies.service';
import { Note } from './note-element/note.model';
import { NotesDataService } from './notes-data.service';
import { take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class NotesService {
  newNoteElementSelected: Subject<Note> = new Subject<Note>();

  constructor(private spinnerService: SpinnerService,
              private coloniesService: ColoniesService,
              private notesDataService: NotesDataService) {
  }


  addNewNote(newNote: Note, hiveId: number) {
    this.spinnerService.setSpinnerStatus.next(true);
    this.notesDataService.addNewNote(newNote, hiveId)
      .pipe(take(1))
      .subscribe(
        () => {
          this.coloniesService.retrieveColonies();
        });
  }

  updateNote = (note: Note, hiveId: number) => {
    this.notesDataService.updateNote(note, hiveId)
      .pipe(take(1))
      .subscribe(
        () => {
          this.coloniesService.retrieveColonies();
        });
  }
}
