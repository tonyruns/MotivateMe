import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';

import { AudioService } from '../../services/audio.ts';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [AudioService]
})
export class HomePage {
  constructor(public navCtrl: NavController, private platform: Platform, private audio: AudioService) {

  }

  click(event: MouseEvent) {
    this.audio.getClip().then(this.audio.playClip);
  }
}
