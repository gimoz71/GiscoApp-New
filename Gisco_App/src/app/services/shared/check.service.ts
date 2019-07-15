
import { Observable } from 'rxjs/Observable';
import { Login } from './../../models/login/login.namespace';

import { Injectable } from '@angular/core';
import { GlobalVariable } from '../../global';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CheckService {

 //   constructor(private storage: Storage) {}
     constructor(private http: HttpClient){}

    /**public sendError(url: string) : Observable<Error.ErrorResponse>{
        return this.http.get<Error.ErrorResponse>(url);
    }*/

    public checkToken(token : string): Observable<Login.ws_Token> {
        console.log("checkToken");
            return this.http.get<Login.ws_Token>(GlobalVariable.BASE_API_URL + GlobalVariable.URL_CHECK_TOKEN
            + GlobalVariable.URL_SEPARATOR+token);

     /*   //test
        var t = token;
        t.ErrorMessage = new Login.MessaggioErrore();
        t.ErrorMessage.msg_code = 0;
    
        return Observable.of(t);*/
    }
}