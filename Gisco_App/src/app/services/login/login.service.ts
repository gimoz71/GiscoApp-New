import { Injectable } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs";
import { Login } from "../../models/login/login.namespace";
import { GlobalVariable } from "../../global";

import { Http } from "../../models/shared/http.namespace";
import { Common } from "../../models/common/common.namespace";

@Injectable()
export class LoginService {

    private notificheSubject: Subject<Common.NotificaList[]> = new Subject<Common.NotificaList[]>();
    public notifiche = this.notificheSubject.asObservable();

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

    public wakeupNotifiche(not: Common.NotificaList[]): void {
        this.notificheSubject.next(not);
    }
}