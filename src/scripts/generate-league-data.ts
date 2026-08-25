import { writeFileSync } from "fs";

// Import your JSON data
import data from "../data/gameweeks.json" with { type: "json" };

const TEAMS = [
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
    { id: 12, name: "DuncanDisorder", manager: "Liam Duncan", isPaid: true },
    { id: 13, name: "Not too shabbyAlonso", manager: "Tom Wyer" },
    { id: 14, name: "Sharonaldo", manager: "Sharon Perry", isPaid: true },
    { id: 15, name: "Kinder Mbeumo", manager: "Alex Burney" },
    { id: 16, name: "No T No Shade", manager: "Jade Dixon Bowers" },
    { id: 17, name: "Wards Wanderers", manager: "Scott Ward" },
    { id: 18, name: "Kp nuts", manager: "Katie Perry" },
    { id: 19, name: "79th time lucky", manager: "Joseph Temple" },
    { id: 20, name: "Krusty's Blue Moon", manager: "Kirsty Dixon Bowers" },
    { id: 21, name: "Mcginniesta", manager: "Josh Swain" },
    { id: 22, name: "Try Hard FC", manager: "Matthew Ashley" },
];

const tsLiteral = toTsLiteral(data, 2);

// Generate the output TypeScript file contents
const output = `// Auto-generated file. Do not edit manually.
import { GameWeek } from "../app/core/types/game-week.type";

export const allGWData: GameWeek[] = ${tsLiteral};
`;

// Write the .ts file
writeFileSync(`src/data/gameweeks.ts`, output, "utf-8");

console.log(`✅ gameweeks.ts file generated successfully!`);

// Helper to convert JSON to valid TypeScript object syntax
function toTsLiteral(obj: any, indent = 2): string {
  const pad = " ".repeat(indent);
  if (Array.isArray(obj)) {
    return `[\n${obj.map(o => pad + toTsLiteral(o, indent + 2)).join(",\n")}\n${" ".repeat(indent - 2)}]`;
  } else if (typeof obj === "object" && obj !== null) {
    const entries = Object.entries(obj)
      .map(([key, value]) => { 
        const tsString = `${pad}${key}: ${toTsLiteral(value, indent + 2)}`;

        // Add team IDs based on team names
        if (key === "team") {
          const team = TEAMS.find(t => t.name === value);

          return !!team ? `${pad}teamId: ${team.id},\n${tsString}` : tsString;
        }

        return tsString;
      })
      .join(",\n");
    return `{\n${entries}\n${" ".repeat(indent - 2)}}`;
  } else if (typeof obj === "string") {
    return JSON.stringify(obj); // keeps quotes around string values
  }
  return String(obj);
};