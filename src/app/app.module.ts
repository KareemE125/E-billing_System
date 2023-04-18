import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { AccountService } from './services/account.service';
import { ChildComponent } from './child/child.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ParentComponent } from './parent/parent.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TableComponent } from './table/table.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { WaterComponent } from './water/water.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ModalComponent } from './modal/modal.component';

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
    TableComponent,
    AddOfferComponent,
    WaterComponent,
    ElectricityComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule

  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
