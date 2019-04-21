import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Hive} from "../../settings/shared/hive.model";
import {Log} from "./log.model";
import {UtilService} from "../../util/util.service";

@Injectable()
export class MomDataService {

  constructor(private httpClient: HttpClient) {}

  onEditMomAttributes(hive: Hive) {
    const URL = UtilService.backEndURL  + 'api/hive/' + hive.id + '/attributes';
    return this.httpClient.put(URL, hive.momAttributes).toPromise();
  }

  onDeleteFreakLogEntry(log: Log) {
    const URL = UtilService.backEndURL  + 'api/hive/freaklog/' + log.id;
    return this.httpClient.delete(URL).toPromise();
  }

  onSaveNewFreakLogEntry(hive: Hive, newEntryText: string) {
    const URL = UtilService.backEndURL  + 'api/hive/freaklog/' + hive.id;
    return this.httpClient.post(URL, {text: newEntryText}).toPromise();
  }

  onUpdateFreakLogEntry(logEntryToUpdate: Log, newlogEntryText: string) {
    const URL = UtilService.backEndURL  + 'api/hive/freaklog/' + logEntryToUpdate.id;
    return this.httpClient.put(URL, {text: newlogEntryText}).toPromise();
  }

}
