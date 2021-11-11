import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http'

import { firestore } from 'firebase/app';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/user/profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-profileedit',
  templateUrl: './profileedit.page.html',
  styleUrls: ['./profileedit.page.scss'],
})

export class ProfileeditPage implements OnInit {
  public registroForm: FormGroup;
  fotoPerfilURL: string="";
  name: any;
  public loading: any;
  userProfile: firestore.DocumentData;
  currentImage: any;
  
  
  constructor(
    public http: Http,
    public router: Router,
    private camera: Camera,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController
    ) {
      this.registroForm = this.formBuilder.group({
        email: [
          '',
          Validators.compose([Validators.email]),
        ],
        clube: [
          '',
          // Validators.compose([Validators.required]),
        ],
        nome: [
          '',
          // Validators.compose([Validators.required]),
        ],
      });
      
    } 
    
    ngOnInit() {
      // this.profileService
      // .getUserProfile()
      // .get()
      // .then( userProfileSnapshot => {
      //   this.userProfile = userProfileSnapshot.data();
      //   this.fotoPerfilURL = userProfileSnapshot.data().fotoPerfilURL;
      // });
    } 

    takePicture() {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
  
      this.camera.getPicture(options).then((imageData) => {
        this.currentImage = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Handle error
        console.log("Camera issue:" + err);
      });
    }
  
  fileChanged(event){
    const files =event.target.files
    console.log(files)
    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', '50c75bfc3e3660b6d671')
    this.http.post('http://upload.uploadcare.com/base/', data)
    .subscribe(event =>{
      console.log(event)
      this.fotoPerfilURL = event.json().file
    })
  }
  
  voltar(){
    this.router.navigate(['/user'])
  }
  
  async alteraFoto(){
    try{
      this.profileService.updateFoto(this.fotoPerfilURL);
      this.router.navigate(['/user']);
      
    }catch(error){
      console.dir(error)
    }
  }
  
  async salvar(registroForm: FormGroup): Promise<void>  {
    
    const nome: string  = registroForm.value.nome;
    const clube: string = registroForm.value.clube;
    const senha: string = registroForm.value.senha;
    this.profileService.update_dados( nome,clube,senha);
    this.router.navigate(['/user']);
  }
  
}
