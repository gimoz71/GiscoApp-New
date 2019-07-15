import { Component } from '@angular/core';
import { NavParams, LoadingController, NavController } from 'ionic-angular';

import { DashboardDispositivoPage } from '../dashboard-dispositivo/dashboard-dispositivo';

import { Dispositivo } from '../../../models/dispositivo/dispositivo.namespace';
import { DispositiviService } from '../../../services/dispositivi/dispositivi.service';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Filtro } from '../../../models/filtro/filtro.namespace';


/**
 * Generated class for the ElencoDispositiviPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-elenco-dispositivi',
    templateUrl: 'elenco-dispositivi.html',
})

export class ElencoDispositiviPage {

    public listaDispositivi: Array<Dispositivo.Dispositivo>;
    public listaProvince: Array<Filtro.Provincia>;
    public listaTipologie: Array<Filtro.TipologiaDispositivo>;
    public tipologiaSelezionata: Filtro.TipologiaDispositivo;
    public provinciaSelezionata: Filtro.Provincia;
    public campoLibero: string;

    constructor(public navParams: NavParams,
        public dispositiviService: DispositiviService,
        private storeService: StoreService,
        public navCtrl: NavController,
        public loadingCtrl: LoadingController) {
        this.listaDispositivi = new Array<Dispositivo.Dispositivo>();
        this.campoLibero = "A";
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ElencoDispositiviPage');
        let loading = this.loadingCtrl.create({
            content: 'Caricamento...'
        });
        loading.present();
        this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            console.log(tokenValue);
            this.dispositiviService.getListaDispositiviAll(tokenValue).subscribe(r => {
                console.log('ionViewDidLoad getListaDispositivi');
                if (r.ErrorMessage.msg_code === 0) {
                    console.log(r.ErrorMessage.msg_code);
                    this.listaDispositivi = r.l_lista_dispositivi;
                }
                loading.dismiss();
            })

            this.dispositiviService.getListaTipologieDispositivo(tokenValue).subscribe(r => {
                if (r.ErrorMessage.msg_code === 0) {
                    console.log(r.ErrorMessage.msg_code);
                    this.listaTipologie = r.l_lista_tipologie;
                    this.tipologiaSelezionata = this.listaTipologie[0];
                }
            })

            this.dispositiviService.getListaProvinceDispositivo(tokenValue).subscribe(r => {
                if (r.ErrorMessage.msg_code === 0) {
                    console.log(r.ErrorMessage.msg_code);
                    this.listaProvince = r.l_dropdown;
                    this.provinciaSelezionata = this.listaProvince[0];
                }
            })

        });
    }

    goToDetails(event, dispositivo) {
        this.navCtrl.push(DashboardDispositivoPage, {
            dispositivo: dispositivo
        });
    }

    public getDispositivi(event) {
        let loading = this.loadingCtrl.create({
            content: 'Caricamento...'
        });
        loading.present();
        if (event != undefined) {
            this.campoLibero = event.srcElement.value;
        }
        if (this.campoLibero === "") {
            this.campoLibero = "A";
        }
        if (this.tipologiaSelezionata.tab_tipo_dispositivo_cod === 0) {
            this.tipologiaSelezionata.tab_tipo_dispositivo_cod = "A"
        }
        if (this.provinciaSelezionata.Codice === "") {
            this.provinciaSelezionata.Codice = "A"
        }

        this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;

            this.dispositiviService.getListaDispositivi(tokenValue, this.tipologiaSelezionata.tab_tipo_dispositivo_cod, this.provinciaSelezionata.Codice, this.campoLibero).subscribe(r => {
                console.log('ionViewDidLoad getListaDispositivi');
                if (r.ErrorMessage.msg_code === 0) {
                    console.log(r.ErrorMessage.msg_code);
                    this.listaDispositivi = r.l_lista_dispositivi;
                    console.log("getListaDispositivi listaDispositivi", this.listaDispositivi.length);
                }
                loading.dismiss();
            })
        });
        console.log("tipologia", this.tipologiaSelezionata);
        console.log("provincia", this.provinciaSelezionata);
        console.log("campo", this.campoLibero);
    }
}