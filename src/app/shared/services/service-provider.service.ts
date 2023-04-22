import { Injectable } from '@angular/core';
import { Offer, ServiceProvider } from '../../models/users/serviceProvider.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { DataService } from './BillService.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService extends DataService {

  serviceProviderOffersSubj: Subject<Offer[]> = new Subject<Offer[]>()

  constructor(db: AngularFirestore, private accService: AccountService) {
    super(db, "/service-providers");

    this.servProvCollection.doc(this.accService.currentUser?.id).valueChanges().subscribe( //"wUImf9zShk8xhw9fhixR"
      e => this.serviceProviderOffersSubj.next(e?.offers || [])
    )
  }

  //Todo: add user to firebase
  async addServiceProvider(sp: ServiceProvider): Promise<ServiceProvider | null> {
    console.log(`Adding ServiceProvider ${JSON.stringify(sp)} to firebase`)
    return null;
  }

  async addServiceProviderOffer(sp: ServiceProvider, off: Offer): Promise<ServiceProvider | null> {
    console.log(`Adding ServiceProviderOffer ${JSON.stringify(sp)} to firebase`)
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
  async validateServiceProvider(email: string, password: string): Promise<ServiceProvider | null | false> {
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
    return false;
  }

  /**
 * 
 * @returns all users if found, null otherwise
 */
  async getAllServiceProviders(): Promise<ServiceProvider[] | null> {
    // console.log('Getting all users...');
    // try {
    //   const querySnapshot = await this.userCollection.get().toPromise();
    //   const users: User[] = [];

    //   if (querySnapshot !== undefined) {
    //     querySnapshot.forEach((doc) => {
    //       if (doc.exists) {
    //         // console.log('User data:', doc.data());
    //         users.push(doc.data() as User);
    //       } else {
    //         console.error('No such document!');
    //       }
    //     });
    //   }
    //   return users;
    // } catch (error) {
    //   console.error('Error getting users:', error);
    //   return null;
    // }
    return null
  }


  async getServiceProviderOffersByName(name: string): Promise<Offer[] | null> {
    return null;
  }


}
