import LegalPage, { legalMetadata } from "@/components/legal/legal-page"
import { CANDIDATES_DOC } from "@/lib/legal/candidates"

export const metadata = legalMetadata(CANDIDATES_DOC)

export default function Page() {
  return <LegalPage doc={CANDIDATES_DOC} />
}
