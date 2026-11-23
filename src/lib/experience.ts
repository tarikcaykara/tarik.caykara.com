import { getCollection, type CollectionEntry } from "astro:content";

// Roles in display order (`order` ascending); the first is the latest role.
export async function getRoles(): Promise<CollectionEntry<"experience">[]> {
  const roles = await getCollection("experience");
  return roles.sort((a, b) => a.data.order - b.data.order);
}
