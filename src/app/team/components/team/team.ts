import { Component, computed, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TEAMS } from '../../../core/data/teams.data';
import { allGWData } from '../../../../data/gameweeks';

@Component({
  selector: 'app-team',
  imports: [],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team {
  public teamId = computed<number | null>(() => {
    return this._route.snapshot.paramMap.get('id') ? Number(this._route.snapshot.paramMap.get('id')) : null;
  });

  public latestGameweek = computed(() => Math.max(...allGWData.map(gw => gw.gameweek)));

  private latestGameweekData = computed(() => {
    const latestGW = this.latestGameweek();
    return allGWData.find(gw => gw.gameweek === latestGW) || null;
  });

  public teamData = computed(() => {
    const id = this.teamId();
    return TEAMS.find(team => team.id === id) || null;
  });

  constructor(private _route: ActivatedRoute, private _router: Router) {
    effect(() => {
      const data = this.teamData();

      if (!data) {
        this._router.navigate(['/']);
      }
    });
  }

  public getTeamPosition(teamId: number | null): string | null {
    if (teamId === null) return null;

    const rank = this.latestGameweekData()?.league.find(entry => entry.teamId === teamId)?.rank || null;
    return rank !== null ? this.formatRank(rank) : null;
  }

  public getPointsBehindLeader(teamId: number | null): number | null {
    if (teamId === null) return null;
    const leaderPoints = this.latestGameweekData()?.league.find(entry => entry.rank === 1)?.total || null;
    const teamPoints = this.latestGameweekData()?.league.find(entry => entry.teamId === teamId)?.total || null;
    if (leaderPoints === null || teamPoints === null) return null;
    return leaderPoints - teamPoints;
  }

  public getTeamPoints(teamId: number | null): number | null {
    if (teamId === null) return null;

    const points = this.latestGameweekData()?.league.find(entry => entry.teamId === teamId)?.total || null;
    return points;
  }

  public getTeamPositionBanker(teamId: number | null): string | null {
    if (teamId === null) return null;
    const reranked = this.getBankerLeagueEntries(this.latestGameweekData()?.league || []);
    const bankerEntry = reranked.find(e => e.teamId === teamId);
    return bankerEntry?.rank ? this.formatRank(bankerEntry.rank) : null;
  }

  public getPointsBehindLeaderBanker(teamId: number | null): number | null {
    if (teamId === null) return null;
    const filtered = this.getBankerLeagueEntries(this.latestGameweekData()?.league || []);
    const leaderPoints = filtered.length > 0 ? Math.max(...filtered.map(e => e.total)) : null;
    const teamPoints = this.latestGameweekData()?.league.find(entry => entry.teamId === teamId)?.total || null;
    if (leaderPoints === null || teamPoints === null) return null;
    return leaderPoints - teamPoints;
  }

  public getHighestRankBanker(teamId: number | null): string | null {
    if (teamId === null) return null;

    let highestRank: number | null = null;
    let gameweek = 0;
    allGWData.forEach(gw => {
      const entry = this.getBankerLeagueEntries(gw.league).find(entry => entry.teamId === teamId);
      if (entry && (highestRank === null || entry.rank < highestRank)) {
        highestRank = entry.rank;
        gameweek = gw.gameweek;
      }
    });

    if (highestRank === null) return null;

    return `${this.formatRank(highestRank)} (GW${gameweek})`;
  }

  public getLowestRankBanker(teamId: number | null): string | null {
    if (teamId === null) return null;

    let lowestRank: number | null = null;
    let gameweek = 0;
    allGWData.forEach(gw => {
      const entry = this.getBankerLeagueEntries(gw.league).find(entry => entry.teamId === teamId);
      if (entry && (lowestRank === null || entry.rank > lowestRank)) {
        lowestRank = entry.rank;
        gameweek = gw.gameweek;
      }
    });

    if (lowestRank === null) return null;

    return `${this.formatRank(lowestRank)} (GW${gameweek})`;
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

    return `${this.formatRank(highestRank)} (GW${gameweek})`;
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

    return `${this.formatRank(lowestRank)} (GW${gameweek})`;
  }

  private formatRank(rank: number): string {
    const suffix = rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th';
    return `${rank}${suffix}`;
  }

  private getBankerLeagueEntries(leagueEntries: Array<{ teamId: number; total: number; rank: number; gw: number }>) {
    const paidTeamIds = new Set(TEAMS.filter(team => team.isPaid).map(team => team.id));
    const filtered = leagueEntries.filter(entry => paidTeamIds.has(entry.teamId));
    const sorted = [...filtered].sort((a, b) => b.total - a.total || b.gw - a.gw);
    let rank = 1;

    return sorted.map((entry, idx) => {
      if (idx > 0 && entry.total === sorted[idx - 1].total) {
        return { ...entry, rank };
      }

      rank = idx + 1;
      return { ...entry, rank };
    });
  }
}
