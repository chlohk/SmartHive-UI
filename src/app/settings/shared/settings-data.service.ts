import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Colony} from "./colony.model";
import "rxjs-compat/add/operator/map";
import {UtilService} from "../../util/util.service";

@Injectable()
export class SettingsDataService {

  constructor(private httpClient: HttpClient) {}

  onAddNewColony(newColonyName: string) {
    return this.httpClient.post<Colony[]>(UtilService.backEndURL  + 'api/colony', {'name': newColonyName}).toPromise();
  }

  onEditColony(colonyToEdit: Colony, newColonyName: string) {
    const URL = UtilService.backEndURL  + 'api/colony/' + colonyToEdit.id;
    return this.httpClient.put<Colony[]>(URL, {'name': newColonyName}).toPromise();
  }

  onDeleteColony(colonyToDelete: Colony) {
    const URL = UtilService.backEndURL  + 'api/colony/' + colonyToDelete.id;
    return this.httpClient.delete<Colony[]>(URL).toPromise();
  }

  onGetColoniesData() {
    // let username: string = 'user';
    // let password: string = 'password';
    // let headers: HttpHeaders = new HttpHeaders();
    // headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    // headers.append("Content-Type", "application/x-www-form-urlencoded");
    return this.httpClient.get<Colony[]>(UtilService.backEndURL  + 'api/colony').toPromise();
  }

  // onPostToLogin() {
  //   let username: string = 'user';
  //   let password: string = 'password';
  //   let headers: HttpHeaders = new HttpHeaders();
  //   headers.append("Authorization", "Basic " + btoa(username + ":" + password));
  //   headers.append("Content-Type", "application/x-www-form-urlencoded");
  //   return this.httpClient.post('api/login', {headers: headers}).toPromise();
  // }

  onAddNewHive(number: number, colonyIdHiveBelongsTo: string, description?: string) {
    const url =  UtilService.backEndURL  + 'api/hive/' + colonyIdHiveBelongsTo;
    return this.httpClient.post(url, {'description': description, 'number': number}).toPromise();
  }

  onUpdateHiveData(id: number, number: number, colonyIdHiveBelongsTo: string, description?: string) {
    const url =  UtilService.backEndURL  + 'api/hive/' + id + '/colony/' + colonyIdHiveBelongsTo;
    return this.httpClient.put(url, {'id': id, 'description': description, 'number': number}).toPromise();
  }

  onDeleteHive(hiveIdToDelete: number) {
    const URL = UtilService.backEndURL  + 'api/hive/' + hiveIdToDelete;
    return this.httpClient.delete<Colony[]>(URL).toPromise();
  }
}
