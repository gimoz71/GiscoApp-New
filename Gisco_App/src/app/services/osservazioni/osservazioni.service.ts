import { Injectable, ViewChild } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Observable } from "rxjs/Observable";
import { GlobalVariable } from '../../global';

import { Http } from '../../models/shared/http.namespace';
import { Nav } from 'ionic-angular';
import { Osservazione } from "../../models/osservazione/osservazione.namespace";

import { GeolocatedService } from "../shared/geolocated.service";
import { Geoposition } from "@ionic-native/geolocation/ngx";

@Injectable()
export class OsservazioniService {

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

    public getListaOsservazioni(serverUrl: string, token: string, tipo_cod: any, sito_cod: string, prot_cod: string, from: number, to: number): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.OSSERVAZIONI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + from
            + GlobalVariable.URL_SEPARATOR + to
            + GlobalVariable.URL_SEPARATOR + tipo_cod //tipo
            + GlobalVariable.URL_SEPARATOR + sito_cod //sito
            + GlobalVariable.URL_SEPARATOR + prot_cod
            + GlobalVariable.URL_SEPARATOR + this.currentLat
            + GlobalVariable.URL_SEPARATOR + this.currentLon
            , token);
    }

    public getOsservazione(serverUrl: string, key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.OSSERVAZIONI_GET_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);
    }

    public getOsservazioneChiusura(serverUrl: string, key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.OSSERVAZIONI_GET_CHIUSURA_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);
    }

    public salvaOsservazione(serverUrl: string, osservazione: Osservazione.ws_Osservazione): Observable<Http.HttpResponse> {
        return this.httpService.post(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.OSSERVAZIONI_SALVA_KEYWORD
            + GlobalVariable.URL_SEPARATOR, osservazione);
    }

    public cancellaOsservazione(serverUrl: string, osservazione: Osservazione.ws_Osservazione): Observable<Http.HttpResponse> {
        return this.httpService.post(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.OSSERVAZIONI_DELET_KEYWORD
            + GlobalVariable.URL_SEPARATOR, osservazione);
    }

    public getOsservazionePersonalizzati(serverUrl: string, tipo: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.OSSERVAZIONI_GET_PERSONALIZZATI_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + tipo, token);
    }

    public getListaTipologieOsservazione(serverUrl: string, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.OSSERVAZIONI_GET_TIPOLOGIA_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER, token);
    }

    public getListaImmaginiOsservazione(serverUrl: string, key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.OSSERVAZIONI_GET_IMMAGINI_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER + GlobalVariable.URL_SEPARATOR + key, token);
    }

    public salvaImmagineOsservazione(serverUrl: string, immagine: Osservazione.ws_SendImage): Observable<Http.HttpResponse> {
        return this.httpService.post(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.OSSERVAZIONI_SALVA_IMMAGINE_KEYWORD
            + GlobalVariable.URL_SEPARATOR, immagine);
    }

    public salvaChiusuraOsservazione(serverUrl: string, osservazione: Osservazione.ws_Osservazione_Chiusura): Observable<Http.HttpResponse> {
        return this.httpService.post(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.OSSERVAZIONI_SALVA_CHIUSURA_KEYWORD
            + GlobalVariable.URL_SEPARATOR, osservazione);
    }

    public cancellaImmagineOsservazione(serverUrl: string, osservazione: Osservazione.ws_Immagine): Observable<Http.HttpResponse> {
        return this.httpService.post(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.OSSERVAZIONI_DELET_IMMAGINE_KEYWORD
            + GlobalVariable.URL_SEPARATOR, osservazione);
    }

    public salvaAssegnazioneOsservazione(serverUrl: string, assegnazione: Osservazione.ws_Assegnazione): Observable<Http.HttpResponse> {
        return this.httpService.post(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.OSSERVAZIONI_SALVA_ASSEGNAZIONE_KEYWORD
            + GlobalVariable.URL_SEPARATOR, assegnazione);
    }

    public cancellaAssegnazioneOsservazione(serverUrl: string, assegnazione: Osservazione.ws_Assegnazione): Observable<Http.HttpResponse> {
        return this.httpService.post(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.OSSERVAZIONI_DELET_ASSEGNAZIONE_KEYWORD
            + GlobalVariable.URL_SEPARATOR, assegnazione);
    }

    public getCommentiOsservazione(serverUrl: string, token: string, key: number): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.OSSERVAZIONI_GET_COMMENTI_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);
    }

    public salvaCommentoOsservazione(serverUrl: string, commento: Osservazione.ws_Commento): Observable<Http.HttpResponse> {
        return this.httpService.post(GlobalVariable.BASE_API_URL + GlobalVariable.OSSERVAZIONI_SALVA_COMMENTO_KEYWORD
            + GlobalVariable.URL_SEPARATOR, commento);
    }

    public cancellaCommentoOsservazione(serverUrl: string, commento: Osservazione.ws_Commento): Observable<Http.HttpResponse> {
        return this.httpService.post(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.OSSERVAZIONI_DELET_COMMENTO_KEYWORD
            + GlobalVariable.URL_SEPARATOR, commento);
    }

}