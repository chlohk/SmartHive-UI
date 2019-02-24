import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ColoniesService} from "../shared/colonies.service";
import {Colony} from "../shared/colony.model";
import {NgForm} from "@angular/forms";
import {SettingsDataService} from "../shared/settings-data.service";

@Component({
  selector: 'app-settings-header',
  templateUrl: './settings-header.component.html',
  styleUrls: ['./settings-header.component.css']
})
export class SettingsHeaderComponent implements OnInit {
  colonies: Colony[];
  defaultColony = '';
  @ViewChild('f') colonySelectionForm: NgForm;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private coloniesService: ColoniesService,
              private settingsDataService: SettingsDataService) { }

  ngOnInit() {
    // this.colonies = this.coloniesService.getColonies();
    this.coloniesService.updateColoniesData();
    this.coloniesService.coloniesChanged.subscribe(
      (colonies) => this.colonies = colonies
    )

  }

  onNewColonyButtonClick() {
    this.colonySelectionForm.form.patchValue({
      colony: ''
    });
    if(this.router.url === '/settings/colony/new') {
      this.router.navigate(['settings']);
    } else {
      this.router.navigate(['settings/colony/new']);
    }
  }

  onEditColonyButtonClick() {
    if(this.router.url === '/settings/colony/' + this.coloniesService.currentlySelectedColony + '/edit') {
      this.router.navigate(['settings/colony', this.coloniesService.currentlySelectedColony]);
    } else {
      this.router.navigate(['settings/colony', this.coloniesService.currentlySelectedColony, 'edit']);

    }
  }

  onChange(event: any) {
    this.coloniesService.currentlySelectedColony = event.target.value;
    this.router.navigate(['settings/colony', this.coloniesService.currentlySelectedColony]);
  }

  onUpdateColoniesInformation() {
    this.coloniesService.updateColoniesData();
  }
}
