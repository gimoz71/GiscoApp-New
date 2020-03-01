import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ActionSheetController, AlertController, Content } from 'ionic-angular';

import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Osservazione } from '../../../models/osservazione/osservazione.namespace';
import { OsservazioniService } from '../../../services/osservazioni/osservazioni.service';
import { Filtro } from '../../../models/filtro/filtro.namespace';
import { Sito } from '../../../models/sito/sito.namespace';
import { SitiService } from '../../../services/siti/siti.service';
import { DispositiviService } from '../../../services/dispositivi/dispositivi.service';
import { Dispositivo } from '../../../models/dispositivo/dispositivo.namespace';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { NuovaAssegnazionePage } from '../nuova-assegnazione/nuova-assegnazione';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DashboardChiusuraPage } from '../dashboard-chiusura/dashboard-chiusura';


@Component({
    selector: 'dashboard-osservazione',
    templateUrl: 'dashboard-osservazione.html'
})

export class DashboardOsservazionePage {

    private wsToken: Login.ws_Token;

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
    public titolo: string;
    public descrizione: string;
    public protocollo: string;
    private relativo: boolean;
    private options: GeolocationOptions;
    public whichPage: string;
    public currentPos: Geoposition;
    public esiste_dispositivo: boolean;

    public isInserimento: boolean;

    public listaAssegnazioni: Array<Osservazione.Assegnazione>;
    private listaImmagini: Array<Osservazione.Immagine>;
    private listaPersonalizzate: Array<Osservazione.ProprietaPersonalizzata>;

    private valoreSKey: number;

    color: string;
    icon: string;

    private callbackReload: any;
    private reloadOsservazioni: boolean;
    private dataRilevazione: string;
    public conclusa: boolean;

    private idSitoSelected: string;

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

        this.selectedOsservazione = this.navParams.get("selectedOsservazione");
        if (this.selectedOsservazione === undefined) {
            this.isInserimento = true;
        } else {
            this.isInserimento = false;
        }
        this.callbackReload = this.navParams.get("callbackReload")

        this.ws_Oss = new Osservazione.ws_Osservazione();
        this.whichPage = 'Osservazione';
        this.listaPersonalizzate = new Array<Osservazione.ProprietaPersonalizzata>();

        this.idSitoSelected = '0';

        this.listaTipologieDisp = new Array<Filtro.TipologiaDispositivo>();
        this.esiste_dispositivo = false;

    }

    ionViewDidEnter() {
        this.getUserPosition();
        this.reloadOsservazioni = false;
        let loading = this.loadingCtrl.create({
            content: 'Caricamento...',
            duration: 10000
        });
        loading.present();
        this.relativo = false;
        this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
            this.wsToken = val;
            loading.dismiss();
            this.inizializePage();
        });
    }

    private inizializePage(): void {
        let loading = this.loadingCtrl.create({
            content: 'Caricamento...',
            duration: 10000
        });
        this.osservazioniService.getListaTipologieOsservazione(this.storeService.getLocalServerUrl(), this.wsToken.token_value).subscribe(r => {
            this.listaTipologieOss = r.l_lista_tipologie;
            this.sitiService.getListaSitiAll(this.storeService.getLocalServerUrl(), this.wsToken.token_value).subscribe(r3 => {
                this.listaSiti = r3.l_lista_siti;
                for (let i = 0; i < this.listaSiti.length; i++) {
                    this.listaSiti[i].azCodiceRagione = this.listaSiti[i].az_codice_interno + " " + this.listaSiti[i].az_ragione_sociale;
                }
                if (this.selectedOsservazione != undefined) {
                    this.getOsservazione(this.selectedOsservazione.attivita_key);
                } else {
                    this.conclusa = false;
                    this.dataRilevazione = new Date().toISOString();
                }
                loading.dismiss();
                this.content.resize();

                if (this.selectedOsservazione === undefined) {
                    this.sitoSelezionato = this.listaSiti[0];
                }
            }, (error) => {
                loading.dismiss();
                this.presentAlert("", "errore recupero Lista Siti");
            })
        }, (error) => {
            loading.dismiss();
            this.presentAlert("", "errore recupero Lista Tipologie Osservazione");
        })
    }

    onSegmentChange() {
        this.content.resize();
    }
    getOsservazione(attivita_key: number) {
        console.log("setViewOsservazione");
        let loading = this.loadingCtrl.create({
            content: 'Caricamento...',
            duration: 10000
        });
        loading.present();
        this.osservazioniService.getOsservazione(this.storeService.getLocalServerUrl(), attivita_key, this.wsToken.token_value).subscribe(r => {
            console.log('ionViewDidLoad DashboardOsservazionePage getOsservazione');
            if (r.ErrorMessage.msg_code === 0) {
                this.selectedOsservazione = r.osservazione;
                this.listaAssegnazioni = r.c_assegnazioni;
                this.listaPersonalizzate = r.c_proprieta_personalizzate;
                console.log('getOsservazione ' + this.listaPersonalizzate.length);
                this.setViewOsservazione();
                this.osservazioniService.getListaImmaginiOsservazione(this.storeService.getLocalServerUrl(), this.selectedOsservazione.attivita_key, this.wsToken.token_value).subscribe(r => {
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
        this.idSitoSelected = this.sitoSelezionato.azienda_key + '';
        this.tipologiaOssSelezionata = this.listaTipologieOss.find(tipo => tipo.tab_tipo_scadenza_cod === this.selectedOsservazione.att_tipo_scadenza_cod)
        this.titolo = this.selectedOsservazione.att_titolo;
        this.descrizione = this.selectedOsservazione.att_descrizione;
        this.protocollo = this.selectedOsservazione.att_protocollo;
        this.dataRilevazione = this.selectedOsservazione.data_segnalazione;

        // col sito devo recuperare la lista delle tipologie
        let loading = this.loadingCtrl.create({
            content: 'Caricamento...',
            duration: 10000
        });
        this.dispositiviService.getListaTipologieDispositivo(this.storeService.getLocalServerUrl(), this.wsToken.token_value, this.idSitoSelected).subscribe(r2 => {
            this.listaTipologieDisp = r2.l_lista_tipologie;

            if (this.selectedOsservazione.att_dispositivo_key > 0) {

                this.esiste_dispositivo = true;
    
                this.relativo = true;
                if (this.listaTipologieDisp) {
                    this.tipologiaDispSelezionata = this.listaTipologieDisp.find(tipo => tipo.tab_tipo_dispositivo_desc === this.selectedOsservazione.tab_tipo_dispositivo_desc);
                }

                if (this.tipologiaDispSelezionata) {
                    this.setTipologiaDispositivo();
                }

            } else {
                this.relativo = false;
            }
        }, (error) => {
            loading.dismiss();
            this.presentAlert("", "errore recupero Lista Tipologie Dispositivo");
        })



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

    sitoSelected(event) {
        let loading = this.loadingCtrl.create({
            content: 'Caricamento...',
            duration: 10000
        });

        this.idSitoSelected = event.item.azienda_key;
        this.dispositiviService.getListaTipologieDispositivo(this.storeService.getLocalServerUrl(), this.wsToken.token_value, this.idSitoSelected).subscribe(r2 => {
            this.listaTipologieDisp = r2.l_lista_tipologie;
            this.esiste_dispositivo = false;
            if (this.listaTipologieDisp.length > 0) {
                this.esiste_dispositivo = true;
            }
            else {
                this.tipologiaDispSelezionata = null;
                this.dispositivoSelezionato = null;
            }
        }, (error) => {
            loading.dismiss();
            this.presentAlert("", "errore recupero Lista Tipologie Dispositivo");
        })
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
            content: 'Caricamento...',
            duration: 10000
        });
        loading.present();
        this.osservazioniService.getOsservazionePersonalizzati(this.storeService.getLocalServerUrl(), this.tipologiaOssSelezionata.tab_tipo_scadenza_cod, this.wsToken.token_value).subscribe(r => {
            this.listaPersonalizzate = r.c_proprieta_personalizzate;
            console.log("llistaPersonalizzate.le " + this.listaPersonalizzate.length);
            loading.dismiss();
        }, (error) => {
            loading.dismiss();
            this.presentAlert("", "errore recupero risorsa");
        });
    }

    setTipologiaDispositivo() {
        this.dispositivoSelezionato = undefined;
        let loading = this.loadingCtrl.create({
            content: 'Caricamento',
            duration: 10000
        });
        loading.present();
        if (this.tipologiaDispSelezionata && this.tipologiaDispSelezionata.tab_tipo_dispositivo_cod == 0) {
            this.tipologiaDispSelezionata.tab_tipo_dispositivo_cod = "A";
        }
        this.dispositiviService.getListaDispositiviSito(this.storeService.getLocalServerUrl(), this.wsToken.token_value, this.tipologiaDispSelezionata.tab_tipo_dispositivo_cod, this.idSitoSelected).subscribe(r => {
            this.listaDispositivi = r.l_lista_dispositivi;
            if (this.selectedOsservazione) {
                this.dispositivoSelezionato = this.listaDispositivi.find(disp => disp.dispositivi_key === this.selectedOsservazione.att_dispositivo_key)
            } loading.dismiss();
        }, (error) => {
            loading.dismiss();
            this.presentAlert("", "errore recupero risorsa");
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
                    this.ws_Oss.osservazione.att_protocollo = this.protocollo;
                    if ((this.relativo && this.dispositivoSelezionato) || !this.relativo) {
                        if (this.relativo) {
                            this.ws_Oss.osservazione.dis_titolo = this.dispositivoSelezionato.dis_titolo;
                            this.ws_Oss.osservazione.att_dispositivo_key = this.dispositivoSelezionato.dispositivi_key;
                            this.ws_Oss.osservazione.tab_tipo_dispositivo_cod = this.tipologiaDispSelezionata.tab_tipo_dispositivo_cod;
                            this.ws_Oss.osservazione.tab_tipo_dispositivo_desc = this.dispositivoSelezionato.tab_tipo_dispositivo_desc;
                        }
                        console.log("this.ws_Oss.osservazione " + this.tipologiaOssSelezionata.tab_tipo_scadenza_desc);
                        this.ws_Oss.c_proprieta_personalizzate = this.listaPersonalizzate;

                        this.ws_Oss.token = this.wsToken.token_value;
                        this.osservazioniService.salvaOsservazione(this.storeService.getLocalServerUrl(), this.ws_Oss).subscribe(r => {
                            console.log("salvaOsservazione " + JSON.stringify(this.ws_Oss));
                            if (r.ErrorMessage.msg_code == 0) {
                                this.reloadOsservazioni = true;
                                this.presentAlert("", "Osservazione è stata salvata correttamente");
                                this.getOsservazione(r.result_key);
                            } else {
                                this.presentAlert("", "Errore nell'salvataggio dell'osservazione");

                            }
                        });
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
            content: 'Caricamento...',
            duration: 10000
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
            this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
                ws_imm.token = val.token_value;
                ws_imm.oggetto_key = this.selectedOsservazione.attivita_key;
                ws_imm.tipologia = "attivita";
                ws_imm.immagine = imageData;

                console.log("image put" + JSON.stringify(ws_imm));
                this.osservazioniService.salvaImmagineOsservazione(this.storeService.getLocalServerUrl(), ws_imm).subscribe((r) => {
                    console.log(r);
                    if (r.ErrorMessage.msg_code == 0) {
                        this.presentAlert("", "immagine è stata salvata correttamente");
                        // ricaricare immagini - osservazione
                        this.osservazioniService.getListaImmaginiOsservazione(this.storeService.getLocalServerUrl(), this.selectedOsservazione.attivita_key, val.token_value).subscribe(r => {
                            if (r.ErrorMessage.msg_code === 0) {
                                this.listaImmagini = r.l_lista_immagini;
                            }
                            loading.dismiss();
                        })
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

    async presentAlertEliminaImmagine(imm: Osservazione.Immagine) {
        const alert = await this.alertCtrl.create({
            title: 'Conferma',
            message: 'Sicuro che vuoi cancellare questa immagine?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Si',
                    handler: () => {
                        this.goToEliminaImmagine(imm);
                    }
                }
            ]
        });

        await alert.present();
    }

    goToEliminaImmagine(imm: Osservazione.Immagine) {
        let loading = this.loadingCtrl.create({
            content: 'Caricamento...',
            duration: 10000
        });
        loading.present();
        var ws_imm = new Osservazione.ws_Immagine();
        this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
            ws_imm.token = val.token_value;
            ws_imm.immagine = imm;
            console.log("goToEliminaImmagine " + JSON.stringify(ws_imm));
            this.osservazioniService.cancellaImmagineOsservazione(this.storeService.getLocalServerUrl(), ws_imm).subscribe((r) => {
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

    async presentAlertConfirm(assegnazione) {
        const alert = await this.alertCtrl.create({
            title: 'Conferma',
            message: 'Sicuro che vuoi cancellare questa assegnazione?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Si',
                    handler: () => {
                        this.goToEliminaAssegnazione(assegnazione);
                    }
                }
            ]
        });

        await alert.present();
    }

    goToEliminaAssegnazione(assegnazione) {
        this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            let ws_Ass = new Osservazione.ws_Assegnazione();
            ws_Ass.assegnazione = assegnazione;
            ws_Ass.token = tokenValue;
            this.osservazioniService.cancellaAssegnazioneOsservazione(this.storeService.getLocalServerUrl(), ws_Ass).subscribe(r => {
                if (r.ErrorMessage.msg_code === 0) {
                    console.log(r);
                    this.listaAssegnazioni.splice(this.listaAssegnazioni.indexOf(assegnazione), 1);
                    this.presentAlert("", "Assegnazione eliminata");
                }
            },
                (error) => {
                    console.log(error);
                });
        });
    }

    goToNuovaAssegnazione() {
        if (this.idSitoSelected === undefined || this.idSitoSelected === '0') {
            this.presentAlert("", "Necessario selezionare un sito per associare una assegnazione");
        } else {
            this.navCtrl.push(NuovaAssegnazionePage, { osservazione: this.selectedOsservazione, callbackReload: this.reloadOsservazioneCallbackFunction, idSitoSelected: this.idSitoSelected });
        }

    }

    reloadOsservazioneCallbackFunction = (result_key, oss: Osservazione.Osservazione) => {
        return new Promise((resolve, reject) => {
            //  this.test = _params;
            this.getOsservazione(result_key);
            resolve();
        });
    }

    async presentAlertEliminaOsservazione() {
        const alert = await this.alertCtrl.create({
            title: 'Conferma',
            message: 'Sicuro che vuoi cancellare questa osservazione?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Si',
                    handler: () => {
                        this.goToEliminaOsservazione();
                    }
                }
            ]
        });

        await alert.present();
    }

    goToEliminaOsservazione() {

        this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            let ws_Oss = new Osservazione.ws_Osservazione();
            ws_Oss.osservazione = this.selectedOsservazione;
            ws_Oss.token = tokenValue;
            this.osservazioniService.cancellaOsservazione(this.storeService.getLocalServerUrl(), ws_Oss).subscribe(r => {
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
        for (const entry of this.listaPersonalizzate) {
            if (entry.tipo_attivita_proprieta_key === key) {
                entry.c_valori[0].ta_selected = ($event.value ? 'S' : 'N');
                entry.c_valori[1].ta_selected = ($event.value ? 'N' : 'S');
            }
        }
    }

    presentAlert(title: string, mess: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: mess,
            buttons: ['Ok']
        });
        alert.present();
    }

    hideDate(dateString: string) {
        const date = new Date(dateString);
        return date.getFullYear() === 1;
    }
}
