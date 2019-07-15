import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Procedimento } from '../../../models/procedimento/procedimento.namespace';
import { ProcedimentiService } from '../../../services/procedimenti/procedimenti.service';
import { DashboardProcedimentoPage } from '../dashboard-procedimento/dashboard-procedimento';
import { Filtro } from '../../../models/filtro/filtro.namespace';

/**
 * Generated class for the CartellePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-procedimenti',
  templateUrl: 'elenco-procedimenti.html',
})

export class ElencoProcedimentiPage {
  public listaProcedimenti: Array<Procedimento.Procedimento>;
  public campoLiberoSito: string;
  public campoLiberoTitolo: string;
  public numProcedimenti = 1;
  public numProcedimentiRicevuti: number;
  public tipologiaSelezionata: Filtro.TipologiaProcedimento;
  public listaTipologie: Array<Filtro.TipologiaProcedimento>;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public procedimentiService: ProcedimentiService,
    private storeService: StoreService,
    public loadingCtrl: LoadingController) {
    this.numProcedimentiRicevuti = 1;
    this.listaProcedimenti = new Array<Procedimento.Procedimento>();
    this.campoLiberoTitolo = "A";
    this.campoLiberoSito = "A";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElencoDocumentiPage');
    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.procedimentiService.getListaTipologieProcedimento(tokenValue).subscribe(r => {
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.listaTipologie = r.l_lista_tipologie;
          this.tipologiaSelezionata = this.listaTipologie[0];
          this.setTipologiaFiltro();
        }
      })
    });
  }

  public getProcedimenti(infiniteScroll?) {
    let loading = this.loadingCtrl.create({
      content: 'Caricamento...'
    });
    if (!infiniteScroll) {
      loading.present();
    }
    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.procedimentiService.getListaProcedimenti(tokenValue, this.tipologiaSelezionata.tab_tipo_procedimento_cod, this.campoLiberoSito, this.campoLiberoTitolo,
        this.numProcedimenti, this.numProcedimenti + 19).subscribe(r => {
          console.log('getDocumenti');
          if (r.ErrorMessage.msg_code === 0) {
            console.log(r.ErrorMessage.msg_code);
            this.numProcedimentiRicevuti = r.l_lista_procedimenti.length;
            if (!infiniteScroll) {
              this.listaProcedimenti.length = 0;
              this.listaProcedimenti = r.l_lista_procedimenti;
            } else {
              infiniteScroll.complete();
              this.listaProcedimenti.push(...r.l_lista_procedimenti);
            }
            console.log("getProcedimenti num ricevuti", r.l_lista_procedimenti.length);
            console.log("getProcedimenti totali", this.listaProcedimenti.length);
          }
          loading.dismiss();
        });
    });
  }

  public setTitoloFiltro(event) {
    if (event != undefined) {
      this.campoLiberoTitolo = event.srcElement.value;
    }
    if (this.campoLiberoTitolo === "") {
      this.campoLiberoTitolo = "A";
    }
    this.numProcedimenti = 1;
    this.getProcedimenti();
  }

  public setSitoFiltro(event) {
    if (event != undefined) {
      this.campoLiberoSito = event.srcElement.value;
    }
    if (this.campoLiberoSito === "") {
      this.campoLiberoSito = "A";
    }
    this.numProcedimenti = 1;
    this.getProcedimenti();
  }


  public setTipologiaFiltro() {
    if (this.tipologiaSelezionata.tab_tipo_procedimento_cod == 0) {
      this.tipologiaSelezionata.tab_tipo_procedimento_cod = "A";
    }
    this.numProcedimenti = 1;
    this.getProcedimenti();
  }

  loadMore(infiniteScroll) {
    this.numProcedimenti = this.numProcedimenti + 20;
    if (this.numProcedimentiRicevuti >= 20) {
      this.getProcedimenti(infiniteScroll);
    } else {
      infiniteScroll.complete();
    }
  }

  //navigazione verso la dashboard dello specifico sito selezionato
  public goToDetails(event, procedimento) {
    console.log("goToDetails click" + procedimento);
    this.navCtrl.push(DashboardProcedimentoPage, { procedimento: procedimento })
  }

  back() {
    this.navCtrl.pop();
  }
}
