import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChatBot';
  status : boolean = false;

  constructor(  private router: Router) {
    this.router.events.subscribe((e) => {
        if (e instanceof NavigationEnd) {
          if(localStorage.getItem('user') == null){
            this.status = false
          }else{
            this.status = true;
          }
          
        }
     });
 }
  ngOnInit(): void {
   
  
  }
}
