import { Injectable } from '@angular/core';
import { ServiceProvider } from '../../models/users/serviceProvider.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {

  constructor() { }

  //Todo: add user to firebase
  addServiceProvider(sp: ServiceProvider) {
    console.log(`Adding ServiceProvider ${JSON.stringify(sp)} to firebase`)
  }
  updateServiceProvider(sp: ServiceProvider) {
    console.log(`Updating ServiceProvider ${JSON.stringify(sp)} to firebase`)
  }
}
