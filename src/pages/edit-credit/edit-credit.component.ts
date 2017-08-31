import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from './../../services/user.service';
import { Credit } from './../../models/credit.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/**
 * Generated class for the EditCredit page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'edit-credit',
  templateUrl: 'edit-credit.html',
})
export class EditCreditComponent {
  updatedCredit: any = {};
  credit: Credit;
  formData : FormGroup;
  
  constructor(private fBuilder : FormBuilder, public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
    this.credit = this.navParams.get("credit");
    console.log(this.updatedCredit);
    this.updatedCredit = { idona: 24 };

        this.formData = fBuilder.group({
            'id': ["", Validators.required],
            'clubId': ["", Validators.required],
            'dateOfPurchase': ["", Validators.required],
            'dateOfExpired': ["", Validators.required],
            'items': ["", Validators.required],
            'totalCredit': ["", Validators.required],
        })
    console.log(this.credit);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCredit');
  }

  updateCredit(){
    console.log(this.credit);
    this.userService.editCredit(this.credit)
      .subscribe(isAuth => {
          console.log(isAuth);
          if(isAuth){
              // this.showAlert("Profile Updated" + isAuth);
              console.log(isAuth);
          }
          else{
              // this.showAlert("Updated failed"+isAuth);
          }
      });
  }

      onBlur(event){
        var formName = event.target.attributes['formControlName'].value;
        this.updatedCredit[formName] = this.formData.value[formName];
        // console.log(this.updatedCredit);
        // console.log(this.credit);
    }

}
