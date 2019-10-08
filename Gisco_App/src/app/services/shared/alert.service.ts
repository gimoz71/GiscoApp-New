import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeoutWith';

import { Login } from './../../models/login/login.namespace';
import { Platform, MenuController, Nav, NavController, AlertController, ToastController } from 'ionic-angular';

import { Injectable, ViewChild } from '@angular/core';
import { GlobalVariable } from '../../global';
import { HttpClient } from '@angular/common/http';

import { ElencoMessaggiPage } from '../../pages/messaggi/elenco-messaggi/elenco-messaggi';

import { BasePage } from '../../pages/common/base';
import { ElencoAttivitaPage } from '../../pages/attivita/elenco-attivita/elenco-attivita';
import { ElencoProcedimentiPage } from '../../pages/procedimenti/elenco-procedimenti/elenco-procedimenti';
import { StoreService } from '../store/store.service';

import { LoginService } from '../login/login.service';

@Injectable()
export class AlertService {

     constructor(private http: HttpClient,
        public alertController: AlertController,
        public storeService: StoreService,
        public loginService: LoginService){}

     public async presentAlert(message: string) {
        let alert = this.alertController.create({
            title: 'Conferma',
            message: message,
            buttons: ['OK']
          });
          alert.present();
      }

      public async presentErrorAlert(message: string) {
        let alert = this.alertController.create({
            title: 'Errore',
            message: message,
            buttons: ['CHIUDI']
          });
          alert.present();
      }
    
      public async presentAlertNewPage(nav: NavController, type: string, id: number) {
        let messaggio = "";
        switch(type){
          case "messaggi":
              messaggio = "Vai alla sezione Messaggi";
              break;
          case "attivita":
              messaggio = "Vai alla sezione Attività";
              break;
          case "prescrizioni":
              messaggio = "Vai alla sezione Prescrizioni";
              break;
          case "commenti_at":
              messaggio = "Vai alla sezione Attività";
              break;
          case "commenti_os":
              messaggio = "Vai alla sezione Osservazioni";
              break;
          default:
              messaggio = "";
        }
        let confirm = this.alertController.create({
          title: 'Hai ricevuto una nuova notifica per la sezione. ' + messaggio,
          buttons: [
            {
              text: 'VAI',
              handler: () => {
                switch(type){
                  case "messaggi":
                      nav.push(ElencoMessaggiPage);
                      break;
                  case "attivita":
                      nav.push(ElencoAttivitaPage);
                      break;
                  case "prescrizioni":
                      nav.push(ElencoProcedimentiPage);
                      break;
                  default:
                      nav.push(ElencoMessaggiPage);
                      break;
                }
              }
            }
          ]
        });
        confirm.present();
      }

      public presentServerInputAlert(header: string) {
        let alert = this.alertController.create({
          title: header,
          inputs: [
            {
              name: 'indirizzo',
              placeholder: 'http://servername'
            }
          ],
          buttons: [
            {
              text: 'Salva',
              handler: data => {
                var server = data.indirizzo;
                //controllo di validita'
                this.loginService.checkServerValidity(server)
                .subscribe(r => {
                  if(r.result == 'OK'){
                    console.log();

                    var esitoSalvataggio = this.storeService.setServer(server);
                    if(esitoSalvataggio == 1){
                      this.presentAlert("Salvataggio server avvenuto con successo");
                    } else {
                      this.presentAlert("Si è verificato un problema nel salvataggio del server");
                    }
                  } else {
                    this.presentErrorAlert(r.ErrorMessage.msg_testo);
                  }
                }, 
                error => {
                  this.presentServerInputAlert("Indirizzo Server Sbagliato");
                });
              }
            }
          ]
        });
        alert.present();
      }
}