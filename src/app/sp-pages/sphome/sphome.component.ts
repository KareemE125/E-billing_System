import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/models/users/serviceProvider.model';
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
    // {
    //   svProvName: "We",
    //   name: "Premium",
    //   internetQuantityOrPrice: 10,
    //   minutesQuantityOrPrice: 100,
    //   price: 20,
    //   status: "Post Paid"
    // },
    // {
    //   svProvName: "We",
    //   name: "Basic",
    //   internetQuantityOrPrice: 5,
    //   minutesQuantityOrPrice: 50,
    //   price: 10,
    //   status: "Post Paid"
    // },
    // {
    //   svProvName: "We",
    //   name: "Gold",
    //   internetQuantityOrPrice: 15,
    //   minutesQuantityOrPrice: 150,
    //   price: 30,
    //   status: "Pre Paid"
    // },
    // {
    //   svProvName: "We",
    //   name: "Pro",
    //   internetQuantityOrPrice: 20,
    //   minutesQuantityOrPrice: 200,
    //   price: 40,
    //   status: "Pre Paid"
    // },
    // {
    //   svProvName: "We",
    //   name: "Ultimate",
    //   internetQuantityOrPrice: 30,
    //   minutesQuantityOrPrice: 300,
    //   price: 50,
    //   status: "Post Paid"
    // }
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