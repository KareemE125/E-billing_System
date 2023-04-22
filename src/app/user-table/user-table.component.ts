import { Component, Input, OnInit } from '@angular/core';
import { CommonBill } from '../models/bills/commonBill.model'
import jsPDF from 'jspdf';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})

export class UserTableComponent implements OnInit {

  @Input() tableType: string = "Electricity";
  @Input() infoList: CommonBill[] = [];
  @Input() tableUnit: string = "kWh";
  @Input() pendingPayments: number = 0;
  @Input() unitPrice: number = 0;

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
          || info.month.toString().includes(searchTextLower);
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


  btnPay(index: number) {

  }

  dowloadBill(index: number) {

    const fontSize = 12;
    const fontColor = '#333333';
    const headerColor = '#007ACC';
    const headerTextColor = '#FFFFFF';
    const borderColor = '#CCCCCC';
    const backgroundColor = '#F0F0F0';

    let info = this.filteredInfoList[index];

    const doc = new jsPDF();

    doc.setFontSize(fontSize);
    doc.setTextColor(fontColor);

    doc.setFillColor(headerColor);
    doc.setTextColor(headerTextColor);
    doc.rect(10, 10, 190, 20, 'F');
    doc.text(`${this.tableType} Bill`, 100, 20, { align: 'center' });

    doc.setFillColor(backgroundColor);
    doc.rect(10, 35, 190, 40, 'F');
    doc.setTextColor(fontColor);
    doc.text(`Date: ${info.year}/${info.month}`, 15, 45);
    doc.text(`Units: ${info.units} ${this.tableUnit}`, 15, 55);
    doc.text(`Penalty: ${info.penalty}`, 15, 65);
    doc.text(`Total: ${info.total}`, 15, 75);

    doc.setDrawColor(borderColor);
    doc.rect(10, 10, 190, 75);

    doc.save(`invoice_${info.year}_${info.month}.pdf`);

  }


}