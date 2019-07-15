import { Component } from '@angular/core';
import { Messaggio } from '../../../models/messaggio/messaggio.namespace';
import { NavController, NavParams, AlertController, MenuController, LoadingController } from 'ionic-angular';
import { StoreService } from '../../../services/store/store.service';
import { MessaggiService } from '../../../services/messaggi/messaggi.service';
import { Login } from '../../../models/login/login.namespace';
import { NuovoMessaggioPage } from '../nuovo-messaggio/nuovo-messaggio';
import { UscitaMessaggiPage } from '../uscita-messaggi/uscita-messaggi';
import { DetailsMessaggioPage } from '../details-messaggio/details-messaggio';
import { CestinoMessaggiPage } from '../cestino-messaggi/cestino-messaggi';
import { ImportantiMessaggiPage } from '../importanti-messaggi/importanti-messaggi';


@Component({
    selector: 'page-elenco-messaggi',
    templateUrl: 'elenco-messaggi.html'
})

export class ElencoMessaggiPage {

    public listaMessaggi: Array<Messaggio.Messaggio>;
    public clonedMess: Array<Messaggio.Messaggio>;
    public color: string;
    public icon: string;
    public campoLibero: string;
    public numMess = 1;
    public numMessRicevuti: number;

    constructor(private navCtrl: NavController,
        private navParams: NavParams,
        public menuCtrl: MenuController,
        private storeService: StoreService,
        private alertCtrl: AlertController,
        public messaggiService: MessaggiService,
        public loadingCtrl: LoadingController) {
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
            this.messaggiService.getListaMessaggiRicevuti(tokenValue, this.campoLibero,
                this.numMess, this.numMess + 19).subscribe(r => {
                    console.log('getListaMessaggiRicevuti');
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
                        console.log("getListaMessaggi num ricevuti", r.l_lista_messaggi.length);
                        console.log("getListaMessaggi totali", this.listaMessaggi.length);
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

    goToNuovoMessaggio() {
        this.navCtrl.push(NuovoMessaggioPage);
    }

    goToUscitaMessaggi() {
        this.navCtrl.push(UscitaMessaggiPage)
    }


    public goToDetails(mess) {
        this.navCtrl.push(DetailsMessaggioPage, { mess: mess });
    }


    goToImportantiMessaggi() {
        this.navCtrl.push(ImportantiMessaggiPage)
    }
    goToCestinoMessaggio() {
        this.navCtrl.push(CestinoMessaggiPage)
    }

    setStar(mess: Messaggio.Messaggio, stato) {
        this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            this.messaggiService.setStarMessage(mess.messaggi_key, stato, tokenValue).subscribe(r => {
                mess.preferito = stato;
            },
                (error) => {
                    console.log(error);
                }
            )
        });
    }

    setDelete(mess: Messaggio.Messaggio) {
        this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            this.messaggiService.setDeleteMessage(mess.messaggi_key, tokenValue).subscribe(r => {
                if (r.ErrorMessage.msg_code === 0) {
                    console.log("Deleted ", r);
                    this.listaMessaggi.splice(this.listaMessaggi.indexOf(mess), 1);
                    this.numMess = this.numMess - 1;
                    /*    console.log("Deleted ", r);
                    this.numMess = 1;
                    this.getMessaggi();*/
                }
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
            message: 'spostare questo messaggio nel cestino?',
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


    /*
      back() {
        this.menuCtrl.enable(false, 'messaggi');
        this.menuCtrl.enable(true, 'home');
        this.navCtrl.pop();
      }
    */
}
