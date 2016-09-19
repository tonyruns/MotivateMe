import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';

import { AudioService } from '../../services/audio.ts';

import { ClipGroupComponent } from '../../components/clip-group/clip-group.ts';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [AudioService],
  directives: [ClipGroupComponent]
})
export class HomePage {
  clips: MotivateMe.AudioClip[] = [];

  constructor(public navCtrl: NavController, private platform: Platform, private audio: AudioService) {

  }

  click(event: MouseEvent) {
    this.audio.getClip().then(clip => {
      this.clips = this.clips.concat([clip]);

      this.audio.playClip(clip).then(() => {
        this.clips = this.clips.filter(c => c != clip);
      });
    });
  }
}
