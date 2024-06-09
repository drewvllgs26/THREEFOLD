import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, iUser } from '../home/home.model';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  user: User | null = null;
  users: User = new User();
  id: any;

  constructor(private awtenticate: AuthenticationService, private rawter: Router, private rawt:ActivatedRoute, private crud: CrudService) { }

  ngOnInit() {
    this.user = this.awtenticate.getCurrentUser();
    this.id = this.rawt.snapshot.paramMap.get('id');
    console.log('Edit page loaded with id:', this.id); // Debugging line
    if (this.id) {
      this.loadUserData(this.id);
    }
  }

  async loadUserData(id: string) {
    try {
      const userData = await this.crud.getUserData(id);
      if (userData) {
        this.users = userData;
        console.log('Loaded user data:', this.users); // Debugging line
      } else {
        console.log('No user data found for id:', id); // Debugging line
      }
    } catch (e) {
      console.error('Error loading user data:', e);
    }
  }

  gotoHome() {
    this.rawter.navigate(['home']);
  }

  logout() {
    localStorage.setItem("loggedIn", "false");
    this.rawter.navigate(['login']);
  }

  async updateData() {
    this.crud.isLoading = true;
    if (this.crud.isLoading) {
      if (this.users.id) {
        await this.crud.updateData(this.users);
        this.awtenticate.updateCurrentUser(this.users);
        this.awtenticate.toastdsply('Data Updated');
        this.user = { ...this.user, ...this.users };
        this.users = new User();
        this.rawter.navigate(['home', this.id]);
      }
    }
    this.crud.isLoading = false;
  }

  updates(user: User[]) {
    user.forEach(user => {
      if (this.id == user.id) {
        this.users.emailAdd = user.emailAdd;
        this.users.name = user.name;
        this.users.username = user.username;
      }
    });
  }
}
