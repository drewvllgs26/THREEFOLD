import { Component, OnInit } from '@angular/core';
import { ChapOne } from './chapter1.model';
import { User } from '../home/home.model';
import { AuthenticationService } from '../authentication.service';
import { CrudService } from '../crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chapter1',
  templateUrl: './chapter1.page.html',
  styleUrls: ['./chapter1.page.scss'],
})
export class Chapter1Page implements OnInit {

  topic: ChapOne = new ChapOne();
  id: any;
  user: User | null = null;

  constructor(private awtenticate: AuthenticationService, private crud: CrudService, private rawt: ActivatedRoute, private rawter: Router) { }

  ngOnInit() {
    this.id = this.rawt.snapshot.paramMap.get('id');
    if (this.id) {
      this.getChapOne();
    }
    this.user = this.awtenticate.getCurrentUser();
  }

  async getChapOne() {
    if (this.id) {
      try {
        const topic = await this.crud.getChapOneById(this.id);
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

  gotoHome(){
    this.rawter.navigate(['home']);
  }

  gotoQuiz(){
    this.rawter.navigate(['quiz/quiz1'])
  }
}
