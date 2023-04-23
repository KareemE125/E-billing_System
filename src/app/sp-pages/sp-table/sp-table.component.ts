import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Offer, ServiceProvider } from 'src/app/models/users/serviceProvider.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { ServiceProviderService } from 'src/app/shared/services/service-provider.service';
import { ToastService } from 'src/app/shared/services/toast.service';
@Component({
  selector: 'app-sp-table',
  templateUrl: './sp-table.component.html',
  styleUrls: ['./sp-table.component.css'],
})
export class SpTableComponent implements OnChanges {
  @Input() offerList: Offer[] = [];
  @Input() serviceProviderName: string = "";
  ngOnChanges(changes: SimpleChanges) {
    console.log("those are the changes ", changes);
    if (changes['offerList']) {
      this.offerList = Object.keys(changes['offerList'].currentValue).map(key => {
        return changes['offerList'].currentValue[key];
      })
      this.filteredOfferList = [...this.offerList]
      this.searchText = ''
      this.selectedOption = 'Choose an option'
    }
    changes['serviceProviderName'] && (this.serviceProviderName = changes['serviceProviderName'].currentValue as string)
  }
  tableInternetUnit: string = "MB";
  tableMinutesUnit: string = "min";
  filteredOfferList: Offer[] = [];
  searchText = '';
  selectedOption = 'Choose an option';
  constructor(private accService: AccountService, private svProvService: ServiceProviderService,
    private toastService: ToastService) { }
  ngOnInit(): void {
    // set initial filtered list to full list
    console.log(this.offerList);
    this.filteredOfferList = [...this.offerList];
  }
  filterOffers(): void {
    // reset filtered list to full list
    this.filteredOfferList = [...this.offerList];
    // apply search filter
    if (this.searchText) {
      this.selectedOption = 'Choose an option'
      const searchTextLower = this.searchText.toLowerCase();
      this.filteredOfferList = this.filteredOfferList.filter(user => {
        return user.name.toLowerCase().includes(searchTextLower)
          || user.status.toLowerCase().includes(searchTextLower);
      });
    }
    // apply combobox filter
    if (this.selectedOption) {
      switch (this.selectedOption) {
        case 'post':
          this.filteredOfferList = this.filteredOfferList.filter(info => {
            return info.status == 'Post Paid';
          });
          break;
        case 'pre':
          this.filteredOfferList = this.filteredOfferList.filter(info => {
            return info.status == 'Pre Paid';
          });
          break;
        default:
          break;
      }
    }
  }
  async deleteOffer(index: number) {
    const sp = this.accService.currentUser as ServiceProvider;
    const res = await this.svProvService.deleteServiceProviderOffer(sp, this.filteredOfferList[index])
    if (!res) {
      this.toastService.showToast(false, "Unable to delete offer from service provider", "")
    } else {
      this.toastService.showToast(true, "Offer deleted from service provider " + res.name, "")
    }
    //no need to edit the offerlist, since the parent is already subscribed, so it will
    //refresh automatically
    // this.offerList.splice(index, 1);
    // this.filteredOfferList = this.offerList;
  }
}