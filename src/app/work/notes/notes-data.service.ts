import { UtilService } from '../../util/util.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { root } from 'rxjs/internal-compatibility';
import { Note } from './note-element/note.model';

@Injectable({providedIn: 'root'})
export class NotesDataService {

  constructor(private httpClient: HttpClient) {
  }

  addNewNote(newNote: Note, hiveId: number) {
    return this.httpClient.post<void>(
      UtilService.backEndURL + 'api/hive/' + hiveId + '/note', newNote);
  }

  updateNote(note: Note, hiveId: number) {
    return this.httpClient.put<void>(
      UtilService.backEndURL + 'api/hive/' + hiveId + '/note/' + note.id, note);
  }
}
