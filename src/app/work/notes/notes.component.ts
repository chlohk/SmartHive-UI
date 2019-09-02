import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Hive } from '../../settings/shared/hive.model';
import { NotesComponentEnum } from './notes-component.enum';
import { NotesService } from './notes.service';
import { Subscription } from 'rxjs';
import { JwModalService } from '../../util/jw-modal/jw-modal.service';
import { ExecutorService, ProtectionState } from '../../util/executor/executor.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {
  @Input() currentlySelectedHive: Hive;
  @Input() notesComponentType: NotesComponentEnum;
  notesComponentEnum = NotesComponentEnum;
  document;
  MIN_NO_OF_PLANS_WHEN_SECOND_BUTTON_ADDED = 3;
  memorizedActiveNoteElementId: number;
  subscriptions: Subscription[] = [];
  disableControls: boolean;

  constructor(private notesService: NotesService,
              private modalService: JwModalService,
              private executorService: ExecutorService) {
  }

  ngOnInit() {
    this.document = document;
    this.subscriptions.push(
      this.notesService.newNoteElementSelected.asObservable().subscribe(
        ne => {
          if (!ne) this.memorizedActiveNoteElementId = undefined;
          else {
            this.memorizedActiveNoteElementId = ne.id;
          }
        }
      )
    );
    this.subscriptions.push(
      this.executorService.getControlsProtection.subscribe(
        (ps: ProtectionState) => this.disableControls = ps.disableControls
      )
    );
  }

  ngOnChanges() {
    // this.currentlySelectedHive.unresolvedPlanElements = this.unresolvedPlanElements;
    // this.currentlySelectedHive.resolvedPlanElements = this.resolvedPlanElements;
    setTimeout(
      () => document.getElementById('notesScrollArea').scrollTop = Number.MAX_SAFE_INTEGER,
      0);
  }

  onOpenNotes() {
    this.notesService.newNoteElementSelected.next(null);
    this.modalService.open('notes');
  }

  getHeight() {
    if (this.notesComponentType === NotesComponentEnum.WORK_DASHBOARD) {
      return 'notes-section-height-for-work-dashboard';
    } else {
      return 'notes-section-height-for-planning-modal';
    }
  }

  getRelevantNotesList() {
    if (this.notesComponentType === NotesComponentEnum.WORK_DASHBOARD) {

      return this.currentlySelectedHive.activeShortTermNotes;
    }
    if (this.notesComponentType === NotesComponentEnum.NOTE_MANAGEMENT_ACTIVE) {
      return this.currentlySelectedHive.allActiveNotes;
    }
    if (this.notesComponentType === NotesComponentEnum.NOTE_MANAGEMENT_INACTIVE) {
      return this.currentlySelectedHive.deletedNotes;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (s: Subscription) => s.unsubscribe()
    );
  }

}
