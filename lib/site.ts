export const SITE_URL = "https://www.kiriapp.com"
export const SITE_NAME = "Kiri"

export const KIRI_ORGANIZATION = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
} as const

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString()
}

export type BreadcrumbItem = { name: string; href: string }

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  }
}
