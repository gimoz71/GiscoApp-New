import { Component, ViewChild } from '@angular/core';

import { Chart } from 'chart.js/dist/Chart.js';
import { NavController, LoadingController } from 'ionic-angular';
import { DashboardOsservazionePage } from '../osservazioni/dashboard-osservazione/dashboard-osservazione';

import { StoreService } from '../../services/store/store.service';
import { AttivitaService } from '../../services/attivita/attivita.service';
import { CommonService } from '../../services/shared/common.service';

import { Attivita } from '../../models/attivita/attivita.namespace';
import { Login } from '../../models/login/login.namespace';
import { Common } from '../../models/common/common.namespace';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{

  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('stackedCanvas') stackedCanvas;

  doughnutChart: any;
  stackedBar: any;

  public prescrizioniChartData: Common.PrescrizioniChartData;
  public attivitaChartData: Array<Common.AttivitaChartData>;
  public listaAttivita: Array<Attivita.Attivita>;

  public listaAttivitaVisibile: boolean = true;
  public attivitaChartVisible: boolean = true;
  public prescrizioniChartVisible: boolean = true;

  constructor(public navCtrl: NavController,
    public storeService: StoreService,
    public attivitaService: AttivitaService,
    public commonService: CommonService,
    public loadingCtrl: LoadingController) {
      this.listaAttivita = new Array<Attivita.Attivita>();
      this.prescrizioniChartData = new Common.PrescrizioniChartData();
      this.attivitaChartData = new Array<Common.AttivitaChartData>();
  }

  public ionViewDidLoad() : void {
    
    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
      this.getAttivita(val.token_value);
      this.createPrescrizioniChart(val.token_value);
      this.createAttivitaChart(val.token_value);
    });
  }

  public createAttivitaChart(tokenValue: string) {
    this.commonService.getAttivitaChartData(tokenValue).subscribe(data => {
      if(data.ErrorMessage.msg_code == 0){

        this.attivitaChartVisible = data['visible'] == "S";

        var labels = new Array<string>();

        var datasetScadute = new Array<number>();
        var datasetInScadenza = new Array<number>();
        var datasetFuture = new Array<number>();

        var elencoAttivita = data.l_attivita;

        for(var attivita of elencoAttivita){
          labels.push(attivita.tab_tipo_attivita_desc);
          datasetScadute.push(attivita.at_scadute);
          datasetInScadenza.push(attivita.at_in_scadenza);
          datasetFuture.push(attivita.at_future);
        }

        var barChartData = {
          labels: labels,
          datasets: [{
            label: 'Scadute',
            backgroundColor: '#F96868',
            data: datasetScadute
          }, {
            label: 'In Scadenza',
            backgroundColor: '#F3A754',
            data: datasetInScadenza
          }, {
            label: 'Future',
            backgroundColor:'#62A9EB',
            data: datasetFuture
          }]
        };


        this.stackedBar = new Chart(this.stackedCanvas.nativeElement, {
          type: 'bar',
          data: barChartData,
          options: {
              responsive: true,
              scales: {
                  xAxes: [{
                    barPercentage: 1,
                    barThickness: 15,
                    gridLines: {
                        offsetGridLines: true
                    },
                    stacked: true
                  }],
                  yAxes: [{
                      stacked: true,
                      ticks: {
                        beginAtZero: true
                      }
                  }]
              }
          }
        });
      }
    });
  }

  public createPrescrizioniChart(tokenValue: string) {
    this.commonService.getPrescrizioniChartData(tokenValue).subscribe(data => {

      if(data.ErrorMessage.msg_code == 0){
        var labels = new Array<string>();
        var dataSet = new Array<number>();
        var colors = new Array<string>();

        this.prescrizioniChartVisible = data['visible'] == "S";

        var prescrizioni = data.s_prescrizioni;

        labels.push(prescrizioni.pr_label_in_scadenza);
        dataSet.push(prescrizioni.pr_in_scadenza);
        colors.push(prescrizioni.pr_colore_in_scadenza);

        // labels.push(prescrizioni.pr_label_ottemperate);
        // dataSet.push(prescrizioni.pr_ottemperate);
        // colors.push(prescrizioni.pr_colore_ottemperate);

        labels.push(prescrizioni.pr_label_prossime);
        dataSet.push(prescrizioni.pr_prossime);
        colors.push(prescrizioni.pr_colore_prossime);

        labels.push(prescrizioni.pr_label_scadute);
        dataSet.push(prescrizioni.pr_scadute);
        colors.push(prescrizioni.pr_colore_scadute);

        // labels.push(prescrizioni.pr_label_senza_data);
        // dataSet.push(prescrizioni.pr_senza_data);
        // colors.push(prescrizioni.pr_colore_senza_data);

        // labels.push(prescrizioni.pr_label_vincolate);
        // dataSet.push(prescrizioni.pr_vincolate);
        // colors.push(prescrizioni.pr_colore_vincolate);

        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

          type: 'doughnut',
          data: {
              labels: labels,
              datasets: [{
                  label: '# of Votes',
                  data: dataSet,
                  backgroundColor: colors,
                  hoverBackgroundColor: colors
              }]
          }
    
        });
      }
    });
  }

  public getAttivita(tokenValue: string, infiniteScroll?) {
    let loading = this.loadingCtrl.create({
      content: 'Caricamento...'
    });
    if (!infiniteScroll) {
      loading.present();
    }
    //(token: string, categoria: any, tipo_cod: any, sito_cod: string, from: number, to: number)
    this.attivitaService.getMieAttivita(tokenValue).subscribe(r => {
      console.log('getAttivita');
      if (r.ErrorMessage.msg_code === 0) {
        console.log(r.ErrorMessage.msg_code);
        if (!infiniteScroll) {
          this.listaAttivita.length = 0;
          this.listaAttivita = r.l_lista_attivita;
        } else {
          infiniteScroll.complete();
          this.listaAttivita.push(...r.l_lista_attivita);
        }
      }
      loading.dismiss();
    });
  }

  public goToNuovaOsservazione() {
    console.log("goToNuovaOsservazione click");
     this.navCtrl.push(DashboardOsservazionePage)
  }

}
