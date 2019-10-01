import { LoadingPage } from './pages/loading/loading';

import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { Storage } from '@ionic/storage';

import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { ElencoSitiPage } from './pages/siti/elenco-siti/elenco-siti';
import { MappaSitiPage } from './pages/siti/mappa-siti/mappa-siti';
import { ElencoDispositiviPage } from './pages/dispositivi/elenco-dispositivi/elenco-dispositivi';
import { MappaDispositiviPage } from './pages/dispositivi/mappa-dispositivi/mappa-dispositivi';
import { CartellePage } from './pages/documenti/cartelle/cartelle';
import { ElencoMessaggiPage } from './pages/messaggi/elenco-messaggi/elenco-messaggi';
import { DashboardProfiloPage } from './pages/profilo/dashboard-profilo';
import { ElencoProcedimentiPage } from './pages/procedimenti/elenco-procedimenti/elenco-procedimenti';
import { ElencoOsservazioniPage } from './pages/osservazioni/elenco-osservazioni/elenco-osservazioni';
import { ElencoAttivitaPage } from './pages/attivita/elenco-attivita/elenco-attivita';

import { CommonService } from './services/shared/common.service';
import { StoreService} from './services/store/store.service';
import { AlertService } from './services/shared/alert.service';

import { Login } from './models/login/login.namespace';

import { FirebaseX } from '@ionic-native/firebase-x/ngx';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = LoadingPage;//home
  pages: Array<{ title: string, component: any, icon: any }>;
  private pagineSenzaMenu: Array<string> = new Array("LoadingPage", "LoginPage");

  private numNotifiche_attivita = 0;
  private numNotifiche_osservazioni = 0;
  private numNotifiche_prescrizioni= 0;
  private numNotifiche_messaggi = 0;
  private numNotifiche_commenti_at = 0;
  private numNotifiche_commenti_os = 0;

  public viewMenu: boolean = false;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    private storage: Storage,
    public splashScreen: SplashScreen,
    public commonService: CommonService,
    public storeService: StoreService,
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public firebaseNative: FirebaseX,
    public alertService: AlertService
  ) {

    this.platform.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      this.initializeApp();
    });

    // set our app's pages
    this.pages = [
        { title: 'Home', component: HomePage, icon: 'home' },
        { title: 'Elenco Siti', component: ElencoSitiPage, icon: 'list-box' },
        { title: 'Mappa Siti', component: MappaSitiPage, icon: 'navigate' },
        { title: 'Elenco Dispositivi', component: ElencoDispositiviPage, icon: 'list-box' },
        { title: 'Mappa Dispositivi', component: MappaDispositiviPage, icon: 'navigate' },
        { title: 'Documenti', component: CartellePage, icon: 'document' },
        { title: 'Messaggi', component: ElencoMessaggiPage, icon: 'chatboxes' },
        { title: 'Procedimenti', component: ElencoProcedimentiPage, icon: 'home' },
        { title: 'Osservazioni', component: ElencoOsservazioniPage, icon: 'eye' },
        { title: 'Attività', component: ElencoAttivitaPage, icon: 'analytics' },
        { title: 'Profilo', component: DashboardProfiloPage, icon: 'person' },
    ];
  }

  async initializeApp() {
    this.storeService.initizlizeServerUrl();

    var piattaforma = "";
    if(this.platform.is("mobileweb")){
      piattaforma = "mobileweb";
    }
    if(this.platform.is("ios")){
      piattaforma = "ios";
    }
    if(this.platform.is("android")){
      piattaforma = "android";
    }
    

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    //carico le notifiche per le pagine nel menu
    this.storeService.getUserDataPromise().then((val: Login.ws_Token) => {
      if(val != null){
        var tokenValue = val.token_value;
        this.commonService.getNotifiche(tokenValue).subscribe(r => {
          var notifiche = r.l_notifiche;
          for (let notifica of notifiche) {
            switch(notifica.notifica_type){
              case "attivita": {
                if(notifica.notifica_count){
                  this.numNotifiche_attivita = notifica.notifica_count;
                }
              }
              case "osservazioni": {
                if(notifica.notifica_count){
                  this.numNotifiche_osservazioni = notifica.notifica_count;
                }
              }
              case "prescrizioni": {
                if(notifica.notifica_count){
                  this.numNotifiche_prescrizioni = notifica.notifica_count;
                }
              }
              case "messaggi": {
                if(notifica.notifica_count){
                  this.numNotifiche_messaggi = notifica.notifica_count;
                }
              }
              case "commenti_at": {
                if(notifica.notifica_count){
                  this.numNotifiche_commenti_at = notifica.notifica_count;
                }
              }
              case "commenti_os": {
                if(notifica.notifica_count){
                  this.numNotifiche_commenti_os = notifica.notifica_count;
                }
              }
            }
          }
          console.log('ADESSO POSSO RENDERIZZARE LA LISTA');
          this.viewMenu = true;
        });
      } else {
        // devo effettuare il login
        this.nav.setRoot(LoginPage);
      }
      
    });

              // Listen to incoming messages
    this.firebaseNative.onMessageReceived().subscribe(message =>{
      let id = 0;
      console.log("TIPO NOTIFICA: " + message.tipo_notifica);
      this.alertService.presentAlertNewPage(this.nav, message.tipo_notifica, id);
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  public logOut() {
    this.storage.clear();
    this.menu.close();
    this.nav.setRoot(LoginPage);
  };

  public getNumeroNotifiche(titolo: string): string {
    var toReturn = '';
    switch(titolo){
      case "Attività": 
        if(this.numNotifiche_attivita > 0){
          toReturn = this.numNotifiche_attivita+'';
        }
        break;
      case "Osservazioni": 
        if(this.numNotifiche_osservazioni > 0){
            toReturn = this.numNotifiche_osservazioni + '';
        }
        break;
      case "Prescrizioni": 
        if(this.numNotifiche_prescrizioni > 0){
            toReturn = this.numNotifiche_prescrizioni + '';
        }
        break;
      case "Messaggi": 
        if(this.numNotifiche_messaggi > 0){
            toReturn = this.numNotifiche_messaggi + '';
        }
        break;
      case "Commenti Attivita": 
        if(this.numNotifiche_commenti_at > 0){
            toReturn = this.numNotifiche_commenti_at + '';
        }
        break;
      case "Commenti Osservazioni": 
        if(this.numNotifiche_commenti_os > 0){
            toReturn = this.numNotifiche_commenti_os + '';
        }
        break;
      default: 
        toReturn = '';
        break;
    }

    return toReturn;
  }

}