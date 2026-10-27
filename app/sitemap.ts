import type { MetadataRoute } from "next"
import { getAllSlugs } from "@/lib/academy-articles"
import { getAllGameSlugs } from "@/lib/academy-games"
import { GIFT_GUIDE } from "@/lib/guides/gift-ideas"
import { INVEST_GUIDE } from "@/lib/guides/invest-for-kids"
import { LEGAL_UPDATED } from "@/lib/legal/shared"
import { absoluteUrl } from "@/lib/site"

const LEGAL_PATHS = [
  "/politica-de-privacidad",
  "/privacidad-menores-y-familias",
  "/terminos-y-condiciones",
  "/politica-de-cookies",
  "/condiciones-regala-kiri",
  "/privacidad-candidatos",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/regala-kiri"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/kiri-academy"), changeFrequency: "weekly", priority: 0.9 },
    {
      url: absoluteUrl(INVEST_GUIDE.href),
      lastModified: INVEST_GUIDE.reviewed.iso,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(GIFT_GUIDE.href),
      lastModified: GIFT_GUIDE.reviewed.iso,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: absoluteUrl("/kiri-academy/juegos"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/kiri-en-los-medios"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/trabaja-con-nosotros"), changeFrequency: "monthly", priority: 0.5 },
  ]

  const articles = getAllSlugs().map((slug) => ({
    url: absoluteUrl(`/kiri-academy/${slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const games = getAllGameSlugs().map((slug) => ({
    url: absoluteUrl(`/kiri-academy/juegos/${slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const legal = LEGAL_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified: LEGAL_UPDATED.iso,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }))

  return [...pages, ...articles, ...games, ...legal]
}
