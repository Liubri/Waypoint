const GATEWAY = "https://gateway.graphn.ai/v1/ws_38bd017c0b48";
const WORKFLOW_ID = "wf_da3c7c2e66cb";

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GRAPHN_API_KEY}`,
  };
}

export async function runCityExplorer(input) {
  // Submit async job
  const submitResp = await fetch(`${GATEWAY}/${WORKFLOW_ID}/async`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ input }),
  });

  if (!submitResp.ok) {
    throw new Error(`Submit failed HTTP ${submitResp.status}: ${await submitResp.text()}`);
  }

  const { id: executionId } = await submitResp.json();

  // Poll until complete
  while (true) {
    await new Promise((r) => setTimeout(r, 3000));

    const pollResp = await fetch(`${GATEWAY}/executions/${executionId}`, {
      headers: authHeaders(),
    });

    if (!pollResp.ok) {
      throw new Error(`Poll failed HTTP ${pollResp.status}`);
    }

    const result = await pollResp.json();
    process.stdout.write(`\rStatus: ${result.status}...`);

    if (result.status === "completed" || result.status === "failed") {
      console.log();
      return result;
    }
  }
}
