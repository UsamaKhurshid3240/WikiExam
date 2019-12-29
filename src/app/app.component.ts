import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { Storage } from '@ionic/storage';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import * as JWT from 'jwt-decode';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [];
  public studentPages = [


    {
      title: 'Profile',
      url: '/student',
      icon: 'person'
    },
    {
      title: 'Take Quiz',
      url: '/take-quiz',
      icon: 'paper'
    },
    {
      title: 'Result',
      url: '/result',
      icon: 'document'
    },
    {
      title: 'SignOut',
      url: '/login',
      icon: 'log-out'
    }




  ];

  public adminPages = [

    {
      title: 'Profile',
      url: '/admin',
      icon: 'person'
    },
    {
      title: 'Teachers List',
      url: '/teachers-list',
      icon: 'list'
    },
    {
      title: 'StudentsList',
      url: '/students-list',
      icon: 'list'
    },
    {
      title: 'SignOut',
      url: '/login',
      icon: 'log-out'
    }


  ];


  public teacherPages = [

    {
      title: 'Profile',
      url: '/teacher',
      icon: 'person'
    },
    {
      title: 'Create Quiz',
      url: '/create-exam',
      icon: 'paper'
    },
    {
      title: 'StudentsList',
      url: '/students-list',
      icon: 'list'
    },
    {
      title: 'SignOut',
      url: '/login',
      icon: 'log-out'
    }


  ];
  tk: any;
  t: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public storage: Storage

  ) {
    this.initializeApp();

  }

  async ionViewWillEnter() {
    console.log('lifecyvle')
    this.tk = await
      this.storage.get('Token');
    this.t = JWT(this.tk);
    console.log("App " + this.t.role);


    if (this.t.role === "Teacher") {
      this.appPages = this.teacherPages;

    }
    else if (this.t.role === "Student") {
      this.appPages = this.studentPages;

    }
    else if (this.t.role === "Admin") {
      this.appPages = this.adminPages;

    }
  }
  showSplash = true; // <-- show animation
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();


      timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s
    });
  }
}
