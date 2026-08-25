import { PLTeams } from "../enums/pl-teams.enum";

export interface Team {
    id: number;
    name: string;
    manager: string;
    plTeam?: PLTeams;
    isPaid?: boolean;
}

export const TEAMS: ReadonlyArray<Team> = [
    { id: 1, name: 'MattyCashInTheAttic', manager: 'Dave Perry', plTeam: PLTeams.ASTON_VILLA, isPaid: true },
    { id: 2, name: 'Yorkshire Lass FC', manager: 'Claire Perry', plTeam: PLTeams.ASTON_VILLA },
    { id: 3, name: "Mcginning to believe", manager: "Gareth Taylor", plTeam: PLTeams.ASTON_VILLA, isPaid: true },
    { id: 4, name: "Ctrl Alt Defeat", manager: "Stuart Jackson" },
    { id: 5, name: "Brian the lion", manager: "Brian Perry", plTeam: PLTeams.LEEDS, isPaid: true },
    { id: 6, name: "Livesdownthelaine", manager: "Elaine Redfern" },
    { id: 7, name: "Gayfield of Dreams", manager: "Simon Lavery" },
    { id: 8, name: "Delap of the Gods", manager: "Sandeep Dhillon", plTeam: PLTeams.CHELSEA },
    { id: 9, name: "Redder's Rejects", manager: "David Redfern", plTeam: PLTeams.LIVERPOOL },
    { id: 10, name: "Dragospear's XI", manager: "Areeb Dar" },
    { id: 11, name: "Richmond FC", manager: "Matthew Doyle", plTeam: PLTeams.MAN_CITY, isPaid: true },
    { id: 12, name: "DuncanDisorder", manager: "Liam Duncan", plTeam: PLTeams.LIVERPOOL, isPaid: true },
    { id: 13, name: "Not too shabbyAlonso", manager: "Tom Wyer", plTeam: PLTeams.CHELSEA },
    { id: 14, name: "Sharonaldo", manager: "Sharon Perry", plTeam: PLTeams.ASTON_VILLA, isPaid: true },
    { id: 15, name: "Kinder Mbeumo", manager: "Alex Burney", plTeam: PLTeams.MAN_UNITED },
    { id: 16, name: "No T No Shade", manager: "Jade Dixon Bowers", plTeam: PLTeams.MAN_CITY },
    { id: 17, name: "Wards Wanderers", manager: "Scott Ward", plTeam: PLTeams.WOLVES },
    { id: 18, name: "Kp nuts", manager: "Katie Perry", plTeam: PLTeams.CHELSEA },
    { id: 19, name: "79th time lucky", manager: "Joseph Temple", plTeam: PLTeams.NEWCASTLE },
    { id: 20, name: "Krusty's Blue Moon", manager: "Kirsty Dixon Bowers", plTeam: PLTeams.MAN_CITY },
    { id: 21, name: "Mcginniesta", manager: "Josh Swain", plTeam: PLTeams.ASTON_VILLA },
    { id: 22, name: "Try Hard FC", manager: "Matthew Ashley", plTeam: PLTeams.MAN_UNITED },
];
