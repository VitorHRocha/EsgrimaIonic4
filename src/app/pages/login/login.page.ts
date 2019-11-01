import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/user/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
}) 
export class LoginPage implements OnInit {
  
  loginForm: any;
  loading: HTMLIonLoadingElement;
  
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
    ) {
      this.loginForm = this.formBuilder.group({
        email: ['',
        Validators.compose([Validators.required])],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
      });
    }
    async loginUser(loginForm: FormGroup): Promise<void> {
     
        
        this.loading = await this.loadingCtrl.create();
        await this.loading.present();
        const email = loginForm.value.email;
        const password = loginForm.value.password;
        this.authService.loginUser(email+'@email.com', password).then(
          () => {
            this.loading.dismiss().then(() => {
              this.router.navigateByUrl('user');
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
      ngOnInit() {
      }
      
      
    }
