import { Component, computed, signal, viewChild } from '@angular/core';
import { allGWData } from '../../../../data/gameweeks';
import { Updates } from "../../../updates/components/updates/updates";
import { GameWeek } from '../../../core/types/game-week.type';
import { Panel } from "../../../panel/components/panel/panel";

@Component({
  selector: 'app-previous-updates',
  imports: [Updates, Panel],
  templateUrl: './previous-updates.html',
  styleUrl: './previous-updates.scss'
})
export class PreviousUpdates {
  public allData = computed(() => {
    const maxGameweek = Math.max(...allGWData.map(gw => gw.gameweek));
    return allGWData.filter(gw => gw.gameweek !== maxGameweek);
  });
  public selectedGameweek = signal<number>(1);
  protected updatesCompRef = viewChild<Updates>('updates');

  public data = computed<GameWeek | undefined>(() => {
    return this.allData().find(gw => gw.gameweek === this.selectedGameweek());
  });
  public gameweekButtons = computed<number[]>(() => this.allData().map(gw => gw.gameweek).sort((a, b) => b - a));

  constructor() {
    this.selectedGameweek.set(Math.max(...this.allData().map(gw => gw.gameweek)));
  }

  protected selectGameweek(gw: number) {
    this.selectedGameweek.set(gw);
  }
}
