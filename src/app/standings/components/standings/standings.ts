import { Component, computed, signal } from '@angular/core';
import { League } from "../../../league/components/league/league";
import { GameWeek } from '../../../core/types/game-week.type';
import { allGWData } from '../../../../data/gameweeks';
import { Panel } from "../../../panel/components/panel/panel";

export enum StandingsView {
  LEAGUE = 'league',
  TOTW = 'totw',
  SACKED = 'sacked',
}

@Component({
  selector: 'app-standings',
  imports: [League, Panel],
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

  public selectedView = signal<StandingsView>(StandingsView.LEAGUE);
  public standingsView = StandingsView;

  public selectStandingsView(view: StandingsView): void {
    this.selectedView.set(view);
  }
}
