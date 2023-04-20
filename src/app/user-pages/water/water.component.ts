import { Component } from '@angular/core';
import { CommonBill } from '../../models/bills/commonBill.model';
import { UnitPriceService } from 'src/app/shared/services/unit-price.service';
import { WaterBillService } from 'src/app/shared/services/WaterBill.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.css']
})
export class WaterComponent {
  tableUnit: string = "m3";
  unitPrice: number = 0;
  infoList: CommonBill[] = [
    // {
    //   id: "1", year: 2021, month: 9, total: 500, isPaid: false, penalty: 20, units: 890
    // },
    // {
    //   id: "2", year: 2022, month: 1, total: 800, isPaid: true, penalty: 0, units: 0,
    // },
    // {
    //   id: "3", year: 2021, month: 6, total: 1200, isPaid: false, penalty: 10, units: 555,
    // },
    // {
    //   id: "4", year: 2023, month: 2, total: 1500, isPaid: true, penalty: 30, units: 230,
    // }

  ];

  constructor(private unitPriceService: UnitPriceService,
    private waterService: WaterBillService, private toastService: ToastService) {

  }

  async ngOnInit(): Promise<void> {
    const bills = await this.waterService.getAllWaterBills();
    if (!bills)
      this.toastService.showToast(false, 'Unable to get the water bills', '')
    else this.infoList = { ...bills }

    const wPrice = await this.unitPriceService.getWaterUnitPrice();
    if (!wPrice)
      this.toastService.showToast(false, 'Unable to get the water price', '')
    else this.unitPrice = wPrice;

  }
}
