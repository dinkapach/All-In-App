import { ActionSheetCameraOptions } from './../../../helpers/action-sheet-camera-options';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Sale } from './../../../models/sales.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ManagerService } from "../../../services/manager.service";

@Component({
    selector: 'add-sale',
    templateUrl: 'add-sale.html'
})
export class AddSaleComponent {
    formData: FormGroup;
    sale = new Sale();

    constructor(private fBuilder: FormBuilder,
        private managerService: ManagerService, private navCtrl: NavController,
        private actionSheetCameraOptions: ActionSheetCameraOptions) {
        this.buildForm();
    }

    buildForm() {
        this.formData = this.fBuilder.group({
            'id': Date.now(),
            'name': ["", Validators.required],
            'description': ["", Validators.required],
            'price': ["", Validators.required],
            'points': ["", Validators.required],

        })
    }

    onClickAddSale() {
        this.sale.id = Date.now();
        console.log("Added sale = ", this.sale);
        this.managerService.addSale(this.sale)
            .subscribe(sale => {
                console.log("sale issss:", sale);
                if (sale) {
                    console.log("added sale: ", sale);
                    this.navCtrl.pop();
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
        console.log("in save img")
        this.sale.img = url;
    }
}