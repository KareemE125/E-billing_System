import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PendingPaymentsUpdateService {
  updatePendingPaymentsSubj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  constructor() { }

  setPendingPaymentsChange() {
    this.updatePendingPaymentsSubj.next(true)
  }
}
