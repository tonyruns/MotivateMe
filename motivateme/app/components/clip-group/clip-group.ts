import { Component, Input, SimpleChange } from '@angular/core';
import { ClipViewComponent } from '../clip-view/clip-view';

interface ClipPositionView {
  clip: MotivateMe.AudioClip,
  position: {
    left: string,
    top: string
  }
}

@Component({
  selector: 'clip-group',
  directives: [ClipViewComponent],
  templateUrl: 'build/components/clip-group/clip-group.html',
})
export class ClipGroupComponent {
  @Input() clips: MotivateMe.AudioClip[]
  clipViews: ClipPositionView[]

  constructor() {
    this.clipViews = [];
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    const clipChanges = changes['clips'];
    if (clipChanges) {
      const { previousValue, currentValue } = clipChanges;
      let existingClips: ClipPositionView[] = [];
      let newClips: MotivateMe.AudioClip[] = [];

      (currentValue as MotivateMe.AudioClip[]).forEach(clip => {
        const existingClip = this.clipViews.find(c => c.clip == clip);
        if (existingClip) {
          existingClips.push(existingClip);
        } else {
          newClips.push(clip);
        }
      });

      newClips.forEach(clip => {
        // New random position
        const left = Math.random() * 50 + 25;
        const top = Math.random() < 0.5
          ? Math.random() * 40
          : Math.random() * 40 + 55;
        existingClips.push({
          clip,
          position: {
            left: `${left}%`,
            top: `${top}%`
          }
        });
      });

      this.clipViews = existingClips;
    }
  }
}