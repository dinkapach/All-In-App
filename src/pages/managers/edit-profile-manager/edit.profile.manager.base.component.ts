import { CloneService } from './../../../helpers/clone-service';
import { ManagerService } from './../../../services/manager.service';
import { Manager } from './../../../models/manager.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'edit-profile-manager-base',
    templateUrl : 'edit.profile.manager.base.html'
}) // this component is the base for edit profile for manager
// super manager and manager needs the same functionallity, but also bit different 
export class EditProfileManagerBaseComponent {
    manager: Manager;
    updatedManager: any = {};
    formData : FormGroup;

    constructor(public fBuilder : FormBuilder, public cloneService: CloneService, 
        public managerInput: Manager) {
        this.manager = managerInput // the parameter (manager to edit) for this component 
        this.updatedManager = cloneService.getDeepCopyOfManager(this.manager); // deep copy of manager
        this.buildEditProfileForm();
    }

    buildEditProfileForm(){
        this.formData = this.fBuilder.group({
            'firstName': ["", Validators.required],
            'lastName': ["", Validators.required],
            'email': ["", Validators.required],
        })
    }

    loadFormValuesFromUpdatedManagerToManager(){
        this.cloneService.cloneObject(this.updatedManager, this.manager);
    }

}