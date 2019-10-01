import { Injectable, ViewChild } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Observable } from "rxjs/Observable";
import { GlobalVariable } from '../../global';

import { Http } from '../../models/shared/http.namespace';
import { Nav } from 'ionic-angular';

@Injectable()
export class DocumentiService {

    @ViewChild(Nav) nav;
    documentiService: string[];

    constructor(private httpService: HttpService) {
    }

    public getCartelle(serverUrl: string, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.DOCUMENTI_GET_CARTELLE_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER,
            token);
    }

    public getTipologiaDocumenti(serverUrl: string, token: string, categoria: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.DOCUMENTI_GET_TIPOLOGIA_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER 
            + GlobalVariable.URL_SEPARATOR + categoria, token); //doc_foreign_type
    }

    public getListaDocumentiAll(serverUrl: string, token: string, tipo:any, categoria: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.DOCUMENTI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + "0" //from
            + GlobalVariable.URL_SEPARATOR + "0" //to
            + GlobalVariable.URL_SEPARATOR + tipo //tipo
            + GlobalVariable.URL_SEPARATOR + categoria //categoria
            + GlobalVariable.URL_SEPARATOR + "A" //sito
            + GlobalVariable.URL_SEPARATOR + "A" , token);//campo libero
    }

    public getListaDocumenti(serverUrl: string, token: string, tipo: any, categoria: string, sito: string, campoLibero: string, from:any, to:any): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.DOCUMENTI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + from
            + GlobalVariable.URL_SEPARATOR + to
            + GlobalVariable.URL_SEPARATOR + tipo
            + GlobalVariable.URL_SEPARATOR + categoria
            + GlobalVariable.URL_SEPARATOR + sito
            + GlobalVariable.URL_SEPARATOR + campoLibero, token);//campo libero
    }

    public getDocumento(serverUrl: string, key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.DOCUMENTI_GET_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);
    }
}