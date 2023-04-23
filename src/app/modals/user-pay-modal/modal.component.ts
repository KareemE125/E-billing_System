import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account.service';
import { ErrorsService } from 'src/app/shared/services/errors.service';
import { User } from 'src/app/models/users/user.model';
import { CommonBill } from 'src/app/models/bills/commonBill.model';
import * as uuid from 'uuid';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ElectricityBillService } from 'src/app/shared/services/ElectricityBill.service';
import { WaterBillService } from 'src/app/shared/services/WaterBill.service';
import { TelephoneBillService } from 'src/app/shared/services/TelephoneBill.service';
import { ElectricityBill } from 'src/app/models/bills/electricity.model';
import { UserType } from 'src/app/models/users/common.model';
import { TelephoneBill } from 'src/app/models/bills/telephone.model';

@Component({
  selector: 'app-user-pay-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnChanges {

  @Input() billsToPay: CommonBill[] = [];
  @Input() billType: 'Water' | 'Electricity' | 'Telephone' = 'Water'

  ngOnChanges(changes: SimpleChanges) {
    console.log("those are the changes ", changes);
    if (changes['billsToPay']) {
      this.billsToPay = Object.keys(changes['billsToPay'].currentValue).map(key => {
        return changes['billsToPay'].currentValue[key];
      })
    }
    changes['billType'] && (this.billType = changes['billType'].currentValue)
  }
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
    private accService: AccountService, private toastService: ToastService,
    private elecService: ElectricityBillService, private waterService: WaterBillService,
    private telephoneService: TelephoneBillService) {
    this.errs = errService.getErrors().PayWithCardErrors
    this.randomPaymentCode = uuid.v4().substring(0, 16);
    this.payWithCardForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(19), Validators.pattern(/^-?[0-9]\d*$/)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(/^-?[0-9]\d*$/)]],
      expMonth: [this.months[4], [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]], //pattern for all positive integers
      expYear: [this.years[0], [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]], //pattern for all positive integers
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



  async onSubmit(paymentMethod: "Cash" | "Card" | "Wallet" | "Not Yet") {

    if (this.selectedTab === 'tab1' || (this.selectedTab === 'tab2' && this.payWithCardForm.valid)) {
      const paymentDate: number = new Date().getTime()
      let user: false | User | null = null;
      for (let bill of this.billsToPay) {
        bill.isPaid = true
        bill.paymentDate = paymentDate
        bill.paymentMethod = paymentMethod
      }

      if (this.billType === 'Electricity') {
        user = await this.elecService.updateElectricityBills(this.accService.currentUser?.id ?? "", this.billsToPay)
        if (!user) {
          this.toastService.showToast(false, 'Unable to pay electricity bill', '')
          return
        }
      } else if (this.billType === 'Water') {
        user = await this.waterService.updateWaterBills(this.accService.currentUser?.id ?? "", this.billsToPay)
        if (!user) {
          this.toastService.showToast(false, 'Unable to pay water bill', '')
          return
        }
      } else if (this.billType === 'Telephone') {
        user = await this.telephoneService.updateTelephoneBills(this.accService.currentUser?.id ?? "", this.billsToPay as TelephoneBill[])
        if (!user) {
          this.toastService.showToast(false, 'Unable to pay telephone bill', '')
          return
        }
      }

      //update the current user with the new bills paid
      this.accService.SetCurrentUser(user as User, UserType.User)
      this.toggleModal()
      this.toastService.showToast(true, 'Bill successfully paid', '')
    } else {

      this.payWithCardForm.markAllAsTouched();
    }
  }

  selectTab(tab: 'tab1' | 'tab2') {
    this.selectedTab = tab;
  }

  openModal() {
    this.showModal = true;
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }

  closeModal() {
    this.showModal = false;
  }
}