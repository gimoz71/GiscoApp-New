import { Injectable, ViewChild } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Observable } from "rxjs/Observable";
import { GlobalVariable } from '../../global';

import { Http } from '../../models/shared/http.namespace';
import { Nav } from 'ionic-angular';

@Injectable()
export class SitiService {

    @ViewChild(Nav) nav;
    sitiService: string[];

    constructor(private httpService: HttpService) {
    }

    public getListaSitiAll(token: string): Observable<Http.HttpResponse> {

        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.SITI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + "0" //from
            + GlobalVariable.URL_SEPARATOR + "0" //to
            + GlobalVariable.URL_SEPARATOR + "A" //tipologia
            + GlobalVariable.URL_SEPARATOR + "A" //provincia
            + GlobalVariable.URL_SEPARATOR + "A", token);//testo libero
    }

    public getListaSiti(token: string, tipologia_key: any, provincia_cod:string, campoLibero): Observable<Http.HttpResponse> {

        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.SITI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + "0" //from
            + GlobalVariable.URL_SEPARATOR + "0" //to
            + GlobalVariable.URL_SEPARATOR + tipologia_key //tipologia
            + GlobalVariable.URL_SEPARATOR + provincia_cod //provincia
            + GlobalVariable.URL_SEPARATOR + campoLibero, token);//campo libero
    }

    public getSito(key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.SITI_GET_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);//id sito esempio: key=120 ha tutti i dati che devono essere visualizzati
    }

    public getListaProvinceSito(token: string): Observable<Http.HttpResponse> {
         return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.GET_PROVINCE_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER 
            + GlobalVariable.URL_SEPARATOR + "46" //tipoddl
            + GlobalVariable.URL_SEPARATOR + "N" //filtro
            + GlobalVariable.URL_SEPARATOR + "N" //ordina
            + GlobalVariable.URL_SEPARATOR + "N" //componi
            + GlobalVariable.URL_SEPARATOR + "N" //primovuoto
            + GlobalVariable.URL_SEPARATOR + "Tutti", token);//primotutti
    }

    public getListaTipologieSito(token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.SITI_GET_TIPOLOGIE_KEYWORD
            + GlobalVariable.URL_SEPARATOR+ GlobalVariable.URL_TOKEN_PLACEHOLDER, token);
    }

}