import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorsService } from 'src/app/shared/services/errors.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UnitPriceService } from 'src/app/shared/services/unit-price.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  setElectricityUnitForm: FormGroup = this.formBuilder.group({});
  setWaterUnitForm: FormGroup = this.formBuilder.group({});
  errs: any;

  constructor(private errService: ErrorsService, private formBuilder: FormBuilder, private unitPriceService: UnitPriceService, private toastService: ToastService) {
    this.errs = errService.getErrors().AdminManageErrors

    this.setElectricityUnitForm = this.formBuilder.group({
      electricityUnit: ['', [Validators.required, Validators.pattern('^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$')]],
    });
    this.setWaterUnitForm = this.formBuilder.group({
      waterUnit: ['', [Validators.required, Validators.pattern('^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$')]],
    });
  }

  async ngOnInit(): Promise<void> {

    let res = await this.unitPriceService.getElectricityUnitPrice()
    if (!res) {
      this.toastService.showToast(false, "Unable to get electricity unit price", '')
      return
    }
    this.setElectricityUnitForm.patchValue({
      electricityUnit: res
    })


    res = await this.unitPriceService.getWaterUnitPrice()
    if (!res) {
      this.toastService.showToast(false, "Unable to get water unit price", '')
      return
    }
    this.setWaterUnitForm.patchValue({
      waterUnit: res
    })

  }





  get electricityUnit() { return this.setElectricityUnitForm.get('electricityUnit'); }
  get waterUnit() { return this.setWaterUnitForm.get('waterUnit'); }

  async onSubmitElec() {
    if (this.electricityUnit?.valid) {

      const res = await this.unitPriceService.setElectricityUnitPrice(parseFloat(this.electricityUnit?.value));

      if (res === null) {
        this.toastService.showToast(false, "Unable to set the unit", '')
        return
      }
      if (res === false) {
        this.toastService.showToast(false, "Incorrect unit", '')
        return
      }

      this.toastService.showToast(true, 'Unit successfully set', '')
    } else {

      this.setElectricityUnitForm.markAllAsTouched();
    }
  }

  async onSubmitWater() {
    if (this.waterUnit?.valid) {

      const res = await this.unitPriceService.setWaterUnitPrice(parseFloat(this.waterUnit?.value));

      if (res === null) {
        this.toastService.showToast(false, "Unable to validate unit", '')
        return
      }
      if (res === false) {
        this.toastService.showToast(false, "Incorrect unit", '')
        return
      }

      this.toastService.showToast(true, 'Unit successfully set', '')
    } else {

      this.setWaterUnitForm.markAllAsTouched();
    }
  }


}
