import { Injectable, ViewChild } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Observable } from "rxjs/Observable";
import { GlobalVariable } from '../../global';

import { Http } from '../../models/shared/http.namespace';
import { Nav } from 'ionic-angular';
import { Attivita } from "../../models/attivita/attivita.namespace";

@Injectable()
export class AttivitaService {

    @ViewChild(Nav) nav;

    constructor(private httpService: HttpService) {
    }

///{token}/{from}/{to}/{categoria}/{tipo}/{sito}"
    public getMieAttivita(serverUrl: string, token: string){
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.ATTIVITA_GET_MIE_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER, token);//protocollo
    }

    public getListaAttivita(serverUrl: string, token: string, categoria: any, tipo_cod: any, sito_cod: string, prot_cod: string, from: number, to: number): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.ATTIVITA_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + from
            + GlobalVariable.URL_SEPARATOR + to
            + GlobalVariable.URL_SEPARATOR + categoria //categoria
            + GlobalVariable.URL_SEPARATOR + tipo_cod //tipo
            + GlobalVariable.URL_SEPARATOR + sito_cod //sito
            + GlobalVariable.URL_SEPARATOR + prot_cod, token);//protocollo
    }

    public getAttivita(serverUrl: string, key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.ATTIVITA_GET_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);
    }

    public getAttivitaChiusura(serverUrl: string, key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.ATTIVITA_GET_CHIUSURA_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);
    }

    public getListaCategorieAttivita(serverUrl: string, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.ATTIVITA_GET_CATEGORIE_KEYWORD
            + GlobalVariable.URL_SEPARATOR 
            + GlobalVariable.URL_TOKEN_PLACEHOLDER          
            , token);
    }

    public getListaTipologieAttivita(serverUrl: string, categoria:any, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.ATTIVITA_GET_TIPOLOGIE_KEYWORD        
             + GlobalVariable.URL_SEPARATOR +GlobalVariable.URL_TOKEN_PLACEHOLDER + GlobalVariable.URL_SEPARATOR+categoria
                 
            , token);
    }

    public getListaImmaginiAttivita(serverUrl: string, key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.ATTIVITA_GET_IMMAGINI_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER + GlobalVariable.URL_SEPARATOR+"attivita"+ GlobalVariable.URL_SEPARATOR + key, token);
    }

    public salvaImmagineAttivita(serverUrl: string, immagine: Attivita.ws_SendImage): Observable<Http.HttpResponse> {
        return this.httpService.post(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.ATTIVITA_SALVA_IMMAGINE_KEYWORD
            + GlobalVariable.URL_SEPARATOR, immagine);
    }

    public cancellaImmagineAttivita(serverUrl: string, immagine: Attivita.ws_Immagine): Observable<Http.HttpResponse> {
        return this.httpService.post(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.ATTIVITA_DELET_IMMAGINE_KEYWORD
            + GlobalVariable.URL_SEPARATOR, immagine);
    }

    public salvaChiusuraAttivita(serverUrl: string, attivita: Attivita.ws_Attivita_Chiusura): Observable<Http.HttpResponse> {
        return this.httpService.post(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.ATTIVITA_SALVA_CHIUSURA_KEYWORD
            + GlobalVariable.URL_SEPARATOR, attivita);
    }


    public getCommentiAttivita(serverUrl: string, token: string, key: number): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.ATTIVITA_GET_COMMENTI_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);
    }

    public salvaCommentoAttivita(serverUrl: string, commento: Attivita.ws_Commento): Observable<Http.HttpResponse> {
        return this.httpService.post(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.ATTIVITA_SALVA_COMMENTO_KEYWORD
            + GlobalVariable.URL_SEPARATOR, commento);
    }

    public cancellaCommentoAttivita(serverUrl: string, commento: Attivita.ws_Commento): Observable<Http.HttpResponse> {
        return this.httpService.post(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.ATTIVITA_DELET_COMMENTO_KEYWORD
            + GlobalVariable.URL_SEPARATOR, commento);
    }

}