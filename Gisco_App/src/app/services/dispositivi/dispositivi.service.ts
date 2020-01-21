import { Injectable, ViewChild } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Observable } from "rxjs/Observable";
import { GlobalVariable } from '../../global';

import { Http } from '../../models/shared/http.namespace';
import { Nav } from 'ionic-angular';

import { GeolocatedService } from "../shared/geolocated.service";
import { Geoposition } from "@ionic-native/geolocation/ngx";


@Injectable()
export class DispositiviService {

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

    public getListaDispositiviAll(serverUrl: string, token: string): Observable<Http.HttpResponse> {

        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.DISPOSITIVI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + "0" //from
            + GlobalVariable.URL_SEPARATOR + "0" //to
            + GlobalVariable.URL_SEPARATOR + "A" //tipologia
            + GlobalVariable.URL_SEPARATOR + "A" //provincia
            + GlobalVariable.URL_SEPARATOR + "A"
            + GlobalVariable.URL_SEPARATOR + this.currentLat
            + GlobalVariable.URL_SEPARATOR + this.currentLon, token);//libero
    }

    public getListaDispositivi(serverUrl: string, token: string, tipologia_cod: any, provincia_cod: string, campoLibero): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.DISPOSITIVI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + "0" //from
            + GlobalVariable.URL_SEPARATOR + "0" //to
            + GlobalVariable.URL_SEPARATOR + tipologia_cod //tipologia
            + GlobalVariable.URL_SEPARATOR + provincia_cod //provincia
            + GlobalVariable.URL_SEPARATOR + campoLibero
            + GlobalVariable.URL_SEPARATOR + this.currentLat
            + GlobalVariable.URL_SEPARATOR + this.currentLon
            , token);//libero
    }

    public getListaDispositiviSito(serverUrl: string, token: string, tipologia_cod: any, sito_cod: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.DISPOSITIVI_GET_ELENCO_SITO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + tipologia_cod //tipologia
            + GlobalVariable.URL_SEPARATOR + sito_cod
            , token);//libero
    }

    public getDispositivo(serverUrl: string, key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.DISPOSITIVI_GET_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);//id dispositivo 
    }

    public getListaProvinceDispositivo(serverUrl: string, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.GET_PROVINCE_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + "46" //tipoddl
            + GlobalVariable.URL_SEPARATOR + "N" //filtro
            + GlobalVariable.URL_SEPARATOR + "N" //ordina
            + GlobalVariable.URL_SEPARATOR + "N" //componi
            + GlobalVariable.URL_SEPARATOR + "N" //primovuoto
            + GlobalVariable.URL_SEPARATOR + "Tutti", token);//primotutti
    }

    public getListaTipologieDispositivo(serverUrl: string, token: string, sito_cod: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.DISPOSITIVI_GET_TIPOLOGIE_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + sito_cod, token);
    }
}