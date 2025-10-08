import { Component, computed } from '@angular/core';
import { League } from "../../../league/components/league/league";
import { allGWData } from '../../../../data/gameweeks';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [League],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  public latestData = computed(() => {
    // Find the latest gameweek data based on the highest gameweek number
    return allGWData.reduce((prev, current) => {
      return (prev && prev.gameweek > current.gameweek) ? prev : current
    });
  });

  constructor() {}
}
