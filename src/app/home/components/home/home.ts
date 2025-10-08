import { Component, computed } from '@angular/core';
import { League } from "../../../league/components/league/league";
import { allGWData } from '../../../../data/gameweeks';
import { GameWeek } from '../../../core/types/game-week.type';
import { Updates } from '../../../updates/components/updates/updates';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Updates],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  public latestGameweek = computed<number>(() => {
    return Math.max(...allGWData.map(gw => gw.gameweek));
  });

  constructor() {}
}
