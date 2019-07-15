import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Documento } from '../../../models/documento/documento.namespace';
import { DocumentiService } from '../../../services/documenti/documenti.service';
/**
 * Generated class for the DashboardSitoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard-documento',
  templateUrl: 'dashboard-documento.html',
})

export class DashboardDocumentoPage {
  selectedDocumento: Documento.Documento;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public documentiService: DocumentiService,
    private storeService: StoreService,
    public loadingCtrl: LoadingController) {
    this.selectedDocumento = navParams.get('documento');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardSitoPage');
    let loading = this.loadingCtrl.create({
      content: 'Caricamento...'
    });
    loading.present();
    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      console.log(tokenValue);
      this.documentiService.getDocumento(this.selectedDocumento.documenti_key, tokenValue).subscribe(r => {
        console.log('ionViewDidLoad DashboardSitoPage getDocumento');
        if (r.ErrorMessage.msg_code === 0) {
          this.selectedDocumento = r.documento;
          console.log(this.selectedDocumento.doc_titolo);
        }
        loading.dismiss();
      });
    });
  }
  back() {
    this.navCtrl.pop();
  }

  openUrl(){
     window.open(this.selectedDocumento.doc_url, '_system'); 
    }
}
