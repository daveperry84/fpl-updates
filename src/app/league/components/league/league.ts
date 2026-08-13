import { Component, computed, effect, input, signal, WritableSignal } from '@angular/core';
import { TeamEntry } from '../../../core/types/game-week.type';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionChevronDown, ionChevronUp, ionTrophySharp } from '@ng-icons/ionicons';
import { heroEquals } from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';
import { TEAMS } from '../../../core/data/teams.data';

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
  public paidOnly = input<boolean>(false);

  private readonly _paidTeamIds = new Set(TEAMS.filter(t => t.isPaid).map(t => t.id));

  public filteredData = computed<TeamEntry[]>(() => {
    if (!this.paidOnly()) return this.data();
    const filtered = this.data().filter(e => this._paidTeamIds.has(e.teamId));
    const sorted = [...filtered].sort((a, b) => b.total - a.total || b.gw - a.gw);
    let rank = 1;
    return sorted.map((entry, idx) => {
      if (idx > 0 && entry.total === sorted[idx - 1].total) return { ...entry, rank };
      rank = idx + 1;
      return { ...entry, rank };
    });
  });

  public filteredPreviousData = computed<TeamEntry[] | undefined>(() => {
    const prev = this.previousData();
    if (!prev) return prev;
    if (!this.paidOnly()) return prev;
    const filtered = prev.filter(e => this._paidTeamIds.has(e.teamId));
    const sorted = [...filtered].sort((a, b) => b.total - a.total || b.gw - a.gw);
    let rank = 1;
    return sorted.map((entry, idx) => {
      if (idx > 0 && entry.total === sorted[idx - 1].total) return { ...entry, rank };
      rank = idx + 1;
      return { ...entry, rank };
    });
  });

  protected displayExpanded: WritableSignal<boolean> = signal<boolean>(false);

  constructor(private _router: Router) {
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
    const prev = this.filteredPreviousData();
    if (!prev || prev.length === 0) return null;
    const previousEntry = prev.find(entry => entry.team === team.team || entry.manager === team.manager);
    return previousEntry ? previousEntry.rank : null;
  }

  public hasSharedRank(rank: number): boolean {
    return this.filteredData().filter(team => team.rank === rank).length > 1;
  }

  public onTeamClick(team: TeamEntry): void {
    if (!team.teamId) {
      return;
    }

    this._router.navigate(['/team', team.teamId]);
  }

  protected collapseLeague() {
    this.displayExpanded.set(false);
    setTimeout(() => this.scrollLeague(), 100);
  }

  protected scrollLeague() {
    const leagueRef = document.querySelector('.league-container');

    if (leagueRef) {
      leagueRef.scrollIntoView({ behavior: 'smooth'})
    }
  }
}
