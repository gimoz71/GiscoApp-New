import { Injectable, ErrorHandler } from "@angular/core";
import { AlertController } from 'ionic-angular';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(public alertController: AlertController){}

    handleError(error: any): void{
        this.presentErrorAlert(error.message);
        throw error;
    }

    private async presentErrorAlert(message: string) {
        let alert = this.alertController.create({
            title: 'Errore',
            message: message,
            buttons: ['CHIUDI']
          });
          alert.present();
      }
}