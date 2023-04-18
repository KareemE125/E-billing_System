import { Component } from '@angular/core';
import { CommonBill } from '../models/bills/commonBill.model';

@Component({
  selector: 'app-electricity',
  templateUrl: './electricity.component.html',
  styleUrls: ['./electricity.component.css']
})
export class ElectricityComponent {

  tableUnit:string = "kWh";
  
  infoList: CommonBill[] = [
    {
      id:'1', year: 2021, month: 9 , total: 500, isPaid: false, penalty: 20, usage: 890
    },
    {
      id:'1',year: 2022, month: 1 , total: 800, isPaid: true, penalty: 0, usage: 0,
    },
    {
      id:'1',year: 2021, month: 6 , total: 1200, isPaid: false, penalty: 10, usage: 555,
    },
    {
      id:'1',year: 2023, month: 2 , total: 1500, isPaid: true, penalty: 30, usage: 230,
    }
  ];
}
