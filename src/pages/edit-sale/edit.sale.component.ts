import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserService } from './../../services/user.service';
import { Credit } from './../../models/credit.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Sale } from '../../models/sales.model';
import { ManagerService } from '../../services/manager.service';
import { Club } from '../../models/club.model';

/**
 * Generated class for the EditCredit page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'edit-sale',
  templateUrl: 'edit.sale.html',
})
export class EditSaleComponent {
  updatedsale: any = {};
  sale: Sale;
  formData : FormGroup;
  club : Club;
  clubId : string;
  constructor(private fBuilder : FormBuilder, public navCtrl: NavController,
   public navParams: NavParams, private alertCtrl: AlertController,
   private managerService: ManagerService) {
    this.sale = this.navParams.get("sale");
    console.log(this.updatedsale);
   this.clubId = managerService.getClubId();
   
        this.formData = fBuilder.group({
            'id': ["", Validators.required],
            'name': ["", Validators.required],
            'img': "",
            'description': ["", Validators.required],
            'points': "",
            'price': "",
        })
    console.log(this.sale);
  }

 

  updateSale(){
    console.log(this.sale);
    this.managerService.editSale(this.sale)
      .subscribe(isAuth => {
          console.log(isAuth);
          if(isAuth){
             this.presentAlert();
              console.log(isAuth);
               console.log(" update sale  ");
          }
          else{
              console.log(" Not update club ");
          }
      });
  }

     presentAlert(){
    let alert = this.alertCtrl.create({
        subTitle: 'sale added to club succecfully',
        buttons: ['סבבה']
    });
       alert.present();
       alert.onDidDismiss(() => {
       this.navCtrl.pop();
       });
    }
  


//  updateCurrSale(){
//         Object.keys(this.updatedsale).forEach(key => {
//             let value = this.updatedsale[key];
//             console.log(value);
//             this.club[key] = this.updatedsale[key];
//           });
//     }
//      onBlur(event){
//         var formName = event.target.attributes['formControlName'].value;
//         this.updateSale[formName] = this.formData.value[formName];
   
//     }


}
