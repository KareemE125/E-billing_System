import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorsService } from '../shared/services/errors.service';
import { Offer, ServiceProvider, telephoneOfferStatuses } from '../shared/models/users/serviceProvider.model';
import { AccountService } from '../shared/services/account.service';
import { ServiceProviderService } from '../shared/services/service-provider.service';
import { User } from '../shared/models/users/user.model';
import { ToastService } from '../shared/services/toast.service';
@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent {
  addOfferForm: FormGroup;
  errs: any;
  offerStatuses: string[] = telephoneOfferStatuses;
  constructor(private errService: ErrorsService, private accService: AccountService,
    private formBuilder: FormBuilder, private svProvServie: ServiceProviderService,
    private toastService: ToastService) {
    this.errs = errService.getErrors().AddOfferErrors
    this.addOfferForm = this.formBuilder.group({
      offerName: ['', [Validators.required, Validators.minLength(3)]],
      offerStatus: ['Pre Paid', [Validators.required]],
      offerUnits: ['', [Validators.required, Validators.pattern('^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$')]],
      price: ['', [Validators.required, Validators.pattern('^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$')]],
    });
  }
  get offerName() {
    return this.addOfferForm.get('offerName');
  }
  get offerStatus() {
    return this.addOfferForm.get('offerStatus');
  }
  get offerUnits() {
    return this.addOfferForm.get('offerUnits');
  }

  get price() {
    return this.addOfferForm.get('price');
  }
  async onSubmit(): Promise<void> {
    if (this.addOfferForm.valid) {
      //create an offer
      const offer: Offer = {
        name: this.offerName?.value,
        units: parseFloat(this.offerUnits?.value),
        price: parseFloat(this.price?.value),
        status: this.offerStatus?.value,
        svProvName: this.accService.currentUser?.name || "",
      }
      console.log("Offer created " + JSON.stringify(offer));
      const sp = this.accService.currentUser as ServiceProvider;
      const res = await this.svProvServie.addServiceProviderOffer(sp, offer)
      if (!res) {
        this.toastService.showToast(false, "Unable to add offer to service provider", "")
      } else {
        this.toastService.showToast(true, "Offer added to service provider " + res.name, "")
      }
      this.addOfferForm.reset()
    } else {
      this.addOfferForm.markAllAsTouched();
    }
  }
}
