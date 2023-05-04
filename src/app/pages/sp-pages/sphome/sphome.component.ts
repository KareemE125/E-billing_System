import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/shared/models/users/serviceProvider.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { ServiceProviderService } from 'src/app/shared/services/service-provider.service';
import { ToastService } from 'src/app/shared/services/toast.service';
@Component({
  selector: 'app-sphome',
  templateUrl: './sphome.component.html',
  styleUrls: ['./sphome.component.css'],
})
export class SPHomeComponent implements OnInit {
  serviceProviderName: string
  offers: Offer[] = [
  ]
  constructor(private accService: AccountService, private serviceProvService: ServiceProviderService,
    private toastService: ToastService) {
    this.serviceProviderName = accService.currentUser?.name || "-";
  }
  async ngOnInit(): Promise<void> {
    this.offers = await this.serviceProvService.getServiceProviderOffersByName(this.serviceProviderName) || []
    const res = this.serviceProvService.serviceProviderOffersSubj.subscribe(
      e => {
        console.log("offers changes: " + JSON.stringify(e));
        this.offers = e
        console.log(this.offers);
      }, err => this.toastService.showToast(false, "Unable to get service provider offers", "")
    )
  }
}