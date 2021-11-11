import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { firestore } from 'firebase';
import { AuthService } from 'src/app/services/user/auth.service';
import { ProfileService } from 'src/app/services/user/profile.service';

@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.page.html',
  styleUrls: ['./trocar-senha.page.scss'],
})
export class TrocarSenhaPage implements OnInit {
  
  public registroForm: FormGroup;
  fotoPerfilURL: string="";
  name: any;
  senha_diferente: boolean;
  public loading: any;
  userProfile: firestore.DocumentData;
  email: any;
  
  constructor(
    public http: Http,
    public router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    
    ) {
      this.registroForm = this.formBuilder.group({
        senha_antiga: [ 
          '',
          Validators.compose([Validators.minLength(6)]),
        ],
        senha_nova: [ 
          '',
          Validators.compose([Validators.minLength(6)]),
        ],
        conf_senha: [ 
          '',
          Validators.compose([Validators.minLength(6)]),
        ],
      });
      this.profileService
      .getUserProfile()
      .get()
      .then( userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
        this.email = this.userProfile.email;
        
      });
      
      this.senha_diferente = true;
      
    } 
  
    ngOnInit() {
    }
    voltar(){
      this.router.navigate(['/user'])
    }
    
    async salvar(registroForm: FormGroup): Promise<void>  {
      var nome;
      var clube;
      const senha_antiga: string = registroForm.value.senha_antiga;
      const senha_nova: string = registroForm.value.senha_nova;
      const conf_senha: string = registroForm.value.conf_senha;
      
      this.loading = await this.loadingCtrl.create();
      console.log(this.email);
      
      
      this.authService.loginUser(this.email, senha_antiga).then(
        () => {
          this.loading.dismiss().then( async () => {
            if(senha_nova == conf_senha){
               
              var text = 'Senha alterada com sucesso';
              const alert = await this.alertCtrl.create({
                message: text,
                buttons: ['OK']
              });
              await alert.present();
              this.profileService.update_dados( nome,clube,senha_nova);
              this.router.navigateByUrl('user');
            }
            else{
              
              var text = 'A senha nova e a confirmação de senha são diferentes';
              const alert = await this.alertCtrl.create({
                message: text,
                buttons: ['OK']
              });
              await alert.present();
            }
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
        );
        
        
        
      }
    }
