import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-telephone',
  templateUrl: './admin-telephone.component.html',
  styleUrls: ['./admin-telephone.component.css']
})
export class AdminTelephoneComponent {


  tableInternetUnit: string = "MB";
  tableMinutesUnit: string = "min";

  userList: User[] = [
    { id: '1', name: 'John Doe', year: 2021, month: 9 , spOffer: "Mizat Plus", internet: 1200, minutes: 50, total: 500, isPaid: false, penalty: 20 },
    { id: '2', name: 'Jane Doe', year: 2022, month: 1 , spOffer: "Mizat Plus", internet: 1200, minutes: 50, total: 800, isPaid: true, penalty: 0 },
    { id: '3', name: 'zzz', year: 2021, month: 6 , spOffer: "Extra Net", internet: 1200, minutes: 50, total: 1200, isPaid: false, penalty: 10, },
    { id: '4', name: 'xXx', year: 2021, month: 6 , spOffer: "Extra Net", internet: 1200, minutes: 50, total: 1200, isPaid: false, penalty: 10 },
    { id: '5', name: 'Khamees', year: 2023, month: 2 , spOffer: "Extra Net", internet: 1200, minutes: 50, total: 1500, isPaid: true, penalty: 30 },
    // add more users as needed
  ];

  filteredUserList: User[] = [];

  searchText = '';
  selectedOption = 'Choose an option';

  constructor() { }

  ngOnInit(): void {
    // set initial filtered list to full list
    this.filteredUserList = [...this.userList];
  }

  filterUsers(): void {
    // reset filtered list to full list
    this.filteredUserList = [...this.userList];

    // apply search filter
    if (this.searchText) {
      this.selectedOption = 'Choose an option'
      const searchTextLower = this.searchText.toLowerCase();
      this.filteredUserList = this.filteredUserList.filter(user => {
        return user.name.toLowerCase().includes(searchTextLower)
            || user.id.toLowerCase().includes(searchTextLower)
            || user.year.toString().includes(searchTextLower) 
            || user.month.toString().includes(searchTextLower)
            || user.spOffer.toLowerCase().toString().includes(searchTextLower);
      });
    }

    // apply combobox filter
    if (this.selectedOption) {
      switch (this.selectedOption) {
        case 'paid':
          this.filteredUserList = this.filteredUserList.filter(info => {
            return info.isPaid == true;
          });
          break;
        case 'unpaid':
          this.filteredUserList = this.filteredUserList.filter(info => {
            return info.isPaid == false;
          });
          break;
        case 'penalty':
          this.filteredUserList = this.filteredUserList.filter(info => {
            return info.penalty > 0;
          });
          break;
        case 'notPenalty':
          this.filteredUserList = this.filteredUserList.filter(info => {
            return info.penalty < 1;
          });
          break;
        default:
          break;
      }
    }
  }

}

interface User {
  id: string;
  name: string;
  year: number,       //1990 <= year <= 2022
  month: number,      //1 <= month <= 12
  spOffer: string,
  internet: number,
  minutes: number,
  penalty: number,    //0 <= penalty <= 100000
  total: number,      //0 <= total <= 100000
  isPaid: boolean,   //true or false
}