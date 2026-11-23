import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { site } from "../config/site";
import { getPublishedNotes } from "../lib/notes";

export const GET: APIRoute = async () =>
  rss({
    title: `${site.name} · Notes`,
    description: site.description,
    site: site.url,
    items: (await getPublishedNotes()).map(({ id, data }) => ({
      title: data.title,
      description: data.description,
      pubDate: data.publishedAt,
      link: `/notes/${id}`,
    })),
  });
