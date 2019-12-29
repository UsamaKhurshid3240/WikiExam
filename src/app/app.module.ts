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
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IonicStorageModule } from '@ionic/storage';

import { StudentsListPage } from './students-list/students-list.page';
import { TeachersListPage } from './teachers-list/teachers-list.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource, MatTableModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    RouterModule,
    NgxDatatableModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpClientModule,
    SignupPage,
    AppComponent,



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
