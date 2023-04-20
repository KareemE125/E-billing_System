import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account.service';
import { ErrorsService } from 'src/app/shared/services/errors.service';
import { User } from 'src/app/models/users/user.model';
import { CommonBill } from 'src/app/models/bills/commonBill.model';
import * as uuid from 'uuid';

@Component({
  selector: 'app-user-pay-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() rowIndex: number = 0;
  @Input() billsToPay: CommonBill[] = [];

  selectedTab: 'tab1' | 'tab2' = 'tab1';
  randomPaymentCode: string;
  showModal = false;

  payWithCardForm: FormGroup;
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  years: number[] = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  wallet: number = 0;
  amountToPay: number = 0;


  errs: any;

  constructor(private errService: ErrorsService, private formBuilder: FormBuilder,
    private accService: AccountService) {
    this.errs = errService.getErrors().PayWithCardErrors
    this.randomPaymentCode = uuid.v4().substring(0, 16);
    this.payWithCardForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(19), Validators.email]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^[1-9][0-9]*$')]],
      expMonth: [this.months[0], [Validators.required, Validators.pattern('^[1-9][0-9]*$')]], //pattern for all positive integers
      expYear: [this.years[0], [Validators.required, Validators.pattern('^[1-9][0-9]*$')]], //pattern for all positive integers
    });
  }

  ngOnInit(): void {
    this.wallet = (this.accService.currentUser as User).wallet;
    for (let bill of this.billsToPay) {
      this.amountToPay += bill.total
    }
  }


  get cardNumber() { return this.payWithCardForm.get('cardNumber'); }
  get cvv() { return this.payWithCardForm.get('cvv'); }
  get expMonth() { return this.payWithCardForm.get('expMonth'); }
  get expYear() { return this.payWithCardForm.get('expYear'); }



  async onSubmit() {

    if (this.selectedTab === 'tab1' || (this.selectedTab === 'tab2' && this.payWithCardForm.valid)) {

      //todo show a toast that the bill was added
    } else {

      this.payWithCardForm.markAllAsTouched();
    }
  }

  selectTab(tab: 'tab1' | 'tab2') {
    this.selectedTab = tab;
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  closeModal() {
    this.showModal = false;
    console.log('====================================');
    console.log("ppp");
    console.log('====================================');
  }
}