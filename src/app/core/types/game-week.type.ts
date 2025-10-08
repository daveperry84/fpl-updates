export interface GameWeek {
  gameweek: number;
  overview: string;
  totw: TeamData[];
  totwDescription: string;
  sacked: TeamData[];
  sackedDescription: string;
  otherUpdates: Update[];
  league: TeamEntry[];
};

export interface TeamData {
  team: string;
  manager: string;
}

export interface TeamEntry {
  rank: number;
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