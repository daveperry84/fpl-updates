import { Component, computed, input, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameWeek } from '../../../core/types/game-week.type';
import { League } from '../../../league/components/league/league';
import { allGWData } from '../../../../data/gameweeks';

@Component({
  selector: 'app-updates',
  imports: [League, RouterLink],
  templateUrl: './updates.html',
  styleUrl: './updates.scss'
})
export class Updates {
  public gameweek = input<number>(1);
  public isCurrent = input<boolean>(false);
  protected leagueCompRef = viewChild<League>('league');

  public data = computed<GameWeek>(() => {
    return allGWData.find(gw => gw.gameweek === this.gameweek())!;
  });

  public previousData = computed<GameWeek | null>(() => {
    const previousGWNumber = this.gameweek() - 1;
    return allGWData.find(gw => gw.gameweek === previousGWNumber) || null;
  });

  public setLeagueExpanded(state: boolean) {
    if (this.leagueCompRef()) {
      this.leagueCompRef()?.setExpanded(state);
    }
  }
}
