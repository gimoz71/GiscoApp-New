import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Content, DateTime } from 'ionic-angular';

import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Procedimento } from '../../../models/procedimento/procedimento.namespace';
import { ProcedimentiService } from '../../../services/procedimenti/procedimenti.service';
import { ElencoComunicazioniPage } from '../../comunicazioni/elenco-comunicazioni/elenco-comunicazioni';
/**
 * Generated class for the DashboardSitoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-dashboard-procedimento',
    templateUrl: 'dashboard-procedimento.html',
})

export class DashboardProcedimentoPage {
    selectedProcedimento: Procedimento.Procedimento;
    fasi: Array<Procedimento.Fase>;
    personalizzazioni: Array<Procedimento.Personalizzazione>;
    whichPage: string;
    selectedFase: any;
    @ViewChild(Content) content: Content;

    public visualizzaDataAvvio: boolean;
    public visualizzaDataDa: boolean;
    public visualizzaDataA: boolean;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public procedimentiService: ProcedimentiService,
        private storeService: StoreService,
        public loadingCtrl: LoadingController) {
        this.selectedProcedimento = navParams.get('procedimento');
        this.visualizzaDataAvvio = true;
        this.visualizzaDataDa = true;
        this.visualizzaDataA = true;
    }

    ionViewDidLoad() {

        console.log('ionViewDidLoad DashboardProcedimentoPage');
        let loading = this.loadingCtrl.create({
            content: 'Caricamento...'
        });
        loading.present();
        this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            console.log(tokenValue);
            this.whichPage = 'Procedimento';
            this.procedimentiService.getProcedimento(this.storeService.getLocalServerUrl(), this.selectedProcedimento.com_procedimento_key, tokenValue).subscribe(r => {
                console.log('ionViewDidLoad DashboardProcedimentoPage getProcedimento');
                if (r.ErrorMessage.msg_code === 0) {
                    this.selectedProcedimento = r.procedimento;
                    this.gestioneVisualizzazioneDate(r.procedimento);
                    this.fasi = r.fasi;
                    this.personalizzazioni = r.personalizzazioni;
                }
                loading.dismiss();
                this.content.resize();
            })
        });

    }

    private gestioneVisualizzazioneDate(procedimento: any): void {
        var dataAvvio = new Date(procedimento.pro_data_avvio);
        if (dataAvvio.getFullYear() === 1) {
            this.visualizzaDataAvvio = false;
        }
        // var dataDa = new Date(procedimento.pro_da_data_esecuzione);
        // if (dataDa.getFullYear() === 1) {
        //     this.visualizzaDataDa = false;
        // }
        // var dataA = new Date(procedimento.pro_a_data_esecuzione);
        // if (dataA.getFullYear() === 1) {
        //     this.visualizzaDataA = false;
        // }
    }

    onSegmentChange() {
        this.content.resize();
    }
    segmentProcedimentoClicked(event) {
        console.log('segmentProcedimentoClicked');
    }

    segmentPersonalizzazioniClicked(event) {
        console.log('segmentPersonalizzazioniClicked');
    }

    segmentFasiClicked(event) {
        console.log('segmentFasiClicked');
    }

    espendiFase(event, fase, index) {
        console.log("espendiFase click");
        if (this.selectedFase == index && this.selectedFase != -1) {
            this.selectedFase = -1;
        } else
            this.selectedFase = index;
    }

    goToComunicazioni() {
        console.log("goToComunicazioni click");
        this.navCtrl.push(ElencoComunicazioniPage, { procedimento: this.selectedProcedimento })
    }

    back() {
        this.navCtrl.pop();
    }

}
