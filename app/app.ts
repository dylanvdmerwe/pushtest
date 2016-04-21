import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {PushHelper} from './pushHelper';
import {MessageState} from './messageState';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [MessageState, PushHelper]
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, push: PushHelper) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      push.registerForPush();
    });
  }
}
