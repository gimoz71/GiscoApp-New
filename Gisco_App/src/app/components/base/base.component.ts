import { OnInit } from "@angular/core";
import { SessionService } from "../../services/shared/sessionService";
import { StoreService } from "../../services/store/store.service";
import { Login } from "../../models/login/login.namespace";
import { NavController, LoadingController } from "ionic-angular";
import { LoginPage } from "../../pages/login/login";
import { AlertService } from "../../services/shared/alert.service";
import { Subject } from "rxjs";

export class BaseComponent {

    protected tokenValue: string;
    protected myUserKey: number;
    protected token_dipendente_key: number;
    private loader: any;

    private wsTokenSubject: Subject<boolean> = new Subject<boolean>();
    public wsTokenObservable = this.wsTokenSubject.asObservable();

    constructor(
        public sessionService: SessionService,
        public storeService: StoreService,
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public alertService: AlertService) {
        this.tokenValue = '';
        this.myUserKey = 0;
        this.token_dipendente_key = 0;
    }

    protected ngInitializeBase(): void {
        const sessionToken = this.sessionService.get(this.sessionService.TOKEN_KEY);
        if (sessionToken === undefined || sessionToken === null || sessionToken === '') {
            // manca il token di sessione, lo recupero
            this.showLoader();
            this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
                this.hideLoader();
                if (val === null) {
                    this.wsTokenSubject.next(false);
                    this.navCtrl.setRoot(LoginPage);
                } else {
                    this.tokenValue = val.token_value;
                    this.myUserKey = val.token_dipendente_key;
                    this.token_dipendente_key = val.token_dipendente_key;
                    this.wsTokenSubject.next(true);
                }
            }, err => {
                this.wsTokenSubject.next(false);
                this.hideLoader();
                console.log('si è presentato un errore');
                this.manageError(err);
            });
        } else {
            // il token di sesisone è presente, lo uso
            this.tokenValue = sessionToken;
        }
    }

    protected showLoader(): void {
        this.loader = this.loadingCtrl.create({
            content: 'Caricamento...'
        });
        this.loader.present();
    }

    protected hideLoader(): void {
        this.loader.dismiss();
    }

    protected manageError(err: any): void {
        this.alertService.presentErrorAlert(JSON.stringify(err));
    }
}