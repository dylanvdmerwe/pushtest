import {Page} from 'ionic-angular';
import {PushHelper} from '../../pushHelper';
import {MessageState} from '../../messageState';
import {MessageData} from '../../messageState';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  constructor(private state: MessageState) {

  }

  onPageDidEnter() {

  }

  clear() {
    this.state.clear();
  }

  add() {
    this.state.addMessage({ Title: 'test', Message: 'test', DateReceived: 'test', Id: 0 });
  }
}
