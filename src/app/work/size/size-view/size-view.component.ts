import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Size } from '../size.model';
import { Subscription } from 'rxjs';
import { ExecutorService, ProtectionState } from '../../../util/executor/executor.service';

@Component({
  selector: 'app-size-view',
  templateUrl: './size-view.component.html',
  styleUrls: ['./size-view.component.css']
})
export class SizeViewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() blockName: string;
  @Input() sizeLogs: Size[] = null;
  @Output() editMEEEE = new EventEmitter<string>();
  subscriptions: Subscription[] = [];
  disableControls: boolean;
  sizeLog: Size;

  constructor(private executorService: ExecutorService) {
  }

  ngOnChanges() {
    if (this.sizeLogs) {
      if (this.blockName === 'current') {
        this.sizeLog = this.sizeLogs.length >= 1 ? this.sizeLogs[0] : null;
      }
      if (this.blockName === 'previous') {
        this.sizeLog = this.sizeLogs.length >= 2 ? this.sizeLogs[1] : null;
      }
      if (this.blockName === 'beforePrevious') {
        this.sizeLog = this.sizeLogs.length >= 3 ? this.sizeLogs[2] : null;
      }
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.executorService.getControlsProtection.subscribe(
        (ps: ProtectionState) => this.disableControls = ps.disableControls
      )
    );
  }

  chooseMyBlockToEdit() {
    this.editMEEEE.emit(this.blockName);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (s: Subscription) => s.unsubscribe()
    );
  }

}
