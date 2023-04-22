import { Injectable } from '@angular/core';
import { ServiceProvider } from '../../models/users/serviceProvider.model';
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
  updateServiceProvider(sp: ServiceProvider) {
    console.log(`Updating ServiceProvider ${JSON.stringify(sp)} to firebase`)
  }

  /**
* @param email
* @param password
* @returns user if found, false if not found, null otherwise
*/
  async validateServiceProvider(email: string, password: string) {
    // try {
    //   const user = await this.getUserByEmail(email);
    //   if (user != null && user != false && user.password === password) {
    //     console.log("user is found and password is correct");
    //     this.accountService.SetCurrentUser(user, UserType.User);
    //     return user as User;
    //   }
    //   return false;
    // }
    // catch (error) {
    //   console.log('Error getting user:', error);
    //   return null;
    // }
    // return false;
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

}
