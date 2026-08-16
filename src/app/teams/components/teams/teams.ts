import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TEAMS } from '../../../core/data/teams.data';
import { allGWData } from '../../../../data/gameweeks';

interface TeamDirectoryEntry {
  id: number;
  name: string;
  manager: string;
  isPaid: boolean;
  rank: number | null;
  total: number | null;
  gw: number | null;
}

@Component({
  selector: 'app-teams',
  imports: [RouterModule],
  templateUrl: './teams.html',
  styleUrl: './teams.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Teams {
  public search = signal<string>('');

  public latestGameweek = computed<number>(() => {
    return Math.max(...allGWData.map(gw => gw.gameweek));
  });

  public teams = computed<TeamDirectoryEntry[]>(() => {
    const query = this.search().trim().toLowerCase();
    const latestData = allGWData.find(gw => gw.gameweek === this.latestGameweek());

    const entries = TEAMS.map(team => {
      const leagueEntry = latestData?.league.find(entry => entry.teamId === team.id);

      return {
        id: team.id,
        name: team.name,
        manager: team.manager,
        isPaid: Boolean(team.isPaid),
        rank: leagueEntry?.rank ?? null,
        total: leagueEntry?.total ?? null,
        gw: leagueEntry?.gw ?? null
      };
    }).sort((a, b) => {
      if (a.rank === null && b.rank === null) {
        return a.name.localeCompare(b.name);
      }

      if (a.rank === null) {
        return 1;
      }

      if (b.rank === null) {
        return -1;
      }

      return a.rank - b.rank;
    });

    if (!query) {
      return entries;
    }

    return entries.filter(team => {
      return team.name.toLowerCase().includes(query) || team.manager.toLowerCase().includes(query);
    });
  });

  public paidTeamsCount = computed<number>(() => TEAMS.filter(team => team.isPaid).length);

  public updateSearch(value: string): void {
    this.search.set(value);
  }
}
