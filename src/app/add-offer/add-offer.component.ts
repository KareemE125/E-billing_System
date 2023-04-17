import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorsService } from '../services/errors.service';
import { Offer, offerStatuses } from '../models/users/serviceProvider.model';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent {
  addOfferForm: FormGroup;
  errs: any;
  offerStatuses: string[] = offerStatuses;


  constructor(private errService: ErrorsService, private formBuilder: FormBuilder) {
    this.errs = errService.getErrors().AddOfferErrors

    this.addOfferForm = this.formBuilder.group({
      offerName: ['', [Validators.required, Validators.minLength(3)]],
      offerStatus: ['Pre Paid', [Validators.required]],
      internetQuantityOrPrice: ['', [Validators.required, Validators.pattern('^[1-9]\d*(\.\d+)?$')]],
      minutesQuantityOrPrice: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).{8,}$')]],
      price: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).{8,}$')]],
    });
  }

  get offerName() {
    return this.addOfferForm.get('offerName');
  }
  get offerStatus() {
    return this.addOfferForm.get('offerStatus');
  }
  get internetQuantityOrPrice() {
    return this.addOfferForm.get('internetQuantityOrPrice');
  }
  get minutesQuantityOrPrice() {
    return this.addOfferForm.get('minutesQuantityOrPrice');
  }
  get price() {
    return this.addOfferForm.get('price');
  }




  onSubmit() {
    if (this.addOfferForm.valid) {
      //create an offer
      const offer: Offer = {
        name: this.offerName?.value,
        internetQuantityOrPrice: this.internetQuantityOrPrice?.value,
        minutesQuantityOrPrice: this.minutesQuantityOrPrice?.value,
        price: this.price?.value,
        status: this.offerStatus?.value,
      }
      console.log("Offer created " + JSON.stringify(offer));

    } else {
      this.addOfferForm.markAllAsTouched();
    }
  }
}