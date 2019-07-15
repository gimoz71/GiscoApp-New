import { StoreService } from './../../services/store/store.service';
import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from "../login/login";
import { Login } from '../../models/login/login.namespace';

/**
 * Generated class for the LoadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  constructor(public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private store: StoreService) {
    /* this.presentLoadingDefault();
     this.store.userData$.subscribe(val =>{
       console.log(val);
       if (val != null){
         this.navCtrl.setRoot(HomePage, {val: 'pippo'});
       }else{
         this.navCtrl.setRoot(LoginPage, {val: 'pippo'});
       }
     })
     this.store.getUserData();
 */
  }
  ionViewDidLoad() {
    this.presentLoadingDefault();

    this.store.getUserDataPromise().then((val: Login.ws_Token) => {
      if (val != null) {
        this.navCtrl.setRoot(HomePage);
      } else {
        this.navCtrl.setRoot(LoginPage);
      }
    }
    )

  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }


}
