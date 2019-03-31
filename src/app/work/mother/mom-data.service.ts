import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Hive} from "../../settings/shared/hive.model";

@Injectable()
export class MomDataService {

  constructor(private httpClient: HttpClient) {}

  onEditMomAttributes(hive: Hive) {
    const URL = 'api/hive/' + hive.id + '/attributes';
    return this.httpClient.put(URL, hive.momAttributes).toPromise();
  }
}
