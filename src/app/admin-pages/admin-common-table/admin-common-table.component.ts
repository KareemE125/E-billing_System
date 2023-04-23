import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonBill } from 'src/app/models/bills/commonBill.model';
import { TelephoneBill } from 'src/app/models/bills/telephone.model';
import { User } from 'src/app/models/users/user.model';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-admin-common-table',
  templateUrl: './admin-common-table.component.html',
  styleUrls: ['./admin-common-table.component.css']
})
export class AdminCommonTableComponent {

  tableType: TableType = TableType.Electricity;
  tableUnit: string = "kWh";
  userList: UserTableRow[] = [];
  filteredUserList: UserTableRow[] = [];


  tableInternetUnit: string = "MB";
  tableMinutesUnit: string = "min";



  searchText = '';
  selectedOption = 'Choose an option';

  constructor(private route: Router, private usersService: UserService,
    private toastService: ToastService) {
  }

  getTableType(): any {
    return TableType;
  }

  async ngOnInit(): Promise<void> {
    if (this.route.url.includes("water")) {
      this.tableType = TableType.Water
      this.tableUnit = "m3";
    }
    else if (this.route.url.includes("telephone")) {
      this.tableType = TableType.Telephone
      this.tableUnit = "";
    }
    else if (this.route.url.includes("electricity")) {
      this.tableType = TableType.Electricity
      this.tableUnit = "kWh";
    }
    // set initial filtered list to full list
    this.userList = await this.getAllTableRows()
    this.filteredUserList = [...this.userList];
  }

  async getAllTableRows(): Promise<UserTableRow[]> {
    const rows: UserTableRow[] = []
    const users = await this.usersService.getAllUsers();
    if (!users) {
      this.toastService.showToast(false, 'Unable to get all users', '')
      return rows;
    }

    for (let user of users) {
      if (this.tableType == TableType.Electricity) {
        for (let bill of user.electricityBills) {
          rows.push(this.mapBillToUserTableRow(user.name, user.id, bill, TableType.Electricity))
        }
      }
      if (this.tableType == TableType.Water) {
        for (let bill of user.waterBills) {
          rows.push(this.mapBillToUserTableRow(user.name, user.id, bill, TableType.Water))
        }
      }
      if (this.tableType == TableType.Telephone) {
        for (let bill of user.telephoneBills) {
          rows.push(this.mapBillToUserTableRow(user.name, user.id, bill, TableType.Telephone))
        }
      }
    }
    return rows
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
          || user.spOfferName?.toLowerCase().toString().includes(searchTextLower);
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

  mapBillToUserTableRow(userName: string, userId: string, bill: CommonBill, billType: TableType): UserTableRow {
    const ret: UserTableRow = {
      id: userId,
      name: userName,
      year: bill.year,
      month: bill.month,
      usage: bill.units,
      penalty: bill.penalty,
      total: bill.total,
      isPaid: bill.isPaid,

      spOfferName: "",
      internet: 0,
      minutes: 0
    }
    if (billType == TableType.Telephone) {
      const tBill: TelephoneBill = bill as TelephoneBill;
      return {
        ...ret,
        spOfferName: tBill.offerName,
        internet: tBill.offerInt,
        minutes: tBill.offerMin
      }
    } else {
      return ret
    }
  }
}

export enum TableType {
  Electricity,
  Water,
  Telephone
}

export interface UserTableRow {
  spOfferName: string | null;
  internet: number | null;
  minutes: number | null;

  id: string;
  name: string;
  year: number,
  month: number,
  usage: number,
  penalty: number,
  total: number,
  isPaid: boolean,
}

