import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase/app';

import { firebaseConfig } from './credencial';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private router: Router,
    ) {
      this.initializeApp();
    }
    
    initializeApp() {
      this.platform.ready().then(() => {
        // let status bar overlay webview
        this.statusBar.overlaysWebView(true);
        
        // set status bar to white
        this.statusBar.backgroundColorByHexString('1f2b5d');
        this.splashScreen.hide();
        firebase.initializeApp(firebaseConfig);
      });
    }
    editaPerfil(){
      this.router.navigate(['/profileedit'])
      
    }
    openMenu(){
      //  this.menu.open('menu');
    }
    
    
    
    
    
  }
