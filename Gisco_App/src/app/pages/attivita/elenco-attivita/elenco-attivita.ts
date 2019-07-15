import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Filtro } from '../../../models/filtro/filtro.namespace';
import { MyApp } from '../../../app.component';
import { LoginPage } from '../../login/login';
import { AttivitaService } from '../../../services/attivita/attivita.service';
import { Attivita } from '../../../models/attivita/attivita.namespace';
import { DashboardAttivitaPage } from '../dashboard-attivita/dashboard-attivita';

/**
 * Generated class for the CartellePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-attivita',
  templateUrl: 'elenco-attivita.html',
})

export class ElencoAttivitaPage {
  public listaAttivita: Array<Attivita.Attivita>;
  public campoLiberoSito: string;
  public campoLiberoProtocollo: string;
  public numAttivita = 1;
  public numAttivitaRicevuti: number;
  public tipologiaSelezionata: Filtro.TipologiaAttivita;
  public listaTipologie: Array<Filtro.TipologiaAttivita>;
  public categoriaSelezionata: Filtro.CategoriaAttivita;
  public listaCategorie: Array<Filtro.CategoriaAttivita>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public attivitaService: AttivitaService,
    private storeService: StoreService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    this.numAttivitaRicevuti = 1;
    this.listaAttivita = new Array<Attivita.Attivita>();
    this.campoLiberoSito = "A";
    this.campoLiberoProtocollo = "A";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElencoAttivitaPage');
    let loading = this.loadingCtrl.create({
      content: 'Caricamento...'
    });
    loading.present();
    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
      if (val !== null) {
        var tokenValue = val.token_value;
        this.attivitaService.getListaCategorieAttivita(tokenValue).subscribe(r => {
          if (r.ErrorMessage.msg_code === 0) {
            console.log(r.ErrorMessage.msg_code);
            this.listaCategorie = r.l_lista_tipologie;
            this.categoriaSelezionata = this.listaCategorie[0];
            this.setCategoriaFiltro();
          } else {
            this.presentAlert("", "Errore caricamento categorie");
          }
          loading.dismiss();
        })
      } else {
        this.navCtrl.setRoot(LoginPage);
        loading.dismiss();
      }
    });
  }

  public getAttivita(infiniteScroll?) {
    let loading = this.loadingCtrl.create({
      content: 'Caricamento...'
    });
    if (!infiniteScroll) {
      loading.present();
    }
    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      //(token: string, categoria: any, tipo_cod: any, sito_cod: string, from: number, to: number)
      this.attivitaService.getListaAttivita(tokenValue, this.categoriaSelezionata.tab_tipo_attivita_cod, this.tipologiaSelezionata.tab_tipo_scadenza_cod, this.campoLiberoSito, this.campoLiberoProtocollo, this.numAttivita, this.numAttivita + 19).subscribe(r => {
        console.log('getAttivita');
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.numAttivitaRicevuti = r.l_lista_attivita.length;
          if (!infiniteScroll) {
            this.listaAttivita.length = 0;
            this.listaAttivita = r.l_lista_attivita;
          } else {
            infiniteScroll.complete();
            this.listaAttivita.push(...r.l_lista_attivita);
          }
          console.log("getAttivita num ricevuti", r.l_lista_attivita.length);
          console.log("getAttivita totali", this.listaAttivita.length);
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
    this.numAttivita = 1;
    this.getAttivita();
  }

  public setProtocolloFiltro(event) {
    if (event != undefined) {
      this.campoLiberoProtocollo = event.srcElement.value;
    }
    if (this.campoLiberoProtocollo === "") {
      this.campoLiberoProtocollo = "A";
    }
    this.numAttivita = 1;
    this.getAttivita();
  }


  public setTipologiaFiltro() {
    if (this.tipologiaSelezionata.tab_tipo_scadenza_cod == 0) {
      this.tipologiaSelezionata.tab_tipo_scadenza_cod = "A";
    }
    this.numAttivita = 1;
    this.getAttivita();
  }

  public setCategoriaFiltro() {
    if (this.categoriaSelezionata.tab_tipo_attivita_cod == 0) {
      this.categoriaSelezionata.tab_tipo_attivita_cod = "A";
    }
    this.numAttivita = 1;
    let loading = this.loadingCtrl.create({
      content: 'Caricamento...'
    });
    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.attivitaService.getListaTipologieAttivita(this.categoriaSelezionata.tab_tipo_attivita_cod, tokenValue).subscribe(r => {
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.listaTipologie = r.l_lista_tipologie;
          this.tipologiaSelezionata = this.listaTipologie[0];
          this.setTipologiaFiltro();
        } else {
          this.presentAlert("", "Errore caricamento tipologie");
        }
        loading.dismiss();
      });
    });
  }

  loadMore(infiniteScroll) {
    this.numAttivita = this.numAttivita + 20;
    if (this.numAttivitaRicevuti >= 20) {
      this.getAttivita(infiniteScroll);
    } else {
      infiniteScroll.complete();
    }
  }

  public goToDetails(attivita: Attivita.Attivita) {
    console.log("goToDetails click " + attivita);
    this.navCtrl.push(DashboardAttivitaPage, { selectedAttivita: attivita, callbackChiusa: this.chiusaCallbackFunction });
  }

  chiusaCallbackFunction = (attivita_key: number) => {
    return new Promise((resolve, reject) => {
      console.log("goToDetails click " + attivita_key);
      if (attivita_key != undefined) {
        var p: Attivita.Attivita = this.listaAttivita.find(item => item.attivita_key == attivita_key)
        console.log("goToDetails click " + JSON.stringify(p));
        p.att_conclusa = "S"
        resolve();
      }
    });
  }

  /*   return new Promise((resolve, reject) => {
      
       console.log("Attivita conclusa callback " + reload);
       resolve();
     });*/


  back() {
    this.navCtrl.pop();
  }


  presentAlert(title: string, mess: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: mess,
      buttons: ['Ok']
    });
    alert.present();
  }



}
