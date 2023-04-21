import { Component } from '@angular/core';

@Component({
  selector: 'app-sp-table',
  templateUrl: './sp-table.component.html',
  styleUrls: ['./sp-table.component.css']
})
export class SpTableComponent {

  offerList: offerTableRow[] = [
    {
      spOffer: "Premium",
      internet: 10,
      minutes: 100,
      price: 20,
      status: "Post"
    },
    {
      spOffer: "Basic",
      internet: 5,
      minutes: 50,
      price: 10,
      status: "Post"
    },
    {
      spOffer: "Gold",
      internet: 15,
      minutes: 150,
      price: 30,
      status: "Pre"
    },
    {
      spOffer: "Pro",
      internet: 20,
      minutes: 200,
      price: 40,
      status: "Pre"
    },
    {
      spOffer: "Ultimate",
      internet: 30,
      minutes: 300,
      price: 50,
      status: "Post"
    }
  ];
  

  tableInternetUnit: string = "MB";
  tableMinutesUnit: string = "min";


  filteredOfferList: offerTableRow[] = [];

  searchText = '';
  selectedOption = 'Choose an option';

  constructor() { }

  ngOnInit(): void {
    // set initial filtered list to full list
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
        return user.spOffer.toLowerCase().includes(searchTextLower)
          || user.status.toLowerCase().includes(searchTextLower);
      });
    }

    // apply combobox filter
    if (this.selectedOption) {
      switch (this.selectedOption) {
        case 'post':
          this.filteredOfferList = this.filteredOfferList.filter(info => {
            return info.status == 'Post';
          });
          break;
        case 'pre':
          this.filteredOfferList = this.filteredOfferList.filter(info => {
            return info.status == 'Pre';
          });
          break;
        default:
          break;
      }
    }
  }

  deleteOffer(index: number){
    this.offerList.splice(index,1);
    this.filteredOfferList = this.offerList;
  }

}
export interface offerTableRow {
  spOffer: string;
  internet: number;
  minutes: number;
  price: number,
  status: 'Post' | 'Pre'
}