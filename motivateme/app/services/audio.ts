import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';

@Injectable()
export class AudioService {
  constructor(private http: Http, private platform: Platform) {

  }

  getClip() {
    return new Promise<MotivateMe.AudioClip>((resolve) => {
      this.http.get('http://quotimotivate.herokuapp.com/api/music').subscribe(response => {
        console.log(response);
      });
      resolve({
        url: 'https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3',
        text: 'asd'
      });
    });
  }

  playClip(clip: MotivateMe.AudioClip) {
    if (typeof window !== 'undefined' && typeof Audio !== 'undefined') {
      new Audio(clip.url).play();
    } else if (this.platform.is('cordova')) {
      let m = new MediaPlugin(clip.url);
      let released = false;
      m.init.then(() => {
        if (!released) {
          released = true;
          m.release();
        }
      })
      m.play();
    }
  }
}