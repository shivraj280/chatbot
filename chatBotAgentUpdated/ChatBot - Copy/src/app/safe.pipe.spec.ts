// import { SafePipe } from './safe.pipe';

// describe('SafePipe', () => {
//   it('create an instance', () => {
//     const pipe = new SafePipe();
//     expect(pipe).toBeTruthy();
//   });
// });

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  videoURL = "https://www.youtube.com/embed/LFoz8ZJWmPs";
}

