import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'list'
    },
    {
      title: 'Signup',
      url: '/signup',
      icon: 'list'
    }
  ];
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar

  ) {
    this.initializeApp();
  
  }
  showSplash = true; // <-- show animation
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
     

      timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s
    });
  }
}
