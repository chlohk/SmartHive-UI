import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TaskService {

  constructor(private httpClient: HttpClient) {
  }

  getData(): Observable<any> {
    return this.httpClient.get('/api/tasks');
  }
}
