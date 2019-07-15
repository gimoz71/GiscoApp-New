import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Documento } from '../../../models/documento/documento.namespace';
import { DocumentiService } from '../../../services/documenti/documenti.service';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { ElencoDocumentiPage } from '../elenco-documenti/elenco-documenti';

/**
 * Generated class for the CartellePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tipologie',
  templateUrl: 'elenco-tipologie.html',
})

export class TipologiePage {
  public listaCartelle: Array<Documento.Cartella>;
  public selectedCartella: Documento.Cartella;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public documentiService: DocumentiService,
    private storeService: StoreService,
    public loadingCtrl: LoadingController) {

    this.selectedCartella = navParams.get('cartella');
    this.listaCartelle = new Array<Documento.Cartella>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartellePage');
    let loading = this.loadingCtrl.create({
      content: 'Caricamento...'
    });
    loading.present();
    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      console.log(tokenValue);
      this.documentiService.getTipologiaDocumenti(tokenValue, this.selectedCartella.doc_foreign_type).subscribe(r => {
        console.log('ionViewDidLoad getCartelle');
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.listaCartelle = r.l_lista_cartelle;
        }
        loading.dismiss();
      });
    });
  }

  //navigazione verso la dashboard dello specifico sito selezionato
  public goToElencoDocumenti(event, cartella) {
    this.navCtrl.push(ElencoDocumentiPage, { cartella: cartella })
  }
  back() {
    this.navCtrl.pop();
  }
}
