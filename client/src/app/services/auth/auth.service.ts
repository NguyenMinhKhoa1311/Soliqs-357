import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import * as AuthAction from '../../ngrx/actions/auth.actions';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  loginWithGoogle() {
    return from(
      new Promise<string>(async (resolve, reject) => {
        try {
          let creadential = await signInWithPopup(
            this.auth,
            new GoogleAuthProvider()
          );
          let idToken = await creadential.user.getIdToken();
          // console.log(idToken);
          resolve(idToken);
        } catch {
          reject('Cannot login with Google');
        }
      })
    );
  }

  logout() {
    return from(this.auth.signOut());
  }
}
