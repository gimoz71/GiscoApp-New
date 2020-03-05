import { Component } from '@angular/core';
import { NavParams, NavController, AlertController } from 'ionic-angular';
//import { Dispositivo } from '../../../models/dispositivo/dispositivo.namespace';
import { File } from '@ionic-native/file/ngx';

//import { DispositiviService } from '../../../services/dispositivi/dispositivi.service';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
//import { Common } from '../../../models/common/common.namespace';
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
  public d_url:string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public comunicazioniService: ComunicazioniService,
    private storeService: StoreService,
    private alertCtrl: AlertController,
    private file: File,
    ) {
    this.selectedComunicazione = navParams.get('comunicazione');
    this.procedimento = new Procedimento.Procedimento();
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad DashboardComunicazionePage');
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.d_url = this.storeService.getLocalServerUrl() + "/app/services/get_file/" + tokenValue + "/comunicazioni_file/";
      //console.log(this.d_url);
      //console.log(tokenValue);
      this.whichPage = 'Comunicazione';
      this.comunicazioniService.getComunicazione(this.storeService.getLocalServerUrl(), this.selectedComunicazione.comunicazioni_key, tokenValue).subscribe(r => {
        //console.log('ionViewDidLoad DashboardComunicazionePage getComunicazione');
        if (r.ErrorMessage.msg_code === 0) {
          this.selectedComunicazione = r.comunicazione;
          this.procedimento = r.procedimento;
        }
      }, err => {
        this.presentAlert("", err.statusText);
      })
    }, err => {
      this.presentAlert("", err.statusText);
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

    this.navCtrl.push(DashboardPrescrizionePage, { prescrizione: prescrizione, com: this.selectedComunicazione.com_titolo })

  }

  back() {
    this.navCtrl.pop();
  }

  hideDate(dateString: string) {
    const date = new Date(dateString);
    return date.getFullYear() === 1;
  }

  public getPreColor(prescrizione: Comunicazione.Prescrizione): string {
    switch (prescrizione.pre_stato) {
      case 'S':
        return 'danger';
      case 'I':
        return 'alert';
      case 'F':
        return 'future';
      case 'D':
        return 'no-date';
      case 'V':
        return 'vincolate';
      default:
        return 'done';
    }

    // <ion-icon name="alert" color="danger" item-start></ion-icon>
    // <ion-icon name="time" color="alert" item-start></ion-icon>
    // <ion-icon name="information-circle" color="future" item-start></ion-icon>
    // <ion-icon name="help-circle" color="no-date" item-start></ion-icon>
    // <ion-icon name="time" color="vincolate" item-start></ion-icon>
    // <ion-icon name="checkmark-circle" color="done" item-start></ion-icon>

  }

  public getPreIcon(prescrizione: Comunicazione.Prescrizione): string {

    switch (prescrizione.pre_stato) {
      case 'S':
        return 'alert';
      case 'I':
        return 'time';
      case 'F':
        return 'information-circle';
      case 'D':
        return 'help-circle';
      case 'V':
        return 'time';
      default:
        return 'checkmark-circle';
    }
  }

  public downloadFileLink(f:Comunicazione.FileCom) {
    var url:string = this.d_url + f.comunicazioni_file_key + "/";
    window.open(url, '_system');
  }

  public downloadFile(f:Comunicazione.FileCom, file?, alertCtrl?) {
    file = this.file;
    
    let localURLs = [
      this.file.dataDirectory,
      this.file.documentsDirectory,
      this.file.externalApplicationStorageDirectory,
      this.file.externalCacheDirectory,
      this.file.externalRootDirectory,
      this.file.externalDataDirectory,
      this.file.sharedDirectory,
      this.file.syncedDataDirectory,
      this.file.cacheDirectory
    ];

    //Android
    // ["file:///data/user/0/it.mesys.gisco/files/", 
    // null, 
    // "file:///storage/emulated/0/Android/data/it.mesys.gisco/", 
    // "file:///storage/emulated/0/Android/data/it.mesys.gisco/cache/", 
    // "file:///storage/emulated/0/", 
    // "file:///storage/emulated/0/Android/data/it.mesys.gisco/files/", 
    // null, 
    // null]

    //IOS
    // ["file:///var/mobile/Containers/Data/Application/A684B819-792C-4517-ABB3-5D022831F062/Library/NoCloud/",
    // "file:///var/mobile/Containers/Data/Application/A684B819-792C-4517-ABB3-5D022831F062/Documents/",
    // null,
    // null,
    // null,
    // null,
    // null,
    // "file:///var/mobile/Containers/Data/Application/A684B819-792C-4517-ABB3-5D022831F062/Library/Cloud/"]

    console.log(localURLs);



    var url:string = this.d_url + f.comunicazioni_file_key + "/";
    var name:string = f.cof_file;

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
        file.writeFile(file.externalRootDirectory + 'download/', name, oReq.response, { replace: true }).then(data =>
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
        file.writeFile(file.documentsDirectory + 'download/', name, oReq.response, { replace: true }).then(data =>
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

  presentAlert(title: string, mess: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: mess,
      buttons: ['Ok']
    });
    alert.present();
  }

}
