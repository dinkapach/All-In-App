import { Sale } from './../../../models/sales.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Club } from "../../../models/club.model";
import { ManagerService } from "../../../services/manager.service";
import { CloneService } from "../../../helpers/clone-service";
import { ActionSheetCameraOptions } from "../../../helpers/action-sheet-camera-options";

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
        public actionSheetCtrl: ActionSheetController,
        private actionSheetCameraOptions: ActionSheetCameraOptions) {

        this.sale = this.navParams.get("sale"); // get sale that was chosen for editing
        this.updatedSale = this.cloneService.getDeepCopyOfSale(this.sale); // get deep copy of sale
        this.buildEditSaleForm();
    }

    buildEditSaleForm() {
        this.formData = this.fBuilder.group({
            'name': ["", Validators.required],
            'description': ["", Validators.required],
            'points': "",
            'price': "",
        });
    }

    // update the edited sale in DB
    updateSale() {
        this.managerService.editSale(this.updatedSale)
            .subscribe(isAuth => {
                if (isAuth) {
                    this.cloneService.cloneObject(this.updatedSale, this.sale);
                    this.navCtrl.pop();
                }
                else {
                    console.log(" Not update club ");
                }
            });
    }

    // the option are camera or gallery
    onClickOpenCameraOptionTake() {
        this.actionSheetCameraOptions.onClickOpenOptionTakeImgModal()
        this.actionSheetCameraOptions.onPhotoTaken.subscribe(res => {
            if (res.isAuth) {
                this.updateImg(res.url);
            }
        })
    }

    updateImg(url) {
        this.updatedSale.img = url;
    }
}