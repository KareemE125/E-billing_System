import { Component, Input, OnInit } from '@angular/core';
import { User } from '../all-users/all-users.component';


@Component({
  selector: 'admin-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class AdminTableComponent implements OnInit {

  @Input() userList: User[] = [];

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

