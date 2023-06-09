import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorsService } from '../../services/errors.service';
import { CommonBill, billsCategories } from '../../models/bills/commonBill.model';
import { User } from 'firebase/auth';
import { UnitPriceService } from '../../services/unit-price.service';
import { TelephoneBill } from '../../models/bills/telephone.model';
import { ElectricityBillService } from '../../services/ElectricityBill.service';
import { WaterBillService } from '../../services/WaterBill.service';
import { UserService } from '../../services/user.service';
import { CommonUser } from '../../models/users/common.model';
import { TelephoneBillService } from '../../services/TelephoneBill.service';
import { Offer, ServiceProvider } from '../../models/users/serviceProvider.model';
import { ServiceProviderService } from '../../services/service-provider.service';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent implements OnInit {
  addBillForm: FormGroup;

  billsCategories: string[] = billsCategories;
  users?: User[];
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  years: number[] = [2020, 2021, 2022, 2023]
  serviceProv_offers: Offer[] = []
  selectedOffer?: Offer | undefined = undefined;

  unitsValidators = [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d+)?$/)] //pattern for all positive numbers >= 0
  unitsUsageValidators = [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)] //pattern for all positive integers
  servProv_offerNameValidators = [Validators.required]

  errs: any;

  constructor(private errService: ErrorsService, private formBuilder: FormBuilder,
    private unitPriceService: UnitPriceService, private electricityBillService: ElectricityBillService,
    private waterBillService: WaterBillService, private telephoneBillService: TelephoneBillService,
    private srvProvService: ServiceProviderService, private userService: UserService, private toastService: ToastService) {
    this.errs = errService.getErrors().AddBillErrors


    this.addBillForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(8), Validators.email]],
      month: [this.months[0], [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]], //pattern for all positive integers
      year: [this.years[0], [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]], //pattern for all positive integers
      category: [billsCategories[0], [Validators.required]],

      penalty: ['', [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]], //pattern for all positive numbers >= 0 with 2 decimal points

      //optional
      units: ['', this.unitsValidators],  //these are present by default

      //optional
      price: ['', []],
      unitsUsage: ['', []],
      servProv_offerName: ['', []]
    });
  }

  async ngOnInit(): Promise<void> {
    //todo get all users?

    this.category?.valueChanges.subscribe(cat => {
      console.log(cat);
      if (cat == 'Water' || cat == 'Electricity') {
        this.addBillForm.controls['units'].setValidators(this.unitsValidators);
        this.addBillForm.controls['unitsUsage'].clearValidators();
        this.addBillForm.controls['servProv_offerName'].clearValidators();
      } else if (cat == 'Telephone') {
        this.addBillForm.controls['units'].clearValidators();
        this.addBillForm.controls['unitsUsage'].setValidators(this.unitsUsageValidators);
        this.addBillForm.controls['servProv_offerName'].setValidators(this.servProv_offerNameValidators);
      }

      this.addBillForm.controls['units'].updateValueAndValidity();
      this.addBillForm.controls['unitsUsage'].updateValueAndValidity();
      this.addBillForm.controls['servProv_offerName'].updateValueAndValidity();

    });

    this.servProv_offerName?.valueChanges.subscribe(
      val => {
        const vals: string[] = (val as string).split(" / ")
        const offer = this.serviceProv_offers.find(e => e.svProvName === vals[0] && e.name == vals[1])
        if (offer) {
          this.selectedOffer = offer

          if (this.selectedOffer.status === 'Post Paid') {
            //set the validators since the admin needs to add the units
            this.addBillForm.controls['unitsUsage'].setValidators(this.unitsUsageValidators);
          } else {
            //clear the validators
            this.addBillForm.controls['unitsUsage'].clearValidators();
          }
          this.addBillForm.controls['unitsUsage'].updateValueAndValidity();
        }

      })

    const servProviders = await this.srvProvService.getAllServiceProviders();
    if (servProviders == null) {
      this.toastService.showToast(false, "Unable to load all service providers", '')
      return;
    }
    console.log(servProviders);
    //init the dropdown of the sv prov and their offers
    for (let sv of servProviders) {
      for (let off of sv.offers) {
        this.serviceProv_offers.push(off)
      }
    }
    console.log(this.serviceProv_offers);

  }


  get email() { return this.addBillForm.get('email'); }
  get month() { return this.addBillForm.get('month'); }
  get year() { return this.addBillForm.get('year'); }
  get category() { return this.addBillForm.get('category'); }
  get penalty() { return this.addBillForm.get('penalty'); }
  get units() { return this.addBillForm.get('units'); }
  get price() { return this.addBillForm.get('price'); }
  get unitsUsage() { return this.addBillForm.get('unitsUsage') }
  get servProv_offerName() { return this.addBillForm.get('servProv_offerName') }


  async onSubmit() {
    if (this.addBillForm.valid) {
      const commonBill: CommonBill = {
        id: "",
        year: this.year?.value,
        month: this.month?.value,
        units: parseInt(this.units?.value ?? 0),
        penalty: parseFloat(this.penalty?.value ?? 0),
        total: parseFloat(this.penalty?.value ?? 0), //will add the units later
        isPaid: false,
        paymentDate: "Not Yet", paymentMethod: "Not Yet"

      }
      const res = await this.userService.getUserByEmail(this.email?.value);

      if (res === null) {
        this.toastService.showToast(false, "Unable to validate user email", '')
        return
      }
      if (res === false) {
        this.toastService.showToast(false, "Incorrect user email", '')
        return
      }

      // add a penalty of 200 to the bill in 2 cases
      // the bill year is less than the current year
      // or
      // the bill year is the same as this year, but the bill month is less than the current month
      const curDate = new Date()
      const penaltyAdded: boolean = (curDate.getFullYear() > commonBill.year) || (
        curDate.getFullYear() >= commonBill.year && curDate.getMonth() + 1 > commonBill.month
      )
      const penaltyToAdd: number = penaltyAdded ? 200 : 0;
      commonBill.penalty += penaltyToAdd;
      commonBill.total = commonBill.penalty;

      const user: CommonUser = { ...res }


      if (this.category?.value === 'Water') {
        const waterPrice = await this.unitPriceService.getWaterUnitPrice();
        if (!waterPrice) {
          this.toastService.showToast(false, 'Unable to get the water price', '')
          return
        }
        commonBill.total += commonBill.units * waterPrice;
        console.log("Water bill created " + JSON.stringify(commonBill));
        const billAdded = await this.waterBillService.addWaterBillToUser(user.id, commonBill);
        if (!billAdded) {
          this.toastService.showToast(false, 'Unable to add the water bill', '')
          return
        }

      } else if (this.category?.value === 'Electricity') {
        const electricityPrice = await this.unitPriceService.getElectricityUnitPrice();
        if (!electricityPrice) {
          this.toastService.showToast(false, 'Unable to get the electricity price', '')
          return
        }
        commonBill.total += commonBill.units * electricityPrice;
        console.log("Electricity bill created " + JSON.stringify(commonBill));
        const billAdded = await this.electricityBillService.addElectricityBillToUser(user.id, commonBill);
        if (!billAdded) {
          this.toastService.showToast(false, 'Unable to add the electricity bill', '')
          return
        }

      } else if (this.category?.value === 'Telephone') {


        const telephoneBill: TelephoneBill = {
          ...commonBill,
          serviceProviderName: this.selectedOffer?.svProvName!,
          offerName: this.selectedOffer?.name!,
        }
        if (this.selectedOffer?.status === 'Post Paid') {
          telephoneBill.units = this.unitsUsage?.value!;
          telephoneBill.total += telephoneBill.units * this.selectedOffer?.priceOrPricePerUnit!;
        }
        else {
          telephoneBill.units = this.selectedOffer?.units as number;
          telephoneBill.total += this.selectedOffer?.priceOrPricePerUnit!
        }
        console.log("Telephone bill created " + JSON.stringify(telephoneBill));
        const billAdded = await this.telephoneBillService.addTelephoneBillToUser(user.id, telephoneBill);
        if (!billAdded) {
          this.toastService.showToast(false, 'Unable to add the telephone bill', '')
          return
        }
      }

      const penaltyMessage: string = penaltyAdded ? "additional penalty for late payment of " + penaltyToAdd + " EGP." :
        "no additional penalty.";

      this.toastService.showToast(true, 'Bill successfully added with  ' + penaltyMessage, '')
      this.addBillForm.reset()
    } else {

      this.addBillForm.markAllAsTouched();
    }
  }
}

