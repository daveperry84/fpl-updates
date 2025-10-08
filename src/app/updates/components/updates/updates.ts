import { Component, input } from '@angular/core';
import { GameWeek } from '../../../core/types/game-week.type';
import { League } from '../../../league/components/league/league';

@Component({
  selector: 'app-updates',
  imports: [League],
  templateUrl: './updates.html',
  styleUrl: './updates.scss'
})
export class Updates {
  public data = input<GameWeek>();
  public isCurrent = input<boolean>(false);
}
