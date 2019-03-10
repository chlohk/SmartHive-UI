import { Component, OnInit } from '@angular/core';
import {SpinnerService} from "../util/spinner/spinner.service";
import set = Reflect.set;
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    setTimeout( () => {
      this.spinnerService.setSpinnerStatus.next(false);}, 0)

  }



}
