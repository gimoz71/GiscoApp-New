import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class GiscoHttpInterceptor implements HttpInterceptor {

    public loaderToShow: any;
    public presentLoader = true;

    public pending: Array<string>;

    public loading: any;
    public isShowingLoading: boolean;

    constructor(
        public loadingCtrl: LoadingController
    ) {
        this.pending = new Array<string>();
        this.isShowingLoading = false;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var loading = request.params.get('Loading');
        if (loading === '1') {
            if (this.pending.length == 0) {
                this.pending.push(request.url);
                this.loading = this.loadingCtrl.create({
                    content: 'Caricamento Interceptor...',
                    duration: 5000
                });
                this.isShowingLoading = true;
                this.loading.onDidDismiss(() => this.isShowingLoading = false);
                this.loading.present();
            }
        }


        return next.handle(request).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                const index = this.pending.indexOf(event.url);
                if (index !== -1) {
                    this.pending.splice(index, 1);
                    if (this.pending.length === 0 && this.isShowingLoading) {
                        this.loading.dismiss();
                    }
                }
                console.log('event--->>>', event);
            }
            return event;
        }), catchError((err: HttpErrorResponse) => {
            return throwError(err);
        }));
    }
}
