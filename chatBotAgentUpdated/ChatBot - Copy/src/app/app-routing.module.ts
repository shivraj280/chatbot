import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/auth/login/login.component';
import { Chatbot2Component } from './chatbot2/chatbot2.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LoginComponent,
  //   // canActivate: [authguardGuard],
  // },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [authguardGuard],
  },
  {
    path: '',
    component: LoginComponent,
    // canActivate: [authguardGuard],
  },
  // {
  //   path: '**',
  //   component: LoginComponent,
  //   // canActivate: [authguardGuard],
  // },
  {
    path: 'chatbot',
    component: Chatbot2Component,
    // canActivate: [authguardGuard],
  },
  {
    path: 'chatbot/:chatbotid',
    component: Chatbot2Component,
    // canActivate: [authguardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  

}
