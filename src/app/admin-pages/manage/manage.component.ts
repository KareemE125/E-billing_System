import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UnitPriceService } from 'src/app/shared/services/unit-price.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {
  setElectricityUnitForm: FormGroup;
  setWaterUnitForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private unitPriceService: UnitPriceService,  private toastService: ToastService) 
  {
    this.setElectricityUnitForm = this.formBuilder.group({
      electricityUnit: ['', [Validators.required]],
    });

    this.setWaterUnitForm = this.formBuilder.group({
      waterUnit: ['', [Validators.required]],
    });
  }


  get electricityUnit() { return this.setElectricityUnitForm.get('electricityUnit'); }
  get waterUnit() { return this.setWaterUnitForm.get('wateryUnit'); }

  async onSubmitElec() {
    if (this.electricityUnit?.valid) {
     
      const res = await this.unitPriceService.setElectricityUnitPrice(Number.parseFloat(this.electricityUnit?.value));

      if (res === null) {
        this.toastService.showToast(false, "Unable to validate unit", '')
        return
      }
      if (res === false) {
        this.toastService.showToast(false, "Incorrect unit", '')
        return
      }

      this.toastService.showToast(true, 'Unit successfully set', '')
      this.setElectricityUnitForm.reset()
    } else {

      this.setElectricityUnitForm.markAllAsTouched();
    }
  }

  async onSubmitWater() {
    if (this.waterUnit?.valid) {
     
      const res = await this.unitPriceService.setWaterUnitPrice(Number.parseFloat(this.waterUnit?.value));

      if (res === null) {
        this.toastService.showToast(false, "Unable to validate unit", '')
        return
      }
      if (res === false) {
        this.toastService.showToast(false, "Incorrect unit", '')
        return
      }

      this.toastService.showToast(true, 'Unit successfully set', '')
      this.setWaterUnitForm.reset()
    } else {

      this.setWaterUnitForm.markAllAsTouched();
    }
  }


}
