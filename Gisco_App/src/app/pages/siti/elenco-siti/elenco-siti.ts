import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { DashboardSitoPage } from '../dashboard-sito/dashboard-sito';

import { Sito } from '../../../models/sito/sito.namespace';
import { SitiService } from '../../../services/siti/siti.service';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Filtro } from '../../../models/filtro/filtro.namespace';


/**
 * Generated class for the ElencoSitiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-elenco-siti',
  templateUrl: 'elenco-siti.html',
})

export class ElencoSitiPage {
  public listaSiti: Array<Sito.Sito>;
  public listaProvince: Array<Filtro.Provincia>;
  public listaTipologie: Array<Filtro.TipologiaSito>;
  public tipologiaSelezionata: Filtro.TipologiaSito;
  public provinciaSelezionata: Filtro.Provincia;
  public campoLibero: string;

  constructor(public navParams: NavParams,
    public sitiService: SitiService,
    private storeService: StoreService,
    private navCtr: NavController,
    public loadingCtrl: LoadingController) {
    this.listaSiti = new Array<Sito.Sito>();
    this.campoLibero = "A";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElencoSitiPage');
    let loading = this.loadingCtrl.create({
      content: 'Caricamento...'
    });
    loading.present();
    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      console.log(tokenValue);
      this.sitiService.getListaSitiAll(tokenValue).subscribe(r => {
        console.log('ionViewDidLoad getListaSiti');
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.listaSiti = r.l_lista_siti;
        }
        loading.dismiss();
      })

      this.sitiService.getListaTipologieSito(tokenValue).subscribe(r => {
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.listaTipologie = r.l_lista_tipologie;
          this.tipologiaSelezionata = this.listaTipologie[0];
        }
      })

      this.sitiService.getListaProvinceSito(tokenValue).subscribe(r => {
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.listaProvince = r.l_dropdown;
          this.provinciaSelezionata = this.listaProvince[0];
        }
      })
    });
  }

  //navigazione verso la dashboard dello specifico sito selezionato
  public goToDetails(event, sito) {
    this.navCtr.push(DashboardSitoPage, { sito: sito })
  }

  public getSiti(event) {
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
    if (this.tipologiaSelezionata.tab_tipologia_sito_key === 0) {
      this.tipologiaSelezionata.tab_tipologia_sito_key = "A"
    }
    if (this.provinciaSelezionata.Codice === "") {
      this.provinciaSelezionata.Codice = "A"
    }

    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;

      this.sitiService.getListaSiti(tokenValue, this.tipologiaSelezionata.tab_tipologia_sito_key, this.provinciaSelezionata.Codice, this.campoLibero).subscribe(r => {
        console.log('ionViewDidLoad getListaSiti');
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.listaSiti = r.l_lista_siti;
          console.log("getSiti listaSiti", this.listaSiti.length);
        }
        loading.dismiss();
      })
    });
    console.log("tipologia", this.tipologiaSelezionata);
    console.log("provincia", this.provinciaSelezionata);
    console.log("campo", this.campoLibero);

  }
}
