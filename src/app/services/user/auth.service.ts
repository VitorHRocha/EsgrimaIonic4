import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
 
  constructor() { }
  loginUser(email: string, password: string):
  Promise<firebase.auth.UserCredential> {
     return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      
  }


  signupUser(email: string, password: string, nome:string, clube:string, numeroLutas:number): Promise<any> {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((newUserCredential: firebase.auth.UserCredential) => {
      firebase
      .firestore()
      .doc(`/userProfile/${newUserCredential.user.uid}`)
      .set({ email,
             nome,
             clube,
             numeroLutas });
    })
    .catch(error => {
      console.error(error);
      throw new Error(error);
    });
  }
  logoutUser():Promise<void> {
    return firebase.auth().signOut();
    }
  
    getAuth(){
      return firebase.auth();
    }
}
