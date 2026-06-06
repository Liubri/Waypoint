import "dotenv/config";
import express from "express";

const app = express();
app.use(express.json());

const GATEWAY = "https://gateway.graphn.ai/v1/ws_38bd017c0b48";
const WORKFLOW_ID = "wf_da3c7c2e66cb";

function gHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GRAPHN_API_KEY}`,
  };
}

// Submit a trip plan — returns execution ID immediately
app.post("/api/trip", async (req, res) => {
  try {
    const resp = await fetch(`${GATEWAY}/${WORKFLOW_ID}/async`, {
      method: "POST",
      headers: gHeaders(),
      body: JSON.stringify({ input: req.body }),
    });
    if (!resp.ok) {
      return res.status(resp.status).json({ error: await resp.text() });
    }
    res.json(await resp.json());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Poll execution status
app.get("/api/trip/:execId", async (req, res) => {
  try {
    const resp = await fetch(`${GATEWAY}/executions/${req.params.execId}`, {
      headers: gHeaders(),
    });
    if (!resp.ok) {
      return res.status(resp.status).json({ error: await resp.text() });
    }
    res.json(await resp.json());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("Backend running on http://localhost:3001"));
