import {Component, Input, OnInit} from '@angular/core';
import {Colony} from "../../shared/colony.model";
import {ColoniesService} from "../../shared/colonies.service";
import {ActivatedRoute} from "@angular/router";
import {SettingsNavigationService} from "../../shared/settings-navigation.service";

@Component({
  selector: 'app-edit-colony',
  templateUrl: './edit-colony.component.html',
  styleUrls: ['./edit-colony.component.css']
})
export class EditColonyComponent implements OnInit {
  warningHasAssociatedHives = false;
  @Input() currentlySelectedColonyId = '';

  currentlySelectedColony: Colony;

  constructor(private coloniesService: ColoniesService,
              private settingsNavigationService: SettingsNavigationService) { }

  ngOnInit() {
    this.currentlySelectedColony = this.coloniesService.getColonyById(+this.currentlySelectedColonyId);
  }

  cancelEditingColony() {
    this.settingsNavigationService.colonyDetailsComponent.next('');
  }

  editColony(newColonyName) {
    this.coloniesService.editColony(this.currentlySelectedColony, newColonyName);
  }

  deleteColony() {
    if(this.currentlySelectedColony.hives.length != 0) {
      this.warningHasAssociatedHives = true;
      return;
    }
    this.coloniesService.deleteColony(this.currentlySelectedColony);
  }

}
