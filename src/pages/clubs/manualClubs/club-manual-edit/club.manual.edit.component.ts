import { User } from './../../../../models/user.model';
import { ClubManually } from './../../../../models/clubManually.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
    private alertCtrl: AlertController, private userService: UserService) {
    this.club = this.navParams.get("club");
    this.updatedClub = this.club;
    this.user = this.userService.getLocalUser();

        this.editClubForm = fBuilder.group({
            'name': ["", Validators.required],
            'address': [""],
            'phoneNumber': [""],
            'img': [""],
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

//   editClub(){
//     let index = -1;
//     let i = 0;
//     this.user.manuallyClubs.forEach(currClub => {
//         if(this.clubId == currClub.id){
//             index = i;
//         }
//         i++;
//     })
//     console.log(index);
//     console.log(this.updatedClub);
//     if(index != -1){
//     this.user.manuallyClubs[index] = this.updatedClub;
    
//     this.userService.updateUser(this.user)
//       .subscribe(isAuth => {
//           if(isAuth){
//               console.log("from edit club manuall return from server");
//               let alert = this.alertCtrl.create({
//                 subTitle: 'club edited',
//                 buttons: ['סבבה']
//             });
//         alert.present();
//         alert.onDidDismiss(() => {
//             this.navCtrl.pop();
//         });
//           }
//           else{
//             console.log(isAuth);
//             alert("edit failed");
//           }
//       });
//     }
//   }
}
