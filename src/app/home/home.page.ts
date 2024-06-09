import { Component } from '@angular/core';
import { User } from './home.model';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: User | null = null;
  id:any;
  isLoading = true;
  
  constructor(private awtenticate: AuthenticationService, private rawter: Router, private crud: CrudService, private rawt:ActivatedRoute) { }

  ngOnInit() {
      this.crud.isLoading = true;
      this.user = this.awtenticate.getCurrentUser();
      this.crud.isLoading = false;
      console.log(this.user);
      this.id = this.rawt.snapshot.paramMap.get('id');
      this.awtenticate.authenticated = false;
  }

  logout(){
    localStorage.setItem("loggedIn", "false");
    this.rawter.navigate(['login']);
  }

  editProfile() {
      this.rawter.navigate(['edit', this.id]);
  }
  
  ionViewWillEnter() {
    // This will ensure the latest user data is loaded when the view is entered.
    this.user = this.awtenticate.getCurrentUser();
  }
}
