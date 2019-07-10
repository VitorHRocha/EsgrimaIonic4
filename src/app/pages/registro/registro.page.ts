import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/user/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public registroForm: FormGroup;
  public loading: any;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router
    ) {
      this.registroForm = this.formBuilder.group({
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        senha: [ 
          '',
          Validators.compose([Validators.minLength(6), Validators.required]),
        ],
        confSenha: [ 
          '',
          Validators.compose([Validators.minLength(6), Validators.required]),
        ],
         nome: [
          '',
          Validators.compose([Validators.required]),
        ],
      });
    }
    
  voltar(){
    this.router.navigate(['/login'])
  }

    async registrarUser(registroForm: FormGroup): Promise<void> {
     
          const email: string = registroForm.value.email;
          const senha: string = registroForm.value.senha;
          const nome: string = registroForm.value.nome;
          this.authService.signupUser(email, senha, nome).then(
            () => {
              this.loading.dismiss().then(() => {
                this.router.navigateByUrl('user');
              });
            },
            error => {
              this.loading.dismiss().then(async () => {
                const alert = await this.alertCtrl.create({
                  message: error.message,
                  buttons: [{ text: 'Ok'}],
                });
                await alert.present();
              });
            }
            );
            this.loading = await this.loadingCtrl.create();
            await this.loading.present();
          
        }
        

        ngOnInit() {}
      }
      