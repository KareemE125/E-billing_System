import { Component } from '@angular/core';
import { CommonBill } from 'src/app/models/bills/commonBill.model';

@Component({
  selector: 'app-admin-water',
  templateUrl: './admin-water.component.html',
  styleUrls: ['./admin-water.component.css']
})
export class AdminWaterComponent {

  type: number = 2;

  tableUnit: string = "m3";

  userList: any[] = [
    { id: '1', name: 'John Doe', year: 2021, month: 9 , total: 500, isPaid: false, penalty: 20, usage: 890 },
    { id: '2', name: 'Jane Doe', year: 2022, month: 1 , total: 800, isPaid: true, penalty: 0, usage: 0 },
    { id: '3', name: 'zzz', year: 2021, month: 6 , total: 1200, isPaid: false, penalty: 10, usage: 555 },
    { id: '4', name: 'xXx', year: 2021, month: 6 , total: 1200, isPaid: false, penalty: 10, usage: 555 },
    { id: '5', name: 'Khamees', year: 2023, month: 2 , total: 1500, isPaid: true, penalty: 30, usage: 230 },
    // add more users as needed
  ];

}

