import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {Hive} from "../../../settings/shared/hive.model";
import {Colony} from "../../../settings/shared/colony.model";
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";
import {NotesComponentEnum} from "../notes-component.enum";
import {NotesService} from "../notes.service";
import { Subscription } from 'rxjs';
import { ExecutorService, ProtectionState } from '../../../util/executor/executor.service';

@Component({
  selector: 'app-note-mgmt',
  templateUrl: './note-mgmt.component.html',
  styleUrls: ['./note-mgmt.component.css']
})
export class NoteMgmtComponent implements OnInit, OnDestroy{
  @Input() currentlyChosenHive: Hive;
  @Input() currentlyChosenColony: Colony;
  @Input() mgmtComponentId: string;
  disableControls: boolean;

  isActiveResolveStateUnresolved: boolean = true;
  notesComponentEnum = NotesComponentEnum;
  subscriptions: Subscription[] = [];

  constructor(private modalService: JwModalService,
              private notesService: NotesService,
              private executorService: ExecutorService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.executorService.getControlsProtection.subscribe(
        (ps: ProtectionState) => this.disableControls = ps.disableControls
      )
    );
  }

  radioBtnActiveResolveStateChange(isActiveResolveStateUnresolved: boolean) {
    this.notesService.newNoteElementSelected.next(null);
    this.isActiveResolveStateUnresolved = isActiveResolveStateUnresolved;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (s: Subscription) => s.unsubscribe()
    );
  }

}
