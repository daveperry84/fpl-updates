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
    { id: 8, name: "Delap of the Gods", manager: "Sandeep Dhillon" },
    { id: 9, name: "Redder's Rejects", manager: "David Redfern" },
    { id: 10, name: "Dragospear's XI", manager: "Areeb Dar" },
    { id: 11, name: "Richmond FC", manager: "Matthew Doyle", isPaid: true },
    { id: 12, name: "DuncanDisorder", manager: "Liam Duncan" },
    { id: 13, name: "Not too shabbyAlonso", manager: "Tom Wyer" },
    { id: 14, name: "Sharonaldo", manager: "Sharon Perry", isPaid: true },
    { id: 15, name: "Kinder Mbeumo", manager: "Alex Burney" },
];
