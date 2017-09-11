import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginComponent } from '../../login/login.component';
import { EditPasswordComponent } from '../edit-password/edit-password.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { SigningService } from '../../../services/signing.service';

@Component({
  selector: 'customer-settings',
  templateUrl: 'customer-settings.html',
})
export class CustomerSettingsComponent {
    editPasswordPage;
    editProfilePage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private signService : SigningService) {
      this.editPasswordPage = EditPasswordComponent;
      this.editProfilePage = EditProfileComponent;
  }

  gotoPage(page){
      this.navCtrl.push(page);
  }

  onClickLogout(){
    this.signService.logoutUser().subscribe(isAuth => {
        this.navCtrl.setRoot(LoginComponent);
    });
  }
}
