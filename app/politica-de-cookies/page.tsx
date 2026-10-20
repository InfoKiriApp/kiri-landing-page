import LegalPage, { legalMetadata } from "@/components/legal/legal-page"
import { COOKIES_DOC } from "@/lib/legal/cookies"

export const metadata = legalMetadata(COOKIES_DOC)

export default function Page() {
  return <LegalPage doc={COOKIES_DOC} />
}
