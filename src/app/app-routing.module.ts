import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './authentication.service';

const routes: Routes = [
  {
    path: 'home/:id',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthenticationService]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'topic/introduction',
    loadChildren: () => import('./introduction/introduction.module').then( m => m.IntroductionPageModule),
    canActivate: [AuthenticationService]
  },
  {
    path: 'quiz/:id',
    loadChildren: () => import('./quiz/quiz.module').then( m => m.QuizPageModule),
    canActivate: [AuthenticationService]
  },
  {
    path: 'topic/chapter_1',
    loadChildren: () => import('./chapter1/chapter1.module').then( m => m.Chapter1PageModule),
    canActivate: [AuthenticationService]
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule),
    canActivate: [AuthenticationService]
  },
  {
    path: 'passed',
    loadChildren: () => import('./passed/passed.module').then( m => m.PassedPageModule)
  },
  {
    path: 'failed',
    loadChildren: () => import('./failed/failed.module').then( m => m.FailedPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./bahay/bahay.module').then( m => m.BahayPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
