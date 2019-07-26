import { Component, OnInit } from '@angular/core';
import { logo } from '../../assets/logo';
import { LocalStorageService } from 'ngx-store';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logo;
  token;
  constructor(private ls: LocalStorageService, private router: Router, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.logo = logo;
    console.log(logo);
   }

  submit() {
    const data = (<HTMLInputElement>document.getElementById('username')).value;
    if (data) {
      this.ls.set('username', data);
      console.log('test')
      this.router.navigate(['/chat']);
    }
  }

  login() {
    debugger;
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.signupUser(email, password);
  }

    onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.signinUser(email, password);
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      )
      this.getToken()
  }

    signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/chat']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

    getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }


}