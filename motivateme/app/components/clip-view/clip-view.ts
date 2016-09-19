import { Component, Input } from '@angular/core';

@Component({
  selector: 'clip-view',
  templateUrl: 'build/components/clip-view/clip-view.html'
})
export class ClipViewComponent {
  @Input() clip: MotivateMe.AudioClip
  constructor() {}
}