import { Injectable } from '@angular/core';
import { BillsPrices } from '../models/state/billsPrices.model';

@Injectable({
  providedIn: 'root'
})
export class BillsPricesService {

  mainBillsPrices: BillsPrices = {
    electrictyPrices: new Map<string, number>(),
    waterPrices: new Map<string, number>()
  };

  constructor() { }
}
