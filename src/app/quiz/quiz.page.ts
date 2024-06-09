import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/quiz.service';
import { AuthenticationService } from '../authentication.service';
import { AlertController } from '@ionic/angular';
import { User } from '../home/home.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  correct: number = 0;
  incorrect: number = 0;
  unanswered: number = 0;
  quizId: any;
  quesNum: number = 1;
  introductionPassed: boolean = false;
  user: User | null = null;

  constructor(private quizService: QuizService, private route: ActivatedRoute, private rawter: Router, private awtenticate:AuthenticationService, private alertCtrl: AlertController) { }

  async ngOnInit() {
      this.quizId = this.route.snapshot.paramMap.get('id');
      this.user = this.awtenticate.getCurrentUser();
      await this.loadQuestions();
  }

  async loadQuestions() {
      this.questions = await this.quizService.getQuestions(this.quizId);
  }

  async selectOption(option: string) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      if (option == currentQuestion.answer) {
            this.correct++;
      } else {
        this.incorrect++;
      }
      this.currentQuestionIndex++;
      this.quesNum++;
      if (this.currentQuestionIndex >= this.questions.length) {
        if (this.correct >= 7) {
          this.rawter.navigate(['passed']);
          } else {
            this.rawter.navigate(['failed']);
        }
      }
    }

    async gotoHome() {
      const alert = await this.alertCtrl.create({
        cssClass: 'custom-alert',
      header:'Confirmation',
      message: 'Do you want to read the topic again?',
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
          this.rawter.navigate(['topic/introduction']);
        }
      }]
      });
    
      await alert.present();
    }
}

