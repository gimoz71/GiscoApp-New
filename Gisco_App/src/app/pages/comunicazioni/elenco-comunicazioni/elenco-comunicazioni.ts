import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Procedimento } from '../../../models/procedimento/procedimento.namespace';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
//import { DashboardProcedimentoPage } from '../../procedimenti/dashboard-procedimento/dashboard-procedimento';
import { Comunicazione } from '../../../models/comunicazione/comunicazione.namespace';
import { ComunicazioniService } from '../../../services/comunicazioni/comunicazioni.service';
import { DashboardComunicazionePage } from '../dashboard-comunicazione/dashboard-comunicazione';

/**
 * Generated class for the ComunicazioniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-comunicazioni',
  templateUrl: 'elenco-comunicazioni.html',
})
export class ElencoComunicazioniPage {
  public selectedProcedimento: Procedimento.Procedimento;
  public listaComunicazioni: Array<Array<Comunicazione.Comunicazione>>;
  public procedimentiTot: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public comunicazioniService: ComunicazioniService,
    private storeService: StoreService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.listaComunicazioni = new Array<Array<Comunicazione.Comunicazione>>();
    this.selectedProcedimento = navParams.get('procedimento');
    this.procedimentiTot = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElencoComunicazioniPage');
    let loading = this.loadingCtrl.create({
      content: 'Caricamento...'
    });
    loading.present();
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.comunicazioniService.getListaComunicazioni(this.storeService.getLocalServerUrl(), tokenValue, this.selectedProcedimento.pro_azienda_key, this.selectedProcedimento.procedimento_key).subscribe(r => {
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.listaComunicazioni = r.l_lista_comunicazioni;
          console.log(this.listaComunicazioni.length);

          for (let comunicazioni of this.listaComunicazioni) {
            for (let comunicazione of comunicazioni) {
              this.procedimentiTot = this.procedimentiTot + comunicazione.pr_totali;
            }
          }
        }
        loading.dismiss();
      }, err => {
        loading.dismiss();
        this.presentAlert("", err.statusText);
      })
    });
  }

  //navigazione verso la dashboard dello specifico sito selezionato
  public goToDetails(event, comunicazione) {
    console.log("goToDetailsComunicazione click" + comunicazione.comunicazioni_key);
    if (comunicazione.comunicazioni_key != 0) {
      this.navCtrl.push(DashboardComunicazionePage, { comunicazione: comunicazione })
    }
  }

  public getPreColor(comunicazione: Comunicazione.Comunicazione): string {

    if (comunicazione.pr_scadute > 0) {
      return 'danger';
    }
    else {
      if (comunicazione.pr_in_scadenza > 0) {
        return 'alert';
      }
      else {
        return 'done';
      }
    }
  }

  public getPreIcon(comunicazione: Comunicazione.Comunicazione): string {

    if (comunicazione.pr_scadute > 0) {
      return 'alert';
    }
    else {
      if (comunicazione.pr_in_scadenza > 0) {
        return 'time';
      }
      else {
        return 'checkmark-circle';
      }
    }
  }

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
