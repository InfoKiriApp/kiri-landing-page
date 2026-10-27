import LegalPage, { legalMetadata } from "@/components/legal/legal-page"
import { MINORS_DOC } from "@/lib/legal/minors"

export const metadata = legalMetadata(MINORS_DOC)

export default function Page() {
  return <LegalPage doc={MINORS_DOC} />
}
