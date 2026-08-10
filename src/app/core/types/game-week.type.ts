export interface GameWeek {
  gameweek: number;
  overview: string;
  totw: TeamData[];
  sacked: TeamData[];
  otherUpdates: Update[];
  league: TeamEntry[];
};

export interface TeamData {
  team: string;
  teamId: number;
  manager: string;
}

export interface TeamEntry {
  rank: number;
  teamId: number;
  team: string;
  manager: string;
  gw: number;
  total: number;
};

export interface Update {
  title: string;
  content: string;
  currentOnly?: boolean;
}