import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionTrophySharp } from '@ng-icons/ionicons';
import { hugeSpoon } from '@ng-icons/huge-icons';
import { ManagerEntry } from '../../types/manager-entry.type';

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
}
