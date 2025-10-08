import { writeFileSync } from "fs";

// Import your JSON data
import data from "../data/gameweeks.json" with { type: "json" };

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
      .map(([key, value]) => `${pad}${key}: ${toTsLiteral(value, indent + 2)}`)
      .join(",\n");
    return `{\n${entries}\n${" ".repeat(indent - 2)}}`;
  } else if (typeof obj === "string") {
    return JSON.stringify(obj); // keeps quotes around string values
  }
  return String(obj);
};