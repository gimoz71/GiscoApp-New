import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Filtro } from '../../../models/filtro/filtro.namespace';
import { Osservazione } from '../../../models/osservazione/osservazione.namespace';
import { OsservazioniService } from '../../../services/osservazioni/osservazioni.service';
import { DashboardOsservazionePage } from '../dashboard-osservazione/dashboard-osservazione';
import { MyApp } from '../../../app.component';
import { LoginPage } from '../../login/login';

/**
 * Generated class for the CartellePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-osservazioni',
  templateUrl: 'elenco-osservazioni.html',
})

export class ElencoOsservazioniPage {
  public listaOsservazioni: Array<Osservazione.Osservazione>;
  public campoLiberoSito: string;
  public campoLiberoProtocollo: string;
  public numOsservazioni = 1;
  public numOsservazioniRicevuti: number;
  public tipologiaSelezionata: Filtro.TipologiaOsservazione;
  public listaTipologie: Array<Filtro.TipologiaOsservazione>;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public osservazioniService: OsservazioniService,
    private storeService: StoreService,
    public loadingCtrl: LoadingController) {
    this.numOsservazioniRicevuti = 1;
    this.listaOsservazioni = new Array<Osservazione.Osservazione>();
    this.campoLiberoSito = "A";
    this.campoLiberoProtocollo="A";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElencoOsservazioniPage');
    let loading = this.loadingCtrl.create({
      content: 'Caricamento...'
    });
    loading.present();
    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
      if (val!==null){
      var tokenValue = val.token_value;
      this.osservazioniService.getListaTipologieOsservazione(tokenValue).subscribe(r => {
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.listaTipologie = r.l_lista_tipologie;
          this.tipologiaSelezionata = this.listaTipologie[0];
          this.setTipologiaFiltro();
        }
        loading.dismiss();
      })
    }else{
      this.navCtrl.setRoot(LoginPage);
      loading.dismiss();
    }
  });
  }

  public getOsservazioni(infiniteScroll?) {
    let loading = this.loadingCtrl.create({
      content: 'Caricamento...'
    });
    if (!infiniteScroll) {
      loading.present();
    }
    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.osservazioniService.getListaOsservazioni(tokenValue, this.tipologiaSelezionata.tab_tipo_scadenza_cod, this.campoLiberoSito, this.campoLiberoProtocollo,
        this.numOsservazioni, this.numOsservazioni + 19).subscribe(r => {
          console.log('getOsservazioni');
          if (r.ErrorMessage.msg_code === 0) {
            console.log(r.ErrorMessage.msg_code);
            this.numOsservazioniRicevuti = r.l_lista_osservazioni.length;
            if (!infiniteScroll) {
              this.listaOsservazioni.length = 0;
              this.listaOsservazioni = r.l_lista_osservazioni;
            } else {
              infiniteScroll.complete();
              this.listaOsservazioni.push(...r.l_lista_osservazioni);
            }
            console.log("getOsservazioni num ricevuti", r.l_lista_osservazioni.length);
            console.log("getOsservazioni totali", this.listaOsservazioni.length);
          }
          loading.dismiss();
        });
    });
  }

  public setSitoFiltro(event) {
    if (event != undefined) {
      this.campoLiberoSito = event.srcElement.value;
    }
    if (this.campoLiberoSito === "") {
      this.campoLiberoSito = "A";
    }
    this.numOsservazioni = 1;
    this.getOsservazioni();
  }

  public setProtocolloFiltro(event) {
    if (event != undefined) {
      this.campoLiberoProtocollo = event.srcElement.value;
    }
    if (this.campoLiberoProtocollo === "") {
      this.campoLiberoProtocollo = "A";
    }
    this.numOsservazioni = 1;
    this.getOsservazioni();
  }


  public setTipologiaFiltro() {
    if (this.tipologiaSelezionata.tab_tipo_scadenza_cod == 0) {
      this.tipologiaSelezionata.tab_tipo_scadenza_cod = "A";
    }
    this.numOsservazioni = 1;
    this.getOsservazioni();
  }

  loadMore(infiniteScroll) {
    this.numOsservazioni = this.numOsservazioni + 20;
    if (this.numOsservazioniRicevuti >= 20) {
      this.getOsservazioni(infiniteScroll);
    } else {
      infiniteScroll.complete();
    }
  }

  public goToDetails(osservazione: Osservazione.Osservazione) {
    console.log("goToDetails click " + osservazione.attivita_key);
    this.navCtrl.push(DashboardOsservazionePage, { selectedOsservazione: osservazione, callbackReload: this.reloadListaCallbackFunction});
  }

  public goToNuovaOsservazione() {
    console.log("goToNuovaOsservazione click");
    this.navCtrl.push(DashboardOsservazionePage, { selectedOsservazione: undefined, callbackReload: this.reloadListaCallbackFunction});
  }

  reloadListaCallbackFunction = (reload, oss: Osservazione.Osservazione) => {
    return new Promise((resolve, reject) => {
      //  this.test = _params;
      if (reload) {
        this.numOsservazioni = 1;
        this.getOsservazioni();
      }
      console.log("nuovaOssCallbackFunction " + reload);
      resolve();
    });
  }

  back() {
    this.navCtrl.pop();
  }
}
