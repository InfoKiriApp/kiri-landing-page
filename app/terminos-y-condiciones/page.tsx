import LegalPage, { legalMetadata } from "@/components/legal/legal-page"
import { TERMS_DOC } from "@/lib/legal/terms"

export const metadata = legalMetadata(TERMS_DOC)

export default function Page() {
  return <LegalPage doc={TERMS_DOC} />
}
