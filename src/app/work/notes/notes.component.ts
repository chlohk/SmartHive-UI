import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  document;
  MIN_HEIGHT_WHEN_SECOND_BUTTON_ADDED = 350;

  constructor() { }

  ngOnInit() {
    this.document = document;
    document.getElementById('notesScrollArea').scrollTop=Number.MAX_SAFE_INTEGER;
  }

}
