import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "./util/spinner/spinner.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  spinnerEnabled = true;

  constructor(private spinnerService: SpinnerService){}

  ngOnInit(): void {
    this.spinnerService.setSpinnerStatus.subscribe(
      newSpinnerStatus => this.spinnerEnabled = newSpinnerStatus
    )
  }
}
