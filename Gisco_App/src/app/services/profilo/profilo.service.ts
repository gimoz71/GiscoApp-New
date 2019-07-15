import { Injectable, ViewChild } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Observable } from "rxjs/Observable";
import { GlobalVariable } from '../../global';

import { Http } from '../../models/shared/http.namespace';
import { Nav } from 'ionic-angular';
import { Login } from "../../models/login/login.namespace";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ProfiloService {

    @ViewChild(Nav) nav;
    sitiService: string[];

    constructor(private httpService: HttpService,private http: HttpClient) {
    }

    public getProfilo(key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.PROFILO_GET_SCHEDA_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);
    }

    public changePassword(token, oldPsw: string, newPsw: string, rep: string): Observable<Http.HttpResponse> {
        let body = {
            dipendenti_key: token.token_dipendente_key,
            password: oldPsw,
            password_new: newPsw,
            password_rep: rep,
            token: token.token_value
        };
        return this.httpService.post(GlobalVariable.BASE_API_URL + GlobalVariable.PROFILO_CHANGE_PSW_KEYWORD, body);
    }

    public changeAvatar(imm, token: Login.ws_Token): Observable<Http.HttpResponse> {
        let body = {
            token: token,
            dipendenti_key: token.token_dipendente_key,
            immagine: imm
        }
        return this.httpService.post(GlobalVariable.BASE_API_URL + GlobalVariable.PROFILO_CHANGE_AVATAR_KEYWORD, body);
    }
}