import type { MetadataRoute } from "next"

import { getAllTags, getLocalWritingsOnly } from "@/lib/content"
import { siteUrl } from "@/utils/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/writings", "/about", "/privacy"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date("2026-08-02"),
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : path === "/privacy" ? 0.3 : 0.8,
  }))
  const articles = getLocalWritingsOnly().map((writing) => ({
    url: `${siteUrl}/articles/${writing.slug}`,
    lastModified: new Date(writing.updatedAt ?? writing.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }))
  const tags = getAllTags().map(([tag]) => ({
    url: `${siteUrl}/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date("2026-08-02"),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  return [...staticPages, ...articles, ...tags]
}
