import { Injectable, ViewChild } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Observable } from "rxjs/Observable";
import { GlobalVariable } from '../../global';

import { Http } from '../../models/shared/http.namespace';
import { Nav } from 'ionic-angular';
import { Messaggio } from "../../models/messaggio/messaggio.namespace";

@Injectable()
export class MessaggiService {

    @ViewChild(Nav) nav;
    messaggiService: string[];

    constructor(private httpService: HttpService) {
    }

    public getMessaggio(key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_GET_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);
    }
    /*I = Ricevuto
    O = Inviato
    D = Cestinato
    P = Preferito
     */
    public getListaMessaggiRicevuti(token: string, filter:string, from:any, to:any): Observable<Http.HttpResponse> {
        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + from//from
            + GlobalVariable.URL_SEPARATOR + to
            + GlobalVariable.URL_SEPARATOR + "I"
            + GlobalVariable.URL_SEPARATOR + filter, token);
    }

    public getListaMessaggiCestino(token: string, filter:string, from:any, to:any): Observable<Http.HttpResponse> {
        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + from//from
            + GlobalVariable.URL_SEPARATOR + to
            + GlobalVariable.URL_SEPARATOR + "D"
            + GlobalVariable.URL_SEPARATOR + filter, token);
    }

    public getListaMessaggiUscita(token: string, filter:string, from:any, to:any): Observable<Http.HttpResponse> {
        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + from//from
            + GlobalVariable.URL_SEPARATOR + to
            + GlobalVariable.URL_SEPARATOR + "O"
            + GlobalVariable.URL_SEPARATOR + filter, token);
    }
    public getListaMessaggiImportanti(token: string, filter:string, from:any, to:any): Observable<Http.HttpResponse> {
        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + from//from
            + GlobalVariable.URL_SEPARATOR + to
            + GlobalVariable.URL_SEPARATOR + "P"
            + GlobalVariable.URL_SEPARATOR + filter, token);
    }


    public getDipendentiAttivi(token: string) {
        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_GET_CONTATTI_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + "S", token);
    }

    /*  public GetContactDetails(key : number){
 
          return new Promise((resolve, reject) => {
              this.store.getUserDataPromise().then(
                  (token :Login.Token)=>{
                      if (key == -1) key = token.token_dipendente_key ;
                      let url = "http://allinappws.mesys.it/services/get_scheda_dipendente/"+ token.token_value+"/"+ key;
                      console.log(url);
                      let s = this.http.get<Contact.ContactDataFull>(url).subscribe(
                          (r : Contact.ContactDataFull)=>{
                              if (r.ErrorMessage.msg_code==0){
                                  resolve(r.dipendente);
                              }else{
                                  reject(r.ErrorMessage);
                              }
                              
                              s.unsubscribe();
                          }  
                      )
                  }
              )
              
          });
      }*/
    /*  Mette o toglie dai preferito
  Con stato:
  N=toglie
  S=mette*/
    public setStarMessage(key: number, stato: string, token: string) {
        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_SET_STAR_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key
            + GlobalVariable.URL_SEPARATOR + stato, token);
    }

    public setDeleteMessage(key: number, token: string) {
        return this.httpService.get(GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_SET_DELETED_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key
            + GlobalVariable.URL_SEPARATOR, token);
    }


    public deleteMessage(mess) {
        return this.httpService.post(GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_DELET_KEYWORD
            + GlobalVariable.URL_SEPARATOR, mess);
    }

    public sendMessage(mess: Messaggio.BustaMessaggio): Observable<Http.HttpResponse> {
        return this.httpService.post(GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_SALVA_KEYWORD, mess);
    }

}