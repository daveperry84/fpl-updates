export interface GameWeek {
  gameweek: number;
  overview: string;
  totw: string;
  potw: string;
  sacked: string;
  league: TeamEntry[];
};

export interface TeamEntry {
  rank: number;
  team: string;
  manager: string;
  gw: number;
  total: number;
};