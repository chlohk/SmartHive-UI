import {Component, OnDestroy, OnInit} from '@angular/core';
import {SettingsDataService} from "../shared/settings-data.service";
import {ColoniesService} from "../shared/colonies.service";

@Component({
  selector: 'app-new-colony',
  templateUrl: './new-colony.component.html',
  styleUrls: ['./new-colony.component.css']
})
export class NewColonyComponent implements OnInit {

  constructor(private coloniesService: ColoniesService) { }

  ngOnInit() {
  }


  addNewColony(newColonyName: string) {
    this.coloniesService.addNewColony(newColonyName);
  }
}
