import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';

import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import { HttpClientModule } from '@angular/common/http';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent,
    ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpClientModule,
    SignupPage,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
