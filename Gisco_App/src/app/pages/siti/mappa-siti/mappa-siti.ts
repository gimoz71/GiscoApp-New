import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { StoreService } from '../../../services/store/store.service';
import { SitiService } from '../../../services/siti/siti.service';

import { Sito } from '../../../models/sito/sito.namespace';
import { Login } from '../../../models/login/login.namespace';
import { Common } from '../../../models/common/common.namespace';
import { DashboardSitoPage } from '../dashboard-sito/dashboard-sito';
import { Filtro } from '../../../models/filtro/filtro.namespace';

/**
 * Generated class for the MappaSitiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-mappa-siti',
    templateUrl: 'mappa-siti.html'
})

export class MappaSitiPage {

    public listaSiti: Array<Sito.Sito>;
    public listaProvince: Array<Filtro.Provincia>;
    public listaTipologie: Array<Filtro.TipologiaSito>;
    public tipologiaSelezionata: Filtro.TipologiaSito;
    public provinciaSelezionata: Filtro.Provincia;
    public campoLibero: string;

    public mapModel: Common.MapModel;

    public showMap: boolean;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public storeService: StoreService,
        public sitiService: SitiService,
        public loadingCtrl: LoadingController) {
        this.listaSiti = new Array<Sito.Sito>();
        this.campoLibero = "A";

        var mapMarkers: Common.MapMarker[] = [];
        this.mapModel = new Common.MapModel();
        this.mapModel.markers = mapMarkers;

        this.showMap = false;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ElencoSitiPage');
        let loading = this.loadingCtrl.create({
            content: 'Caricamento...'
        });
        loading.present();
        this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            console.log(tokenValue);
            this.sitiService.getListaSitiAll(this.storeService.getLocalServerUrl(), tokenValue).subscribe(r => {
                console.log('ionViewDidLoad getListaSiti');
                if (r.ErrorMessage.msg_code === 0) {
                    this.listaSiti = r.l_lista_siti;

                    //genero il modello da passare al componente MAPPA
                    this.mapModel.centerLat = parseFloat(r.mp_latitude);
                    this.mapModel.centerLon = parseFloat(r.mp_longitude);
                    
                    this.mapModel.initialZoom = parseFloat(r.mp_zoom);
                    this.mapModel.type = "roadmap";
                    console.log("mp_latitude:" + r.mp_latitude);
                    console.log("mp_longitude:" + r.mp_longitude);
                    console.log("mp_zoom:" + r.mp_zoom);

                    for (let sito of this.listaSiti) {
                        var marker = new Common.MapMarker();

                        marker.lat = sito.az_baricentro_n;
                        marker.lgn = sito.az_baricentro_e;
                        //marker.lab = sito.az_ragione_sociale;
                        marker.draggable = false;
                        this.mapModel.markers.push(marker);
                        //console.log(sito.az_baricentro_n);
                        //console.log(sito.az_baricentro_e);
                        //console.log(marker);
                    }

                    this.showMap = true;
                }
                loading.dismiss();
            })

            this.sitiService.getListaTipologieSito(this.storeService.getLocalServerUrl(), tokenValue).subscribe(r => {
                if (r.ErrorMessage.msg_code === 0) {
                    console.log(r.ErrorMessage.msg_code);
                    this.listaTipologie = r.l_lista_tipologie;
                    this.tipologiaSelezionata = this.listaTipologie[0];
                }
            })

            this.sitiService.getListaProvinceSito(this.storeService.getLocalServerUrl(), tokenValue).subscribe(r => {
                if (r.ErrorMessage.msg_code === 0) {
                    console.log(r.ErrorMessage.msg_code);
                    this.listaProvince = r.l_dropdown;
                    this.provinciaSelezionata = this.listaProvince[0];
                }
            })

        });
    }

    //navigazione verso la dashboard dello specifico sito selezionato
    public goToDetailsSito(event) {
        var sitoSelezionato = this.listaSiti[parseInt(event)];
        this.navCtrl.push(DashboardSitoPage, { sito: sitoSelezionato })
    }

    public getSiti(event) {
        let loading = this.loadingCtrl.create({
            content: 'Caricamento...'
        });
        loading.present();
        if (event != undefined) {
            this.campoLibero = event.value;
        }
        if (this.campoLibero === "") {
            this.campoLibero = "A";
        }
        if (this.tipologiaSelezionata.tab_tipologia_sito_key === 0) {
            this.tipologiaSelezionata.tab_tipologia_sito_key = "A"
        }
        if (this.provinciaSelezionata.Codice === "") {
            this.provinciaSelezionata.Codice = "A"
        }

        this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;

            this.sitiService.getListaSiti(this.storeService.getLocalServerUrl(), tokenValue, this.tipologiaSelezionata.tab_tipologia_sito_key, this.provinciaSelezionata.Codice, this.campoLibero).subscribe(r => {
                console.log('ionViewDidLoad getListaSiti');
                if (r.ErrorMessage.msg_code === 0) {
                    console.log(r.ErrorMessage.msg_code);
                    this.listaSiti = r.l_lista_siti;
                    console.log("getSiti listaSiti", this.listaSiti.length);

                    this.mapModel.markers.length = 0;

                    for (let sito of this.listaSiti) {
                        var marker = new Common.MapMarker();

                        marker.lat = sito.az_baricentro_n;
                        marker.lgn = sito.az_baricentro_e;
                        //marker.lab = sito.az_ragione_sociale;
                        marker.draggable = false;

                        this.mapModel.markers.push(marker);
                    }
                }
                loading.dismiss();
            })
        });
        console.log("tipologia", this.tipologiaSelezionata);
        console.log("provincia", this.provinciaSelezionata);
        console.log("campo", this.campoLibero);
    }

}
