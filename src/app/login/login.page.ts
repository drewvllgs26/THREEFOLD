import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  constructor(private awtenticate:AuthenticationService, private rawter:Router) { }

  ngOnInit() {
  }

  logIn(){
     this.awtenticate.login(this.email, this.password);
     this.awtenticate.authenticated = true;
  }

}
