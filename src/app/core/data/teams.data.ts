export interface Team {
    id: number;
    name: string;
    manager: string;
    isPaid?: boolean;
}

export const TEAMS: ReadonlyArray<Team> = [
    { id: 1, name: 'MattyCashInTheAttic', manager: 'Dave Perry', isPaid: true },
    { id: 2, name: 'Yorkshire Lass FC', manager: 'Claire Perry' },
    { id: 3, name: "Mcginning to believe", manager: "Gareth Taylor", isPaid: true },
    { id: 4, name: "Ctrl Alt Defeat", manager: "Stuart Jackson" },
    { id: 5, name: "Brian the lion", manager: "Brian Perry", isPaid: true },
    { id: 6, name: "Livesdownthelaine", manager: "Elaine Redfern" },
    { id: 7, name: "Gayfield of Dreams", manager: "Simon Lavery" },
];
