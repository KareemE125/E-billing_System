import { Component, Input, OnInit } from '@angular/core';
import {CommonBill} from '../models/bills/commonBill.model'

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})

export class UserTableComponent implements OnInit {

  @Input() infoList: CommonBill[] = [];
  tableUnit:string = "kWh";
  
  filteredInfoList: CommonBill[] = [];

  searchText = '';
  selectedOption = 'Choose an option';

  constructor() { }

  ngOnInit(): void {
    // set initial filtered list to full list
    this.filteredInfoList = [...this.infoList];

  }

  filterUsers(): void {
    // reset filtered list to full list
    this.filteredInfoList = [...this.infoList];

    // apply search filter
    if (this.searchText) {
      this.selectedOption = 'Choose an option'
      const searchTextLower = this.searchText.toLowerCase();
      this.filteredInfoList = this.filteredInfoList.filter(info => {
        return info.year.toString().includes(searchTextLower) 
              || info.month.toString().includes(searchTextLower) ;
      });
    }

    // apply combobox filter
    if (this.selectedOption) {
      switch (this.selectedOption) {
        case 'paid':
          this.filteredInfoList = this.filteredInfoList.filter(info => {
            return info.isPaid == true;
          });
          break;
        case 'unpaid':
          this.filteredInfoList = this.filteredInfoList.filter(info => {
            return info.isPaid == false;
          });
          break;
        case 'penalty':
          this.filteredInfoList = this.filteredInfoList.filter(info => {
            return info.penalty > 0;
          });
          break;
        case 'notPenalty':
          this.filteredInfoList = this.filteredInfoList.filter(info => {
            return info.penalty < 1;
          });
          break;
        default:
          break;
      }
    }
  }


  btnPay(index: number){
    console.log('====================================');
    console.log(index);
    console.log('====================================');
  }
}