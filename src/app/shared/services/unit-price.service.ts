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
    this.unitPriceCollection = this.db.collection("/unitPrices");
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

  async getElectricityUnitPrice(): Promise<number | null | false> {
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

  async getUnitPriceById(id: string): Promise<UnitPrice | null | false> {
    try {
      const querySnapshot = await this.unitPriceCollection.ref.where('id', '==', id).get();
      if (!querySnapshot.empty) {
        const unitPriceDoc = querySnapshot.docs[0];
        return unitPriceDoc.data() as UnitPrice;
      } else {
        return false;
      }
    } catch (error) {
      return null;
    }
  }
  async setWaterUnitPrice(value: number): Promise<number | null | false> {
    try {
      const waterUnitPrice = await this.getUnitPriceById("1");
      if (waterUnitPrice != null && waterUnitPrice != false) {
        waterUnitPrice.price = value;
        await this.unitPriceCollection.doc("1").update(waterUnitPrice);
        console.log("waterUnitPrice is updated to: ", waterUnitPrice);
        return value;
      }
      else {
        return false;
      }
    } catch (error) {
      return null;
    }
  }



  async setElectricityUnitPrice(value: number): Promise<number | null | false> {
    try {
      const electricityUnitPrice = await this.getUnitPriceById("2");

      if (electricityUnitPrice != null && electricityUnitPrice != false) {
        electricityUnitPrice.price = value;
        await this.unitPriceCollection.doc("2").update(electricityUnitPrice);
        console.log("electricityUnitPrice is updated to: ", electricityUnitPrice);
        return value;
      }
      else {
        return false;
      }
    } catch (error) {
      return null;
    }
  }
}