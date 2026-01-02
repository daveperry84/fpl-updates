import { Component, computed, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TEAMS } from '../../../core/data/teams.data';
import { Panel } from '../../../panel/components/panel/panel';
import { allGWData } from '../../../../data/gameweeks';

@Component({
  selector: 'app-team',
  imports: [Panel],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team {
  public teamId = computed<number | null>(() => {
    return this._route.snapshot.paramMap.get('id') ? Number(this._route.snapshot.paramMap.get('id')) : null;
  });

  public teamData = computed(() => {
    const id = this.teamId();
    // Fetch and return team data based on the teamId
    return TEAMS.find(team => team.id === id) || null;
  });

  constructor(private _route: ActivatedRoute) {}

  public getTeamPosition(teamId: number | null): number | null {
    if (teamId === null) return null;

    const latestGW = Math.max(...allGWData.map(gw => gw.gameweek));
    const latestGWData = allGWData.find(gw => gw.gameweek === latestGW);
    const rank = latestGWData?.league.find(entry => entry.teamId === teamId)?.rank || null;
    return rank;
  }

  public getPointsBehindLeader(teamId: number | null): number | null {
    if (teamId === null) return null;
    const latestGW = Math.max(...allGWData.map(gw => gw.gameweek));
    const latestGWData = allGWData.find(gw => gw.gameweek === latestGW);
    const leaderPoints = latestGWData?.league.find(entry => entry.rank === 1)?.total || null;
    const teamPoints = latestGWData?.league.find(entry => entry.teamId === teamId)?.total || null;
    if (leaderPoints === null || teamPoints === null) return null;
    return leaderPoints - teamPoints;
  }

  public getTeamPoints(teamId: number | null): number | null {
    if (teamId === null) return null;

    const latestGW = Math.max(...allGWData.map(gw => gw.gameweek));
    const latestGWData = allGWData.find(gw => gw.gameweek === latestGW);
    const points = latestGWData?.league.find(entry => entry.teamId === teamId)?.total || null;
    return points;
  }

  public getTOTWWins(teamId: number | null): number {
    if (teamId === null) return 0;

    let wins = 0;
    allGWData.forEach(gw => {
      gw.totw.forEach(entry => {
        if (entry.teamId === teamId) {
          wins += 1;
        }
      });
    });
    return wins;
  }

  public getSackedWins(teamId: number | null): number {
    if (teamId === null) return 0;

    let wins = 0;
    allGWData.forEach(gw => {
      gw.sacked.forEach(entry => {
        if (entry.teamId === teamId) {
          wins += 1;
        }
      });
    });
    return wins;
  }

  public getHighestRank(teamId: number | null): string | null {
    if (teamId === null) return null;

    let highestRank: number | null = null;
    let gameweek = 0;
    allGWData.forEach(gw => {
      const entry = gw.league.find(entry => entry.teamId === teamId);
      if (entry && (highestRank === null || entry.rank < highestRank)) {
        highestRank = entry.rank;
        gameweek = gw.gameweek;
      }
    });

    if (highestRank === null) return null;
    return `${highestRank} (GW${gameweek})`;
  }

  public getLowestRank(teamId: number | null): string | null {
    if (teamId === null) return null;

    let lowestRank: number | null = null;
    let gameweek = 0;
    allGWData.forEach(gw => {
      const entry = gw.league.find(entry => entry.teamId === teamId);
      if (entry && (lowestRank === null || entry.rank > lowestRank)) {
        lowestRank = entry.rank;
        gameweek = gw.gameweek;
      }
    });
    if (lowestRank === null) return null;
    return `${lowestRank} (GW${gameweek})`;
  }
}
