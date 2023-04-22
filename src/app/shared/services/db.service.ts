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

}