import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-common-table',
  templateUrl: './admin-common-table.component.html',
  styleUrls: ['./admin-common-table.component.css']
})
export class AdminCommonTableComponent {

  @Input() type: number = 1;
  @Input() tableUnit: string = "kWh";
  @Input() userList: any[] = [];


  tableInternetUnit: string = "MB";
  tableMinutesUnit: string = "min";


  filteredUserList: UserTableRow[] = [];

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
          || user?.spOffer?.toLowerCase().toString().includes(searchTextLower);
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
export interface UserTableRow {
  spOffer: any;
  internet: any;
  minutes: any;
  id: string;
  name: string;
  year: number,
  month: number,
  usage: any,
  penalty: number,
  total: number,
  isPaid: boolean,
}