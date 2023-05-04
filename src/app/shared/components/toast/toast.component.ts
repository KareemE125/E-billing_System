import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {


  title: string = "";
  message: string = "";
  isSuccess: boolean = true;

  isClosed: boolean = true;

  constructor(private toastService: ToastService) {
    this.toastService.toastState.subscribe((state) => {

      this.ShowToast(state.isSuccess, state.title, state.message)
    })
  }

  ShowToast(isSuccess: boolean, title: string, message: string): void {
    let localTimeOut: any
    clearTimeout(localTimeOut)
    this.isClosed = false
    this.isSuccess = isSuccess
    this.title = title
    this.message = message

    localTimeOut = setTimeout(() => {
      this.isClosed = true
    }, 5000)
  }

  close(): void {
    this.isClosed = true
  }
}
