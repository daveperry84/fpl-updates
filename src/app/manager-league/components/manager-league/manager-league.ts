import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionTrophySharp } from '@ng-icons/ionicons';
import { hugeSpoon } from '@ng-icons/huge-icons';
import { ManagerEntry } from '../../types/manager-entry.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-league',
  imports: [NgIcon],
  templateUrl: './manager-league.html',
  styleUrl: './manager-league.scss',
  viewProviders: [provideIcons({ ionTrophySharp, hugeSpoon })]
})
export class ManagerLeague {
  public data = input<ManagerEntry[]>([]);
  public type = input<'totw' | 'sacked'>('totw');
  public winsColumnTitle = computed<string>(() => {
    return this.type() === 'totw' ? '⭐ Awards' : '😱 Awards';
  });

  constructor(private _router: Router) {}

  public hasSharedRank(rank: number): boolean {
    const count = this.data().filter(team => team.rank === rank).length;
    return count > 1;
  }

  public onTeamClick(manager: ManagerEntry): void {
    if (!manager.teamId) {
      return;
    }

    this._router.navigate(['/team', manager.teamId]);
  }
}
