import { Injectable } from '@angular/core';
import { Howl } from 'howler';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private sound: Howl;

  constructor() {
  //  debugger
    this.sound = new Howl({ //NotificationSound.mp3
      src: ['assets/sound/Iphone - Notification Sounds.mp3'] // Provide the path to your sound file
    });
  }

  playNotificationSound() {
    this.sound.play();
  }
}