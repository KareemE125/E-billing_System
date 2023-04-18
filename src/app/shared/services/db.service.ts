import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/models/users/admin.model';
import { User } from 'src/app/models/users/user.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {


  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore, private router: Router) {
    this.usersCollection = afs.collection<User>('users');
  }

  async login(email: string, password: string) {
    //login using users document
    return new Promise<void>((resolve, reject) => {
      this.usersCollection.ref
        .where('name', '==', "mohamed")
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            resolve()
            return;
          }

          snapshot.forEach((doc) => {
            const x = doc.data();

            console.log(doc.id, '=>', doc.data());
            resolve();
          });
        })
        .catch((err) => {
          console.log('Error getting documents', err);
          reject();
        });
    });
  }

}