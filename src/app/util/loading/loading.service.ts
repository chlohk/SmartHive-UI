import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(false);
  loadingStatus$ = this.loading.asObservable();

  start() {
    this.loading.next(true);
  }

  stop() {
    this.loading.next(false);
  }
}
