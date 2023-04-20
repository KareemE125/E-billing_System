import { Injectable } from "@angular/core";
import { UnitPrice } from "src/app/models/state/unitPrice.model";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/compat/firestore";
@Injectable({
  providedIn: "root",
})
export class UnitPriceService {
  unitPriceCollection: AngularFirestoreCollection<UnitPrice>;

  constructor(private db: AngularFirestore) {
    this.unitPriceCollection = this.db.collection("/unitPrice");
  }

  async getWaterUnitPrice(): Promise<number | null | false> {
    try {
      const querySnapshot = await this.unitPriceCollection.ref
        .where("unit", "==", "Water")
        .get();
      if (!querySnapshot.empty) {
        const unitPriceDoc = querySnapshot.docs[0];
        return unitPriceDoc.data().price;
      } else {
        return false;
      }
    } catch (error) {
      return null;
    }
  }

  async getElectricityUnitPrice():  Promise<number | null | false> {
    try {
      const querySnapshot = await this.unitPriceCollection.ref
        .where("unit", "==", "Electricity")
        .get();
      if (!querySnapshot.empty) {
        const unitPriceDoc = querySnapshot.docs[0];
        return unitPriceDoc.data().price;
      } else {
        return false;
      }
    } catch (error) {
      return null;
    }
  }
  setWaterUnitPrice(): void {
    return;
  }

  setElectricityUnitPrice(): void {
    return;
  }
}