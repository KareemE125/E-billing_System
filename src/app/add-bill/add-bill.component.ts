import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorsService } from '../shared/services/errors.service';
import { CommonBill, billsCategories } from '../models/bills/commonBill.model';
import { User } from 'firebase/auth';
import { UnitPriceService } from '../shared/services/unit-price.service';
import { TelephoneBill } from '../models/bills/telephone.model';
import { ElectricityBillService } from '../shared/services/ElectricityBill.service';
import { WaterBillService } from '../shared/services/WaterBill.service';
import { UserService } from '../shared/services/user.service';
import { CommonUser } from '../models/users/common.model';
import { TelephoneBillService } from '../shared/services/TelephoneBill.service';
import { ServiceProvider } from '../models/users/serviceProvider.model';
import { ServiceProviderService } from '../shared/services/service-provider.service';
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
  serviceProv_offers: string[] = []

  unitsValidators = [Validators.required, Validators.pattern('^[0-9]\d*(\.\d+)?$')] //pattern for all positive numbers >= 0
  internetQuantityValidators = [Validators.required, Validators.pattern('^[1-9][0-9]*$')] //pattern for all positive integers
  minutesQuantityValidators = [Validators.required, Validators.pattern('^[1-9][0-9]*$')] //pattern for all positive integers
  servProv_offerNameValidators = [Validators.required]

  errs: any;

  constructor(private errService: ErrorsService, private formBuilder: FormBuilder,
    private unitPriceService: UnitPriceService, private electricityBillService: ElectricityBillService,
    private waterBillService: WaterBillService, private telephoneBillService: TelephoneBillService,
    private srvProvService: ServiceProviderService, private userService: UserService) {
    this.errs = errService.getErrors().AddBillErrors


    this.addBillForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(8), Validators.email]],
      month: [this.months[0], [Validators.required, Validators.pattern('^[1-9][0-9]*$')]], //pattern for all positive integers
      year: [this.years[0], [Validators.required, Validators.pattern('^[1-9][0-9]*$')]], //pattern for all positive integers
      category: [billsCategories[0], [Validators.required]],

      penalty: ['', [Validators.required, Validators.pattern('^(?:0|[1-9]\d*)(?:\.\d+)?$')]], //pattern for all positive numbers >= 0

      //optional
      units: ['', this.unitsValidators],  //these are present by default

      //optional
      internetQuantity: ['', []],
      minutesQuantity: ['', []],
      servProv_offerName: ['', []]
    });
  }

  async ngOnInit(): Promise<void> {
    //todo get all users?

    this.category?.valueChanges.subscribe(cat => {
      console.log(cat);
      if (cat == 'Water' || cat == 'Electricity') {
        this.addBillForm.controls['units'].setValidators(this.unitsValidators);
        this.addBillForm.controls['internetQuantity'].clearValidators();
        this.addBillForm.controls['minutesQuantity'].clearValidators();
        this.addBillForm.controls['servProv_offerName'].clearValidators();
      } else if (cat == 'Telephone') {
        this.addBillForm.controls['units'].clearValidators();
        this.addBillForm.controls['internetQuantity'].setValidators(this.internetQuantityValidators);
        this.addBillForm.controls['minutesQuantity'].setValidators(this.minutesQuantityValidators);
        this.addBillForm.controls['servProv_offerName'].setValidators(this.servProv_offerNameValidators);
      }

      this.addBillForm.controls['units'].updateValueAndValidity();
      this.addBillForm.controls['internetQuantity'].updateValueAndValidity();
      this.addBillForm.controls['minutesQuantity'].updateValueAndValidity();
      this.addBillForm.controls['servProv_offerName'].updateValueAndValidity();

    });

    const servProviders = await this.srvProvService.getAllServiceProviders();
    if (servProviders == null) {
      //todo show toast showing errors
      return;
    }

    //init the dropdown of the sv prov and their offers
    for (let sv of servProviders) {
      for (let off of sv.offers) {
        this.serviceProv_offers.push(sv.name + " / " + off.name)
      }
    }


  }


  get email() { return this.addBillForm.get('email'); }
  get month() { return this.addBillForm.get('month'); }
  get year() { return this.addBillForm.get('year'); }
  get category() { return this.addBillForm.get('category'); }
  get penalty() { return this.addBillForm.get('penalty'); }
  get units() { return this.addBillForm.get('units'); }
  get internetQuantity() { return this.addBillForm.get('internetQuantity'); }
  get minutesQuantity() { return this.addBillForm.get('minutesQuantity'); }
  get servProv_offerName() { return this.addBillForm.get('servProv_offerName') }


  async onSubmit() {
    if (this.addBillForm.valid) {
      const commonBill: CommonBill = {
        id: "",
        year: this.year?.value,
        month: this.month?.value,
        units: this.units?.value,
        penalty: this.penalty?.value,
        total: this.penalty?.value, //will add the units later
        isPaid: false

      }
      const res = await this.userService.getUserByEmail(this.email?.value);

      if (!res) {
        //todo throw an error with toast
        return
      }
      const user: CommonUser = { ...res }


      if (this.category?.value === 'Water') {
        commonBill.total += commonBill.units * this.unitPriceService.getWaterUnitPrice();
        console.log("Water bill created " + JSON.stringify(commonBill));
        await this.waterBillService.addWaterBillToUser(user.id, commonBill);

      } else if (this.category?.value === 'Electricity') {
        commonBill.total += commonBill.units * this.unitPriceService.getElectricityUnitPrice();
        console.log("Electricity bill created " + JSON.stringify(commonBill));
        await this.electricityBillService.addElectricityBillToUser(user.id, commonBill);

      } else if (this.category?.value === 'Telephone') {
        //create a user
        const vals: string[] = (this.servProv_offerName?.value as string).split(" / ")
        const telephoneBill: TelephoneBill = {
          ...commonBill,
          serviceProviderName: vals[0],
          offerName: vals[1]
        }
        console.log("Telephone bill created " + JSON.stringify(telephoneBill));
        await this.telephoneBillService.addTelephoneBillToUser(user.id, telephoneBill);
      }

      //todo show a toast that the bill was added
    } else {

      this.addBillForm.markAllAsTouched();
    }
  }
}

