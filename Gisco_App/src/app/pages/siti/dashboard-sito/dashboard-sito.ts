import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Sito } from '../../../models/sito/sito.namespace';

import { SitiService } from '../../../services/siti/siti.service';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Common } from '../../../models/common/common.namespace';
import { NavigationContainer } from 'ionic-angular/umd/navigation/navigation-container';
/**
 * Generated class for the DashboardSitoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-dashboard-sito',
    templateUrl: 'dashboard-sito.html',
})

export class DashboardSitoPage {
    selectedSito: Sito.Sito;
    catastale: Array<Sito.Catastale>;
    procedimenti: Array<Sito.Procedimento>;
    whichPage: string;
    public mapModel: Common.MapModel;

    public showMap: boolean;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public sitiService: SitiService,
        private storeService: StoreService,
        public loadingCtrl: LoadingController) {
        this.selectedSito = navParams.get('sito');
        console.log(this.selectedSito.az_codice_interno);
        var mapMarkers: Common.MapMarker[] = [];
        this.mapModel = new Common.MapModel();
        this.mapModel.markers = mapMarkers;

        this.showMap = false;
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
            this.whichPage = 'Sito';
            this.sitiService.getSito(this.selectedSito.azienda_key, tokenValue).subscribe(r => {
                console.log('ionViewDidLoad DashboardSitoPage getSito');
                if (r.ErrorMessage.msg_code === 0) {
                    this.selectedSito = r.sito;
                    this.catastale = r.catastale_situazione;
                    this.procedimenti = r.prescrizioni_situazione;
                    var marker = new Common.MapMarker();

                    marker.lat = this.selectedSito.az_baricentro_n;
                    marker.lgn = this.selectedSito.az_baricentro_e;
                    //marker.lab = this.selectedSito.az_ragione_sociale;
                    marker.draggable = false;
                    this.mapModel.markers.push(marker);

                    this.mapModel.centerLat = marker.lat;
                    this.mapModel.centerLon = marker.lgn;
                    this.mapModel.initialZoom = 12;
                    this.showMap = true;
                }
                loading.dismiss();
            })
        });
    }

    segmentSitoClicked(event) {
        console.log('segmentSitoClicked');
    }

    segmentCatastaleClicked(event) {
        console.log('segmentCatastaleClicked ' + this.catastale);
    }

    segmentProcedimentiClicked(event) {
        console.log('segmentProcedimentiClicked');
    }

    segmentGraficoClicked(event) {
        console.log('segmentGraficoClicked');
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
