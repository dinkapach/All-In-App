import { CameraService } from './../../helpers/camera-service';
import { CloneService } from './../../helpers/clone-service';
import { Sale } from './../../models/sales.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { UserService } from './../../services/user.service';
import { Credit } from './../../models/credit.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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
    updatedSale: Sale;
    sale: Sale;
    formData: FormGroup;
    club: Club;
    clubId: string;
    constructor(private fBuilder: FormBuilder, public navCtrl: NavController,
        public navParams: NavParams, private alertCtrl: AlertController,
        private managerService: ManagerService, private cloneService: CloneService,
         private cameraService: CameraService, public actionSheetCtrl: ActionSheetController) {
        this.sale = this.navParams.get("sale");
        this.updatedSale = this.cloneService.getDeepCopyOfSale(this.sale);
        this.buildEditSaleForm();
        console.log(this.sale);
    }

    buildEditSaleForm(){
        this.formData = this.fBuilder.group({
            // 'id': ["", Validators.required],
            'name': ["", Validators.required],
            // 'img': "",
            'description': ["", Validators.required],
            'points': "",
            'price': "",
        })
    }

  updateSale(){
    console.log(this.sale);
    this.managerService.editSale(this.updatedSale)
      .subscribe(isAuth => {
          console.log(isAuth);
          if(isAuth){
              this.cloneService.cloneObject(this.updatedSale, this.sale);
             alert("Sale Updated");
             this.navCtrl.pop();
              console.log(isAuth);
               console.log("sale updated");
          }
          else{
              console.log(" Not update club ");
          }
      });
  }

        // to do
        updateImg(url) {
            console.log("in save img")
            this.updatedSale.img = url;
        }
    
        onClickOpenCameraOptionTake() {
            let actionSheet = this.actionSheetCtrl.create({
                title: 'Choose Camera Option',
                buttons: [
                    {
                        text: 'Camera',
                        role: 'destructive',
                        handler: () => {
                            this.onClickTakePhoto();
                        }
                    },
                    {
                        text: 'Photo Libary',
                        handler: () => {
                            this.onClickGetPhotoFromGallery();
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            console.log('Cancel clicked');
                        }
                    }
                ]
            });
    
            actionSheet.present();
        }
    
        onClickTakePhoto() {
            this.cameraService.takePhotoFromCamera()
                .then(url => {
                    this.updateImg(url)
                })
                .catch(err => {
                    console.log("err to take picture", err);
                    // handle error
                })
        }
    
        onClickGetPhotoFromGallery() {
            this.cameraService.choosePhotoFromGallery()
                .then(url => {
                    this.updateImg(url);
                })
                .catch(err => {
                    console.log("err to take picture", err);
                    // handle error
                })
        }
}