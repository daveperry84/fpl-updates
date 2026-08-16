// Generate the output TypeScript file contents
import { writeFileSync } from "fs";

// get gameweek number from command line args or default to 1
const gwNumber = process.argv[2] ? parseInt(process.argv[2], 10) : 1;

const output = `
{
    "gameweek": ${gwNumber},
    "overview": "",
    "totw": [
        { "team": "", "manager": "" }
    ],
    "sacked": [
        { "team": "", "manager": "" }
    ],
    "otherUpdates": [
        { 
            "title": "⏭️ Next Gameweek", 
            "content": "",
            "currentOnly": true
        }
    ],
    "league": []
}
`;

// Write the .ts file
writeFileSync(`src/data/json/gw_${gwNumber}.json`, output, "utf-8");

console.log(`✅ gw_${gwNumber}.json file generated successfully!`);