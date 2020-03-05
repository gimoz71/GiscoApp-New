import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file/ngx';

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
  public d_url:string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public prescrizioniService: PrescrizioniService,
    private storeService: StoreService,
    private alertCtrl: AlertController,
    private file: File,
    public loadingCtrl: LoadingController) {
    this.selectedPrescrizione = navParams.get('prescrizione');
    this.comunicazioneTitolo = navParams.get('com');
  }

  ionViewDidLoad() {

    let loading = this.loadingCtrl.create({
      content: 'Caricamento...'
    });
    loading.present();
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.d_url = this.storeService.getLocalServerUrl() + "/app/services/get_file/" + tokenValue + "/prescrizione_file/";
      console.log(tokenValue);
      this.whichPage = 'Prescrizione';
      this.prescrizioniService.getPrescrizione(this.storeService.getLocalServerUrl(), this.selectedPrescrizione.prescrizione_key, tokenValue).subscribe(r => {
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

  public downloadFileLink(f:Comunicazione.FilePre) {
    var url:string = this.d_url + f.prescrizione_file_key + "/";
    window.open(url, '_system');
  }

  public downloadFile(f:Comunicazione.FilePre, file?, alertCtrl?) {
    file = this.file;

    var url:string = this.d_url + f.prescrizione_file_key + "/";
    var name:string = f.prf_file;

    alertCtrl = this.alertCtrl;

    let alert = alertCtrl.create({
        title: 'Download in corso...',
        subTitle: name + " in scaricamento dal server.",
        buttons: ['Attendere prego']
    });
    alert.present();

    //REQUEST CREATION 
    let oReq = new XMLHttpRequest();

    //SENDING REQUEST
    oReq.open("GET", url, true);
    oReq.responseType = "blob"; // blob pls

    //IF DATA RECEIVED THEN  WRITE FILE
    oReq.onload = function(oEvent) {

      alert.dismiss();

      let a_ok = alertCtrl.create({
        title: 'Download effettuato',
        subTitle: name + " è stato scaricato nella cartella download.",
        buttons: ['OK']
      });
      //SAVE TEMP FILE IN APP FOLDER
      if (file.externalRootDirectory != null)
      {
        file.writeFile(file.externalRootDirectory+ 'download/', name, oReq.response, { replace: true }).then(data =>
          {
            console.log('File scritto');
            a_ok.present();
          }
          ).catch(err =>
            console.log('Errore in scrittura')
          );
      }
      if (file.documentsDirectory != null)
      {
        file.writeFile(file.documentsDirectory, name, oReq.response, { replace: true }).then(data =>
          {
            console.log('File scritto');
            a_ok.present();
          }
          ).catch(err =>
            console.log('Errore in scrittura')
          );
      }
    };

    oReq.send();//this is useless right?

  }

  back() {
    this.navCtrl.pop();
  }

}
