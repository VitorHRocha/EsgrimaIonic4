import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot, 
  UrlTree,
  Router,
  CanActivate,
  CanActivateChild,
} from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { firebaseConfig } from '../credencial';
import { AuthService } from '../services/user/auth.service';
import { ProfileService } from '../services/user/profile.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioLogadoGuard implements CanActivate {
  constructor( private authService: AuthService,
               private router: Router,
               public profileService:ProfileService, 
               ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('aqui2');
    return new Promise((resolve) => {
      this.authService.getAuth().onAuthStateChanged((user) => {
        if (user) {
          this.router.navigate(['user']);
        }
        resolve(user ? false : true);
      });
    });
  }
}