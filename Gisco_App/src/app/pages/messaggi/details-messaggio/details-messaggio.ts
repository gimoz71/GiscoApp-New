import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Messaggio } from '../../../models/messaggio/messaggio.namespace';
import { StoreService } from '../../../services/store/store.service';
import { NuovoMessaggioPage } from '../nuovo-messaggio/nuovo-messaggio';
import { Login } from '../../../models/login/login.namespace';
import { MessaggiService } from '../../../services/messaggi/messaggi.service';
import { ElencoMessaggiPage } from '../elenco-messaggi/elenco-messaggi';
import { ImportantiMessaggiPage } from '../importanti-messaggi/importanti-messaggi';
import { UscitaMessaggiPage } from '../uscita-messaggi/uscita-messaggi';
import { CestinoMessaggiPage } from '../cestino-messaggi/cestino-messaggi';



@Component({
  selector: 'details-messaggio',
  templateUrl: 'details-messaggio.html'
})

export class DetailsMessaggioPage {

  public mess: Messaggio.Messaggio;
  public onlyNotImportant: boolean;
  public messagioCestino: boolean;
  color: string;
  icon: string;
  callback: any;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private storeService: StoreService,
    private messaggiService: MessaggiService,
    private alertCtrl: AlertController,
  ) {
    this.mess = this.navParams.get('mess');
    this.onlyNotImportant = this.navParams.get('onlyNotImportant');
    this.messagioCestino = this.navParams.get('messagioCestino');
    this.callback = this.navParams.get("callback");
    console.log(this.mess);
  }

  ionViewDidLoad() {
    console.log("this.onlyNotImportant " + this.onlyNotImportant);
    console.log("this.messagioCestino " + this.messagioCestino);
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.messaggiService.getMessaggio(this.storeService.getLocalServerUrl(), this.mess.messaggi_key, tokenValue).subscribe(r => {
        this.mess = r.messaggio;
        console.log(this.mess);
      },
        (error) => {
          console.log(error);
        }
      )
    });
  }

  public back() {
    if (this.callback) {
      this.callback(this.mess).then(() => {
        this.navCtrl.pop();
      });
    } else {
      this.navCtrl.pop();
    }
  }

  setDelete(mess: Messaggio.Messaggio) {
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.messaggiService.setDeleteMessage(this.storeService.getLocalServerUrl(), mess.messaggi_key, tokenValue).subscribe(r => {
        console.log(r);
        if (mess.preferito && mess.preferito === 'S') {
          this.navCtrl.push(ImportantiMessaggiPage);
        } else {
          if (mess.stato_messaggio === 'DEL') {
            this.navCtrl.push(CestinoMessaggiPage);
          } else if (mess.stato_messaggio === 'INV') {
            this.navCtrl.push(UscitaMessaggiPage);
          } else if (mess.stato_messaggio === 'RIC') {
            this.navCtrl.push(ElencoMessaggiPage);
          } else {
            this.navCtrl.push(ElencoMessaggiPage);
          }
        }
        //this.navCtrl.push(ElencoMessaggiPage);
      },
        (error) => {
          console.log(error);
        }
      )
    });
  }

  deleteConfirm(mess: Messaggio.Messaggio) {
    let alert = this.alertCtrl.create({
      title: 'Conferma',
      message: 'Spostare questo messaggio nel cestino?',
      buttons: [
        {
          text: 'indietro',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'ok',
          handler: () => {
            this.setDelete(mess);
          }
        }
      ]
    });
    alert.present();
  }

  setStar(mess: Messaggio.Messaggio, stato) {
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.messaggiService.setStarMessage(this.storeService.getLocalServerUrl(), mess.messaggi_key, stato, tokenValue).subscribe(r => {
        mess.preferito = stato;
      },
        (error) => {
          console.log(error);
        }
      )
    });

  }

  reply(mess: Messaggio.Messaggio) {
    this.navCtrl.push(NuovoMessaggioPage, { reply: mess })
  }

  inoltro(mess: Messaggio.Messaggio) {
    this.navCtrl.push(NuovoMessaggioPage, { inoltro: mess })
  }

}
