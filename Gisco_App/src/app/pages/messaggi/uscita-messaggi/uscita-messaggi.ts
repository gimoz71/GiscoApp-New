import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Messaggio } from '../../../models/messaggio/messaggio.namespace';
import { StoreService } from '../../../services/store/store.service';
import { MessaggiService } from '../../../services/messaggi/messaggi.service';
import { Login } from '../../../models/login/login.namespace';
import { DetailsMessaggioPage } from '../details-messaggio/details-messaggio';
import { NuovoMessaggioPage } from '../nuovo-messaggio/nuovo-messaggio';
import { ImportantiMessaggiPage } from '../importanti-messaggi/importanti-messaggi';
import { CestinoMessaggiPage } from '../cestino-messaggi/cestino-messaggi';


@Component({
  selector: 'uscita-messaggi',
  templateUrl: 'uscita-messaggi.html'
})

export class UscitaMessaggiPage {

  public listaMessaggi: Array<Messaggio.Messaggio>;
  public listaAllMessaggi: Array<Messaggio.Messaggio>;
  public color: string;
  public icon: string;
  public campoLibero: string;
  public numMess = 1;
  public numMessRicevuti: number;

  constructor(public navCtrl: NavController,
    private storeService: StoreService,
    public messaggiService: MessaggiService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    this.listaMessaggi = new Array<Messaggio.Messaggio>();
    this.campoLibero = "A";
    this.numMessRicevuti = 1;
  }

  ionViewDidLoad() {
    this.getMessaggi();
  }

  back() {
    this.navCtrl.pop();
  }

  getMessaggi(infiniteScroll?) {
    let loading = this.loadingCtrl.create({
      content: 'Caricamento...'
    });
    if (!infiniteScroll) {
      loading.present();
    }
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.messaggiService.getListaMessaggiUscita(this.storeService.getLocalServerUrl(), tokenValue, this.campoLibero,
        this.numMess, this.numMess + 19).subscribe(r => {
          console.log('getListaMessaggiUscita');
          if (r.ErrorMessage.msg_code === 0) {
            console.log(r.ErrorMessage.msg_code);
            this.numMessRicevuti = r.l_lista_messaggi.length;
            if (!infiniteScroll) {
              this.listaMessaggi.length = 0;
              this.listaMessaggi = r.l_lista_messaggi;
            } else {
              infiniteScroll.complete();
              this.listaMessaggi.push(...r.l_lista_messaggi);
            }
            console.log("getListaMessaggiUscita num ricevuti", r.l_lista_messaggi.length);
            console.log("getListaMessaggiUscita totali", this.listaMessaggi.length);
          }
          loading.dismiss();
        });
    });
  }

  public setMessaggiFiltro(event) {
    if (event != undefined) {
      this.campoLibero = event.value;
    }
    if (this.campoLibero === "") {
      this.campoLibero = "A";
    }
    this.numMess = 1;
    this.getMessaggi();
  }

  public loadMore(infiniteScroll) {
    this.numMess = this.numMess + 20;
    if (this.numMessRicevuti >= 20) {
      this.getMessaggi(infiniteScroll);
    } else {
      infiniteScroll.complete();
    }
  }


  public goToDetails(mess) {
    this.navCtrl.push(DetailsMessaggioPage, { mess: mess, callback: undefined, onlyNotImportant: true })
  }


  public setDelete(mess: Messaggio.Messaggio) {
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.messaggiService.setDeleteMessage(this.storeService.getLocalServerUrl(), mess.messaggi_key, tokenValue).subscribe(r => {
        if (r.ErrorMessage.msg_code === 0) {
          console.log("Deleted ", r);
          /*   this.numMess = 1;
             this.getMessaggi();*/
          this.listaMessaggi.splice(this.listaMessaggi.indexOf(mess), 1);
          this.numMess = this.numMess - 1;
        }
      },
        (error) => {
          console.log(error);
        }
      )
    });
  }

  setStar(mess: Messaggio.Messaggio) {

    var stato = ((mess.preferito === '' || mess.preferito === 'N') ? 'S' : 'N');
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

  public deleteConfirm(mess: Messaggio.Messaggio) {
    let alert = this.alertCtrl.create({
      title: 'Conferma',
      message: 'Spostare questo messaggio nel cestino?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.setDelete(mess);
          }
        }
      ]
    });
    alert.present();
  }

  goToNuovoMessaggio() {
    this.navCtrl.push(NuovoMessaggioPage);
  }

  goToUscitaMessaggi() {
    this.navCtrl.push(UscitaMessaggiPage)
  }

  goToImportantiMessaggi() {
    this.navCtrl.push(ImportantiMessaggiPage)
  }
  goToCestinoMessaggio() {
    this.navCtrl.push(CestinoMessaggiPage)
  }
}
