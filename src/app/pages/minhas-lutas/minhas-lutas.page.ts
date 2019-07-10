import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ProfileService } from '../../services/user/profile.service';
import { NavController, NavParams } from '@ionic/angular';


@Component({ 
  selector: 'app-minhas-lutas',
  templateUrl: './minhas-lutas.page.html', 
  styleUrls: ['./minhas-lutas.page.scss'],
})
export class MinhasLutasPage implements OnInit {
  public lutas;
  public userProfile: any;
  
  constructor(
    private profileService: ProfileService,
   public router: Router,
    public navCtrl: NavController
   ) { 
  } 

  voltar(){
    this.router.navigate(['/user'])
  }
  ngOnInit() {
    this.profileService
    .getUserProfile()
    .get()
    .then( userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.data();
    });
 }
s

 }


