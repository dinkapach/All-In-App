// club staff
import { EditClubBaseComponent } from './../pages/clubs/edit-club/edit.club.base.component';
import { ClubInformation } from './../pages/clubs/club-information/club.information.component';
import { EditDeleteClubComponent } from './../pages/superManager/clubActions/edit-delete-club/edit.delete.club.component';
import { EditClubComponent } from './../pages/clubs/edit-club/edit.club.component';
import { ClubCardSuperComponent } from './../pages/superManager/clubActions/club-card-super/club.card.super.component';
import { AddClubComponent } from './../pages/superManager/clubActions/add-club/add.club.component';
import { AddClubToManagerComponent } from './../pages/superManager/managerActions/add-club-to-manager/add.club.to.manager.component';
import { ClubManualDetailsComponent } from './../pages/clubs/club-details/club.manual.details.component';
import { EditClubManuallyComponent } from './../pages/clubs/manualClubs/club-manual-edit/club.manual.edit.component';
import { ClubManualCardComponent } from './../pages/clubs/club-card/club.manual.card.component';
import { AddClubManualComponent } from './../pages/clubs/manualClubs/club-add-manual/club.add.manual.component';
import { FilterClubDetailsComponent } from './../pages/customer/dashboard/filter-club.component';
import { ClubsListComponent } from './../pages/clubs/clubs-list/clubs.list.component';
import { ClubCardComponent } from './../pages/clubs/club-card/club.card.component';
import { ClubDetailsComponent } from './../pages/clubs/club-details/club.details.component'
import { EditManagerClubComponent } from './../pages/clubs/edit-club/edit.manager.club.component';


// sale staff
import { SaleCardComponent } from  './../pages/sales/sale-card/sale.card.component';
import { AddSaleComponent } from '../pages/sales/add-sale/add-sale.component';
import { ShowSalesComponent } from '../pages/sales/show-sales/show-sales.component';
import { EditSaleComponent } from '../pages/sales/edit-sale/edit.sale.component';
import { SaleViewComponent } from '../pages/sales/sale-view/sale.view.component';
import { SaleCardManagerComponent } from '../pages/sales/sale-cardManager/sale.cardManager.component';

// customer staff
import { DashboardComponent } from './../pages/customer/dashboard/dashboard.component';

//manager staff
import { ManagerComponent } from './../pages/managers/manager/manager.component';
import { EditProfileManagerComponent } from '../pages/managers/edit-profileManager/edit.profileManager.component';
import { ManagerSettingsComponent } from '../pages/managers/manager-settings/manager.settings.component';
import { EditPasswordManagerComponent } from '../pages/managers/edit-passwordManager/edit.passwordManager.component';
import { ShowStatisticsComponent } from '../pages/managers/show-statistics/show.statistics.component';
import { ShowCustomerComponent } from '../pages/managers/show-customer/show-customer.component';
import { UserCardComponent } from  '../pages/managers/user-card/user.card.component';


// superManager staff
import { EditManagerComponent } from './../pages/superManager/managerActions/edit-manager/edit.manager.component';
import { EditDeleteManagerComponent } from './../pages/superManager/managerActions/edit-delet-manager/edit.delet.manager.component';
import { AddManagerComponent } from './../pages/superManager/managerActions/add-manager/add.manager.component';
import { ManagerCardComponent } from './../pages/superManager/managerActions/manager-card/manager.card.component';
import { DeleteCustomerComponent } from './../pages/superManager/customerActions/delete-customer/delete.customer.component';
import { CustomerCardSuperComponent } from './../pages/superManager/customerActions/customer-card-super/customer.card.super.component';
import { SuperManagerDashboardComponent } from './../pages/superManager/super-manager-dashboard/super.manager.dashboard.component';


// services
import { SigningSuperManagerService } from './../services/signing.superManager.service';
import { SuperManagerService } from './../services/superManager.service';
import { CloneService } from './../helpers/clone-service';
import { CameraService } from './../helpers/camera-service';
import { AlertService } from './../helpers/alertService';
import { SigningService } from './../services/signing.service';
import { UserService } from './../services/user.service';
import { ManagerService } from './../services/manager.service';
import { LoadingService } from '../helpers/loading-service';
import { ClubService } from './../services/club.service';


// helpers
import { AddPointsFunctions } from './../helpers/add-points-functions';
import { ActionSheetCameraOptions } from './../helpers/action-sheet-camera-options';


// credit/receipt staff
import { EditCreditComponent } from './../pages/customer/credits/edit-credit/edit-credit.component';
import { CreditsCardComponent } from '../pages/customer/credits/credits-card/credits.card.component';
import { ShowCreditsComponent } from '../pages/customer/credits/show-credits/show-credits.component';
import { AddCreditComponent } from '../pages/customer/credits/add-credit/add-credit.component';
import { ScanReceiptComponent } from './../pages/receipts/receipt-scan/receipt.scan.component';
import { CameraMock } from '../pages/receipts/receipt-scan/camera.mock';


// login/singup
import { LoginComponent } from './../pages/login/login.component';
import { SignupComponent } from './../pages/signup/signup.component';


// angular/ionic staff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';


import { MyApp } from './app.component';
import { EditProfileComponent } from '../pages/customer/edit-profile/edit-profile.component';
import { EditPasswordComponent } from '../pages/customer/edit-password/edit-password.component';
import { CustomerSettingsComponent } from '../pages/customer/customer-settings/customer-settings.component';


@NgModule({
  declarations: [
    MyApp,
    LoginComponent,
    AddCreditComponent,
    SignupComponent,
    DashboardComponent,
    ClubCardComponent,
    ClubsListComponent,
    ClubDetailsComponent,
    ManagerComponent,
    SaleCardComponent,
    CreditsCardComponent,
    UserCardComponent,
    ShowCreditsComponent,
    ShowCustomerComponent,
    EditProfileComponent,
    EditCreditComponent,
    EditSaleComponent,
    ShowStatisticsComponent,
    FilterClubDetailsComponent,
    AddClubManualComponent,
    ClubManualCardComponent,
    EditClubManuallyComponent,
    EditManagerClubComponent,
    ScanReceiptComponent,
    EditPasswordComponent,
    ClubManualDetailsComponent,
    AddSaleComponent,
    ShowSalesComponent,
    CustomerSettingsComponent,
    SaleViewComponent,
    SaleCardManagerComponent,
    ClubInformation,
    EditProfileManagerComponent,
    ManagerSettingsComponent,
    EditPasswordManagerComponent,
    EditClubBaseComponent,

    // super manager stuff
    SuperManagerDashboardComponent,
    ManagerCardComponent,
    AddManagerComponent,
    EditDeleteManagerComponent,
    AddClubToManagerComponent,
    EditManagerComponent,
    AddClubComponent,
    ClubCardSuperComponent,
    EditDeleteClubComponent,    
    EditClubComponent,
    CustomerCardSuperComponent,
    DeleteCustomerComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginComponent,
    AddCreditComponent,
    SignupComponent,
    DashboardComponent,
    ClubCardComponent,
    ClubsListComponent,
    ClubDetailsComponent,
    ManagerComponent,
    SaleCardComponent,
    CreditsCardComponent,
    UserCardComponent,
    ShowCreditsComponent,
    ShowCustomerComponent,
    EditProfileComponent,
    FilterClubDetailsComponent,
    AddClubManualComponent,
    EditCreditComponent,
    ClubManualCardComponent,
    EditClubManuallyComponent,
    ScanReceiptComponent,
    EditPasswordComponent,
    EditSaleComponent,
    ShowStatisticsComponent,
    ClubManualDetailsComponent,
    AddSaleComponent,
    ShowSalesComponent,
    CustomerSettingsComponent,
    SaleViewComponent,
    SaleCardManagerComponent,
    ClubInformation,
    EditProfileManagerComponent,
    ManagerSettingsComponent,
    EditPasswordManagerComponent,
    EditClubBaseComponent,
   
    // super manager stuff
    SuperManagerDashboardComponent,
    ManagerCardComponent,
    AddManagerComponent,
    EditDeleteManagerComponent,
    AddClubToManagerComponent,
    EditManagerComponent,
    EditManagerClubComponent,
    AddClubComponent,
    ClubCardSuperComponent,
    EditDeleteClubComponent,    
    EditClubComponent,
    CustomerCardSuperComponent,
    DeleteCustomerComponent,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SigningService,
    UserService,    
    ClubService,
    BarcodeScanner,
    ManagerService,
    SigningSuperManagerService,
    SuperManagerService,
    AlertService,
    CameraService,
    LocalNotifications,
    LoadingService,
    LocalNotifications,
    ActionSheetCameraOptions,
    CloneService,
    AddPointsFunctions,
    
    //Camera,
    { provide: Camera, useClass: CameraMock },
    ]
})
export class AppModule {}