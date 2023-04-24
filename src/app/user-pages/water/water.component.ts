import { Component } from '@angular/core';
import { CommonBill } from '../../models/bills/commonBill.model';
import { UnitPriceService } from 'src/app/shared/services/unit-price.service';
import { WaterBillService } from 'src/app/shared/services/WaterBill.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { PendingPaymentsUpdateService } from 'src/app/shared/services/pending-payments-update.service';

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.css']
})
export class WaterComponent {
  tableType: 'Water' | 'Electricity' | 'Telephone' = "Water"
  tableUnit: string = "m3";
  unitPrice: number = 0;
  pendingPayments: number = 0
  infoList: CommonBill[] = [
    // {
    //   id: '1', year: 2021, month: 9, total: 500, isPaid: false, penalty: 20, units: 890, paymentDate: "Not Yet", paymentMethod: "Not Yet"
    // },
    // {
    //   id: '1', year: 2022, month: 1, total: 800, isPaid: false, penalty: 0, units: 0, paymentDate: "Not Yet", paymentMethod: "Not Yet"
    // },
    // {
    //   id: '1', year: 2021, month: 6, total: 1200, isPaid: false, penalty: 10, units: 555, paymentDate: "Not Yet", paymentMethod: "Not Yet"
    // },
    // {
    //   id: '1', year: 2023, month: 2, total: 1500, isPaid: true, penalty: 30, units: 230, paymentDate: 1682180396000, paymentMethod: "Cash"
    // }

  ];

  constructor(private accService: AccountService, private unitPriceService: UnitPriceService,
    private waterService: WaterBillService, private toastService: ToastService, private pendingPaymentsService: PendingPaymentsUpdateService) {

  }

  async ngOnInit(): Promise<void> {

    this.pendingPayments = this.accService.getPendingWaterPayments()

    this.pendingPaymentsService.updatePendingPaymentsSubj.subscribe(e => {
      this.pendingPayments = this.accService.getPendingWaterPayments()
    })

    const bills = await this.waterService.getAUserWaterBillsById(this.accService.currentUser?.id!);
    if (!bills)
      this.toastService.showToast(false, 'Unable to get the water bills', '')
    else this.infoList = { ...bills }

    const wPrice = await this.unitPriceService.getWaterUnitPrice();
    if (!wPrice)
      this.toastService.showToast(false, 'Unable to get the water price', '')
    else this.unitPrice = wPrice;

  }
}
