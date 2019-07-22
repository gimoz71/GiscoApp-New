import { Injectable, ViewChild } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Observable } from "rxjs/Observable";
import { GlobalVariable } from '../../global';

import { Http } from '../../models/shared/http.namespace';
import { Nav } from 'ionic-angular';
import { Attivita } from "../../models/attivita/attivita.namespace";

@Injectable()
export class CommonService {

    @ViewChild(Nav) nav;

    constructor(private httpService: HttpService) {
    }

    public getNotifiche(token: string){
        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.COMMON_GET_NOTIFICHE
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER, token);//protocollo
    }

    public getPrescrizioniChartData(token: string){
        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.COMMON_GET_PRESCRIZIONI_CHARTDATA
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER, token);//protocollo
    }

    public getAttivitaChartData(token: string){
        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.COMMON_GET_ATTIVITA_CHARTDATA
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER, token);//protocollo
    }
}