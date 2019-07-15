import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Dispositivo } from '../../../models/dispositivo/dispositivo.namespace';

import { DispositiviService } from '../../../services/dispositivi/dispositivi.service';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Common } from '../../../models/common/common.namespace';
import { Comunicazione } from '../../../models/comunicazione/comunicazione.namespace';
import { ComunicazioniService } from '../../../services/comunicazioni/comunicazioni.service';
import { DashboardPrescrizionePage } from '../../prescrizioni/dashboard-prescrizione/dashboard-prescrizione';
import { Procedimento } from '../../../models/procedimento/procedimento.namespace';
/**
 * Generated class for the DashboardDispositivoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard-comunicazione',
  templateUrl: 'dashboard-comunicazione.html',
})

export class DashboardComunicazionePage {

  public selectedComunicazione: Comunicazione.Comunicazione;
  public procedimento: Procedimento.Procedimento;
  public whichPage: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public comunicazioniService: ComunicazioniService,
    private storeService: StoreService) {
    this.selectedComunicazione = navParams.get('comunicazione');
    this.procedimento= new Procedimento.Procedimento();
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad DashboardComunicazionePage');
    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      console.log(tokenValue);
      this.whichPage = 'Comunicazione';
      this.comunicazioniService.getComunicazione(this.selectedComunicazione.comunicazioni_key, tokenValue).subscribe(r => {
        console.log('ionViewDidLoad DashboardComunicazionePage getComunicazione');
        if (r.ErrorMessage.msg_code === 0) {
          this.selectedComunicazione = r.comunicazione;
          this.procedimento = r.procedimento;
        }
      })
    });
  }

  segmentComunicazioneClicked(event) {
  }

  segmentFilesClicked(event) {
    console.log('segmentFilesClicked');
  }

  segmentPrescrizioniClicked(event) {
    console.log('segmentPrescrizioniClicked');
  }

  public goToDetails(event, prescrizione) {
    console.log("goToDetailsPrescrizione click" + prescrizione);
   
      this.navCtrl.push(DashboardPrescrizionePage, { prescrizione: prescrizione, com: this.selectedComunicazione.com_titolo})
    
  }

  back() {
    this.navCtrl.pop();
  }
}
