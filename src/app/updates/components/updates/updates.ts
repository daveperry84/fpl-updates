import { Component, computed, effect, input, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameWeek, TeamData } from '../../../core/types/game-week.type';
import { League } from '../../../league/components/league/league';
import { allGWData } from '../../../../data/gameweeks';

export enum LeagueView {
  BANTER = 'banter',
  BANKER = 'banker',
}

@Component({
  selector: 'app-updates',
  imports: [League, RouterLink],
  templateUrl: './updates.html',
  styleUrl: './updates.scss'
})
export class Updates {
  public gameweek = input<number>(1);
  public isCurrent = input<boolean>(false);
  public selectedLeagueView = signal<LeagueView>(LeagueView.BANTER);
  public overviewExpanded = signal<boolean>(false);
  public leagueView = LeagueView;
  protected leagueCompRef = viewChild<League>('league');

  constructor() {
    effect(() => {
      this.gameweek();
      this.overviewExpanded.set(false);
    });
  }

  public data = computed<GameWeek>(() => {
    return allGWData.find(gw => gw.gameweek === this.gameweek())!;
  });

  public previousData = computed<GameWeek | null>(() => {
    const previousGWNumber = this.gameweek() - 1;
    return allGWData.find(gw => gw.gameweek === previousGWNumber) || null;
  });

  public showOtherUpdates = computed<boolean>(() => {
    const isCurrent = this.isCurrent();
    const otherUpdates = this.data().otherUpdates;

    return (isCurrent && otherUpdates.length > 0) || (!isCurrent && otherUpdates.some(u => !u.currentOnly));
  });

  public getTeamGameweekPoints(teamId: number | null | undefined): number | null {
    if (!teamId) {
      return null;
    }

    const leagueEntry = this.data().league.find(entry => entry.teamId === teamId);
    return leagueEntry?.gw ?? null;
  }

  public getSectionPointsLabel(teams: TeamData[]): string {
    const points = teams
      .map(team => this.getTeamGameweekPoints(team.teamId))
      .filter((points): points is number => points !== null);

    if (points.length === 0) {
      return 'GW pts —';
    }

    const firstPoint = points[0];
    const allSame = points.every(point => point === firstPoint);

    return allSame ? `GW pts ${firstPoint}` : 'GW pts —';
  }

  public setLeagueExpanded(state: boolean) {
    if (this.leagueCompRef()) {
      this.leagueCompRef()?.setExpanded(state);
    }
  }

  public selectLeagueView(view: LeagueView): void {
    this.selectedLeagueView.set(view);
  }

  public expandOverview(): void {
    this.overviewExpanded.set(true);
  }

  public collapseOverview(): void {
    this.overviewExpanded.set(false);
  }
}
