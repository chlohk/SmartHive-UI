import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-colony-details',
  templateUrl: './colony-details.component.html',
  styleUrls: ['./colony-details.component.css']
})
export class ColonyDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /*onNewHiveButtonClick() {
    this.colonySelectionForm.form.patchValue({
      colony: ''
    });
    if(this.router.url === '/settings/colony/new') {
      this.router.navigate(['settings']);
    } else {
      this.router.navigate(['settings/colony/new']);
    }
  }*/
}
