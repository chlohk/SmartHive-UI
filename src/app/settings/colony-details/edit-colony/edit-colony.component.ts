import { Component, OnInit } from '@angular/core';
import {Colony} from "../../shared/colony.model";
import {ColoniesService} from "../../shared/colonies.service";

@Component({
  selector: 'app-edit-colony',
  templateUrl: './edit-colony.component.html',
  styleUrls: ['./edit-colony.component.css']
})
export class EditColonyComponent implements OnInit {

  currentColony: Colony;

  constructor(private coloniesService: ColoniesService) { }

  ngOnInit() {
    this.currentColony = this.coloniesService.getCurrentlySelectedColony();
  }

  editColony(newColonyName) {
    this.coloniesService.editColony(this.currentColony, newColonyName);
  }

  deleteColony() {
    this.coloniesService.deleteColony(this.currentColony);
    console.log('1 was called');
  }

}
