import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Offer } from 'src/app/models/users/serviceProvider.model';

@Component({
  selector: 'app-sp-table',
  templateUrl: './sp-table.component.html',
  styleUrls: ['./sp-table.component.css'],
})
export class SpTableComponent implements OnChanges {

  @Input() offerList: Offer[] = [];
  @Input() serviceProviderName: string = "";

  ngOnChanges(changes: SimpleChanges) {
    if (changes['offerList']) {
      this.offerList = changes['offerList'].currentValue as Offer[]
      this.filteredOfferList = this.offerList
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

  constructor() { }

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

  deleteOffer(index: number) {
    this.offerList.splice(index, 1);
    this.filteredOfferList = this.offerList;
  }

}