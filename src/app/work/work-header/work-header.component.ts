import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Colony } from '../../settings/shared/colony.model';
import { UtilService } from '../../util/util.service';
import { ColoniesService } from '../../settings/shared/colonies.service';
import { ExecutorService, ProtectionState } from '../../util/executor/executor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-work-header',
  templateUrl: './work-header.component.html',
  styleUrls: ['./work-header.component.css']
})
export class WorkHeaderComponent implements OnInit, OnDestroy{

  @Input() colonies: Colony[];
  @Input() currentlySelectedColony: Colony;
  @Input() currentlySelectedColonyId: string;
  @Input() currentlySelectedHiveId: string;
  subscriptions: Subscription[] = [];
  disableControls: boolean;


  constructor(private utilService: UtilService,
              private coloniesService: ColoniesService,
              private executorService: ExecutorService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.executorService.getControlsProtection.subscribe(
        (ps: ProtectionState) => this.disableControls = ps.disableControls
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (s: Subscription) => s.unsubscribe()
    );
  }
}
