import {Colony} from "./colony.model";
import {Subject} from "rxjs";

export class ColoniesService {
  private colonies: Colony[] = [
    new Colony(1, 'Kodukoloonia'),
    new Colony(2, 'Metsakoloonia'),
    new Colony(3, 'Suuretalu koloonia')
  ];

  currentlySelectedColony: number;

  getColonies(): Colony[]  {
    return this.colonies;
  }

  getCurrentlySelectedColony(): Colony {
    return this.colonies.find( colony => colony.id == this.currentlySelectedColony);
  }
}
