import { Component, computed, signal, viewChild } from '@angular/core';
import { allGWData } from '../../../../data/gameweeks';
import { Updates } from "../../../updates/components/updates/updates";

@Component({
  selector: 'app-previous-updates',
  imports: [Updates],
  templateUrl: './previous-updates.html',
  styleUrl: './previous-updates.scss'
})
export class PreviousUpdates {
  public allData = allGWData;
  public selectedGameweek = signal<number>(1);
  protected updatesCompRef = viewChild<Updates>('updates');

  public data = computed(() => {
    return this.allData.find(gw => gw.gameweek === this.selectedGameweek());
  });

  protected selectGameweek(gw: number) {
    this.selectedGameweek.set(gw);
    this.updatesCompRef()?.setLeagueExpanded(false);
  }
}
