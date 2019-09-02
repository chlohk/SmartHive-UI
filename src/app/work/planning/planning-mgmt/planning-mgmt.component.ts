import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";
import {Hive} from "../../../settings/shared/hive.model";
import {PlanningMgmtWindowEnum} from "./planning-mgmt-window.enum";
import {PlanningComponentEnum} from "../planning-component.enum";
import {PlanningService} from "../planning.service";
import {Colony} from "../../../settings/shared/colony.model";
import { Subscription } from 'rxjs';
import { ExecutorService, ProtectionState } from '../../../util/executor/executor.service';

@Component({
  selector: 'app-planning-mgmt',
  templateUrl: './planning-mgmt.component.html',
  styleUrls: ['./planning-mgmt.component.css']
})
export class PlanningMgmtComponent implements OnInit, OnDestroy{
  @Input() currentlyChosenHive: Hive;
  @Input() currentlyChosenColony: Colony;
  @Input() mgmtComponentid: string;

  subscriptions: Subscription[] = [];
  disableControls: boolean;
  activeWindow: PlanningMgmtWindowEnum = PlanningMgmtWindowEnum.PLANNING;
  planningMgmtWindowEnum = PlanningMgmtWindowEnum;
  isActiveResolveStateUnresolved: boolean = true;
  planningComponentEnum = PlanningComponentEnum;
  timerRunning;

  constructor(private modalService: JwModalService,
              private planningService: PlanningService,
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
    this.planningService.newPlanElementSelected.next(null);
    this.isActiveResolveStateUnresolved = isActiveResolveStateUnresolved;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (s: Subscription) => s.unsubscribe()
    );
  }
}
