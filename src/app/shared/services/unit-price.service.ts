import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitPriceService {

  constructor() { }

  getWaterUnitPrice(): number {
    return 1;
  }

  getElectricityUnitPrice(): number {
    return 1;
  }
  setWaterUnitPrice(): void {
    return;
  }

  setElectricityUnitPrice(): void {
    return;
  }
}
