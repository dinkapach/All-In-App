import { CloneService } from './../../../../helpers/clone-service';
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
  editClubForm : FormGroup;
  clubId: number;
  
  constructor(private fBuilder : FormBuilder, public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private userService: UserService, private cameraService: CameraService,
    public actionSheetCtrl: ActionSheetController, private cloneService: CloneService) {
    this.club = this.navParams.get("club");
    this.updatedClub = this.cloneService.getDeepCopyOfClubManually(this.club);
    this.user = this.userService.getLocalUser();

        this.editClubForm = fBuilder.group({
            'name': ["", Validators.required],
            'address': [""],
            'phoneNumber': [""],
            // 'img': [""],
            'points': [""],
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditClub');
  }

  onClickEditClub(){
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

        // to do
        updateImg(url) {
            console.log("in save img")
            this.updatedClub.img = url;
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
