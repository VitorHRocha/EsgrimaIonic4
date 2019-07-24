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
  relatorio(){
    this.router.navigate(['/relatorio'])
  }
 
  ngOnInit() {
    this.profileService
    .getUserProfile()
    .get()
    .then( userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.data();
   
    });
    this.profileService
    .getUserProfile()
    .get()
    .then( userProfileSnapshot => {
      this.userOp= userProfileSnapshot.data().nome; 
      this.teste(); 
    });
  
    
   // document.getElementById("fotoButton").style.backgroundImage="url('http://ucarecdn.com/{{ ((userOp | async)?.imageURL)}}/-/preview/200x200/')";
  
   }

   teste(){
   }

}
