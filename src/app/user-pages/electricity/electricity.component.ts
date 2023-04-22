import { Component, OnInit } from '@angular/core';
import { CommonBill } from '../../models/bills/commonBill.model';
import { UnitPriceService } from 'src/app/shared/services/unit-price.service';
import { ElectricityBillService } from 'src/app/shared/services/ElectricityBill.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-electricity',
  templateUrl: './electricity.component.html',
  styleUrls: ['./electricity.component.css']
})
export class ElectricityComponent implements OnInit {

  tableType: 'Water' | 'Electricity' | 'Telephone' = "Electricity"
  tableUnit: string = "kWh";
  unitPrice: number = 0;
  pendingPayments: number = 0

  infoList: CommonBill[] = [
    {
      id: '1', year: 2021, month: 9, total: 500, isPaid: false, penalty: 20, units: 890, paymentDate: "Not Yet", paymentMethod: "Not Yet"
    },
    {
      id: '1', year: 2022, month: 1, total: 800, isPaid: false, penalty: 0, units: 0, paymentDate: "Not Yet", paymentMethod: "Not Yet"
    },
    {
      id: '1', year: 2021, month: 6, total: 1200, isPaid: false, penalty: 10, units: 555, paymentDate: "Not Yet", paymentMethod: "Not Yet"
    },
    {
      id: '1', year: 2023, month: 2, total: 1500, isPaid: true, penalty: 30, units: 230, paymentDate: 1682180396000, paymentMethod: "Cash"
    }
  ];

  constructor(private accService: AccountService, private unitPriceService: UnitPriceService,
    private electricityService: ElectricityBillService, private toastService: ToastService) {

  }

  async ngOnInit(): Promise<void> {
    this.pendingPayments = this.accService.getPendingElectricityPayments()


    const bills = await this.electricityService.getAllElectricityBills();
    if (!bills)
      this.toastService.showToast(false, 'Unable to get the electricity bills', '')
    else this.infoList = { ...bills }

    const ePrice = await this.unitPriceService.getElectricityUnitPrice();
    if (!ePrice)
      this.toastService.showToast(false, 'Unable to get the electricity price', '')
    else this.unitPrice = ePrice;

  }

}
