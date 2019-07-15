import { Component, ViewChild } from '@angular/core';

import { Chart } from 'chart.js/dist/Chart.js';
import { NavController } from 'ionic-angular';
import { DashboardOsservazionePage } from '../osservazioni/dashboard-osservazione/dashboard-osservazione';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('graficoPrescrizioni') graficoPrescrizioni;
    @ViewChild('graficoAttivita') graficoAttivita;

    doughnutChart: any;

    constructor(public navCtrl: NavController) {

    }

    public ionViewDidLoad(): void {
        this.doughnutChart = new Chart(this.graficoPrescrizioni.nativeElement, {
            type: 'doughnut',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            },
            options: {
                maintainAspectRatio: false,
                aspectRatio: 1
            }
        });

        this.doughnutChart = new Chart(this.graficoAttivita.nativeElement, {
            type: 'doughnut',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            },
            options: {
                maintainAspectRatio: false,
                aspectRatio: 1
            }
        });
    }

    public goToNuovaOsservazione() {
        console.log("goToNuovaOsservazione click");
        this.navCtrl.push(DashboardOsservazionePage)
    }

}
