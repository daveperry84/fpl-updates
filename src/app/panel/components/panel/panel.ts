import { Component, input } from '@angular/core';

@Component({
  selector: 'app-panel',
  imports: [],
  templateUrl: './panel.html',
  styleUrl: './panel.scss'
})
export class Panel {
  public title = input<string>('');
  public horizontal = input<boolean>(false);
  public tone = input<'primary' | 'secondary'>('primary');
}
