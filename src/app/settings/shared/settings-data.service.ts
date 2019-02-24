import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Colony} from "./colony.model";
import "rxjs-compat/add/operator/map";

@Injectable()
export class SettingsDataService {

  constructor(private httpClient: HttpClient) {}

  onAddNewColony(newColonyName: string) {
    return this.httpClient.post<Colony[]>('api/colony', {'name': newColonyName});
      // .map(
      //   colonies => {return colonies},
      //   (error) => console.log(error)
      // );
  }

  onEditColony(colonyToEdit: Colony, newColonyName: string) {
    const URL = 'api/colony/' + colonyToEdit.id;
    return this.httpClient.put<Colony[]>(URL, {'name': newColonyName})
      .map(
        colonies => {
          console.log('4ok was called');
          return colonies},
        (error) => {
          console.log(error)}
      );
  }

  onDeleteColony(colonyToDelete: Colony) {
    console.log('3 was called');
    const URL = 'api/colony/' + colonyToDelete.id;
    return this.httpClient.delete<Colony[]>(URL)
      .map(
        colonies => {
          console.log('4ok was called');
          return colonies},
        (error) => {
          console.log('4err was called');
          console.log(error)}
      );
  }

  getAllColonies() {
    return this.httpClient.get<Colony[]>('api/colony')
      .map( (colonies) => {
          return colonies;
        },
        (error) => console.log(error)
      );
  }
}
