import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Dispositivo } from '../../../models/dispositivo/dispositivo.namespace';

import { DispositiviService } from '../../../services/dispositivi/dispositivi.service';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Common } from '../../../models/common/common.namespace';
import { DashboardAttivitaPage } from '../../attivita/dashboard-attivita/dashboard-attivita';
/**
 * Generated class for the DashboardDispositivoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-dashboard-dispositivo',
    templateUrl: 'dashboard-dispositivo.html',
})

export class DashboardDispositivoPage {

    public selectedDispositivo: Dispositivo.Dispositivo;
    public titolarita: Array<Dispositivo.Titolarita>;
    public autorizzazioni: Array<Dispositivo.Autorizzazioni>;
    public personalizzazioni: Array<Dispositivo.Personalizzazione>;
    public attivita: Array<Dispositivo.Attivita>;
    public whichPage: string;

    public mapModel: Common.MapModel;

    public showMap: boolean;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public dispositiviService: DispositiviService,
        private storeService: StoreService) {
        this.selectedDispositivo = navParams.get('dispositivo');
        var mapMarkers: Common.MapMarker[] = [];
        this.mapModel = new Common.MapModel();
        this.mapModel.markers = mapMarkers;

        this.showMap = false;
    }

    ionViewDidLoad() {

        console.log('ionViewDidLoad DashboardDispositivoPage');
        this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            console.log(tokenValue);
            this.whichPage = 'Dispositivo';
            this.dispositiviService.getDispositivo(this.storeService.getLocalServerUrl(), this.selectedDispositivo.dispositivi_key, tokenValue).subscribe(r => {
                console.log('ionViewDidLoad DashboardDispositivoPage getDispositivo');
                if (r.ErrorMessage.msg_code === 0) {
                    this.selectedDispositivo = r.dispositivo;
                    this.titolarita = r.titolarita;
                    this.autorizzazioni = r.autorizzazioni;
                    this.personalizzazioni = r.dis_personalizzazioni;
                    this.attivita = r.dis_attivita;
                    console.log('titolarita ' + this.titolarita.length);

                    var marker = new Common.MapMarker();

                    marker.lat = this.selectedDispositivo.dis_baricentro_n;
                    marker.lgn = this.selectedDispositivo.dis_baricentro_e;
                    //marker.lab = this.selectedDispositivo.dis_titolo;
                    marker.draggable = false;
                    this.mapModel.markers.push(marker);

                    this.mapModel.centerLat = marker.lat;
                    this.mapModel.centerLon = marker.lgn;
                    this.mapModel.initialZoom = parseFloat(r.mp_zoom);
                    this.mapModel.type = "satellite";

                    this.showMap = true;
                }
            })
        });
    }

    public getDotPath(osservazione: Dispositivo.Attivita): string {
        switch (osservazione.att_stato_attivita) {
          case 'FU':
            return '/assets/imgs/dot_blu.png';
          case 'SC':
            return '/assets/imgs/dot_giallo.png';
          case 'KO':
            return '/assets/imgs/dot_rosso.png';
          case 'OK':
            return '/assets/imgs/dot_verde.png';
          default:
            return '/assets/imgs/dot_giallo.png';
        }
    }

    public goToDetails(attivita: Dispositivo.Attivita) {
        console.log("goToDetails click " + attivita);
        this.navCtrl.push(DashboardAttivitaPage, { selectedAttivita: attivita, callbackChiusa: this.chiusaCallbackFunction });
    }

    chiusaCallbackFunction = (attivita_key: number) => {
        return new Promise((resolve, reject) => {
          console.log("goToDetails click " + attivita_key);
          if (attivita_key != undefined) {
            var p: Dispositivo.Attivita = this.attivita.find(item => item.attivita_key == attivita_key)
            console.log("goToDetails click " + JSON.stringify(p));
            p.att_conclusa = "S"
            resolve();
          }
        });
    }

    segmentDispositivoClicked(event) {
        console.log('segmentDispositivoClicked');
    }
    segmentTitolaritaClicked(event) {
        console.log('segmentTitolaritaClicked');
    }
    segmentAutorizzazioniClicked(event) {
        console.log('segmentAutorizzazioniClicked');
    }
    segmentMappaClicked(event) {
        console.log('segmentMappaClicked');
    }
    segmentImmaginiClicked(event) {
        console.log('segmentImmaginiClicked');
    }

    public markerClicked(event) {
        console.log('mearkerClicked');

    }

    back() {
        this.navCtrl.pop();
    }
}
