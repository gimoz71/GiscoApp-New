import { Injectable } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Observable } from "rxjs/Observable";
import { Login } from "../../models/login/login.namespace";
import { GlobalVariable } from "../../global";

import { Http } from "../../models/shared/http.namespace";

@Injectable()
export class LoginService {

    constructor(private httpService: HttpService) {
    };

    public login(serverUrl: string, username: string, password: string): Observable<Login.ws_Token> {
        return this.httpService.getToken(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + username 
            + GlobalVariable.URL_SEPARATOR + password);
    };

    public checkServerValidity(serverUrl: string): Observable<Http.HttpResponse> {
        return this.httpService.getNoToken(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.URL_SEPARATOR + GlobalVariable.PING_KEYWORD);
    }
}