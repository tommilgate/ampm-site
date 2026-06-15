// Event dates are treated as calendar dates (date-only), stored as UTC midnight.
// "Past" is judged against the calendar date in Australia, so an event shows all of
// its event day and disappears the next day (AU time), regardless of the visitor's TZ.

const AU_TZ = "Australia/Sydney";

/** UTC-midnight of "today" in Australia. Compare event.startDate >= this to hide past events. */
export function auTodayCutoff(): Date {
  // en-CA formats as YYYY-MM-DD
  const ymd = new Intl.DateTimeFormat("en-CA", {
    timeZone: AU_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return new Date(`${ymd}T00:00:00.000Z`);
}

/** Parse an <input type="date"> value ("YYYY-MM-DD") into UTC-midnight, or null. */
export function parseDateInput(value: string | null | undefined): Date | null {
  if (!value) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!m) return null;
  const d = new Date(`${value.trim()}T00:00:00.000Z`);
  return isNaN(d.getTime()) ? null : d;
}

/** Format a stored startDate back to "YYYY-MM-DD" for prefilling a date input. */
export function toDateInputValue(d: Date | null | undefined): string {
  if (!d) return "";
  return d.toISOString().slice(0, 10);
}

/** Is this event in the past (before today in AU)? null startDate = never past. */
export function isPast(startDate: Date | null | undefined): boolean {
  if (!startDate) return false;
  return startDate.getTime() < auTodayCutoff().getTime();
}
