import { Error } from './../../models/shared/error.namespace';

import { Component, Inject, forwardRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LoginService } from '../../services/login/login.service';
import { StoreService } from './../../services/store/store.service';
import { ErrorService } from './../../services/shared/error.service';
import { Login } from '../../models/login/login.namespace';

import { HomePage} from '../../pages/home/home';

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
  
  constructor(@Inject(forwardRef(() => LoginService))  private loginService: LoginService,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    @Inject(forwardRef(() => StoreService)) private store: StoreService,
    private error: ErrorService){
    this.userData = new Login.ws_Token();
  }

  public login(): void {

    this.loginService.login(this.username, this.password).subscribe(r => {
      if (r.ErrorMessage.msg_code === 0) {
        this.userData = r;
        this.store.setUserData(this.userData);
        this.navCtrl.setRoot(HomePage, {val: 'pippo'});
      } else {
        //throw new Error("test Error");
        let ed = new Error.ErrorData();
        ed.message = "errore nel login" ; 
        this.error.sendError(ed);
        //this.presentAlert();
      }
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
