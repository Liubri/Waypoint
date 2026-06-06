import "dotenv/config";
import { runCityExplorer } from "./cityExplorer.js";

const data = await runCityExplorer({
  location: "Brooklyn, NYC",
  dates: "2026-06-06",
  group_size: "4 adults",
  description: "birthday weekend, food and art",
});

console.log(JSON.stringify(data, null, 2));
