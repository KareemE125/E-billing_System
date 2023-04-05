import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { AccountService } from './services/account.service';
import { ChildComponent } from './child/child.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ServiceCardComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
