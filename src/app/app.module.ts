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
import { UserHomeComponent } from './user-pages/home/user-home.component';
import { ParentComponent } from './parent/parent.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { ElectricityComponent } from './user-pages/electricity/electricity.component';
import { ModalComponent } from './modals/user-pay-modal/modal.component';
import { EditProfileInfoComponent } from './edit-profile-info/edit-profile-info.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { UserTableComponent } from './user-table/user-table.component';
import { DatabaseTestComponent } from './database-test/database-test.component';
import { FooterComponent } from './footer/footer.component';
import { ManageComponent } from './admin-pages/manage/manage.component';
import { AllUsersComponent } from './admin-pages/all-users/all-users.component';
import { AdminTelephoneComponent } from './admin-pages/admin-telephone/admin-telephone.component';
import { AdminWaterComponent } from './admin-pages/admin-water/admin-water.component';
import { AdminElectricityComponent } from './admin-pages/admin-electricity/admin-electricity.component';
import { AddBillComponent } from './add-bill/add-bill.component';
import { TabViewComponent } from './tab-view/tab-view.component';
import { AboutUsComponent } from './user-pages/about-us/about-us.component';
import { WaterComponent } from './user-pages/water/water.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ServiceCardComponent,
    ChildComponent,
    LoginComponent,
    UserHomeComponent,
    ParentComponent,
    SignUpComponent,
    UserTableComponent,
    AddOfferComponent,
    AddBillComponent,
    AdminWaterComponent,
    ElectricityComponent,
    ModalComponent,
    EditProfileInfoComponent,
    DatabaseTestComponent,
    FooterComponent,
    ManageComponent,
    AllUsersComponent,
    AdminElectricityComponent,
    AdminTelephoneComponent,
    TabViewComponent,
    AboutUsComponent,
    WaterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,


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
