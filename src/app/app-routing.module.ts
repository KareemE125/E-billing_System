import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user-pages/home/user-home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AboutUsComponent } from './user-pages/about-us/about-us.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { WaterComponent } from './user-pages/water/water.component';
import { ElectricityComponent } from './user-pages/electricity/electricity.component';
import { ModalComponent } from './modals/user-pay-modal/modal.component';
import { EditProfileInfoComponent } from './edit-profile-info/edit-profile-info.component';
import { AllUsersComponent } from './admin-pages/all-users/all-users.component';
import { ManageComponent } from './admin-pages/manage/manage.component';
import { AdminWaterComponent } from './admin-pages/admin-water/admin-water.component';
import { AdminElectricityComponent } from './admin-pages/admin-electricity/admin-electricity.component';
import { AdminTelephoneComponent } from './admin-pages/admin-telephone/admin-telephone.component';
import { AddBillComponent } from './add-bill/add-bill.component';
import { SPHomeComponent } from './sphome/sphome.component';
import { TelephoneComponent } from './telephone/telephone.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'home', component: UserHomeComponent },
  { path: 'signup', component: SignUpComponent },

  { path: 'water', component: WaterComponent },
  { path: 'electricity', component: ElectricityComponent },
  { path: 'telephone', component: TelephoneComponent }, //todo
  { path: 'about-us', component: AboutUsComponent },

  { path: 'edit-profile-info', component: EditProfileInfoComponent },
  { path: 'admin-all-users', component: AllUsersComponent },
  { path: 'admin-water', component: AdminWaterComponent },
  { path: 'admin-electricity', component: AdminElectricityComponent },
  { path: 'admin-telephone', component: AdminTelephoneComponent },
  { path: 'admin-manage', component: ManageComponent },
  { path: 'sp-home', component: SPHomeComponent }, //todo



  { path: 'add-offer', component: AddOfferComponent },
  { path: 'add-bill', component: AddBillComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
