import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpinnerService } from '../util/spinner/spinner.service';
import { Colony } from '../settings/shared/colony.model';
import { ColoniesService } from '../settings/shared/colonies.service';
import { Hive } from '../settings/shared/hive.model';
import { PlanningComponentEnum } from './planning/planning-component.enum';
import { PlanningService } from './planning/planning.service';
import { Subscription } from 'rxjs';
import { NotesComponentEnum } from './notes/notes-component.enum';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit, OnDestroy {
  colonies: Colony[];
  currentlySelectedHive: Hive;
  currentlySelectedColony: Colony;
  isCountingDownToUpdateData = false;
  planningComponentEnum = PlanningComponentEnum;
  notesComponentEnum = NotesComponentEnum;
  validated = false;

  subscriptions: Subscription[] = [];

  constructor(private spinnerService: SpinnerService,
              private coloniesService: ColoniesService,
              private planningService: PlanningService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.coloniesService.coloniesDataRetrieved$.subscribe(
        () => {
          this.colonies = this.coloniesService.getColonies();
          this.updateSelectedColonyAndHive(true);
        }
      )
    );
    this.subscriptions.push(
      this.coloniesService.colonyHiveSelectionChanged$.subscribe(
        ({colonyId, hiveId}) => this.updateSelectedColonyAndHive(false, colonyId, hiveId)
      )
    );
    this.coloniesService.retrieveColonies();
    this.planningService.getDropdownElements();
  }

  updateSelectedColonyAndHive(isDataUpdate: boolean, colonyId?: number, hiveId?: number) {
    if (isDataUpdate) {
      if (this.currentlySelectedColony) colonyId = this.currentlySelectedColony.id;
      if (this.currentlySelectedHive) hiveId = this.currentlySelectedHive.id;
    }
    this.currentlySelectedColony = this.colonies.find(colony => colony.id === colonyId);
    if (hiveId) {
      this.currentlySelectedHive = this.currentlySelectedColony.hives.find(hive => hive.id === hiveId);
    } else {
      this.currentlySelectedHive = undefined;
    }
  }

  notifyIfIsCountingDownToUpdateData(isCountingDownToUpdateData: boolean) {
    this.isCountingDownToUpdateData = isCountingDownToUpdateData;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
