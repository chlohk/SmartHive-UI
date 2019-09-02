import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SpinnerService, SpinnerStatus } from './spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  @Input() modal = false;
  @Input() smallModal = false;

  subscriptions: Subscription[] = [];
  enabled: boolean;
  withWarning: boolean;

  constructor(private spinnerService: SpinnerService) {
  }


  ngOnInit(): void {
    this.subscriptions.push(
      this.spinnerService.getSpinnerStatus.subscribe(
        (ss: SpinnerStatus) => {
          this.enabled = ss.enabled;
          this.withWarning = ss.withWarning;
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (s: Subscription) => s.unsubscribe()
    )
  }
}
