import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/user/profile.service';
import { MenuController, ModalController } from '@ionic/angular';
import { concat } from 'rxjs';
import * as firebase from 'firebase';
import { Modal2Page } from '../../modal2/modal2.page';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  
  userOp: any;
  fotoPerfilURL: string;
  userProfile: any;
  
  
  constructor(public router: Router,
    public modalCtrl1: ModalController,
    public profileService:ProfileService, 
    private menu: MenuController) { 
      this.menu.enable(false);
      
    } 
    
    
    voltar(){
      this.menu.enable(false);
      firebase.auth().signOut().then(() => {
      })
      
      this.router.navigate(['/login'])
    }
    novaLuta(){
      this.menu.enable(false);
      this.router.navigate(['/seleciona-oponente'])
    }
    historico(){
      this.menu.enable(false);
      this.router.navigate(['/minhas-lutas'])
      // this.router.navigate(['/condicao-pos-luta'])
    }
    estatistica(){
      this.menu.enable(false);
      this.router.navigate(['/estatistica'])
    } 
    
    ngOnInit() {
       this.menu.enable(true);
      if (this.profileService){
        this.profileService
        .getUserProfile()
        .get()
        .then( userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();
          this.fotoPerfilURL = userProfileSnapshot.data().fotoPerfilURL;
        });
      }
    }
    
    setFoto(){
      //  if(this.fotoPerfilURL){
      document.getElementById("fotoButton").setAttribute("src",`http://ucarecdn.com/${ this.fotoPerfilURL}/`);
      //  }else{
      document.getElementById("fotoButton").setAttribute("src",`./assets/img/esgr_mask.jpg`);
      document.getElementById("fotoButton").style.border = "thick solid black";
      //  }
    }
    
    openMenu(){
      this.menu.enable(true);
      this.menu.open('menu');
    }

    async presentModal2() {
      const modal = await this.modalCtrl1.create({ 
        component: Modal2Page
      });
  
      await modal.present();  
    }
    
  }
