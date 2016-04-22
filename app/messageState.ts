import {Injectable, NgZone} from 'angular2/core';


@Injectable()
export class MessageState {
    messages: Array<MessageData> = [];

    constructor(private zone: NgZone) {
        // read messages out of localStorage
        let list = JSON.parse(localStorage.getItem('message'));
        if (list != null) {
            for (var msg of list) {
                this.messages.push(msg);
            }
        }
    }

    addMessage(message: MessageData, coldstart: boolean, foreground: boolean, userPressed: boolean) {
        this.zone.run(() => {
            // check that this Id does not already exist in list
            let found: boolean = false;
            // for (var i of this.messages) {
            //     if (i.Id == message.Id) {
            //         found = true;
            //         break;
            //     }
            // }

            if (!found) {
                console.log('adding message');
                message.coldstart = coldstart === undefined ? 'undefined' : coldstart.toString();
                message.foreground = foreground === undefined ? 'undefined' : foreground.toString();
                message.Message += "   UserPressedNotification: " + userPressed;

                this.messages.unshift(message);

                // store in localStorage
                localStorage.setItem('message', JSON.stringify(this.messages));
            }
        });
    }

    clear() {
        localStorage.setItem('message', null);
        this.messages = [];
    }
}

export interface MessageData {
    Id: number;
    Title: string;
    Message: string;
    DateReceived: string;
    coldstart: string;
    foreground: string;
}