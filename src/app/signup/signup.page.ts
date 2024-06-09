import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../home/home.model';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  email: string = '';
  name: string = '';
  username: string = '';
  password: string = '';
  retypepw: string = '';
  users: User = new User();
  constructor(private rawter: Router, private awtenticate:AuthenticationService, private crud: CrudService) { }

  ngOnInit(){}


  signingUp(){
    this.crud.addData(this.users);
    this.awtenticate.signup(this.email, this.password, this.retypepw, this.username,this.name);
    this.email = '';
    this.name = '';
    this.username = '';
    this.password = '';
    this.retypepw = '';
  }

  alreadyHaveAcc(){
    this.rawter.navigate(['login'])
  }
}
