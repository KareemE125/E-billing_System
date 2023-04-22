import { Component } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {

  userList: UserRow[] = [
    { id: '1', name: 'John Doe', unpaidElectricity: 100, unpaidWater: 50, unpaidTelephone: 75, total: 225 },
    { id: '2', name: 'Jane Doe', unpaidElectricity: 75, unpaidWater: 100, unpaidTelephone: 0, total: 175 },
    { id: '3', name: 'zzz', unpaidElectricity: 0, unpaidWater: 100, unpaidTelephone: 50, total: 150 },
    { id: '4', name: 'xXx', unpaidElectricity: 56, unpaidWater: 100, unpaidTelephone: 0, total: 160 },
    { id: '5', name: 'Khamees', unpaidElectricity: 0, unpaidWater: 660, unpaidTelephone: 50, total: 750 },
    { id: '6', name: 'Hamed', unpaidElectricity: 0, unpaidWater: 8900, unpaidTelephone: 30, total: 8930 },
    // add more users as needed
  ];

  filteredUserList: UserRow[] = [];

  searchText = '';
  selectedOption = 'Choose an option';

  constructor(private userService: UserService, private toastService: ToastService) { }

  async ngOnInit(): Promise<void> {
    // set initial filtered list to full list
    const users = await this.userService.getAllUsers()
    if (!users) {
      this.userList = []
      this.filteredUserList = [...this.userList];
      this.toastService.showToast(false, 'Unable to get users data', '')
    } else {

      for (let user of users) {
        const iUser: UserRow = {
          id: user.id,
          name: user.name,
          unpaidElectricity: 0,
          unpaidWater: 0,
          unpaidTelephone: 0,
          total: 0
        }
        for (let bill of user.electricityBills) {
          if (!bill.isPaid) {
            iUser.unpaidElectricity += bill.total
          }
        }
        for (let bill of user.waterBills) {
          if (!bill.isPaid) {
            iUser.unpaidWater += bill.total
          }
        }
        for (let bill of user.telephoneBills) {
          if (!bill.isPaid) {
            iUser.unpaidTelephone += bill.total
          }
        }

        iUser.total = iUser.unpaidElectricity + iUser.unpaidTelephone + iUser.unpaidWater
        this.userList.push(iUser)
      }
      this.filteredUserList = [...this.userList];
    }


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

interface UserRow {
  id: string;
  name: string;
  unpaidElectricity: number;
  unpaidWater: number;
  unpaidTelephone: number;
  total: number;
}
