import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-telephone',
  templateUrl: './admin-telephone.component.html',
  styleUrls: ['./admin-telephone.component.css']
})

export class AdminTelephoneComponent {

  type: number = 3;
  tableUnit: string = "kWh";
  
  userList: any[] = [
    { id: '1', name: 'John Doe', year: 2021, month: 9 , spOffer: "Mizat Plus", internet: 1200, minutes: 50, total: 500, isPaid: false, penalty: 20 },
    { id: '2', name: 'Jane Doe', year: 2022, month: 1 , spOffer: "Mizat Plus", internet: 1200, minutes: 50, total: 800, isPaid: true, penalty: 0 },
    { id: '3', name: 'zzz', year: 2021, month: 6 , spOffer: "Extra Net", internet: 1200, minutes: 50, total: 1200, isPaid: false, penalty: 10, },
    { id: '4', name: 'xXx', year: 2021, month: 6 , spOffer: "Extra Net", internet: 1200, minutes: 50, total: 1200, isPaid: false, penalty: 10 },
    { id: '5', name: 'Khamees', year: 2023, month: 2 , spOffer: "Extra Net", internet: 1200, minutes: 50, total: 1500, isPaid: true, penalty: 30 },
    // add more users as needed
  ];

}

