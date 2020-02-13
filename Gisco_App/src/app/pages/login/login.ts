//import { Error } from './../../models/shared/error.namespace';

import { Component, Inject, forwardRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LoginService } from '../../services/login/login.service';
import { StoreService } from './../../services/store/store.service';
//import { ErrorService } from './../../services/shared/error.service';
import { Login } from '../../models/login/login.namespace';
//import { Common } from '../../models/common/common.namespace';

import { HomePage } from '../../pages/home/home';

// import { FirebaseX } from '@ionic-native/firebase-x/ngx';

import { AlertService } from '../../services/shared/alert.service';
//import { ElencoMessaggiPage } from '../messaggi/elenco-messaggi/elenco-messaggi';
import { CommonService } from '../../services/shared/common.service';

/**
 * Generated class for the ComunicazioneComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {


  private userData: Login.ws_Token;

  private username: string = "";
  private password: string = "";

  //private firebase_token: string = "";
  private serverUrl: string = "";

  constructor(@Inject(forwardRef(() => LoginService)) private loginService: LoginService,
    private alertCtrl: AlertController,
    private navController: NavController,
    @Inject(forwardRef(() => StoreService)) private store: StoreService,
    // private error: ErrorService,
    // public firebaseNative: FirebaseX,
    public alertService: AlertService,
    public commonService: CommonService) {
    this.userData = new Login.ws_Token();
  }

  public checkLogin(): void {
    var self = this;
    this.store.getServerUrl().then(function (url: string) {
      if (url && url != "") {
        self.serverUrl = url;
        self.login();
      } else {
        self.alertService.presentServerInputAlert("Indirizzo Server");
      }
    });
  }

  public login(): void {

    var self = this;
    // this.firebaseNative.getToken().then(function(fbToken){
    //   self.firebase_token = fbToken;

    //   self.loginService.login(self.serverUrl, self.username, self.password, self.firebase_token).subscribe(r => {
    //     if (r.ErrorMessage.msg_code === 0) {
    //       self.userData = r;
    //       self.store.setUserData(self.userData);

    //       self.commonService.getNotifiche(r.token_value, self.store.getLocalServerUrl()).subscribe(r => {
    //         var notifiche = r.l_notifiche;
    //         self.loginService.wakeupNotifiche(notifiche);
    //       });

    //       self.navController.setRoot(HomePage, {val: 'pippo'});
    //     } else {
    //       self.alertService.presentErrorAlert("Si è verificato un errore durante il login");
    //     }
    //   },
    //   error => {
    //     self.alertService.presentErrorAlert("Si è verificato un errore durante il login: " + error);
    //   });
    // });

    self.loginService.login(self.serverUrl, self.username, self.password, '1').subscribe(r => { // quando è attivo il firebase, qui si deve passare il token di firebase
      if (r.ErrorMessage.msg_code === 0) {
        self.userData = r;
        self.store.setUserData(self.userData);

        self.commonService.getNotifiche(r.token_value, self.store.getLocalServerUrl()).subscribe(r => {
          var notifiche = r.l_notifiche;
          self.loginService.wakeupNotifiche(notifiche);
        });

        self.navController.setRoot(HomePage, { val: 'pippo' });
      } else {
        self.alertService.presentErrorAlert("Si è verificato un errore durante il login");
      }
    },
      error => {
        self.alertService.presentErrorAlert("Si è verificato un errore durante il login: " + error);
      });
  }

  presentAlert() {
    // se serve, qui si puo' mettere una chiamata per tenere traccia di chi ha tentato e fallito il login
    let alert = this.alertCtrl.create({
      title: 'Login Failed',
      subTitle: 'Retry',
      buttons: ['Again']
    });
    alert.present();
  }
}
