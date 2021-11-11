import {  Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/user/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as firebase from 'firebase';
import { ProfileService } from 'src/app/services/user/profile.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'], 
}) 

export class LoginPage implements OnInit {
  
  loginForm: any;
  loading: HTMLIonLoadingElement;
  userProfile: any;
  currentUser: any;

  
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    public profileService:ProfileService, 
    private router: Router,
    private formBuilder: FormBuilder, 
    private menu: MenuController
    ) {
      this.menu.enable(false);

      this.loginForm = this.formBuilder.group({
        email: ['',
        Validators.compose([Validators.required])],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
      });
      
      
    }
    
    ngOnInit(): void {
     
      
    }
    
    
    async loginUser(loginForm: FormGroup): Promise<void> {
      
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
      const email = loginForm.value.email;
      const password = loginForm.value.password;
      // this.authService.loginUser(email+'@email.com', password).then(
      this.authService.loginUser(email, password).then(
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
      
    }
