import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/user/profile.service';
import { LutaService } from 'src/app/services/user/luta.service';


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

  nome1: string ="";
  clube1: string ="";
  nome2: string ="";
  clube2: string ="";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService:ProfileService,
    private lutaService: LutaService) {
      this.regiOpform = this.formBuilder.group({
        nome1: [
          '',
          Validators.compose([Validators.required]),
        ],
        clube1: [
          '',
          Validators.compose([ Validators.required]),
        ],
        nome2: [
          '',
          Validators.compose([Validators.required]),
        ],
        clube2: [
          '',
          Validators.compose([ Validators.required]),
        ],
      });
  }
  
  voltar(){
    this.router.navigate(['/user'])
  }
  async cadastro(regiOpform: FormGroup): Promise<void> {

    const nome1= this.regiOpform.value.nome;
    const clube1= this.regiOpform.value.clube;
    const nome2= this.regiOpform.value.nome;
    const clube2= this.regiOpform.value.clube;
  
     try{
       this.lutaService.guardaLutadores(
           nome1,
           clube1,
           nome2,
           clube2)
           
         this.router.navigate(['/luta'])
       
     }catch(error){
       console.dir(error)
     }
  
 }
 
  ngOnInit() {
  }

}
