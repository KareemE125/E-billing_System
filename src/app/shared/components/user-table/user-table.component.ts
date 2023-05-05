import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import jsPDF from 'jspdf';
import { CommonBill } from '../../models/bills/commonBill.model';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})

export class UserTableComponent implements OnInit, OnChanges {

  @Input() tableType: 'Water' | 'Electricity' | 'Telephone' = "Electricity";
  @Input() infoList: CommonBill[] = [];
  @Input() tableUnit: string = "kWh";
  @Input() pendingPayments: number = 0;
  @Input() unitPrice: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    console.log("those are the changes ", changes);
    if (changes['infoList']) {
      this.infoList = Object.keys(changes['infoList'].currentValue).map(key => {
        return changes['infoList'].currentValue[key];
      })
      this.filteredInfoList = [...this.infoList]
      this.searchText = ''
      this.selectedOption = 'Choose an option'

    }

    changes['tableType'] && (this.tableType = changes['tableType'].currentValue)
    changes['tableUnit'] && (this.tableUnit = changes['tableUnit'].currentValue)
    changes['pendingPayments'] && (this.pendingPayments = changes['pendingPayments'].currentValue)
    changes['unitPrice'] && (this.unitPrice = changes['unitPrice'].currentValue)

  }

  filteredInfoList: CommonBill[] = [];
  //input for the modal
  billsToPay: CommonBill[] = [];
  selectedRows: boolean[] = [];
  billType: 'Water' | 'Electricity' | 'Telephone' = 'Water'


  searchText = '';
  selectedOption = 'Choose an option';

  constructor(private accService: AccountService) { }

  ngOnInit(): void {
    // set initial filtered list to full list
    this.filteredInfoList = [...this.infoList];

  }

  modalClosed(): void {
    console.log("modal has been closed");
    this.billsToPay = []
    for (let i = 0; i < this.selectedRows.length; i++)
      this.selectedRows[i] = false
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


  // async btnPay(index: number) {
  //   //open modal and pass it its inputs
  //   this.billsToPay = [this.filteredInfoList[index]]
  //   this.billType = this.tableType

  // }

  dowloadBill(index: number) {

    const fontSize = 12;
    const fontColor = '#333333';
    const headerColor = '#007ACC';
    const headerTextColor = '#FFFFFF';
    const borderColor = '#CCCCCC';
    const backgroundColor = '#F0F0F0';

    const info = this.filteredInfoList[index];

    const doc = new jsPDF();

    // Set font size and color for the document
    doc.setFontSize(fontSize);
    doc.setTextColor(fontColor);

    // Draw the header rectangle with background and text color
    doc.setFillColor(headerColor);
    doc.setTextColor(headerTextColor);
    doc.rect(10, 10, 190, 20, 'F');
    doc.text(`${this.tableType} Bill`, 100, 20, { align: 'center' });

    // Draw the main rectangle with background color
    doc.setFillColor(backgroundColor);
    doc.rect(10, 35, 190, 85, 'F');

    // Set font color for the text
    doc.setTextColor(fontColor);

    // Add the billing information as text to the document
    const paymentDate: string = !info.isPaid ? "Not Yet" : new Date(info.paymentDate).toLocaleDateString()

    doc.text(`Date: ${info.year}/${info.month}`, 15, 45);
    doc.text(`Units: ${info.units} ${this.tableUnit}`, 15, 55);
    doc.text(`Penalty: ${info.penalty}`, 15, 65);
    doc.text(`Total: ${info.total}`, 15, 75);
    doc.text(`Payment Method: ${info.paymentMethod}`, 15, 85);
    doc.text(`Payment Date: ${paymentDate}`, 15, 95);
    doc.text(`Is Paid: ${info.isPaid}`, 15, 105);

    // Draw the border rectangle
    doc.setDrawColor(borderColor);
    doc.rect(10, 10, 190, 110);

    // Save the PDF with a unique filename
    doc.save(`invoice_${info.year}_${info.month}.pdf`);

  }






  toggleSelection() {
    let payList: CommonBill[] = [];
    this.selectedRows.forEach((row, i) => {
      if (row) {
        payList.push(this.infoList[i])
      }
    })

    this.billsToPay = [...payList]
    this.billType = this.tableType
  }


}