import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';

const API_URL = 'http://quotimotivate.herokuapp.com';

@Injectable()
export class AudioService {
  private id = 0;

  constructor(private http: Http, private platform: Platform) {

  }

  getClip() {
    return new Promise<MotivateMe.AudioClip>((resolve) => {
      this.http.get(`${API_URL}/api/music`).subscribe(response => {
        const data = response.json();
        resolve({
          id: ++this.id,
          url: `${API_URL}${data.link}`,
          text: data.text
        });
      });
    });
  }

  playClip(clip: MotivateMe.AudioClip) {
    return new Promise<MotivateMe.AudioClip>(resolve => {
      if (typeof window !== 'undefined' && typeof Audio !== 'undefined') {
        let audio = new Audio(clip.url);
        audio.onended = () => {
          resolve(clip);
        }
        audio.play();
      } else if (this.platform.is('cordova')) {
        let m = new MediaPlugin(clip.url);
        let released = false;
        m.init.then(() => {
          if (!released) {
            released = true;
            m.release();
            resolve(clip);
          }
        })
        m.play();
      }
    });
  }
}