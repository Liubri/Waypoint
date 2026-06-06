import "dotenv/config";
import fs from "fs";
import { runCityExplorer } from "./cityExplorer.js";

const data = await runCityExplorer({
  origin: "Boston, MA",
  destination: "New York City",
  departure_date: "2026-06-20",
  return_date: "2026-06-23",
  travelers: "2 adults",
  description: "anniversary trip, loves seafood and rooftop bars",
});

function parseResult(raw) {
  if (typeof raw !== "string") return raw;
  const stripped = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  return JSON.parse(stripped);
}

const parsed = {
  ...data,
  output: {
    result: parseResult(data.output.result),
  },
};

fs.writeFileSync("output.json", JSON.stringify(parsed, null, 2));
console.log("Saved to output.json");
