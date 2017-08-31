import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginComponent } from '../pages/login/login.component';
import { ManagerComponent } from '../pages/manager/manager.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { SigningService } from '../services/signing.service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  private loginPage;
  private dashboardPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private signService : SigningService) {

    this.loginPage = LoginComponent;
    this.dashboardPage = DashboardComponent;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
	  alert("platform ready");
    });

    this.loadApp();
  }

  loadApp(){
    this.signService.loadUserFromStorage()
    .subscribe(res => {
      console.log(res);
      if (res.isManager) {
          this.rootPage = ManagerComponent;
      }
      else {
          this.rootPage = DashboardComponent;
      }
    },
    err => {
      console.log(err);
      alert(err);
      this.rootPage = LoginComponent;
    });
  }
}

