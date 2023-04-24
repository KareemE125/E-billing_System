import { Component } from '@angular/core';
import { CommonBill } from 'src/app/models/bills/commonBill.model';
import { Offer, ServiceProvider } from 'src/app/models/users/serviceProvider.model';
import { TelephoneBillService } from 'src/app/shared/services/TelephoneBill.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { PendingPaymentsUpdateService } from 'src/app/shared/services/pending-payments-update.service';
import { ServiceProviderService } from 'src/app/shared/services/service-provider.service';
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
    private telephoneService: TelephoneBillService, private srvProvService: ServiceProviderService,
    private toastService: ToastService, private pendingPaymentsService: PendingPaymentsUpdateService) {

  }

  async ngOnInit(): Promise<void> {
    this.pendingPayments = this.accService.getPendingTelephonePayments()

    this.pendingPaymentsService.updatePendingPaymentsSubj.subscribe(e => {
      this.pendingPayments = this.accService.getPendingTelephonePayments()
    })

    const bills = await this.telephoneService.getUserTelephoneBillsById(this.accService.currentUser?.id!);
    if (!bills)
      this.toastService.showToast(false, 'Unable to get the telephone bills', '')
    else this.infoList = [...bills]


    const sps = await this.srvProvService.getAllServiceProviders()
    if (!sps) {
      this.toastService.showToast(false, 'Unable to get all the service providers', '')
    } else {
      this.srvProvs = sps
    }

  }

  // Tab Two

  srvProvs: ServiceProvider[] = []

}
