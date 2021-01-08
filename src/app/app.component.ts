import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { SidenavService } from './services/sidenav.service';
import {Principal, LoginService} from 'dist/sitmun-frontend-core/';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent   {
  title = 'admin-app';

  /** translate service*/
  translate;

  /** current logged in user account*/
  currentAccount : any;

  isOpen: boolean;
  constructor(/** Translate service */public trans: TranslateService, /** Identity service */public principal:Principal,/** Login service */public loginService:LoginService  ) { 
  	this.translate = trans;
  	this.translate.addLangs(['es', 'ca']);
    this.translate.setDefaultLang('ca');
    this.translate.use('ca');
  }

  /** Change app language*/
  changeLanguage(locale: string ){
    this.translate.use(locale);
  }

  navOpen($event): void {
    // toggle condition here
    this.isOpen = !this.isOpen;
    console.log('$navOpen');
  }

  /** User log out*/
  logout(){
    this.loginService.logout();
  }

  /** Whether user is logged in */
  isLoggedIn(){
    return this.principal.isAuthenticated();
  }

  /** On component init, get logged user account*/
  ngOnInit() {

      this.principal.identity().then((account) => {
                 this.currentAccount = account;
   });
  }

}

