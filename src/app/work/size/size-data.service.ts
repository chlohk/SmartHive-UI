import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Hive} from "../../settings/shared/hive.model";
import {UtilService} from "../../util/util.service";
import {Size} from "./size.model";
import {Log} from "../mother/log.model";

@Injectable()
export class SizeDataService {

  constructor(private httpClient: HttpClient) {}

  onGetSizeLogs(hiveId: number) {
    const URL = UtilService.backEndURL  + 'api/hive/' + hiveId + '/sizelogs';
    return this.httpClient.get<Size[]>(URL).toPromise();
  }

  onUpdateSizeLog(hiveIdThatIsBeingUpdated: number, sizeLogToUpdate: Size) {
    const URL = UtilService.backEndURL  + 'api/hive/' + hiveIdThatIsBeingUpdated + '/sizelogs/' + sizeLogToUpdate.id;
    return this.httpClient.put(URL, sizeLogToUpdate);
  }

}
