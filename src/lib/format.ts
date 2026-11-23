// Note dates, shown as-is and used as the <time datetime> value: "2026-10-13".
// toISOString is UTC, which keeps a YYYY-MM-DD frontmatter date on its day.
export function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

// Role dates; months are written as YYYY-MM.
const monthFormat = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

// "2025-05" → "May 2025"
export function formatMonth(month: string): string {
  return monthFormat.format(new Date(`${month}-01T00:00:00Z`));
}

// "May 2025 – Aug 2026"; an open role ends in "Present".
export function formatPeriod(start: string, end: string): string {
  return `${formatMonth(start)} – ${end === "present" ? "Present" : formatMonth(end)}`;
}
