import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user-pages/home/user-home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AboutUsComponent } from './user-pages/about-us/about-us.component';
import { WaterComponent } from './user-pages/water/water.component';
import { ElectricityComponent } from './user-pages/electricity/electricity.component';
import { EditProfileInfoComponent } from './edit-profile-info/edit-profile-info.component';
import { AllUsersComponent } from './admin-pages/all-users/all-users.component';
import { ManageComponent } from './admin-pages/manage/manage.component';
import { TelephoneComponent } from './user-pages/telephone/telephone.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { AdminCommonTableComponent } from './admin-pages/admin-common-table/admin-common-table.component';
import { SPHomeComponent } from './sp-pages/sphome/sphome.component';

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
  { path: 'admin-water', component: AdminCommonTableComponent, canActivate: [AuthGuardService] },
  { path: 'admin-electricity', component: AdminCommonTableComponent, canActivate: [AuthGuardService] },
  { path: 'admin-telephone', component: AdminCommonTableComponent, canActivate: [AuthGuardService] },
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
