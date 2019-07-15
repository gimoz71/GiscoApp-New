import { Error } from './../../models/shared/error.namespace';

import { Injectable } from "@angular/core";
import 'rxjs/add/observable/of';

@Injectable()
export class ErrorService{

    constructor(){}
    
    /**public sendError(url: string) : Observable<Error.ErrorResponse>{
        return this.http.get<Error.ErrorResponse>(url);
    }*/
    public sendError (data : Error.ErrorData){
        alert(data.message);
    }
}