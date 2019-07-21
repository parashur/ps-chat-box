import { Component, OnInit } from '@angular/core';
import { logo } from '../../assets/logo';
import { LocalStorageService } from 'ngx-store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logo;
  constructor(private ls: LocalStorageService, private router:Router) { }

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

}