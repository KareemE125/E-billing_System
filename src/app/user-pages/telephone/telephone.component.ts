import { Component } from '@angular/core';
import { CommonBill } from 'src/app/models/bills/commonBill.model';
import { Offer } from 'src/app/models/users/serviceProvider.model';
import { ElectricityBillService } from 'src/app/shared/services/ElectricityBill.service';
import { TelephoneBillService } from 'src/app/shared/services/TelephoneBill.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UnitPriceService } from 'src/app/shared/services/unit-price.service';

@Component({
  selector: 'app-telephone',
  templateUrl: './telephone.component.html',
  styleUrls: ['./telephone.component.css']
})
export class TelephoneComponent {

  // Tab View
  selectedTab = 'tab1';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  // Tab One
  tableType: 'Water' | 'Electricity' | 'Telephone' = "Telephone"
  tableUnit: string = "Units";
  unitPrice: number = 0;
  pendingPayments: number = 0

  infoList: CommonBill[] = [
    // {
    //   id: '1', year: 2021, month: 9, offer: "Super Mix" ,total: 500, isPaid: false, penalty: 20, units: 890, paymentDate: "Not Yet", paymentMethod: "Not Yet"
    // },
    // {
    //   id: '1', year: 2022, month: 1, offer: "Super Mix" ,total: 800, isPaid: false, penalty: 0, units: 0, paymentDate: "Not Yet", paymentMethod: "Not Yet"
    // },
    // {
    //   id: '1', year: 2021, month: 6, offer: "Super Mix" ,total: 1200, isPaid: false, penalty: 10, units: 555, paymentDate: "Not Yet", paymentMethod: "Not Yet"
    // },
    // {
    //   id: '1', year: 2023, month: 2, offer: "Super Mix" ,total: 1500, isPaid: true, penalty: 30, units: 230, paymentDate: 1682180396000, paymentMethod: "Cash"
    // }
  ];

  constructor(private accService: AccountService, private unitPriceService: UnitPriceService,
    private telephoneService: TelephoneBillService, private toastService: ToastService) {

  }

  async ngOnInit(): Promise<void> {
    this.pendingPayments = this.accService.getPendingTelephonePayments()

    // ******** Not complete functions

    // const bills = await this.telephoneService.getAllTelephoneBills(this.accService.currentUser?.id!);
    // if (!bills)
    //   this.toastService.showToast(false, 'Unable to get the electricity bills', '')
    // else this.infoList = { ...bills }

    // const ePrice = await this.unitPriceService.getTelephoneUnitPrice();
    // if (!ePrice)
    //   this.toastService.showToast(false, 'Unable to get the electricity price', '')
    // else this.unitPrice = ePrice;

  }

  // Tab Two
  isUser: boolean = true
  spNames: string[] = ["We", "Vodafone", "Etisalat"]

  offer: Offer[] = [
    {
      svProvName: "We", name: "Premium", internetQuantityOrPrice: 10, minutesQuantityOrPrice: 100, price: 20,status: "Post Paid"
    },
    {
      svProvName: "We", name: "Basic", internetQuantityOrPrice: 5,  minutesQuantityOrPrice: 50, price: 10,status: "Post Paid"
    },
    {
      svProvName: "We", name: "Gold", internetQuantityOrPrice: 15, minutesQuantityOrPrice: 150, price: 30, status: "Pre Paid"
    },
  ]

  offersList = [
    this.offer,
    this.offer,
    this.offer,
  ]
}
