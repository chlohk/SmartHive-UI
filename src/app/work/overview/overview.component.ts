import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { UtilService } from '../../util/util.service';
import { Subscription } from 'rxjs';
import { JwModalService } from '../../util/jw-modal/jw-modal.service';
import { Colony } from '../../settings/shared/colony.model';
import { Note } from '../notes/note-element/note.model';
import { ColoniesService } from '../../settings/shared/colonies.service';
import { Hive } from '../../settings/shared/hive.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnChanges, OnInit, OnDestroy {
  @Input() colonies: Colony[];

  overviewSelectedHive: Hive;
  overviewSelectedHiveId: number;
  overviewSelectedColony: Colony;
  overviewSelectedColonyId: number;

  openOverviewSubscription: Subscription;

  constructor(private utilService: UtilService,
              private modalService: JwModalService,
              private coloniesService: ColoniesService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.overviewSelectedHiveId && this.overviewSelectedColonyId) {
      this.overviewSelectedColony =
        this.colonies.find(colony => colony.id === this.overviewSelectedColonyId);
      this.overviewSelectedHive =
        this.overviewSelectedColony.hives.find(hive => hive.id === this.overviewSelectedHiveId);
    }
  }

  ngOnInit() {
    this.openOverviewSubscription = this.utilService.overview$.subscribe(
      (status: boolean) => {
        if (status) {
          this.modalService.open('overview');
        } else {
          this.modalService.close('overview');
        }
      });
  }

  ngOnDestroy(): void {
    this.openOverviewSubscription.unsubscribe();
  }

  onOpenOverviewNotes(colony: Colony, hive: Hive) {
    this.overviewSelectedColony = colony;
    this.overviewSelectedColonyId = colony.id;
    this.overviewSelectedHive = hive;
    this.overviewSelectedHiveId = hive.id;
    setTimeout(() => this.modalService.open('overview-notes'), 0);
  }

  onOpenOverviewPlanning(colony: Colony, hive: Hive) {
    this.overviewSelectedColony = colony;
    this.overviewSelectedColonyId = colony.id;
    this.overviewSelectedHive = hive;
    this.overviewSelectedHiveId = hive.id;
    setTimeout(() => this.modalService.open('overview-planning'), 0);
  }

  hasNoteWithWarning(notes: Note[]) {
    if (!notes) {
      return undefined;
    }

    return notes.find(n => n.hasWarning);
  }

}
