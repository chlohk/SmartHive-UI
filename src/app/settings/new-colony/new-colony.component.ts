import {Component, OnDestroy, OnInit} from '@angular/core';
import {SettingsDataService} from "../shared/settings-data.service";
import {ColoniesService} from "../shared/colonies.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {SettingsNavigationService} from "../shared/settings-navigation.service";

@Component({
  selector: 'app-new-colony',
  templateUrl: './new-colony.component.html',
  styleUrls: ['./new-colony.component.css']
})
export class NewColonyComponent implements OnInit {

  newColonyName = '';

  constructor(private coloniesService: ColoniesService,
              private settingsNavigationService: SettingsNavigationService) { }

  ngOnInit() {
  }


  addNewColony() {
    this.coloniesService.addNewColony(this.newColonyName);
  }

  cancelAddingNewColony() {
    this.settingsNavigationService.mainSettingsComponent.next('');
  }
}
