import { Component, computed } from '@angular/core';
import { gameweek6 } from '../../../../data/ts/gw_6';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  public latestData = computed(() => {
    return gameweek6;
  });

  constructor() {}
}
