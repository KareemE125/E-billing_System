import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class AdminTableComponent implements OnInit {

  userList: User[] = [
    { id: '1', name: 'John Doe', unpaidElectricity: 100, unpaidWater: 50, unpaidTelephone: 75, total: 225 },
    { id: '2', name: 'Jane Doe', unpaidElectricity: 75, unpaidWater: 100, unpaidTelephone: 50, total: 225 },
    { id: '3', name: 'zzz', unpaidElectricity: 0, unpaidWater: 100, unpaidTelephone: 50, total: 225 },
    { id: '4', name: 'xXx', unpaidElectricity: 0, unpaidWater: 100, unpaidTelephone: 50, total: 225 },
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
          || user.id.toLowerCase().includes(searchTextLower);
      });
    }

    console.log('====================================');
    console.log(this.selectedOption);
    console.log('====================================');
    // apply combobox filter
    if (this.selectedOption) {
      switch (this.selectedOption) {
        case 'unpaidElectricity':
          this.filteredUserList = this.filteredUserList.filter(user => {
            return user.unpaidElectricity > 0;
          });
          break;
        case 'unpaidWater':
          this.filteredUserList = this.filteredUserList.filter(user => {
            return user.unpaidWater > 0;
          });
          break;
        case 'unpaidTelephone':
          this.filteredUserList = this.filteredUserList.filter(user => {
            return user.unpaidTelephone > 0;
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
  unpaidElectricity: number;
  unpaidWater: number;
  unpaidTelephone: number;
  total: number;
}
