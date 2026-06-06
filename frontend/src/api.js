function stripFences(raw) {
  if (typeof raw !== 'string') return raw;
  return raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
}

export async function planTrip(input, onStatus) {
  const submit = await fetch('/api/trip', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!submit.ok) throw new Error(`Submit failed: ${submit.status}`);
  const { id: execId } = await submit.json();

  while (true) {
    await new Promise((r) => setTimeout(r, 3000));
    const poll = await fetch(`/api/trip/${execId}`);
    if (!poll.ok) throw new Error(`Poll failed: ${poll.status}`);
    const data = await poll.json();
    onStatus?.(data.status);
    if (data.status === 'completed') {
      const raw = data.output?.result;
      if (typeof raw === 'object' && raw !== null) return raw;
      return JSON.parse(stripFences(raw));
    }
    if (data.status === 'failed') throw new Error('Workflow failed');
  }
}
