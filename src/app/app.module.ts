import { AddPointsFunctions } from './../helpers/add-points-functions';
import { ClubInformation } from './../pages/clubs/club-information/club.information.component';
import { CloneService } from './../helpers/clone-service';
import { ActionSheetCameraOptions } from './../helpers/action-sheet-camera-options';
import { CameraService } from './../helpers/camera-service';
import { DeleteCustomerComponent } from './../pages/superManager/customerActions/delete-customer/delete.customer.component';
import { CustomerCardSuperComponent } from './../pages/superManager/customerActions/customer-card-super/customer.card.super.component';
import { EditDeleteClubComponent } from './../pages/superManager/clubActions/edit-delete-club/edit.delete.club.component';
import { EditClubComponent } from './../pages/superManager/clubActions/edit-club/edit.club.component';
import { ClubCardSuperComponent } from './../pages/superManager/clubActions/club-card-super/club.card.super.component';
import { AddClubComponent } from './../pages/superManager/clubActions/add-club/add.club.component';
import { EditManagerComponent } from './../pages/superManager/managerActions/edit-manager/edit.manager.component';
import { AddClubToManagerComponent } from './../pages/superManager/managerActions/add-club-to-manager/add.club.to.manager.component';
import { EditDeleteManagerComponent } from './../pages/superManager/managerActions/edit-delet-manager/edit.delet.manager.component';
import { AddManagerComponent } from './../pages/superManager/managerActions/add-manager/add.manager.component';
import { ManagerCardComponent } from './../pages/superManager/managerActions/manager-card/manager.card.component';
import { AlertService } from './../helpers/alertService';
import { SuperManagerService } from './../services/superManager.service';
import { SuperManagerDashboardComponent } from './../pages/superManager/super-manager-dashboard/super.manager.dashboard.component';

import { SigningSuperManagerService } from './../services/signing.superManager.service';
import { ClubManualDetailsComponent } from './../pages/clubs/club-details/club.manual.details.component';
import { ScanReceiptComponent } from './../pages/receipts/receipt-scan/receipt.scan.component';
import { EditClubManuallyComponent } from './../pages/clubs/manualClubs/club-manual-edit/club.manual.edit.component';
import { ClubManualCardComponent } from './../pages/clubs/club-card/club.manual.card.component';
import { AddClubManualComponent } from './../pages/clubs/manualClubs/club-add-manual/club.add.manual.component';
import { FilterClubDetailsComponent } from './../pages/dashboard/filter-club.component';
import { ManagerService } from './../services/manager.service';
// import { DashboardManagerComponent } from './../pages/dashboard-manager/dashboard.manager.component';
import { SaleCardComponent } from  './../pages/sale-card/sale.card.component';
import { BrowserModule } from '@angular/platform-browser';
import { ClubsListComponent } from './../pages/clubs/clubs-list/clubs.list.component';
import { UserService } from './../services/user.service';
import { ClubCardComponent } from './../pages/clubs/club-card/club.card.component';
import { ClubDetailsComponent } from './../pages/clubs/club-details/club.details.component'
import { ClubService } from './../services/club.service';
import { ManagerComponent } from './../pages/manager/manager.component';
import { DashboardComponent } from './../pages/dashboard/dashboard.component';
import { SigningService } from './../services/signing.service';
import { LoginComponent } from './../pages/login/login.component';
import { EditProfileComponent } from './../pages/edit-profile/edit-profile.component';
import { EditPasswordComponent } from './../pages/edit-password/edit-password.component';
import { EditCreditComponent } from './../pages/edit-credit/edit-credit.component';
import { SignupComponent } from './../pages/signup/signup.component';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpModule } from '@angular/http';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AddCreditComponent } from '../pages/add-credit/add-credit.component';
import { CreditsCardComponent } from '../pages/credits-card/credits.card.component';
import { UserCardComponent } from  '../pages/user-card/user.card.component';
import { ShowCreditsComponent } from '../pages/show-credits/show-credits.component';
import { ShowCustomerComponent } from '../pages/show-customer/show-customer.component';
import { Camera } from '@ionic-native/camera';
import { CameraMock } from '../pages/receipts/receipt-scan/camera.mock';
import { AddSaleComponent } from '../pages/add-sale/add-sale.component';
import { ShowSalesComponent } from '../pages/show-sales/show-sales.component';
import { LoadingService } from '../helpers/loading-service';
import { CustomerSettingsComponent } from '../pages/customer-settings/customer-settings.component';
import { EditSaleComponent } from '../pages/edit-sale/edit.sale.component';
import { EditManagerClubComponent } from '../pages/edit-manager-club/edit-manager-club.component';
import { SaleViewComponent } from '../pages/sale-view/sale.view.component';
import { SaleCardManagerComponent } from '../pages/sale-cardManager/sale.cardManager.component';
import { ShowStatisticsComponent } from '../pages/show-statistics/show.statistics.component';
import { EditProfileManagerComponent } from '../pages/edit-profileManager/edit.profileManager.component';
import { ManagerSettingsComponent } from '../pages/manager-settings/manager.settings.component';
import { EditPasswordManagerComponent } from '../pages/edit-passwordManager/edit.passwordManager.component';


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
    // DashboardManagerComponent,
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
    // DashboardManagerComponent,
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
    
    Camera,
    //{ provide: Camera, useClass: CameraMock },
    ]
})
export class AppModule {}