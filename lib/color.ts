// Button colour helpers.

export const DEFAULT_BUTTON_COLOR = "#fe5859"; // brand coral

export function isValidHex(v: string | null | undefined): v is string {
  return !!v && /^#[0-9a-fA-F]{6}$/.test(v);
}

export function normalizeHex(v: string | null | undefined): string {
  return isValidHex(v) ? v!.toLowerCase() : DEFAULT_BUTTON_COLOR;
}

// Returns black or white — whichever is more readable on the given background.
export function contrastText(hex: string): string {
  const h = normalizeHex(hex).slice(1);
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  // relative luminance (sRGB)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#000000" : "#ffffff";
}
