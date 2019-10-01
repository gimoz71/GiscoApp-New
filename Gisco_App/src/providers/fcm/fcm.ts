import { Injectable } from '@angular/core';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Platform, AlertController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  constructor(
    public firebaseNative: FirebaseX,
    public afs: AngularFirestore,
    private platform: Platform,
    private alertController: AlertController
  ) {}

  async presentAlert(message: string) {
    let alert = this.alertController.create({
        title: 'Conferma',
        message: message,
        buttons: ['OK']
      });
      alert.present();
  }

  // Get permission from the user
  public getToken() { 
    //let token;

    //if (this.platform.is('android')) {
      //token = await this.firebaseNative.getToken();
    //} 

    // if (this.platform.is('ios')) {
    //   //token = await this.firebaseNative.getToken();
    //   await this.firebaseNative.grantPermission();
    // } 

    //return this.saveTokenToFirestore(token);
    this.firebaseNative.getToken();
  }

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    this.presentAlert("Salvataggio token: " + token + " su storage");
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onMessageReceived();
  }


}
