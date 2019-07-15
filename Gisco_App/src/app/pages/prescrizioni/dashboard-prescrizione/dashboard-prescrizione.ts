import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Comunicazione } from '../../../models/comunicazione/comunicazione.namespace';
import { PrescrizioniService } from '../../../services/prescrizioni/prescrizioni.service';
/**
 * Generated class for the DashboardPrescrizionePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard-prescrizione',
  templateUrl: 'dashboard-prescrizione.html',
})

export class DashboardPrescrizionePage {
  selectedPrescrizione: Comunicazione.Prescrizione;
  comunicazioneTitolo: string;
  whichPage: string;

  public showMap: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public prescrizioniService: PrescrizioniService,
    private storeService: StoreService,
    public loadingCtrl: LoadingController) {
    this.selectedPrescrizione = navParams.get('prescrizione');
    this.comunicazioneTitolo = navParams.get('com');
  }

  ionViewDidLoad() {

    let loading = this.loadingCtrl.create({
      content: 'Caricamento...'
    });
    loading.present();
    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      console.log(tokenValue);
      this.whichPage = 'Prescrizione';
      this.prescrizioniService.getPrescrizione(this.selectedPrescrizione.prescrizione_key, tokenValue).subscribe(r => {
        console.log('ionViewDidLoad getPrescrizione');
        if (r.ErrorMessage.msg_code === 0) {
          this.selectedPrescrizione = r.prescrizione;
        }
        loading.dismiss();
      })
    });
  }

  segmentPrescrizioneClicked(event) {
    console.log('segmentPrescrizioneClicked');
  }

  segmentAttivitaClicked(event) {
    console.log('segmentAttivitaClicked ');
  }

  segmentAllegatiClicked(event) {
    console.log('segmentAllegatiClicked');
  }

  segmentProrogheClicked(event) {
    console.log('segmentProrogheClicked');
  }

  back() {
    this.navCtrl.pop();
  }

}
