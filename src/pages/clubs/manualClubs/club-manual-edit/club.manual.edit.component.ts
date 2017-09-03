import { CameraService } from './../../../../helpers/camera-service';
import { User } from './../../../../models/user.model';
import { ClubManually } from './../../../../models/clubManually.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { UserService } from './../../../../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'club-manual-edit',
  templateUrl: 'club.manual.edit.html',
})
export class EditClubManuallyComponent {
  user: User;
  updatedClub: ClubManually;
  club: ClubManually;
  formData : FormGroup;
  clubId: number;
  
  constructor(private fBuilder : FormBuilder, public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private userService: UserService, private cameraService: CameraService,
    public actionSheetCtrl: ActionSheetController) {
    this.club = this.navParams.get("club");
    this.updatedClub = this.club;
    this.user = this.userService.getLocalUser();

        this.formData = fBuilder.group({
            'id': ["", Validators.required],
            'name': ["", Validators.required],
            'address': ["", Validators.required],
            'phoneNumber': ["", Validators.required],
            'img': [""],
            'points': [""],
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditClub');
  }

  updateClub(){
    let index = -1;
    let i = 0;
    this.user.manuallyClubs.forEach(currClub => {
        if(this.clubId == currClub.id){
            index = i;
        }
        i++;
    })
    console.log(index);
    console.log(this.updatedClub);
    if(index != -1){
    this.user.manuallyClubs[index] = this.updatedClub;
    
    this.userService.updateUser(this.user)
      .subscribe(isAuth => {
          if(isAuth){
              console.log("from edit club manuall return from server");
              let alert = this.alertCtrl.create({
                subTitle: 'club edited',
                buttons: ['סבבה']
            });
        alert.present();
        alert.onDidDismiss(() => {
            this.navCtrl.pop();
        });
          }
          else{
            console.log(isAuth);
            alert("edit failed");
          }
      });
    }
  }

      onBlur(event){
        var formName = event.target.attributes['formControlName'].value;
        this.updatedClub[formName] = this.formData.value[formName];
    }

        // to do
        saveImgInUpdaatedUser(url) {
            console.log("in save img")
            this.updatedClub.img = url;
        }
    
        onClickOpenCameraOptionTake() {
            let actionSheet = this.actionSheetCtrl.create({
                title: 'Modify your album',
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
                    this.saveImgInUpdaatedUser(url)
                })
                .catch(err => {
                    console.log("err to take picture", err);
                    // handle error
                })
        }
    
        onClickGetPhotoFromGallery() {
            this.cameraService.choosePhotoFromGallery()
                .then(url => {
                    this.saveImgInUpdaatedUser(url);
                })
                .catch(err => {
                    console.log("err to take picture", err);
                    // handle error
                })
        }

}
