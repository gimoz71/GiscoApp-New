import { Error } from '../../models/shared/error.namespace';

import { Component, Inject, forwardRef, ViewChild } from '@angular/core';
import { Nav, NavController, AlertController } from 'ionic-angular';
import { LoginService } from '../../services/login/login.service';
import { StoreService } from '../../services/store/store.service';
import { ErrorService } from '../../services/shared/error.service';
import { Login } from '../../models/login/login.namespace';

import { HomePage} from '../home/home';

import { FirebaseX } from '@ionic-native/firebase-x/ngx';

import { AlertService } from '../../services/shared/alert.service';
import { ElencoMessaggiPage } from '../messaggi/elenco-messaggi/elenco-messaggi';

/**
 * Generated class for the ComunicazioneComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public servername: string = ""; 
  
  constructor(@Inject(forwardRef(() => StoreService)) private store: StoreService,
    private loginService: LoginService,
    private alertService: AlertService){
    var self = this;
    store.getServerUrl().then(function(url: string) {
      self.servername = url;
    });
  }

  public saveSettings(): void {
    var self = this;
    this.loginService.checkServerValidity(this.servername)
      .subscribe(r => {
        if(r.result == 'OK'){
          this.store.setServer(this.servername);
          this.alertService.presentAlert("Url server salvata correttamente");
        } else {
          this.alertService.presentErrorAlert(r.ErrorMessage.msg_testo);
        }
      }, 
      error => {
        this.alertService.presentServerInputAlert("Indirizzo Server Sbagliato");
      });
  }
  
}
