import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/user/profile.service';


@Component({
  selector: 'app-registro-op',
  templateUrl: './registro-op.page.html',
  styleUrls: ['./registro-op.page.scss'], 
})
export class RegistroOpPage implements OnInit {
  public regiOpform: FormGroup;
  public loading: any;
  public currentUser: firebase.User;
  public current; 
  public userProfile: any;

  nome: string ="";
  clube: string ="";
  altura: string ="";
  punho: string="";

  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService:ProfileService) {
      this.regiOpform = this.formBuilder.group({
        nome: [
          '',
          Validators.compose([Validators.required]),
        ],
        clube: [
          '',
          Validators.compose([ Validators.required]),
        ],
        altura: [
          '',
          Validators.compose([ Validators.required]),
        ],
        punho: [
          '',
          Validators.compose([ Validators.required]),
        ],
      });
     }
  
  ngOnInit() {
    
  }
  voltar(){
    this.router.navigate(['/user'])
  }


  async cadastro(regiOpform: FormGroup): Promise<void> {

     const punho= this.regiOpform.value.punho;  
     const altura= this.regiOpform.value.altura;
     const nome= this.regiOpform.value.nome;
     const clube= this.regiOpform.value.clube;
   
      try{
        this.profileService.updateOponente(
            nome,
            clube,
            altura,
            punho)
          

             
          this.router.navigate(['/user'])
        
      }catch(error){
        console.dir(error)
      }
   
  }

}
