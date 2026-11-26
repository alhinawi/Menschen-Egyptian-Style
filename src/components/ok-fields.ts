/** Field ids of an answers map that are answered AND right, as a comma list (data-ok-fields). Undefined until the check ran. */
export function okf(checked: boolean, answers: Record<string, string> | undefined, vals: Record<string, string>, norm: (s: string) => string): string | undefined {
  if (!checked || !answers) return undefined;
  const out: string[] = [];
  for (const [k, a] of Object.entries(answers)) {
    if (a === undefined || a === null || String(a).trim() === '' || a === 'false') continue;
    const got = norm(vals[k] || '');
    if (got === '') continue;
    if (String(a).split('|').some(s => norm(s) === got)) out.push(k);
  }
  return out.join(',');
}
