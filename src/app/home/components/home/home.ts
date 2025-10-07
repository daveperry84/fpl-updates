import { Component, computed } from '@angular/core';
import { gameweek6 } from '../../../../data/ts/gw_6';
import { League } from "../../../league/components/league/league";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [League],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  public latestData = computed(() => {
    return gameweek6;
  });

  constructor() {}
}
