import { Component, computed, signal } from '@angular/core';
import { League } from "../../../league/components/league/league";
import { GameWeek } from '../../../core/types/game-week.type';
import { allGWData } from '../../../../data/gameweeks';
import { Panel } from "../../../panel/components/panel/panel";
import { ManagerLeague } from '../../../manager-league/components/manager-league/manager-league';
import { ManagerEntry } from '../../../manager-league/types/manager-entry.type';

export enum StandingsView {
  LEAGUE = 'league',
  TOTW = 'totw',
  SACKED = 'sacked',
}

@Component({
  selector: 'app-standings',
  imports: [League, Panel, ManagerLeague],
  templateUrl: './standings.html',
  styleUrl: './standings.scss'
})
export class Standings {
  public latestGameweek = computed<number>(() => {
    return Math.max(...allGWData.map(gw => gw.gameweek));
  });

  public data = computed<GameWeek>(() => {
    return allGWData.find(gw => gw.gameweek === this.latestGameweek())!;
  });

  public previousData = computed<GameWeek | null>(() => {
    const previousGWNumber = this.latestGameweek() - 1;
    return allGWData.find(gw => gw.gameweek === previousGWNumber) || null;
  });

  public totwData = computed<ManagerEntry[]>(() => this._getAwardData('totw'));
  public sackedData = computed<ManagerEntry[]>(() => this._getAwardData('sacked'));

  public selectedView = signal<StandingsView>(StandingsView.LEAGUE);
  public standingsView = StandingsView;

  public selectStandingsView(view: StandingsView): void {
    this.selectedView.set(view);
  }

  private _getAwardData(award: 'totw' | 'sacked'): ManagerEntry[] {
    const entries: { team: string; manager: string; wins: number }[] = [];
    allGWData.forEach(gw => {
      gw[award].forEach((team) => {
        const existingEntry = entries.find(entry => entry.team === team.team && entry.manager === team.manager);
        if (existingEntry) {
          existingEntry.wins += 1;
        } else {
          entries.push({ team: team.team, manager: team.manager, wins: 1 });
        }
      });
    });

    // Sort by wins descending
    entries.sort((a, b) => b.wins - a.wins);

    // Assign rank (1-based, ties get same rank)
    let rank = 1;
    let prevWins: number | undefined;
    entries.forEach((entry, idx) => {
      if (prevWins !== entry.wins) {
        rank = idx + 1;
        prevWins = entry.wins;
      }
      (entry as ManagerEntry).rank = rank;
    });

    return entries as ManagerEntry[];
  }
}
