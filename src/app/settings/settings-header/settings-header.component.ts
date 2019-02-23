import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ColoniesService} from "../colony-details/colonies.service";
import {Colony} from "../colony-details/colony.model";
import {NgForm} from "@angular/forms";

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
              private coloniesService: ColoniesService) { }

  ngOnInit() {
    this.colonies = this.coloniesService.getColonies();
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

}
