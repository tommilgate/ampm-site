// First-touch attribution storage. Ad clicks land with UTMs/fbclid in the URL,
// but internal navigation drops the query string — so we persist them on arrival
// and read them back when building outbound ticket links (see TrackedLink).

export const TRACKED_PARAMS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  "fbclid", "gclid", "ttclid",
];
const STORE_KEY = "ampm_attr";
const STORE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // mirror Meta's 7-day click window

export function saveTrackedParams() {
  try {
    const here = new URLSearchParams(window.location.search);
    if (!TRACKED_PARAMS.some((k) => here.get(k))) return;
    const saved: Record<string, string> = { _ts: String(Date.now()) };
    for (const k of TRACKED_PARAMS) {
      const v = here.get(k);
      if (v) saved[k] = v;
    }
    localStorage.setItem(STORE_KEY, JSON.stringify(saved));
  } catch {
    /* ignore */
  }
}

export function loadTrackedParams(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return {};
    const saved = JSON.parse(raw);
    if (Date.now() - Number(saved._ts || 0) > STORE_TTL_MS) {
      localStorage.removeItem(STORE_KEY);
      return {};
    }
    return saved;
  } catch {
    return {};
  }
}
