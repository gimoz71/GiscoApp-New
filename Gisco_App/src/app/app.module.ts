import { ErrorService } from './services/shared/error.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { IonicSelectableModule } from 'ionic-selectable';

// #REGION - Modules
import { LoginModule } from './modules/login/login.module';
import { HomeModule } from './modules/home/home.module';
import { LoadingModule } from './modules/loading/loading.module';
import { ElencoSitiModule } from './modules/siti/elencoSiti/elencoSiti.module';
import { MappaSitiModule } from './modules/siti/mappaSiti/mappaSiti.module';
import { DashboardSitoModule } from './modules/siti/dashboardSito/dashboardSito.module';
import { ComponentsModule } from './modules/componenti/components.module';
import { ElencoDispositiviModule } from './modules/dispositivi/elencoDispositivi/elencoDispositivi.module';
import { MappaDispositiviModule } from './modules/dispositivi/mappaDispositivi/mappaDispositivi.module';
import { DashboardDispositivoModule } from './modules/dispositivi/DashboardDispositivo/dashboardDispositivo.module';
import { ChatModule } from './modules/chat/chat.module';
import { CartelleModule } from './modules/documenti/cartelle/cartelle.module';
import { AgmCoreModule } from '@agm/core';
import { ElencoDocumentiModule } from './modules/documenti/elencoDocumenti/elencoDocumenti.module';

// #REGION - Pages
import { LoadingPage } from './pages/loading/loading';
import { LoginPage } from './pages/login/login';
import { HomePage } from './pages/home/home';

//    SITI
import { ElencoSitiPage } from './pages/siti/elenco-siti/elenco-siti';
import { MappaSitiPage } from './pages/siti/mappa-siti/mappa-siti';
import { DashboardSitoPage } from './pages/siti/dashboard-sito/dashboard-sito';

//    DISPOSITIVI
import { ElencoDispositiviPage } from './pages/dispositivi/elenco-dispositivi/elenco-dispositivi';
import { DashboardDispositivoPage } from './pages/dispositivi/dashboard-dispositivo/dashboard-dispositivo';
import { MappaDispositiviPage } from './pages/dispositivi/mappa-dispositivi/mappa-dispositivi';

//    CHAT
import { ChatPage } from './pages/chat/chat';

//    DOCUMENTI
import { CartellePage } from './pages/documenti/cartelle/cartelle';
import { ElencoDocumentiPage } from './pages/documenti/elenco-documenti/elenco-documenti';

// #REGION - Components
//import { ProgressBarComponent } from './components/progress-bar/progress-bar';

// #REGION - Services
import { HttpService } from './services/shared/http.service';
import { LoginService } from './services/login/login.service';
import { IonicStorageModule } from '@ionic/storage';
import { StoreService } from './services/store/store.service';
import { SitiService } from './services/siti/siti.service';
import { DispositiviService } from './services/dispositivi/dispositivi.service';
import { CheckService } from './services/shared/check.service';
import { DocumentiService } from './services/documenti/documenti.service';
import { ElencoTipologieModule } from './modules/documenti/elencoTipologie/elencoTipologie.module';
import { TipologiePage } from './pages/documenti/elenco-tipologie/elenco-tipologie';
import { DashboardDocumentoModule } from './modules/documenti/dashboardDocumento/dashboardDocumento.module';
import { DashboardDocumentoPage } from './pages/documenti/dashboard-documento/dashboard-documento';
import { ElencoMessaggiPage } from './pages/messaggi/elenco-messaggi/elenco-messaggi';
import { ElencoMessaggiModule } from './modules/messaggi/elencoMessaggi/elencoMessaggi.module';
import { MessaggiService } from './services/messaggi/messaggi.service';
import { NuovoMessaggioPage } from './pages/messaggi/nuovo-messaggio/nuovo-messaggio';
import { NuovoMessaggioModule } from './modules/messaggi/nuovoMessaggio/nuovoMessaggio.module';
import { UscitaMessaggiModule } from './modules/messaggi/uscitaMessaggi/uscitaMessaggi.module';
import { UscitaMessaggiPage } from './pages/messaggi/uscita-messaggi/uscita-messaggi';
import { CestinoMessaggiModule } from './modules/messaggi/cestinoMessaggi/cestinoMessaggi.module';
import { DetailsMessaggioModule } from './modules/messaggi/detailsMessaggio/detailsMessaggio.module';
import { ImportantiMessaggiModule } from './modules/messaggi/importantiMessaggi/importantiMessaggi.module';
import { CestinoMessaggiPage } from './pages/messaggi/cestino-messaggi/cestino-messaggi';
import { DetailsMessaggioPage } from './pages/messaggi/details-messaggio/details-messaggio';
import { ImportantiMessaggiPage } from './pages/messaggi/importanti-messaggi/importanti-messaggi';
import { DashboardProfiloModule } from './modules/profilo/dashboardProfilo/dashboardProfilo.module';
import { DashboardProfiloPage } from './pages/profilo/dashboard-profilo';
import { ProfiloService } from './services/profilo/profilo.service';
import { Camera } from '@ionic-native/camera/';
import { ElencoProcedimentiModule } from './modules/procedimenti/elencoProcedimenti/elencoProcedimenti.modile';
import { ElencoProcedimentiPage } from './pages/procedimenti/elenco-procedimenti/elenco-procedimenti';
import { ProcedimentiService } from './services/procedimenti/procedimenti.service';
import { DashboardProcedimentoModule } from './modules/procedimenti/dashboardProcedimento/dashboardProcedimento.module';
import { DashboardProcedimentoPage } from './pages/procedimenti/dashboard-procedimento/dashboard-procedimento';
import { ElencoComunicazioniPage } from './pages/comunicazioni/elenco-comunicazioni/elenco-comunicazioni';
import { ElencoComunicazioniModule } from './modules/comunicazioni/elencoComunicazioni/elencoComunicazioni.module';
import { ComunicazioniService } from './services/comunicazioni/comunicazioni.service';
import { DashboardComunicazionePage } from './pages/comunicazioni/dashboard-comunicazione/dashboard-comunicazione';
import { DashboardComunicazioneModule } from './modules/comunicazioni/dashboardComunicazione/dashboardComunicazione.module';
import { DashboardPrescrizioneModule } from './modules/prescrizioni/dashboardPrescrizione/dashboardPrescrizione.module';
import { DashboardPrescrizionePage } from './pages/prescrizioni/dashboard-prescrizione/dashboard-prescrizione';
import { PrescrizioniService } from './services/prescrizioni/prescrizioni.service';
import { ElencoOsservazioniModule } from './modules/osservazioni/elencoOsservazioni/elencoOsservazioni.module';
import { ElencoOsservazioniPage } from './pages/osservazioni/elenco-osservazioni/elenco-osservazioni';
import { OsservazioniService } from './services/osservazioni/osservazioni.service';
import { DashboardOsservazioneModule } from './modules/osservazioni/dashboardOsservazione/dashboardOsservazione.module';
import { NuovaAssegnazioneModule } from './modules/osservazioni/nuovaAssegnazione/nuovaAssegnazione.module';
import { NuovaAssegnazionePage } from './pages/osservazioni/nuova-assegnazione/nuova-assegnazione';
import { Geolocation } from '@ionic-native/geolocation';
import { DashboardOsservazionePage } from './pages/osservazioni/dashboard-osservazione/dashboard-osservazione';
import { DashboardChiusuraModule } from './modules/osservazioni/dashboardChiusura/dashboardOsservazione.module';
import { DashboardChiusuraPage } from './pages/osservazioni/dashboard-chiusura/dashboard-chiusura';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ElencoAttivitaPage } from './pages/attivita/elenco-attivita/elenco-attivita';
import { ElencoAttivitaModule } from './modules/attivita/elencoAttivita/elencoAttivita.module';
import { DashboardAttivitaModule } from './modules/attivita/dashboardAttivita/dashboardAttivita.module';
import { DashboardAttivitaPage } from './pages/attivita/dashboard-attivita/dashboard-attivita';
import { AttivitaService } from './services/attivita/attivita.service';
import { Firebase } from '@ionic-native/firebase';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule,
    BrowserModule,
    LoginModule,
    HttpClientModule,
    HomeModule,
    LoadingModule,
    ElencoSitiModule,
    MappaSitiModule,
    DashboardSitoModule,
    ElencoDispositiviModule,
    MappaDispositiviModule,
    DashboardDispositivoModule,
    ComponentsModule,
    ChatModule,
    CartelleModule,
    ElencoTipologieModule,
    ElencoDocumentiModule,
    DashboardDocumentoModule,
    ElencoMessaggiModule,
    UscitaMessaggiModule,
    NuovoMessaggioModule,
    CestinoMessaggiModule,
    DetailsMessaggioModule,
    ImportantiMessaggiModule,
    DashboardProfiloModule,
    ElencoProcedimentiModule,
    DashboardProcedimentoModule,
    IonicSelectableModule,
    ElencoComunicazioniModule,
    DashboardComunicazioneModule,
    DashboardPrescrizioneModule,
    ElencoOsservazioniModule,
    NuovaAssegnazioneModule,
    DashboardOsservazioneModule,
    DashboardChiusuraModule,
    ElencoAttivitaModule,
    DashboardAttivitaModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyBdH99WPCCNOhcDXI_kAwmn93FuNfA_Nh8'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    LoadingPage,
    ElencoSitiPage,
    MappaSitiPage,
    DashboardSitoPage,
    ElencoDispositiviPage,
    MappaDispositiviPage,
    DashboardDispositivoPage,
    ElencoDocumentiPage,
    TipologiePage,
    CartellePage,
    DashboardDocumentoPage,
    ChatPage,
    ElencoMessaggiPage,
    NuovoMessaggioPage,
    UscitaMessaggiPage,
    ImportantiMessaggiPage,
    DetailsMessaggioPage,
    CestinoMessaggiPage,
    DashboardProfiloPage,
    ElencoProcedimentiPage,
    DashboardProcedimentoPage,
    ElencoComunicazioniPage,
    DashboardComunicazionePage,
    DashboardPrescrizionePage,    
    ElencoOsservazioniPage,
    NuovaAssegnazionePage,
    DashboardOsservazionePage,
    DashboardChiusuraPage,
    ElencoAttivitaPage,
    DashboardAttivitaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StoreService,
    HttpService,
    LoginService,
    ErrorService,
    Storage,
    SitiService,
    MessaggiService,
    DispositiviService,
    CheckService,
    DocumentiService,
    ProfiloService,
    ProcedimentiService,
    Camera, 
    Geolocation,
    ComunicazioniService,
    PrescrizioniService,
    OsservazioniService,
    AttivitaService,
    DatePicker,
    Firebase,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
  exports: [
    ComponentsModule
  ]
})
export class AppModule { }
