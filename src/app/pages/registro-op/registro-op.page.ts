import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/user/profile.service';
import { LutaService } from 'src/app/services/user/luta.service';


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
  
  
  altura: string ="";
  punho1: string="";
  punho2: string="";
  lutadores: any;
  
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService:ProfileService,
    private lutaService:LutaService) {
      this.regiOpform = this.formBuilder.group({
        
        altura: [
          '',
          Validators.compose([ Validators.required]),
        ],
        punho1: [
          '',
          Validators.compose([ Validators.required]),
        ],
        punho2: [
          '',
          Validators.compose([ Validators.required]),
        ],
      });
      
    }
    
    ngOnInit() {
      
    }
    voltar(){
      this.router.navigate(['/luta'])
    }
    
    
    async cadastro(regiOpform: FormGroup): Promise<void> {
      
      const punho1= this.regiOpform.value.punho1;
      const punho2= this.regiOpform.value.punho2;  
      const altura_relativa= this.regiOpform.value.altura;
      console.log( this.lutaService.getnome1());
      console.log( this.lutaService.getclube1());
      console.log( this.lutaService.getnome2());
      console.log( this.lutaService.getclube2());
      
      
      try{
        this.profileService.updateLutadores(
          this.lutaService.getnome1(),
          this.lutaService.getclube1(),
          this.lutaService.getnome2(),
          this.lutaService.getclube2(),
          altura_relativa,
          punho1,
          punho2)
          
          this.router.navigate(['/user'])
          
        }catch(error){
          console.dir(error)
        }
        
      }
      
    }
