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

    static isColdStart(data): boolean {
        // has the app been started by pressing the notification?
        if (data.additionalData.coldstart != null) // on android value is not populated if user did not press the notification
            return data.additionalData.coldstart;
        
        return false; 
    }

    static isForeground(data): boolean {
        // was the notification received while the app was open?
        return data.additionalData.foreground;
    }

    static userPressedNotification(data, platform:Platform): boolean {
        if(platform.is('android')) {
            // this value is populated with a true or false if the user pressed the notification to open the app
            return data.additionalData.coldstart != null;
        }
         else {
             // on ios this is never undefined; and we can only detect if a user has pressed when app is dead
             return data.additionalData.coldstart && PushHelper.isForeground(data);
         }   
    }

    onPushNotification(data) {
        console.log("OnPushNotificiation! coldstart (" + PushHelper.isColdStart(data) + ") foreground (" + PushHelper.isForeground(data) + ") userPressedNotification (" + PushHelper.userPressedNotification(data, this.platform) + ")");
        console.log(data);

        if (data && data.additionalData && data.additionalData.customData) {
            let cd = data.additionalData.customData;
            if (cd.Type == 1) { // message received                             
                this.saveMessage(data.additionalData.customData, data);
            }
        }
        
        if(this.platform.is('ios') && !PushHelper.isForeground(data))
        {
            this.push.finish();
        }
        
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
    }

    saveMessage(message: MessageData, data) {
        this.state.addMessage(message, PushHelper.isColdStart(data), PushHelper.isForeground(data), PushHelper.userPressedNotification(data, this.platform));
    }
}