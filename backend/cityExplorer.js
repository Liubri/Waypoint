const GATEWAY_URL =
  "https://gateway.graphn.ai/v1/ws_38bd017c0b48/wf_da3c7c2e66cb/sync";

export async function runCityExplorer({ location, dates, group_size, description }) {
  const resp = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GRAPHN_API_KEY}`,
    },
    body: JSON.stringify({
      input: { location, dates, group_size, description },
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`HTTP ${resp.status}: ${text}`);
  }

  return resp.json();
}
