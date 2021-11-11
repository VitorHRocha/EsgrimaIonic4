import { Component } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
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
        // firebase.initializeApp(firebaseConfig);
        console.log('aqui1');
        // let status bar overlay webview
        this.statusBar.overlaysWebView(true);
        
        // set status bar to white
        this.statusBar.backgroundColorByHexString('1f2b5d');
        this.splashScreen.hide();
      });
    }
    editaPerfil(){
      this.router.navigate(['/profileedit'])
      this.menu.close();
    }
    alterarSenha(){
      this.router.navigate(['/trocar-senha'])
      this.menu.close();

    }
    sobre(){
      
      this.router.navigate(['/sobre'])
      this.menu.close();
    }
    sair(){
      firebase.auth().signOut().then(() => {
      })    
      this.router.navigate(['/login'])
      this.menu.close();  
    }
    openMenu(){
      //  this.menu.open('menu');
    }

    
    
    
    
    
  }
