import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http'

import { firestore } from 'firebase/app';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/user/profile.service';
@Component({
  selector: 'app-profileedit',
  templateUrl: './profileedit.page.html',
  styleUrls: ['./profileedit.page.scss'],
})
export class ProfileeditPage implements OnInit {
  fotoPerfilURL: string="";
  name: any;
  userProfile: firestore.DocumentData;


  constructor(public http: Http,
    public router: Router,
    private profileService: ProfileService,
 
    ) { }

  ngOnInit() {
    this.profileService
    .getUserProfile()
    .get()
    .then( userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.data();
    });
  }
  fileChanged(event){
    const files =event.target.files
    console.log(files)
    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', '50c75bfc3e3660b6d671')
    this.http.post('http://upload.uploadcare.com/base/', data).subscribe(event =>{
      console.log(event)
      this.fotoPerfilURL = event.json().file
    })

    
  }
  voltar(){
    this.router.navigate(['/user'])
  }
  async alteraFoto(){
    try{
      this.profileService.updateFoto(this.fotoPerfilURL)
          
    }catch(error){
      console.dir(error)
    }
  }

}
