import { writeFileSync } from "fs";

// Import your JSON data
import data from "../data/gameweeks.json" with { type: "json" };

const TEAMS = [
    { id: 1, name: 'Under my Cucurella', manager: 'Dave Perry' },
    { id: 2, name: 'Yorkshire Lass UTD', manager: 'Claire Perry' },
    { id: 3, name: "Try hard FC", manager: "Matthew Ashley" },
    { id: 4, name: "Norfolk N Chance", manager: "James Swain" },
    { id: 5, name: "Shadechester FC", manager: "Jade Dixon Bowers" },
    { id: 6, name: "stranger Mings", manager: "Gareth Taylor" },
    { id: 7, name: "Change Name", manager: "Alex Burney" },
    { id: 8, name: "Livesdownthelaine", manager: "Elaine Redfern" },
    { id: 9, name: "Redder's Rejects", manager: "David Redfern" },
    { id: 10, name: "SmallTalkwithaSwede", manager: "Stuart Jackson" },
    { id: 11, name: "PurpleReina", manager: "Liam Duncan" },
    { id: 12, name: "chicken caesar salah", manager: "Dan Zreika" },
    { id: 13, name: "Johnmcginnsthegoat", manager: "Josh Swain" },
    { id: 14, name: "Brian Munich", manager: "Brian Perry" },
    { id: 15, name: "Doggers FC", manager: "Paul Harris" },
    { id: 16, name: "What's for pud..", manager: "Sharon Perry" },
    { id: 17, name: "Kpnuts", manager: "Katie Perry" },
    { id: 18, name: "Pure Worship", manager: "Matthew Doyle" },
    { id: 19, name: "I don't know", manager: "Charlie Swain" },
    { id: 20, name: "Wards Wanderers", manager: "Scott Ward" },
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