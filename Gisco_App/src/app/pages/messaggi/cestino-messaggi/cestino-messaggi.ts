import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Messaggio } from '../../../models/messaggio/messaggio.namespace';
import { StoreService } from '../../../services/store/store.service';
import { DetailsMessaggioPage } from '../details-messaggio/details-messaggio';
import { MessaggiService } from '../../../services/messaggi/messaggi.service';
import { Login } from '../../../models/login/login.namespace';



@Component({
  selector: 'cestino-messaggi',
  templateUrl: 'cestino-messaggi.html'
})

export class CestinoMessaggiPage {

  public listaMessaggi: Array<Messaggio.Messaggio>;
  public listaAllMessaggi: Array<Messaggio.Messaggio>;
  color: string;
  icon: string;
  public campoLibero: string;
  public numMess = 1;
  public numMessRicevuti: number;


  constructor(public navCtrl: NavController,
    private storeService: StoreService,
    private messaggiService: MessaggiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
    this.listaMessaggi = new Array<Messaggio.Messaggio>();
    this.campoLibero = "A";
    this.numMessRicevuti = 1;
  }

  ionViewDidLoad() {
    this.getMessaggi();
  }

  getMessaggi(infiniteScroll?) {
    let loading = this.loadingCtrl.create({
      content: 'Caricamento...'
    });
    if (!infiniteScroll) {
      loading.present();
    }
    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.messaggiService.getListaMessaggiCestino(tokenValue, this.campoLibero,
        this.numMess, this.numMess + 19).subscribe(r => {
          console.log('getListaMessaggiCestino');
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
            console.log("getListaMessaggiCestino num ricevuti", r.l_lista_messaggi.length);
            console.log("getListaMessaggiCestino totali", this.listaMessaggi.length);
          }
          loading.dismiss();
        });
    });
  }

  public setMessaggiFiltro(event) {
    if (event != undefined) {
      this.campoLibero = event.srcElement.value;
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
    this.navCtrl.push(DetailsMessaggioPage, { mess: mess, callback:undefined, messagioCestino: true })
  }

  back() {
    this.navCtrl.pop();
  }

  deleteConfirm(mess: Messaggio.Messaggio) {
    let alert = this.alertCtrl.create({
      title: 'Conferma',
      message: 'Eliminare definitivamente il messaggio?',
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
            this.delete(mess);
          }
        }
      ]
    });
    alert.present();
  }


  delete(mess) {
    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      let busta = new Messaggio.BustaMessaggio();
      busta.messaggio = mess;
      busta.token = tokenValue;
      this.messaggiService.deleteMessage(busta).subscribe(r => {
        if (r.ErrorMessage.msg_code === 0) {
          console.log(busta);
          console.log(r);
          this.listaMessaggi.splice(this.listaMessaggi.indexOf(mess), 1);
          this.numMess = this.numMess - 1;
          this.presentAlert("","messaggio eliminato");
        }
      },
        (error) => {
          console.log(error);
        })
    })
  }

  ripristina(mess) {
  }

  presentAlert(title:string, mess:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: mess,
      buttons: ['Ok']
    });
    alert.present();
  }

}
