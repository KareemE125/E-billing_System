import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { WaterComponent } from './water/water.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ModalComponent } from './modal/modal.component';
import { EditProfileInfoComponent } from './edit-profile-info/edit-profile-info.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'child', component: ChildComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'service_provider/addoffer', component: AddOfferComponent },
  { path: 'water', component: WaterComponent },
  { path: 'electricity', component: ElectricityComponent },
  { path: 'modal', component: ModalComponent },
  { path: 'editProfileInfo', component: EditProfileInfoComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
