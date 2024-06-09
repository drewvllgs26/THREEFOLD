import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Introduction } from '../introduction/introduction.model';
import { CrudService } from 'src/app/crud.service';
import { User } from '../home/home.model';
import { AuthenticationService } from '../authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.page.html',
  styleUrls: ['./introduction.page.scss'],
})
export class IntroductionPage implements OnInit {

  topic: Introduction = new Introduction();
  id: any;
  user: User | null = null;

  constructor(private awtenticate: AuthenticationService, private crud: CrudService, private rawt:ActivatedRoute, private rawter: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.id = this.rawt.snapshot.paramMap.get('id') || 'introduction';
    if (this.id) {
      this.getIntro();
    }
    this.user = this.awtenticate.getCurrentUser();
  }

  async getIntro() {
    if (this.id) {
      try {
        const topic = await this.crud.getIntroById(this.id);
        if (topic !== null) {
          this.topic = topic;
        } else {
          console.log('Topic not found!');
        }
      } catch (error) {
        console.error('Error fetching topic:', error);
      }
    }
  }

  async gotoHome() {
    const alert = await this.alertCtrl.create({
      cssClass: 'custom-alert',
    header:'Confirmation',
    message: 'Do you want to go back to Home?',
    buttons: [{
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'secondary',
      handler: () => {
        console.log('Cancelled');
      }
    }, {
      text: 'Yes',
      handler: () => {
        console.log('Navigating to home page');
        this.rawter.navigate(['home']);
      }
    }]
    });
  
    await alert.present();
  }

  gotoQuiz(){
    this.rawter.navigate(['quiz/quiz1'])
  }

}
