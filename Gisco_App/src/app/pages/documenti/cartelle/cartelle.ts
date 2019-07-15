import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Documento } from '../../../models/documento/documento.namespace';
import { DocumentiService } from '../../../services/documenti/documenti.service';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { ElencoDocumentiPage } from '../elenco-documenti/elenco-documenti';
import { TipologiePage } from '../elenco-tipologie/elenco-tipologie';

/**
 * Generated class for the CartellePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cartelle',
  templateUrl: 'cartelle.html',
})
export class CartellePage {
  public listaCartelle: Array<Documento.Cartella>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public documentiService: DocumentiService,
    private storeService: StoreService,
    public loadingCtrl: LoadingController) {
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
      this.documentiService.getCartelle(tokenValue).subscribe(r => {
        console.log('ionViewDidLoad getCartelle');
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.listaCartelle = r.l_lista_cartelle;
        }
        loading.dismiss();
      })
    });
  }

  //navigazione verso la dashboard dello specifico sito selezionato
  public goToTipologieDocumenti(event, cartella) {
    console.log("goToTipologieDocumenti click" + cartella);
    this.navCtrl.push(TipologiePage, { cartella: cartella })
  }

}
