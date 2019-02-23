import { Component, OnInit } from '@angular/core';
import {Colony} from "../colony.model";
import {ColoniesService} from "../colonies.service";

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

}
