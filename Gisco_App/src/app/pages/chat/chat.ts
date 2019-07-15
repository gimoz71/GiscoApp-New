import { Nav, NavParams } from "ionic-angular";
import { StoreService } from "../../services/store/store.service";
import { Component } from "@angular/core";

declare var CCCometChat: any;

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})

export class ChatPage {

    licenseKey: string = "Z8AZN-TX6NP-3KETR-LDF4L-SF1LP"; // Replace the value with your CometChat License Key;
    apiKey: string = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // Replace the value with your CometChat Api Key;

    constructor(public navParams: NavParams,
        private storeService: StoreService,
        private nav: Nav ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ChatPage');
        this.initializeChat();

    }
    initializeChat() {
        //The initializeCometChat() must only be called once in the entire scope of the app.
        // We suggest you call the initializeCometChat() method on app startup.
        CCCometChat.initializeCometChat("", this.licenseKey, this.apiKey, true, response => {
            alert("Inside Success Callback " + response);
            this.login("pippo");
        }, error => {
            alert("Fail Callback " + error);
        });
    }

    login(UID) {
        CCCometChat.loginWithUID(UID, response => {
            this.launchChat();
            alert("Logged in as : " + UID + " Response : " + response);
        }, error => {
            alert("Login failure Callback " + error);
        });
    }

    launchChat() {
        var isFullScreen = true;
        alert("Launching CometChat");
        CCCometChat.launchCometChat(isFullScreen, data => {

            CCCometChat.getPlatform(currentplatform => {

                if (currentplatform.platform == "Android") {
                    data = JSON.parse(data);
                    if (data.hasOwnProperty('userInfoCallback')) {
                       /* this.fcm.subscribeToTopic(data.userInfoCallback.push_channel);
                        this.fcm.onNotification().subscribe(data => {
                            if (data.wasTapped) {
                                console.log("Received in background" + JSON.stringify(data));

                            } else {
                                console.log("Received in foreground" + JSON.stringify(data));
                            };

                        });*/
                    } else if (data.hasOwnProperty('chatroomInfoCallback')) {
                        if (data.chatroomInfoCallback.hasOwnProperty('action') 
                        && data.chatroomInfoCallback.action != "" && data.chatroomInfoCallback.action == "join") {
                           /* this.fcm.subscribeToTopic(data.chatroomInfoCallback.push_channel);
                          this.fcm.onNotification().subscribe(data => {
                                if (data.wasTapped) {
                                    console.log("Received in background" + JSON.stringify(data));

                                } else {
                                    console.log("Received in foreground" + JSON.stringify(data));
                                };

                            });*/
                        }

                    }

                } else {

                    data = JSON.stringify(data);
                    data = JSON.parse(data);
                    if (data.hasOwnProperty('userInfoCallback')) {
                       /* this.fcm.subscribeToTopic(data.userInfoCallback.push_channel);
                        this.fcm.onNotification().subscribe(data => {
                            if (data.wasTapped) {
                                console.log("Received in background" + JSON.stringify(data));

                            } else {
                                console.log("Received in foreground" + JSON.stringify(data));
                            };

                        });*/
                    } else if (data.hasOwnProperty('chatroomInfoCallback')) {

                        if (data.chatroomInfoCallback.hasOwnProperty('action') && data.chatroomInfoCallback.action != "" && data.chatroomInfoCallback.action == "join") {
                          /*  this.fcm.subscribeToTopic(data.chatroomInfoCallback.push_channel);
                            this.fcm.onNotification().subscribe(data => {
                                if (data.wasTapped) {
                                    console.log("Received in background" + JSON.stringify(data));

                                } else {
                                    console.log("Received in foreground" + JSON.stringify(data));
                                };

                            });*/
                        }

                    }


                }

            });
        }, data => {
            alert(" fail " + data);
        });
    }
}