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
}) // this component is for adding new sale for club (only manager can do it)
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

    // when click add sale, save new sale in DB
    onClickAddSale() {
        this.sale.id = Date.now();
        this.managerService.addSale(this.sale)
            .subscribe(sale => {
                if (sale) {
                    this.navCtrl.pop();
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
        this.sale.img = url;
    }
}