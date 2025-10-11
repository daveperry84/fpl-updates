import { Component, computed } from '@angular/core';
import { League } from "../../../league/components/league/league";
import { GameWeek } from '../../../core/types/game-week.type';
import { allGWData } from '../../../../data/gameweeks';

@Component({
  selector: 'app-standings',
  imports: [League],
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
}
