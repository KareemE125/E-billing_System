import { Injectable } from '@angular/core';
import { Offer, ServiceProvider } from '../models/users/serviceProvider.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { BehaviorSubject, Subject } from 'rxjs';
import { AccountService } from './account.service';
import { off } from 'firebase/database';
import { DataService } from './DataService.service';
@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService extends DataService {

  serviceProviderOffersSubj: BehaviorSubject<Offer[]> = new BehaviorSubject<Offer[]>([]);

  constructor(db: AngularFirestore, accService: AccountService) {
    super(db)
    accService.currentUserSubject.subscribe(
      curUser => {
        this.serviceProvidersCollection.doc(curUser?.id).valueChanges().subscribe( //"wUImf9zShk8xhw9fhixR"
          e => this.serviceProviderOffersSubj.next(e?.offers || [])
        )
      })

  }

  async addServiceProvider(serviceProvider: ServiceProvider): Promise<ServiceProvider | null> {
    const newDocRef = this.serviceProvidersCollection.doc();
    serviceProvider.id = newDocRef.ref.id;
    try {
      await newDocRef.set({ ...serviceProvider })
      console.log('ServiceProvider added to firebase: ', serviceProvider)
      return serviceProvider;
    } catch (error) {
      console.error('Error adding user to firebase: ', error);
      return null;
    };
  }

  async deleteServiceProvider(id: string): Promise<null | true> {
    try {
      await this.serviceProvidersCollection.doc(id).delete();
      return true;
    } catch (error) {
      console.error('Error deleting serviceProvider: ', error);
      return null;
    }
  }
  async updateServiceProvider(serviceProvider: ServiceProvider): Promise<null | true> {
    try {
      console.log(`Updating ServiceProvider ${JSON.stringify(serviceProvider)} to firebase`)
      await this.serviceProvidersCollection.doc(serviceProvider.id).update(serviceProvider);
      return true;
    }
    catch (error) {
      console.error('Error updating ServiceProvider: ', error);
      return null;
    }
  }

  /**
  * @param email
  * @param password
  * @returns user if found, false if not found, null otherwise
  */
  async validateServiceProvider(email: string, password: string): Promise<ServiceProvider | null | false> {
    try {
      const serviceProvider = await this.getServiceProviderByEmail(email);
      if (serviceProvider != null && serviceProvider != false && serviceProvider.password === password) {
        console.log("service provider is found and password is correct");

        return serviceProvider as ServiceProvider;
      }
      return false;
    }
    catch (error) {
      console.log('Error getting user:', error);
      return null;
    }
  }

  async getServiceProviderByEmail(email: string): Promise<ServiceProvider | null | false> {
    console.log('Getting serviceProvider by email: ', email);
    try {
      const querySnapshot = await this.serviceProvidersCollection.ref.where('email', '==', email).get();
      if (!querySnapshot.empty) {
        const serviceProviderDoc = querySnapshot.docs[0];
        console.log("service provider is found with email: ", email)
        return serviceProviderDoc.data() as ServiceProvider;
      } else {
        console.log("service provider is not  found with email: ", email)
        return false;
      }
    } catch (error) {
      console.error('Error service prodiver by email :', error);
      return null;
    }
  }

  /** 
   * @returns all serviceProviders if found, null otherwise
   */
  async getAllServiceProviders(): Promise<ServiceProvider[] | null> {
    console.log('Getting all services providers...');
    try {
      const querySnapshot = await this.serviceProvidersCollection.get().toPromise();
      const serviceProviders: ServiceProvider[] = [];

      if (querySnapshot !== undefined) {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            serviceProviders.push(doc.data() as ServiceProvider);
          } else {
            console.error('No such document!');
          }
        });
      }
      return serviceProviders;
    } catch (error) {
      console.error('Error getting services providers:', error);
      return null;
    }
  }

  async addServiceProviderOffer(serviceProvider: ServiceProvider, offer: Offer): Promise<ServiceProvider | null> {
    console.log("addServiceProviderOffer ", offer, " to ", serviceProvider.name);
    try {
      if (serviceProvider) {
        serviceProvider.offers.push(offer);
        await this.updateServiceProvider(serviceProvider);
      }
      return serviceProvider;
    } catch (error) {
      console.error("Error adding offer to service provider:", error);
      return null;
    }
  }

  async deleteServiceProviderOffer(serviceProvider: ServiceProvider, off: Offer): Promise<ServiceProvider | null> {
    console.log("deleteServiceProviderOffer");
    try {
      if (serviceProvider) {
        serviceProvider.offers = serviceProvider.offers.filter(o => o.name !== off.name);
        await this.updateServiceProvider(serviceProvider);
      }
      return serviceProvider;
    } catch (error) {
      console.error("Error deleting offer from service provider:", error);
      return null;
    }
  }

  async getServiceProviderOffersByName(name: string): Promise<Offer[] | null> {
    console.log('Getting serviceProvider offers by name: ', name);
    try {
      const querySnapshot = await this.serviceProvidersCollection.ref.where('name', '==', name).get();
      if (!querySnapshot.empty) {
        const serviceProviderDoc = querySnapshot.docs[0];
        console.log("serviceProvider is found with name: ", name)
        return serviceProviderDoc.data().offers as Offer[];
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getServiceProviderOffersByName :', error);
      return null;
    }
  }

}
