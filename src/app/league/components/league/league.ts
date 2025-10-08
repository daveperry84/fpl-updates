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
    effect(() => this.displayExpanded.set(this.expanded()));
  }
}
