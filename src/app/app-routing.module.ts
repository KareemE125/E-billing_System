import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
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
import { AuthGuardService } from './shared/services/auth-guard.service';
import { AccountService } from './shared/services/account.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'home', component: UserHomeComponent, canActivate: [AuthGuardService] },
  { path: 'signup', component: SignUpComponent }, //no guard

  { path: 'water', component: WaterComponent, canActivate: [AuthGuardService] },
  { path: 'electricity', component: ElectricityComponent, canActivate: [AuthGuardService] },
  { path: 'telephone', component: TelephoneComponent, canActivate: [AuthGuardService] }, //todo
  { path: 'about-us', component: AboutUsComponent }, //no guard

  { path: 'edit-profile-info', component: EditProfileInfoComponent, canActivate: [AuthGuardService] },
  { path: 'admin-all-users', component: AllUsersComponent, canActivate: [AuthGuardService] },
  { path: 'admin-water', component: AdminWaterComponent, canActivate: [AuthGuardService] },
  { path: 'admin-electricity', component: AdminElectricityComponent, canActivate: [AuthGuardService] },
  { path: 'admin-telephone', component: AdminTelephoneComponent, canActivate: [AuthGuardService] },
  { path: 'admin-manage', component: ManageComponent, canActivate: [AuthGuardService] },
  { path: 'sp-home', component: SPHomeComponent, canActivate: [AuthGuardService] }, //todo


  { path: '**', component: UserHomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
