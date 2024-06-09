import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../bahay/bahay.model';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-bahay',
  templateUrl: './bahay.page.html',
  styleUrls: ['./bahay.page.scss'],
})
export class BahayPage implements OnInit {
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
