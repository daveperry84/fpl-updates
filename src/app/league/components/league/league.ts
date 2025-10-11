import { Component, effect, input, signal, WritableSignal } from '@angular/core';
import { TeamEntry } from '../../../core/types/game-week.type';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionChevronDown, ionChevronUp, ionTrophySharp } from '@ng-icons/ionicons';
import { heroEquals } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-league',
  imports: [NgIcon],
  templateUrl: './league.html',
  styleUrl: './league.scss',
  viewProviders: [provideIcons({ ionTrophySharp, ionChevronUp, ionChevronDown, heroEquals })]
})
export class League {
  public data = input<TeamEntry[]>([]);
  public previousData = input<TeamEntry[] | undefined>([]);
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

  public getPreviousRank(team: TeamEntry): number | null {
    if (!this.previousData() || this.previousData()!.length === 0) {
      return null;
    }

    const previousEntry = this.previousData()!.find(entry => entry.team === team.team || entry.manager === team.manager);
    return previousEntry ? previousEntry.rank : null;
  }

  public hasSharedRank(rank: number): boolean {
    const count = this.data().filter(team => team.rank === rank).length;
    return count > 1;
  }
}
