import { Injectable, ViewChild } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Observable } from "rxjs/Observable";
import { GlobalVariable } from '../../global';

import { Http } from '../../models/shared/http.namespace';
import { Nav } from 'ionic-angular';

@Injectable()
export class ProcedimentiService {

    @ViewChild(Nav) nav;
    procedimentiService: string[];

    constructor(private httpService: HttpService) {
    }

    public getListaProcedimentiAll(token: string): Observable<Http.HttpResponse> {

        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.PROCEDIMENTI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + "0" //from
            + GlobalVariable.URL_SEPARATOR + "0" //to
            + GlobalVariable.URL_SEPARATOR + "A" //tipologia
            + GlobalVariable.URL_SEPARATOR + "A" //sito
            + GlobalVariable.URL_SEPARATOR + "A", token);//titolo
    }

    public getListaProcedimenti(token: string, tipologia_key: any, sito:string, titolo:string, from:number, to:number): Observable<Http.HttpResponse> {

        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.PROCEDIMENTI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + from //from
            + GlobalVariable.URL_SEPARATOR + to //to
            + GlobalVariable.URL_SEPARATOR + tipologia_key //tipologia
            + GlobalVariable.URL_SEPARATOR + sito //sito
            + GlobalVariable.URL_SEPARATOR + titolo, token);//campo libero
    }

    public getProcedimento(key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.PROCEDIMENTI_GET_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);
    }


    public getListaTipologieProcedimento(token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.PROCEDIMENTI_GET_TIPOLOGIE_KEYWORD
            + GlobalVariable.URL_SEPARATOR+ GlobalVariable.URL_TOKEN_PLACEHOLDER, token);
    }

}