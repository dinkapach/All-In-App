import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { EditPasswordComponent } from '../edit-password/edit-password.component';
import { SigningService } from '../../services/signing.service';
import { LoginComponent } from '../login/login.component';


/**
 * Generated class for the EditCredit page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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
