import { ActionSheetCameraOptions } from './../../../helpers/action-sheet-camera-options';
import { CameraService } from './../../../helpers/camera-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { UserService } from './../../../services/user.service';
import { Credit } from './../../../models/credit.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CloneService } from '../../../helpers/clone-service';

@Component({
    selector: 'edit-credit',
    templateUrl: 'edit-credit.html',
})
export class EditCreditComponent {
    updatedCredit: any = {};
    credit: Credit;
    formGroup: FormGroup;

    constructor(private fBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private userService: UserService,
        private cloneService: CloneService, private cameraService: CameraService,
        public actionSheetCtrl: ActionSheetController,
        private actionSheetCameraOptions: ActionSheetCameraOptions) {
        this.credit = this.navParams.get("credit");
        this.initCredit();
        this.buildForm();
        console.log("updated credit: ", this.updatedCredit);
        console.log(this.credit);
    }

    buildForm() {
        this.formGroup = this.fBuilder.group({
            'dateOfPurchase': ["", Validators.required],
            'dateOfExpired': ["", Validators.required],
            // 'items': ["", Validators.required],
            'totalCredit': ["", Validators.required]
        });
    }

    initCredit() {
        this.updatedCredit = this.cloneService.getDeepCopyOfCredit(this.credit);
        // this.updatedCredit = 
        //   this.updatedCredit = { 
        //       clubId: this.credit.clubId,
        //       id: this.credit.id
        //     };
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditCredit');
    }

    onClickEditCredit() {
        console.log(this.updatedCredit);
        this.userService.editCredit(this.updatedCredit)
            .subscribe(isAuth => {
                console.log(isAuth);
                if (isAuth) {
                    // this.showAlert("Profile Updated" + isAuth);
                    this.credit = this.updatedCredit;
                    //   alert("updated");
                    this.navCtrl.pop();
                }
                else {
                    // alert("not updated");
                }
            });
    }

    onClickOpenCameraOptionTake() {
        this.actionSheetCameraOptions.onClickOpenOptionTakeImgModal()
        this.actionSheetCameraOptions.onPhotoTaken.subscribe(res => {
            if (res.isAuth) {
                this.updateImg(res.url);
            }
        })
    }

    updateImg(url) {
        this.updatedCredit.img = url;
    }

}
