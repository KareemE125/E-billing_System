import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { AccountService } from './shared/services/account.service';
import { ChildComponent } from './child/child.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ParentComponent } from './parent/parent.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { WaterComponent } from './water/water.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ModalComponent } from './modal/modal.component';
import { EditProfileInfoComponent } from './edit-profile-info/edit-profile-info.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { UserTableComponent } from './user-table/user-table.component';
import { AdminTableComponent } from './admin-table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ServiceCardComponent,
    ChildComponent,
    LoginComponent,
    HomeComponent,
    ParentComponent,
    SignUpComponent,
    AboutUsComponent,
    UserTableComponent,
    AdminTableComponent,
    AddOfferComponent,
    WaterComponent,
    ElectricityComponent,
    ModalComponent
    EditProfileInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule

    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFirestoreModule
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
