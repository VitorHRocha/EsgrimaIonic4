import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

import { AtletasService } from 'src/app/services/global/atletas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { concat } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})


export class ModalPage implements OnInit {
  listaAtletas: any;
  public regiOpform: FormGroup;
  
  
  constructor(navParams: NavParams,
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    public atletas:AtletasService ) {
      this.atletas.getListAtleta().get().then( userProfileSnapshot =>{
        this.listaAtletas = userProfileSnapshot.data();
        console.log(this.listaAtletas);
      }
      );
      
      this.regiOpform = this.formBuilder.group({
        nome: [
          '',
          Validators.compose([Validators.required]),
        ],
        clube: [
          '',
          Validators.compose([ Validators.required]),
        ],
      });
    
    }
    dismiss() {
      // using the injected ModalController this page
      // can "dismiss" itself and optionally pass back data
      
      this.modalCtrl.dismiss({
        'dismissed': true
      });
    }

    
    addNovoAtleta(){
      document.getElementById("listAtleta").style.display = "none";
      document.getElementById("registraAtleta").style.display = "inline";
      
   }
   async cadastroAtletaas(regiOpform: FormGroup): Promise<void> {
    var nome: string;
    var clube;
    var atleta= { nome, clube};
    atleta.nome= this.regiOpform.value.nome;
    atleta.clube= this.regiOpform.value.clube;
    atleta.nome = atleta.nome.toLowerCase();
    var primeiraletra = atleta.nome[0];
    var resto = atleta.nome.substring(1,atleta.nome.length)
    primeiraletra =primeiraletra.toUpperCase();
    atleta.nome = primeiraletra.concat(resto);
    atleta.clube = atleta.clube.toUpperCase();
  
     try{
       this.atletas.updateAtleta(
        atleta.nome,
        atleta.clube)
           
           this.modalCtrl.dismiss({
            'atleta': atleta
          });
       
     }catch(error){
       console.dir(error)
     }
   
 }




    escolheAtleta(){
      document.getElementById("registraAtleta").style.display = "none";
      document.getElementById("listAtleta").style.display = "inline";
      
      
    }

    selecionaAtleta(atleta:any){
      this.modalCtrl.dismiss({
        'atleta': atleta
      });

    }
    
    ngOnInit() {
      document.getElementById("registraAtleta").style.display = "none";
      document.getElementById("listAtleta").style.display = "inline";
      
    }
    
    
  }
