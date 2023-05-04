import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { AccountService } from './shared/services/account.service';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './pages/user-pages/home/user-home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { ElectricityComponent } from './pages/user-pages/electricity/electricity.component';
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
import { FooterComponent } from './shared/components/footer/footer.component';
import { ManageComponent } from './pages/admin-pages/manage/manage.component';
import { AllUsersComponent } from './pages/admin-pages/all-users/all-users.component';
import { AddBillComponent } from './add-bill/add-bill.component';
import { TabViewComponent } from './tab-view/tab-view.component';
import { AboutUsComponent } from './pages/user-pages/about-us/about-us.component';
import { WaterComponent } from './pages/user-pages/water/water.component';
import { AdminCommonTableComponent } from './pages/admin-pages/admin-common-table/admin-common-table.component';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from './shared/services/toast.service';
import { SPHomeComponent } from './pages/sp-pages/sphome/sphome.component';
import { TelephoneComponent } from './pages/user-pages/telephone/telephone.component';
import { SpTableComponent } from './pages/sp-pages/sp-table/sp-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ServiceCardComponent,
    LoginComponent,
    UserHomeComponent,
    SignUpComponent,
    UserTableComponent,
    AddOfferComponent,
    AddBillComponent,

    ElectricityComponent,
    ModalComponent,
    EditProfileInfoComponent,
    FooterComponent,
    ManageComponent,
    AllUsersComponent,


    TabViewComponent,
    AboutUsComponent,
    WaterComponent,
    AdminCommonTableComponent,
    ToastComponent,
    SPHomeComponent,
    TelephoneComponent,
    SpTableComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,



    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFirestoreModule
  ],
  providers: [AccountService, ToastService],
  bootstrap: [AppComponent]
})

export class AppModule { }
