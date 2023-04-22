import { Injectable } from '@angular/core';
import { Offer, ServiceProvider } from '../../models/users/serviceProvider.model';
import { DataService } from './BillService.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {

  serviceProvidersCollection: AngularFirestoreCollection<ServiceProvider>

  constructor(private db: AngularFirestore) {
    this.serviceProvidersCollection = this.db.collection("/service-providers"); 
      
  }

  //Todo: add user to firebase
  async addServiceProvider(sp: ServiceProvider): Promise<ServiceProvider | null> {
    console.log(`Adding ServiceProvider ${JSON.stringify(sp)} to firebase`)
    return null;
  }

  async deleteServiceProviderOffer(sp: ServiceProvider, off: Offer): Promise<ServiceProvider | null> {
    console.log(`Deleting ServiceProviderOffer ${JSON.stringify(sp)} to firebase`)
    return null;
  }
  updateServiceProvider(sp: ServiceProvider) {
    console.log(`Updating ServiceProvider ${JSON.stringify(sp)} to firebase`)
  }

  /**
* @param email
* @param password
* @returns user if found, false if not found, null otherwise
*/
  async validateServiceProvider(email: string, password: string):  Promise<ServiceProvider | null | false>{
    try {
      const serviceProvider = await this.getServiceProviderByEmail(email);
      if (serviceProvider != null && serviceProvider != false && serviceProvider.password === password) {
        console.log("user is found and password is correct");
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
    console.log('Getting user by email: ', email);
    try {
      const querySnapshot = await this.serviceProvidersCollection.ref.where('email', '==', email).get();
      if (!querySnapshot.empty) {
        const serviceProviderDoc = querySnapshot.docs[0];
        console.log("User is found with email: ", email)
        // console.log('User data:', userDoc.data());
        return serviceProviderDoc.data() as ServiceProvider;
      } else {
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
            // console.log('User data:', doc.data());
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


  async getServiceProviderOffersByName(name: string): Promise<Offer[] | null> {
    return null;
  }


}
