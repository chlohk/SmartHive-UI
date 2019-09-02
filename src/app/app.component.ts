import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpinnerService, SpinnerStatus } from './util/spinner/spinner.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  spinnerEnabled: boolean;
  subscriptions: Subscription[] = [];

  constructor(private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.spinnerService.getSpinnerStatus.subscribe(
        (ss: SpinnerStatus) => this.spinnerEnabled = ss.enabled
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (s: Subscription) => s.unsubscribe()
    );
  }
}
