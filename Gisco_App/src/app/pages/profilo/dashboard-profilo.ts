import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform, ToastController, ActionSheetController } from 'ionic-angular';

import { Dipendente } from '../../models/dipendente/dipendente.namespace';
import { ProfiloService } from '../../services/profilo/profilo.service';
import { StoreService } from '../../services/store/store.service';
import { Login } from '../../models/login/login.namespace';

import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera/';


/**
 * Generated class for the DashboardSitoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-dashboard-profilo',
    templateUrl: 'dashboard-profilo.html',
})

export class DashboardProfiloPage {
    private imageURI: any;
    private imageFileName: any;
    private profilo: Dipendente.Dipendente;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public profiloService: ProfiloService,
        private storeService: StoreService,
        private camera: Camera,
        private actionSheetCtrl: ActionSheetController,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController) {
        this.profilo = new Dipendente.Dipendente();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DashboardProfiloPage');
        let loading = this.loadingCtrl.create({
            content: 'Caricamento...'
        });
        loading.present();
        this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            console.log("val " + val.token_dipendente_key);
            this.profiloService.getProfilo(val.token_dipendente_key, tokenValue).subscribe(r => {
                console.log('ionViewDidLoad DashboardProfiloPage getProfilo');
                console.log("facebook " + r);
                if (r.ErrorMessage.msg_code === 0) {
                    this.profilo = r.dipendente;
                    console.log("this.profilo.nome " + this.profilo.nome);
                } else {
                    console.log("errore " + r.ErrorMessage.msg_testo);
                    this.presentAlert("","errore modifica avatar")
                }
                loading.dismiss();
            })
        });
    }

    presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Modifica avatar',
            buttons: [
                {
                    text: 'Galleria',
                    handler: () => {
                        this.changeAvatar("gallery");
                    }
                },
                {
                    text: 'Fotocamera',
                    handler: () => {
                        this.changeAvatar("camera");
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

    changeAvatar(mode) {
        let options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        }

        if (mode == "camera") {
            options = {
                quality: 100,
                destinationType: this.camera.DestinationType.DATA_URL,
                sourceType: this.camera.PictureSourceType.CAMERA
            }
        }

        this.camera.getPicture(options).then((imageData) => {
            let loading = this.loadingCtrl.create({
                content: 'Caricamento...'
              });
              loading.present();
            this.imageURI = imageData;
            this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
            this.profiloService.changeAvatar(this.imageURI, val).subscribe((r) => {
                    console.log(r);
                    if (r.ErrorMessage.msg_code == 0) {
                        this.profilo.url_avatar=this.imageURI;
                    } else {
                        this.presentAlert("","errore modifica avatar")
                    }
                    loading.dismiss();
                });
            })
        }, (err) => {
            console.log(err);
        });

    }

    public changePassword() {
        const prompt = this.alertCtrl.create({
            title: 'Cambio Password',
            message: "inserisci i dati",
            inputs: [
                {
                    name: 'old',
                    placeholder: 'password corrente'
                },
                {
                    name: 'new',
                    placeholder: 'Nuova password'
                },
                {
                    name: 'repeat',
                    placeholder: 'reinserisci nuova passoword'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => { }
                },
                {
                    text: 'Send',
                    handler: data => {
                        if (this.checkPassword(data.old) == true) {
                            if (data.new.length > 5) {
                                if (data.new == data.repeat) {
                                    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
                                        var tokenValue = val.token_value;
                                        this.profiloService.changePassword(tokenValue, data.old, data.new, data.repeat).subscribe((r) => {
                                            if (r.ErrorMessage.msg_code == 0) {
                                                this.presentAlert("","password cambiata correttamente");
                                            } else {
                                                console.log(r);
                                                this.presentAlert("","errore modifica password");
                                            }
                                        });
                                    })
                                } else {
                                    this.presentAlert("","le password non corrispondono");
                                }
                            } else {
                                this.presentAlert("","la password deve essere più lunga di 5 caratteri");
                            }
                        } else {
                            this.presentAlert("","password corrente non corretta");
                        }
                    }
                }
            ],
            enableBackdropDismiss: false
        });
        prompt.present();
    }

    checkPassword(old): boolean {
        return true;
    }
    presentAlert(title:string, mess:string) {
        let alert = this.alertCtrl.create({
          title: title,
          subTitle: mess,
          buttons: ['Ok']
        });
        alert.present();
      }

}