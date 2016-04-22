/// <reference path="../typings/phonegap-plugin-push/phonegap-plugin-push.d.ts" />
import {Injectable} from 'angular2/core';
import {Platform} from 'ionic-angular';
import {MessageData} from './messageState';
import {MessageState} from './messageState';

// https://github.com/phonegap/phonegap-plugin-push

@Injectable()
export class PushHelper {
    private GCMSenderId: string = "26247701559";

    private push: any;

    constructor(private platform: Platform, private state: MessageState) {

    }

    registerForPush(): Promise<boolean> {
        return new Promise<boolean>(resolve => {

            if (!this.platform.is('cordova') || !window.PushNotification) {
                console.error("PushNotification plugin not found or not installed.");
                resolve(false);
                return;
            }

            console.log("Registering for push notifications...");

            this.push = PushNotification.init({
                "android": { "senderID": this.GCMSenderId },
                "ios": { "alert": "true", "badge": "true", "sound": "true" },
                "windows": {}
            });

            this.push.on('registration', (data) => {
                console.log("PUSH TOKEN: " + data.registrationId);
                resolve(true);
            });

            this.push.on('notification', (data) => this.onPushNotification(data));

            this.push.on('error', (e) => {
                console.error("Push notification error: " + e.message);
                resolve(false);
            });
        });
    }

    static userPressedNotification(data, platform: Platform): boolean {
        return data.additionalData.coldstart != null;
    }

    onPushNotification(data) {
        console.log("OnPushNotificiation! coldstart (" + data.additionalData.coldstart + ") foreground (" + data.additionalData.foreground + ") userPressedNotification (" + PushHelper.userPressedNotification(data, this.platform) + ")");
        console.log(data);
        console.log(JSON.stringify(data));

        if (data && data.additionalData && data.additionalData.customData) {
            let cd = data.additionalData.customData;
            if (cd.Type == 1) { // message received                             
                this.saveMessage(data.additionalData.customData, data);
            }
        }

        if (this.platform.is('ios') && !data.additionalData.foreground) {
            this.push.finish();
        }
    }

    saveMessage(message: MessageData, data) {
        this.state.addMessage(message, data.additionalData.coldstart, data.additionalData.foreground, PushHelper.userPressedNotification(data, this.platform));
    }
}