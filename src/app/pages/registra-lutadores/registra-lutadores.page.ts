import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/user/profile.service';
import { LutaService } from 'src/app/services/user/luta.service';

import { ModalController } from '@ionic/angular';
import { ModalPage } from '../../modal/modal.page';
import { empty } from 'rxjs';


@Component({
  selector: 'app-registra-lutadores',
  templateUrl: './registra-lutadores.page.html',
  styleUrls: ['./registra-lutadores.page.scss'],
})
export class RegistraLutadoresPage implements OnInit {
  
  public regiOpform: FormGroup;
  public loading: any;
  public currentUser: firebase.User;
  public current; 
  public userProfile: any;
  public teste;

  meuNome: string ="";
  meuClube: string ="";
  nome2: string ="";
  clube2: string ="";

  public valido;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService:ProfileService,
    private lutaService: LutaService,
    public modalCtrl1: ModalController) {
      this.profileService
    .getUserProfile()
    .get()
    .then( userProfileSnapshot => {
      this.meuNome = userProfileSnapshot.data().nome;  
      
    });
      
   }
  
  voltar(){
    this.router.navigate(['/user'])
  }
  
  async cadastro(): Promise<void> {
  
     try{
       this.lutaService.guardaLutadores( 
           this.meuNome,
           this.meuClube,
           this.nome2,
           this.clube2)
           
         this.router.navigate(['/luta'])
       
     }catch(error){
       console.dir(error)
     }
   
 }


async presentModal2() {
  const modal = await this.modalCtrl1.create({
    component: ModalPage
  });

  await modal.present();
  
  const { data } = await modal.onWillDismiss();
  console.log(data);

  this.nome2 = data.atleta.nome ;
  this.clube2 = data.atleta.clube;
  
  if(this.nome2 == '' || this.nome1 == '' ){
    this.valido = false ;

  }else{
    this.valido = true ;
  }

  
}
  
  ngOnInit() {
     document.getElementById("fotoButton1").setAttribute("src",`./assets/img/esgr_mask.jpg`);
     
     document.getElementById("fotoButton2").setAttribute("src",`./assets/img/esgr_mask.jpg`);
    
    
  }

}
