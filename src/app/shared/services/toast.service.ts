import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toastState = new Subject<any>() ;

  showToast(isSuccess: boolean, title: string, message: string) {
    return this.toastState.next({isSuccess, title, message});
  }
}
