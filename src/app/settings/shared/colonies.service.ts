import {Colony} from "./colony.model";
import {Subject} from "rxjs";
import {SettingsDataService} from "./settings-data.service";
import {Injectable} from "@angular/core";

@Injectable()
export class ColoniesService {
  coloniesChanged = new Subject<Colony[]>();
  private colonies: Colony[] = [
    new Colony(1, 'Kodukoloonia', []),
    new Colony(2, 'Metsakoloonia', []),
    new Colony(3, 'Suuretalu koloonia', [])
  ];

  currentlySelectedColony: number;

  constructor(private settingsDataService: SettingsDataService) {}

  getColonies(): Colony[]  {
    return this.colonies;
  }

  getCurrentlySelectedColony(): Colony {
    return this.colonies.find( colony => colony.id == this.currentlySelectedColony);
  }

  addNewColony(newColonyName: string) {
    this.settingsDataService.onAddNewColony(newColonyName).subscribe(
      (colonies) => {
        // console.log(this.colonies);
        // console.log(colonies);
        this.colonies = colonies;
        // console.log('nüüd kolooniad:...');
        // console.log(this.colonies);
        this.coloniesChanged.next(this.colonies);
      }
    );
  }

  editColony(colonyToEdit: Colony, newColonyName: string) {
    console.log('2 was called');
    this.settingsDataService.onEditColony(colonyToEdit, newColonyName).subscribe(
      (colonies) => {
        // console.log(this.colonies);
        // console.log(colonies);
        this.colonies = colonies;
        // console.log('nüüd kolooniad:...');
        // console.log(this.colonies);
        this.coloniesChanged.next(this.colonies);
      }
    );
  }

  deleteColony(colonyToDelete: Colony) {
    console.log('2 was called');
    this.settingsDataService.onDeleteColony(colonyToDelete).subscribe(
      (colonies) => {
        // console.log(this.colonies);
        // console.log(colonies);
        this.colonies = colonies;
        // console.log('nüüd kolooniad:...');
        // console.log(this.colonies);
        this.coloniesChanged.next(this.colonies);
      }
    );
  }

  updateColoniesData() {
    this.settingsDataService.getAllColonies()
      .subscribe(
          (colonies) => {
            // console.log(this.colonies);
            // console.log(colonies);
            this.colonies = colonies;
            // console.log('nüüd kolooniad:...');
            // console.log(this.colonies);
            this.coloniesChanged.next(this.colonies);
          }
      );

  }
}
