import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ProfileService } from 'src/app/services/user/profile.service';
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
            public profileService:ProfileService) { 
               
    
  } 


  voltar(){
    this.router.navigate(['/login'])
  }
  novaLuta(){
    this.router.navigate(['/registra-lutadores'])
  }
  historico(){
    this.router.navigate(['/minhas-lutas'])
  } 
 
  ngOnInit() {


    // recupera a foto do perfil do usuario
    this.profileService
    .getUserProfile()
    .get()
    .then( userProfileSnapshot => {
      this.fotoPerfilURL = userProfileSnapshot.data().fotoPerfilURL;  
      this.setFoto();
    });
    
   }

   setFoto(){
     if(this.fotoPerfilURL){
      document.getElementById("fotoButton").style.backgroundImage
    =`url('http://ucarecdn.com/${ this.fotoPerfilURL}/')`;
     }
    
   }

}
