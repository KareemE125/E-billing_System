import { Component } from '@angular/core';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {

  userList: User[] = [
    { id: '1', name: 'John Doe', unpaidElectricity: 100, unpaidWater: 50, unpaidTelephone: 75, total: 225 },
    { id: '2', name: 'Jane Doe', unpaidElectricity: 75, unpaidWater: 100, unpaidTelephone: 0, total: 175 },
    { id: '3', name: 'zzz', unpaidElectricity: 0, unpaidWater: 100, unpaidTelephone: 50, total: 150 },
    { id: '4', name: 'xXx', unpaidElectricity:56, unpaidWater: 100, unpaidTelephone: 0, total: 160 },
    { id: '5', name: 'Khamees', unpaidElectricity: 0, unpaidWater: 660, unpaidTelephone: 50, total: 750 },
    { id: '6', name: 'Hamed', unpaidElectricity: 0, unpaidWater: 8900, unpaidTelephone:30, total: 8930 },
    // add more users as needed
  ];

}

export interface User {
  id: string;
  name: string;
  unpaidElectricity: number;
  unpaidWater: number;
  unpaidTelephone: number;
  total: number;
}
