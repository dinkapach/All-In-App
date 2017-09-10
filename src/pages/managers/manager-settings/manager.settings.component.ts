import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SigningService } from "../../../services/signing.service";
import { LoginComponent } from "../../login/login.component";
import { EditPasswordManagerComponent } from "../edit-passwordManager/edit.passwordManager.component";
import { EditProfileManagerComponent } from "../edit-profileManager/edit.profileManager.component";


@Component({
  selector: 'manager-settings',
  templateUrl: 'manager.settings.html',
})
export class ManagerSettingsComponent {
    editPasswordPage;
    editProfilePage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private signService : SigningService) {
      this.editPasswordPage = EditPasswordManagerComponent;
      this.editProfilePage = EditProfileManagerComponent;
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
