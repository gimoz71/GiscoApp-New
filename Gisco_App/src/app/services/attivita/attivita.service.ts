import { Injectable, ViewChild } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Observable } from "rxjs/Observable";
import { GlobalVariable } from '../../global';

import { Http } from '../../models/shared/http.namespace';
import { Nav } from 'ionic-angular';
import { Attivita } from "../../models/attivita/attivita.namespace";
import { GeolocatedService } from "../shared/geolocated.service";
import { Geoposition } from "@ionic-native/geolocation/ngx";

@Injectable()
export class AttivitaService {

    @ViewChild(Nav) nav;
    private currentLat: string;
    private currentLon: string;

    constructor(private httpService: HttpService,
        private geolocated: GeolocatedService) {

        this.currentLat = "0";
        this.currentLon = "0";

        this.geolocated.getCurrentPos().then((pos: Geoposition) => {
            this.currentLat = (pos.coords.latitude + "").replace('.', ',');
            this.currentLon = (pos.coords.longitude + "").replace('.', ',');
        }, (err: PositionError) => {
            // vallutare la gestione dell'errore se non si recuperano le coordinate
            console.log("error : " + err.message);

        });
    }

    ///{token}/{from}/{to}/{categoria}/{tipo}/{sito}"
    public getMieAttivita(serverUrl: string, token: string) {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.ATTIVITA_GET_MIE_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + this.currentLat
            + GlobalVariable.URL_SEPARATOR + this.currentLon
            , token);//protocollo
    }

    public getListaAttivita(serverUrl: string, token: string, categoria: any, tipo_cod: any, sito_cod: string, prot_cod: string, from: number, to: number, stato: string): Observable<Http.HttpResponse> {

        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.ATTIVITA_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + from
            + GlobalVariable.URL_SEPARATOR + to
            + GlobalVariable.URL_SEPARATOR + categoria //categoria
            + GlobalVariable.URL_SEPARATOR + tipo_cod //tipo
            + GlobalVariable.URL_SEPARATOR + sito_cod //sito
            + GlobalVariable.URL_SEPARATOR + prot_cod
            + GlobalVariable.URL_SEPARATOR + stato
            + GlobalVariable.URL_SEPARATOR + this.currentLat
            + GlobalVariable.URL_SEPARATOR + this.currentLon
            , token);//protocollo
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

    public getListaTipologieAttivita(serverUrl: string, categoria: any, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.ATTIVITA_GET_TIPOLOGIE_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER + GlobalVariable.URL_SEPARATOR + categoria

            , token);
    }

    public getListaImmaginiAttivita(serverUrl: string, key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.ATTIVITA_GET_IMMAGINI_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER + GlobalVariable.URL_SEPARATOR + "attivita" + GlobalVariable.URL_SEPARATOR + key, token);
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