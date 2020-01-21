import { Login } from './../../models/login/login.namespace';

import { CheckService } from './../shared/check.service';
import { LoginService } from './../login/login.service';
import { Storage } from '@ionic/storage';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class StoreService {

    private ud: Login.ws_Token;
    private userData: Subject<Login.ws_Token> = new Subject<Login.ws_Token>();
    public userData$ = this.userData.asObservable();

    private serverUrl: string;

    constructor(private storage: Storage,
        private check: CheckService,
        private login: LoginService) {
        this.ud = null;
        this.initializeServerUrl();
    }
    /*
        public getUserData(): Login.ws_Token {
            if (this.ud == null) {
                //store service prima inizializzaione
                this.storage.get("userData").then((val: Login.ws_Token) => {
                    //recuperato token dal database
                    if (val != null && val.ErrorMessage.msg_code == 0) {
                        //controllo la validità del token
                        this.check.checkToken(val).subscribe(
                            (r) => {
                                //token corretto lo invio
                                if (r.ErrorMessage.msg_code == 0) {
                                    this.ud = r;
                                    this.userData.next(r);
                                } else {
                                    //token non corretto faccio il login
                                    this.login.login(val.m_token_user, val.m_token_password).subscribe(
                                        (rl: Login.ws_Token) => {
                                            console.log("log userdata 1");
                                            this.setUserData(rl);
                                            if (rl.ErrorMessage.msg_code == 0) {
                                                this.ud = rl;
                                                this.userData.next(rl);
                                            }
                                        }
                                    );
                                }
                            }
                        )
                    } else {
                        //devo andare alla pagina del login
                        this.userData.next(null);
                    }
                })
            } else {
                //store service già inizializzato
                this.check.checkToken(this.ud).subscribe(
                    //check sul token
                    (r: Login.ws_Token) => {
                        //token valido lo invio
                        if (r.ErrorMessage.msg_code == 0) {
                            this.userData.next(r);
                        } else {
                            this.login.login(r.m_token_user, r.m_token_password).subscribe(
                                //token non valido faccio il login
                                (rl: Login.ws_Token) => {
                                    console.log("log userdata 2");
                                    if (rl.ErrorMessage.msg_code == 0) {
                                        this.setUserData(rl);
                                        this.ud = rl;
                                        this.userData.next(rl);
                                    } else {
                                        alert("login non riuscito");
                                    }
                                }
                            );
                        }
                    }
                )
            }
            return this.ud;
        };*/

    public initializeServerUrl(): void {
        if (this.serverUrl == null || this.serverUrl == "") {
            this.storage.get("serverUrl").then((val: string) => {
                this.serverUrl = val;
            })
        }
    }

    public setServer(serverUrl: string): number {
        console.log("setServerName");
        this.serverUrl = serverUrl;
        if (serverUrl != null) {
            this.storage.set("serverUrl", serverUrl).then((val) => {
                console.log("salvata url del server");
                this.serverUrl = serverUrl;
            });
        } else {
            return -1
        }
        return 1;
    }

    public getServerUrl() {
        return new Promise(resolve => {
            if (this.serverUrl == null) {
                this.storage.get("serverUrl").then((val: string) => {
                    resolve(val);
                })
            } else {
                resolve(this.serverUrl);
            }
        });
    }

    public getLocalServerUrl(): string {
        return this.serverUrl;
    }

    public setUserData(udata: Login.ws_Token): number {
        console.log("setUserData");
        this.ud = udata;
        if (udata != null) {
            this.storage.set("userData", udata).then((val) => {
                console.log(val);
            });
        } else {
            return -1
        }
        return 1;
    };

    public getUserDataPromise(serverUrl: string) {
        return new Promise(resolve => {
            if (this.ud == null) {
                //store service prima inizializzaione
                this.storage.get("userData").then((val: Login.ws_Token) => {
                    //recuperato token dal database
                    console.log(val);
                    if (val != null && val.ErrorMessage.msg_code == 0) {
                        //controllo la validità del token
                        this.check.checkToken(serverUrl, val.token_value).subscribe(
                            (r) => {
                                console.log(r);
                                //token corretto lo invio
                                if (r.ErrorMessage.msg_code == 0) {
                                    resolve(val);
                                } else {
                                    //token non corretto faccio il login
                                    this.login.login(this.serverUrl, val.token_user, val.token_password, val.firebase_token).subscribe(
                                        (rl: Login.ws_Token) => {
                                            console.log(rl);
                                            console.log("log userdata 1");

                                            if (rl.ErrorMessage.msg_code == 0) {
                                                this.setUserData(rl);
                                                this.ud = rl;
                                                resolve(rl)
                                            } else {
                                                console.log("errore login 4");
                                                this.setUserData(null);
                                                this.ud = null;
                                                resolve(null);
                                            }
                                        }
                                    );
                                }
                            }
                        )
                    } else {
                        console.log("login non riuscito");
                        this.setUserData(null);
                        this.ud = null;
                        //devo andare alla pagina del login
                        resolve(null);
                    }
                })
            } else {
                //store service già inizializzato
                this.check.checkToken(this.serverUrl, this.ud.token_value).subscribe(
                    //check sul token
                    (r: Login.ws_Token) => {
                        //token valido lo invio
                        if (r.ErrorMessage.msg_code == 0) {
                            resolve(this.ud);
                        } else {
                            this.login.login(this.serverUrl, this.ud.token_user, this.ud.token_password, this.ud.firebase_token).subscribe(
                                //token non valido faccio il login
                                (rl: Login.ws_Token) => {
                                    console.log("log userdata 3");
                                    console.log(rl);
                                    if (rl.ErrorMessage.msg_code == 0) {
                                        this.setUserData(rl);
                                        this.ud = rl;
                                        resolve(rl);
                                    } else {
                                        resolve(null);
                                        this.setUserData(null);
                                        this.ud = null;
                                        console.log("login non riuscito 1");
                                    }
                                }
                            );
                        }
                    }
                )
            }
        })
    }
}