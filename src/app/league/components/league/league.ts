import { Component, effect, input, signal, WritableSignal } from '@angular/core';
import { TeamEntry } from '../../../core/types/game-week.type';

@Component({
  selector: 'app-league',
  imports: [],
  templateUrl: './league.html',
  styleUrl: './league.scss'
})
export class League {
  public data = input<TeamEntry[]>([]);
  public enableExpandCollapse = input<boolean>(false);
  public expanded = input<boolean>(true);

  protected displayExpanded: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {
    effect(() => {
      const expanded = this.expanded();
      this.displayExpanded.set(expanded);
    });
  }

  public setExpanded(state: boolean) {
    if (this.enableExpandCollapse()) {
      this.displayExpanded.set(state);
    }
  }
}
