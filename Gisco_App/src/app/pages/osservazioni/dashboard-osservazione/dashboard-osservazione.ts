import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ActionSheetController, AlertController, Content } from 'ionic-angular';

import { StoreService } from '../../../services/store/store.service';
import { Dipendente } from '../../../models/dipendente/dipendente.namespace';
import { Login } from '../../../models/login/login.namespace';
import { Osservazione } from '../../../models/osservazione/osservazione.namespace';
import { OsservazioniService } from '../../../services/osservazioni/osservazioni.service';
import { Filtro } from '../../../models/filtro/filtro.namespace';
import { Sito } from '../../../models/sito/sito.namespace';
import { SitiService } from '../../../services/siti/siti.service';
import { DispositiviService } from '../../../services/dispositivi/dispositivi.service';
import { Dispositivo } from '../../../models/dispositivo/dispositivo.namespace';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { NuovaAssegnazionePage } from '../nuova-assegnazione/nuova-assegnazione';
import { Camera, CameraOptions } from '@ionic-native/camera/';
import { DashboardChiusuraPage } from '../dashboard-chiusura/dashboard-chiusura';


@Component({
    selector: 'dashboard-osservazione',
    templateUrl: 'dashboard-osservazione.html'
})

export class DashboardOsservazionePage {
    public listaTipologieOss: Array<Filtro.TipologiaOsservazione>;
    public listaTipologieDisp: Array<Filtro.TipologiaDispositivo>;
    public listaDispositivi: Array<Dispositivo.Dispositivo>;
    public listaSiti: Array<Sito.Sito>;
    public tipologiaOssSelezionata: Filtro.TipologiaOsservazione;
    public tipologiaDispSelezionata: Filtro.TipologiaDispositivo;
    public sitoSelezionato: Sito.Sito;
    public dispositivoSelezionato: Dispositivo.Dispositivo;
    private ws_Oss: Osservazione.ws_Osservazione;
    private selectedOsservazione: Osservazione.Osservazione;
    private titolo: string;
    private descrizione: string;
    private relativo: boolean;
    private options: GeolocationOptions;
    private currentPos: Geoposition;
    private whichPage: string;

    private listaAssegnazioni: Array<Osservazione.Assegnazione>;
    private listaImmagini: Array<Osservazione.Immagine>;
    private listaPersonalizzate: Array<Osservazione.ProprietaPersonalizzata>;

    private valoreSKey: number;

    color: string;
    icon: string;
    private callbackReload: any;
    private reloadOsservazioni: boolean;
    private dataRilevazione: string;
    private conclusa: boolean;
    @ViewChild(Content) content: Content;


    constructor(private navCtrl: NavController,
        private osservazioniService: OsservazioniService,
        private sitiService: SitiService,
        private dispositiviService: DispositiviService,
        private storeService: StoreService,
        private navParams: NavParams,
        private loadingCtrl: LoadingController,
        private actionSheetCtrl: ActionSheetController,
        private alertCtrl: AlertController,
        private camera: Camera,
        private geolocation: Geolocation) {
        this.selectedOsservazione = this.navParams.get("selectedOsservazione")
        this.callbackReload = this.navParams.get("callbackReload")

        this.ws_Oss = new Osservazione.ws_Osservazione();
        this.whichPage = 'Osservazione';
        this.listaPersonalizzate = new Array<Osservazione.ProprietaPersonalizzata>();
    }

    ionViewDidLoad() {
        this.getUserPosition();
        this.reloadOsservazioni = false;
        let loading = this.loadingCtrl.create({
            content: 'Caricamento...'
        });
        loading.present();
        this.relativo = false;
        this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            this.osservazioniService.getListaTipologieOsservazione(tokenValue).subscribe(r => {
                this.listaTipologieOss = r.l_lista_tipologie;
                this.dispositiviService.getListaTipologieDispositivo(tokenValue).subscribe(r => {
                    this.listaTipologieDisp = r.l_lista_tipologie;
                    this.sitiService.getListaSitiAll(tokenValue).subscribe(r => {
                        this.listaSiti = r.l_lista_siti;
                        for (let i = 0; i < this.listaSiti.length; i++) {
                            this.listaSiti[i].azCodiceRagione = this.listaSiti[i].az_codice_interno + " " + this.listaSiti[i].az_ragione_sociale;
                        }
                        if (this.selectedOsservazione != undefined) {
                            this.getOsservazione(tokenValue, this.selectedOsservazione.attivita_key);
                        } else {
                            this.conclusa = false;
                            this.dataRilevazione = new Date().toISOString();
                        }
                        loading.dismiss();
                        this.content.resize();

                    }, (error) => {
                        loading.dismiss();
                        this.presentAlert("", "errore recupero Lista Siti");
                    })
                }, (error) => {
                    loading.dismiss();
                    this.presentAlert("", "errore recupero Lista Tipologie Dispositivo");

                })
            }, (error) => {
                loading.dismiss();
                this.presentAlert("", "errore recupero Lista Tipologie Osservazione");
            })
        });
    }
    onSegmentChange() {
        this.content.resize();
    }
    getOsservazione(tokenValue: string, attivita_key: number) {
        console.log("setViewOsservazione");
        let loading = this.loadingCtrl.create({
            content: 'Caricamento...'
        });
        loading.present();
        this.osservazioniService.getOsservazione(attivita_key, tokenValue).subscribe(r => {
            console.log('ionViewDidLoad DashboardOsservazionePage getOsservazione');
            if (r.ErrorMessage.msg_code === 0) {
                this.selectedOsservazione = r.osservazione;
                this.listaAssegnazioni = r.c_assegnazioni;
                this.listaPersonalizzate = r.c_proprieta_personalizzate;
                console.log('getOsservazione ' + this.listaPersonalizzate.length);
                this.setViewOsservazione();
                this.osservazioniService.getListaImmaginiOsservazione(this.selectedOsservazione.attivita_key, tokenValue).subscribe(r => {
                    if (r.ErrorMessage.msg_code === 0) {
                        this.listaImmagini = r.l_lista_immagini;
                    }
                    loading.dismiss();
                })
            } else {
                loading.dismiss();
                this.presentAlert("", "errore recupero Osservazione");
            }
        })

    }

    setViewOsservazione() {
        this.sitoSelezionato = this.listaSiti.find(sito => sito.azienda_key === this.selectedOsservazione.att_azienda_key)
        this.tipologiaOssSelezionata = this.listaTipologieOss.find(tipo => tipo.tab_tipo_scadenza_cod === this.selectedOsservazione.att_tipo_scadenza_cod)
        this.titolo = this.selectedOsservazione.att_titolo;
        this.descrizione = this.selectedOsservazione.att_descrizione;
        this.dataRilevazione = this.selectedOsservazione.data_segnalazione;
        if (this.selectedOsservazione.att_dispositivo_key > 0) {
            this.relativo = true;
            this.tipologiaDispSelezionata = this.listaTipologieDisp.find(tipo => tipo.tab_tipo_dispositivo_desc === this.selectedOsservazione.tab_tipo_dispositivo_desc)
            this.setTipologiaDispositivo();
        } else {
            this.relativo = false;
        }

        this.selectedOsservazione.att_conclusa === "S" ? this.conclusa = true : this.conclusa = false;
        console.log("this.conclusa " + this.conclusa);
    }

    getUserPosition() {
        this.options = {
            enableHighAccuracy: true
        };
        this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
            this.currentPos = pos;
            console.log(pos);

        }, (err: PositionError) => {
            console.log("error : " + err.message);
        });
    }

    filterPorts(ports: Array<Sito.Sito>, text: string) {
        return ports.filter(port => {
            return port.az_codice_interno.toLowerCase().indexOf(text) !== -1 ||
                port.az_ragione_sociale.toLowerCase().indexOf(text) !== -1
        });
    }

    sitoChange(event: {
        component: IonicSelectableComponent,
        text: string
    }) {
        if (event.text) {
            let text = event.text.trim().toLowerCase();
            event.component.startSearch();
            if (!text || text == "") {
                event.component.items = this.listaSiti;
                event.component.endSearch();
                return;
            }
            event.component.items = this.filterPorts(this.listaSiti, text);
            event.component.endSearch();
        }
    }

    tipologiaChanged() {
        this.dispositivoSelezionato = undefined;
        let loading = this.loadingCtrl.create({
        });
        loading.present();
        this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            this.osservazioniService.getOsservazionePersonalizzati(this.tipologiaOssSelezionata.tab_tipo_scadenza_cod, tokenValue).subscribe(r => {
                this.listaPersonalizzate = r.c_proprieta_personalizzate;
                console.log("llistaPersonalizzate.le " + this.listaPersonalizzate.length);
                loading.dismiss();
            }, (error) => {
                loading.dismiss();
                this.presentAlert("", "errore recupero risorsa");
            })
        });
    }

    setTipologiaDispositivo() {
        this.dispositivoSelezionato = undefined;
        let loading = this.loadingCtrl.create({
        });
        loading.present();
        this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            if (this.tipologiaDispSelezionata.tab_tipo_dispositivo_cod == 0) {
                this.tipologiaDispSelezionata.tab_tipo_dispositivo_cod = "A";
            }
            this.dispositiviService.getListaDispositivi(tokenValue, this.tipologiaDispSelezionata.tab_tipo_dispositivo_cod, "A", "A").subscribe(r => {
                this.listaDispositivi = r.l_lista_dispositivi;
                if (this.selectedOsservazione) {
                    this.dispositivoSelezionato = this.listaDispositivi.find(disp => disp.dispositivi_key === this.selectedOsservazione.att_dispositivo_key)
                } loading.dismiss();
            }, (error) => {
                loading.dismiss();
                this.presentAlert("", "errore recupero risorsa");
            })

        });
    }

    back() {
        if (this.reloadOsservazioni != undefined && this.callbackReload != undefined) {
            this.callbackReload(this.reloadOsservazioni).then(() => {
                this.navCtrl.pop();
            });
        } else {
            this.navCtrl.pop();
        }
    }

    public salvaOsservazione() {
        console.log("this.dataRilevazione " + this.dataRilevazione);

        this.ws_Oss.osservazione = new Osservazione.Osservazione();
        if (this.selectedOsservazione) {
            this.ws_Oss.osservazione = this.selectedOsservazione
        } else {
            this.ws_Oss.osservazione.att_conclusa = "N";
        }
        if (this.tipologiaOssSelezionata != undefined) {
            this.ws_Oss.osservazione.tab_tipo_scadenza_desc = this.tipologiaOssSelezionata.tab_tipo_scadenza_desc;
            this.ws_Oss.osservazione.att_tipo_scadenza_cod = this.tipologiaOssSelezionata.tab_tipo_scadenza_cod;

            if (this.sitoSelezionato != undefined) {
                this.ws_Oss.osservazione.att_azienda_key = this.sitoSelezionato.azienda_key;
                this.ws_Oss.osservazione.az_codice_interno = this.sitoSelezionato.az_codice_interno;
                this.ws_Oss.osservazione.az_ragione_sociale = this.sitoSelezionato.az_ragione_sociale;

                this.ws_Oss.osservazione.data_segnalazione = this.dataRilevazione;
                if (this.titolo && this.titolo.trim() != "") {
                    this.ws_Oss.osservazione.att_titolo = this.titolo;
                    this.ws_Oss.osservazione.att_descrizione = this.descrizione;
                    if ((this.relativo && this.dispositivoSelezionato) || !this.relativo) {
                        if (this.relativo) {
                            this.ws_Oss.osservazione.dis_titolo = this.dispositivoSelezionato.dis_titolo;
                            this.ws_Oss.osservazione.att_dispositivo_key = this.dispositivoSelezionato.dispositivi_key;
                            this.ws_Oss.osservazione.tab_tipo_dispositivo_desc = this.dispositivoSelezionato.tab_tipo_dispositivo_desc;
                        }
                        console.log("this.ws_Oss.osservazione " + this.tipologiaOssSelezionata.tab_tipo_scadenza_desc);
                        this.ws_Oss.c_proprieta_personalizzate = this.listaPersonalizzate;

                        this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
                            var tokenValue = val.token_value;
                            this.ws_Oss.token = tokenValue;
                            this.osservazioniService.salvaOsservazione(this.ws_Oss).subscribe(r => {
                                console.log("salvaOsservazione " + JSON.stringify(this.ws_Oss));
                                if (r.ErrorMessage.msg_code == 0) {
                                    this.reloadOsservazioni = true;
                                    this.presentAlert("", "Osservazione è stata salvata correttamente");
                                    this.getOsservazione(tokenValue, r.result_key);
                                } else {
                                    this.presentAlert("", "Errore nell'salvataggio dell'osservazione");

                                }
                            });
                        })
                    } else {
                        this.presentAlert("", "devi selezionare un dispositivo");
                    }
                } else {
                    this.presentAlert("", "Osservazione è obbligatoria");
                }
            } else {
                this.presentAlert("", "Sito è obbligatorio");
            }
        } else {
            this.presentAlert("", "Tipologia è obbligatoria");
        }
    }

    chiudiOsservazione() {
        this.navCtrl.push(DashboardChiusuraPage, { osservazione: this.selectedOsservazione, callbackChiusa: this.chiudiCallbackFunction });
    }

    chiudiCallbackFunction = (chiudi) => {
        return new Promise((resolve, reject) => {
            //  this.test = _params;
            if (chiudi) {
                this.selectedOsservazione.att_conclusa = "S";
                this.conclusa = true;
            }
            resolve();
        });
    }

    segmentOsservazioneClicked(event) {
        console.log('segmentOsservazioneClicked');
    }

    segmentAssegnazioniClicked(event) {
        console.log('segmentAssegnazioniClicked');
    }

    segmentImmaginiClicked(event) {
        console.log('segmentImmaginiClicked');
    }

    presentImmagineActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Modifica avatar',
            buttons: [
                {
                    text: 'Galleria',
                    handler: () => {
                        this.addImmagine("gallery");
                    }
                },
                {
                    text: 'Fotocamera',
                    handler: () => {
                        this.addImmagine("camera");
                    }
                },
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }


    addImmagine(mode) {
        let loading = this.loadingCtrl.create({
            content: 'Caricamento...'
        });
        loading.present();
        let options: CameraOptions;
        if (mode === "camera") {
            options = {
                quality: 100,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            }
        } else {
            options = {
                quality: 100,
                destinationType: this.camera.DestinationType.DATA_URL,
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
            }
        }

        this.camera.getPicture(options).then((imageData) => {
            console.log('ionViewDidLoad DashboardOsservazionePage');
            var ws_imm = new Osservazione.ws_SendImage();
            this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
                ws_imm.token = val.token_value;
                ws_imm.oggetto_key = this.selectedOsservazione.attivita_key;
                ws_imm.tipologia = "attivita";
                ws_imm.immagine = imageData;

                console.log("image put" + JSON.stringify(ws_imm));
                this.osservazioniService.salvaImmagineOsservazione(ws_imm).subscribe((r) => {
                    console.log(r);
                    if (r.ErrorMessage.msg_code == 0) {
                        this.presentAlert("", "immagine è stata salvata correttamente")
                    } else {
                        this.presentAlert("", "errore salvataggio immagine " + r.ErrorMessage.msg_testo);
                    }
                    loading.dismiss();
                });
            })
        }, (err) => {
            loading.dismiss();
            console.log(err);
            console.log("err");
        });

    }

    goToEliminaImmagine(imm: Osservazione.Immagine) {
        let loading = this.loadingCtrl.create({
            content: 'Caricamento...'
        });
        loading.present();
        var ws_imm = new Osservazione.ws_Immagine();
        this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
            ws_imm.token = val.token_value;
            ws_imm.immagine = imm;
            console.log("goToEliminaImmagine " + JSON.stringify(ws_imm));
            this.osservazioniService.cancellaImmagineOsservazione(ws_imm).subscribe((r) => {
                console.log(r);
                if (r.ErrorMessage.msg_code == 0) {
                    this.listaImmagini.splice(this.listaImmagini.indexOf(imm), 1);
                } else {
                    this.presentAlert("", "errore eliminazione immagine " + r.ErrorMessage.msg_testo);
                }
                loading.dismiss();
            });
        })
    }

    goToEliminaAssegnazione(assegnazione) {
        this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            let ws_Ass = new Osservazione.ws_Assegnazione();
            ws_Ass.assegnazione = assegnazione;
            ws_Ass.token = tokenValue;
            this.osservazioniService.cancellaAssegnazioneOsservazione(ws_Ass).subscribe(r => {
                if (r.ErrorMessage.msg_code === 0) {
                    console.log(r);
                    this.listaAssegnazioni.splice(this.listaAssegnazioni.indexOf(assegnazione), 1);
                    this.presentAlert("", "Assegnazione eliminata");
                }
            },
                (error) => {
                    console.log(error);
                })
        })
    }

    goToNuovaAssegnazione() {
        this.navCtrl.push(NuovaAssegnazionePage, { osservazione: this.selectedOsservazione });
    }

    goToEliminaOsservazione() {
        this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            let ws_Oss = new Osservazione.ws_Osservazione();
            ws_Oss.osservazione = this.selectedOsservazione;
            ws_Oss.token = tokenValue;
            this.osservazioniService.cancellaOsservazione(ws_Oss).subscribe(r => {
                if (r.ErrorMessage.msg_code === 0) {
                    console.log(r);
                    this.reloadOsservazioni = true;
                    this.back();
                    this.presentAlert("", "osservazione eliminata");
                }
            },
                (error) => {
                    console.log(error);
                })
        })
    }

    valoreSChanged(c_valori: Array<Osservazione.Valore>) {
        console.log("valoreSKey " + this.valoreSKey);
        for (var i = 0; i < c_valori.length; i++) {
            console.log("for valoreSKey " + c_valori[i].tipo_attivita_proprieta_valori_key);
            if (c_valori[i].tipo_attivita_proprieta_valori_key == this.valoreSKey)
                c_valori[i].ta_selected = "S";
            else
                c_valori[i].ta_selected = "N";
        }
    }

    valoreMChanged(valori_key, proprieta_key) {
        console.log("valori_key " + valori_key);
        console.log("proprieta_key " + proprieta_key);
        var p = this.listaPersonalizzate.find(item => item.tipo_attivita_proprieta_key == proprieta_key)
        var v = p.c_valori.find(val => val.tipo_attivita_proprieta_valori_key == valori_key)
        if (v.ta_selected == "S")
            v.ta_selected = "N";
        else
            v.ta_selected = "S";
    }

    valoreTChanged(event: any, key: number) {
        console.log("key " + key);
        console.log("event " + event.value);
        var p = this.listaPersonalizzate.find(item => item.tipo_attivita_proprieta_key == key)
        console.log("key " + p.ta_proprieta);
        p.attivita_valori.ta_valore_t = event.value;
    }

    valoreDChanged($event, key: number) {
        var p = this.listaPersonalizzate.find(item => item.tipo_attivita_proprieta_key == key)
        console.log("key " + p.ta_proprieta);
        p.attivita_valori.ta_valore_d = $event.year + "-" + $event.month + "-" + $event.day + "T00:00:00"
    }

    valoreNChanged(event, key: number) {
        var p = this.listaPersonalizzate.find(item => item.tipo_attivita_proprieta_key == key)
        console.log("key " + p.ta_proprieta);
        p.attivita_valori.ta_valore_n = event.value;
    }

    valoreOChanged($event, key: number) {
        var p = this.listaPersonalizzate.find(item => item.tipo_attivita_proprieta_key == key)
        console.log("key " + key);
        console.log('event : ' + $event.value);
        if ($event == true) {
            p.c_valori[0].ta_selected = "S"
            p.c_valori[1].ta_selected = "N"
        } else {
            p.c_valori[1].ta_selected = "S"
            p.c_valori[0].ta_selected = "N"
        }
        /* for (var i = 0; i < p.c_valori.length; i++) {
           if (p.c_valori[i].ta_selected == undefined || p.c_valori[i].ta_selected != "S") {
             p.c_valori[i].ta_selected = "S"
           } else {
             p.c_valori[i].ta_selected = "N"
           }
         }*/
        //   p.attivita_valori.ta_valore_n = event.value;
    }

    presentAlert(title: string, mess: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: mess,
            buttons: ['Ok']
        });
        alert.present();
    }
}
