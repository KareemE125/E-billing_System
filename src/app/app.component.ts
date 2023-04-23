import { Component, Injectable, OnInit } from '@angular/core';
import { AccountService } from './shared/services/account.service';
import { User } from './models/users/user.model';
import { DbService } from './shared/services/db.service';
import { ToastService } from './shared/services/toast.service';
import { Router } from '@angular/router';
import { ServiceProvider } from './models/users/serviceProvider.model';
import { getDummyServiceProviders, getDummyUsers, getDummyAdmins } from './dummy-data/seed-database';
import { ServiceProviderService } from './shared/services/service-provider.service';
import { AdminService } from './shared/services/admin.service';
import { UserService } from './shared/services/user.service';
import { Admin } from './models/users/admin.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private accService: AccountService, private servProvService: ServiceProviderService,
    private userService: UserService, private adminService: AdminService) { }


  async ngOnInit(): Promise<void> {
    this.accService.goToHome()
    if (false)
      await this.seed()
  }

  async seed(): Promise<void> {
    const prov: ServiceProvider[] = getDummyServiceProviders()
    for (let p of prov) await this.servProvService.addServiceProvider(p);

    const users: User[] = getDummyUsers()
    for (let u of users) await this.userService.addUser(u);

    const admins : Admin[]=getDummyAdmins();
    for (let a of admins) await this.adminService.addAdmin(a);
  }




}
