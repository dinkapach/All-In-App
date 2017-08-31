import { Receipt } from './../../../models/receipt.model';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { Club } from './../../../models/club.model';
import { User } from './../../../models/user.model';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import b64toBlob from 'b64-to-blob';
import { DomSanitizer } from '@angular/platform-browser';
import base64url from 'base64-url';


@Component({
    selector: 'receipt-scan',
    templateUrl: 'receipt.scan.html'
})
export class ScanReceiptComponent implements OnInit{
    user: User;
    isManual : boolean;
    receipt: Receipt;
    options: CameraOptions;
    photos : any[];
    base64Image : string;
    clubReceiptArr: any[];
    trustedUrl : any;
    @Input()
    club: any;


    constructor(public navCtrl : NavController, private camera: Camera, private sanitizer: DomSanitizer,
        private userService: UserService, private navParams: NavParams, private alertCtrl : AlertController){
        this.user = this.userService.getLocalUser();
        this.receipt = new Receipt();
        //this.club = this.navParams.get("club");
        //this.isManual = this.navParams.get("isManual");

        this.options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
    }

    ngOnInit(){

        //this.isManual = this.club.isManual;
        console.log("from scan receipt, is manual: ", this.club);
        // take from the photos that belong to this club
        this.clubReceiptArr = [];
        this.photos = [];
        this.clubReceiptArr = this.user.receipts.filter( currentReceipt => {
            return currentReceipt.clubId == this.club.id
        });

        console.log(this.clubReceiptArr.length);

        if(this.clubReceiptArr.length > 0){
            this.clubReceiptArr.forEach(currClubReceipt => {
               this.photos.push(currClubReceipt.img);
            });
        }
        else {
            this.photos = [];
        }
    }

    deletePhoto(photo) {
        let confirm = this.alertCtrl.create({
            title: 'Sure you want to delete this photo? There is NO undo!',
            message: '',
            buttons: [
              {
                text: 'No',
                handler: () => {
                  console.log('Disagree clicked');
                }
              }, {
                text: 'Yes',
                handler: () => {
                  console.log('Agree clicked');
                this.photos = this.photos.filter(currPhoto => {
                    return currPhoto != photo;
                })
                this.user.receipts = this.user.receipts.filter(currReceipt => {
                    return currReceipt.img != photo;
                })
                
                console.log(this.user.receipts);

                this.userService.updateUser(this.user)
                .subscribe(isUpdated => {
                    if(isUpdated){
                        console.log("Photo delted from user");
                    }
                    else {
                        console.log("photo not deleted from customer")
                    }
                })
                }
              }
            ]
          });
        confirm.present();
    }
     
    takePhoto(){
       this.camera.getPicture(this.options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
            let contentType = 'image/jpeg';
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            
            this.userService.saveReceipt(this.base64Image)
            .subscribe(res => {
                if(res.isUpdated){
                    this.photos.push(res.result.url);
                    this.photos.reverse();

                    this.receipt.clubId = this.club.id;
                    this.receipt.img = res.result.url;
                    this.receipt.isManual = this.isManual;
                    
                    this.user.receipts.push(this.receipt);
                    
                    this.userService.updateUser(this.user)
                    .subscribe(isUpdated => {
                        if(isUpdated){
                            alert("Picture saved succesfully");
                            console.log("receipt" , this.receipt);
                        }
                else {
                        alert("Unable to save picture");
                    }
                })
                }
            });
            
       }, (err) => {
        alert(err); // TODO: handle error
       });
    }

    // takePicture() {
    //     this.camera.getPicture(this.options).then((imageData) => {
    //         // imageData is either a base64 encoded string or a file URI
    //         // If it's base64:
    //             let contentType = 'image/jpeg';
    //             let base64Image = 'data:image/jpeg;base64,' + imageData;
    //             let blob = b64toBlob(imageData, contentType);
    //             let blobUrl = URL.createObjectURL(blob);
                
    //             this.receipt.clubId = this.club.id;
    //             this.receipt.img = blobUrl;
    //             this.receipt.isManual = this.isManual;
                
    //             this.user.receipts.push(this.receipt);
                
    //             this.userService.updateUser(this.user)
    //             .subscribe(isUpdated => {
    //                 if(isUpdated){
    //                     alert("Picture saved succesfully");
    //                     console.log("receipt" , this.receipt);
    //                 }
    //                else {
    //                      alert("Unable to save picture");
    //                  }
    //             })
    //        }, (err) => {
    //         alert(err); // TODO: handle error
    //        });
    // }
}