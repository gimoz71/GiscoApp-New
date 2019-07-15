import { Injectable, ViewChild } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Observable } from "rxjs/Observable";
import { GlobalVariable } from '../../global';

import { Http } from '../../models/shared/http.namespace';
import { Nav } from 'ionic-angular';

@Injectable()
export class PrescrizioniService {

    @ViewChild(Nav) nav;

    constructor(private httpService: HttpService) {
    }

    public getPrescrizione(key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.PRESCRIZIONE_GET_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);
    }
}