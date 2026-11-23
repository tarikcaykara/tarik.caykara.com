import { getCollection, type CollectionEntry } from "astro:content";

// The only way pages, RSS and the home page read notes: drafts are dropped from
// production builds (shown in dev), newest first.
export async function getPublishedNotes(): Promise<CollectionEntry<"notes">[]> {
  const notes = await getCollection(
    "notes",
    ({ data }) => !(import.meta.env.PROD && data.draft),
  );
  return notes.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );
}
